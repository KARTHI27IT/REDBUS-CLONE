import { Component } from '@angular/core';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.css'],
})
export class ThemeToggleComponent {
  isDarkMode: boolean;

  constructor(private themeService: ThemeService) {
    const savedTheme = localStorage.getItem('isDarkMode');
    this.isDarkMode = savedTheme ? JSON.parse(savedTheme) : false;

    this.themeService.setDarkMode(this.isDarkMode);
    this.updateBackground(); 
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.setDarkMode(this.isDarkMode);
    localStorage.setItem('isDarkMode', JSON.stringify(this.isDarkMode));

    this.updateBackground();
  }

  updateBackground() {
    const buttonElements = document.getElementsByClassName('viewButton');
    for (let i = 0; i < buttonElements.length; i++) {
      const buttonElement = buttonElements[i] as HTMLElement;
      buttonElement.style.background = this.isDarkMode ? 'white' : '#d84e55';
      buttonElement.style.color = this.isDarkMode ? 'black' : 'white';
    }
  }

  onButtonClick() {
    this.toggleTheme();
  }
}
