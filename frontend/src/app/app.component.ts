import { Component,effect,HostBinding,signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  darkMode = signal<boolean>(
    JSON.parse(window.localStorage.getItem('darkMode') ?? "false")
  );
  @HostBinding("class.dark") get mode(){
    return this.darkMode();
  }
  constructor(){
    effect(()=>{
      window.localStorage.setItem("darkMode",JSON.stringify(this.darkMode()));
    })
  }
}
