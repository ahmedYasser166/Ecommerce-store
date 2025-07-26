import { Component } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import {  NgxSpinnerComponent } from 'ngx-spinner';
@Component({
  selector: 'app-root',
  imports: [
    NavbarComponent,
    FooterComponent,
    RouterOutlet,
    CommonModule,
    NgxSpinnerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {

  ngOnInit() {

    initFlowbite();
  }
}
