import { Component, effect, HostBinding, Renderer2, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';  // Import TranslateService for language switching

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
    private translate: TranslateService // Inject TranslateService
  ) {
    // Default language (You can set this based on user preference or browser settings)
    this.translate.setDefaultLang('en');

    // Get saved dark mode setting
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

  // Switch between different languages
  switchLanguage(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const language = selectElement.value; // Get the selected language
    this.translate.use(language); // Change language using ngx-translate
  }
}
