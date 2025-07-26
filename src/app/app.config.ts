import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
  
} from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";
import { loadingInterceptor } from './core/interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    importProvidersFrom(BrowserAnimationsModule, NgxSpinnerModule),
    provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers
      provideHttpClient(
      withFetch(),
      withInterceptors([ loadingInterceptor])
    ),
  ],
};
