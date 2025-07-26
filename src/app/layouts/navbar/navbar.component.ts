import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
 isDarkMode = false;

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      this.enableDarkMode();
    } else {
      this.disableDarkMode();
    }
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      this.enableDarkMode();
    } else {
      this.disableDarkMode();
    }
  }

  private enableDarkMode(): void {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    this.isDarkMode = true;
  }

  private disableDarkMode(): void {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    this.isDarkMode = false;
  }

}
