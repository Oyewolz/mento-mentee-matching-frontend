import { ApplicationConfig,provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { OrienteeModule } from './orientee/orientee.module';
import { HttpClientModule } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () => import('./auth/login/login.component').then(c => c.LoginComponent)
      },
      {
        path: 'registration',
        loadComponent: () => import('./auth/registration/registration.component').then(c => c.RegistrationComponent)
      },
      // Add other routes here
      { path: '**', redirectTo: '/login' } // Fallback route
    ]),
    provideAnimations(),
    provideHttpClient(),
      provideZoneChangeDetection({ eventCoalescing: true }),

  ]
};
