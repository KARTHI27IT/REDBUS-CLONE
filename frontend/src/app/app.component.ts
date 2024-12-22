import { Component, effect, HostBinding, Renderer2, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  // Signal to track dark mode status
  darkMode = signal<boolean>(JSON.parse(localStorage.getItem('darkMode') ?? 'false'));

  @HostBinding('class.dark') get mode() {
    return this.darkMode();
  }

  constructor(
    private renderer: Renderer2, 
  ) {

    if (this.darkMode()) {
      this.renderer.addClass(document.body, 'dark');
    }

    // Effect to update localStorage whenever darkMode changes
    effect(() => {
      localStorage.setItem('darkMode', JSON.stringify(this.darkMode()));
      if (this.darkMode()) {
        this.renderer.addClass(document.body, 'dark');
      } else {
        this.renderer.removeClass(document.body, 'dark');
      }
    });
  }

  // Method to toggle dark mode state
  toggleDarkMode() {
    this.darkMode.update(mode => !mode);
  }


}
