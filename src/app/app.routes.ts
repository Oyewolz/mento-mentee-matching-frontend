import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { TestComponent } from './test.component';
import { FallbackComponent } from './fallback.component';
import { RegistrationComponent } from './auth/registration/registration.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
    {
    path: 'orientee',
    children: [
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
      },
      {
        path: 'profile',
        loadComponent: () => import('./orientee/orientee-profile.component').then(m => m.OrienteeProfileComponent)
      },
      {
        path: 'matches',
        loadComponent: () => import('./orientee/orientee-landing.component').then(m => m.OrienteeLandingComponent)
      }
    ]
  },
    {
    path: 'dev/preceptor-matches',
    loadComponent: () => import('./dev/dev-preceptor-matches.component').then(c => c.DevPreceptorMatchesComponent)
  },
  // Add routes for manager, educator, etc.
  { path: '**', redirectTo: 'onboarding' } // Catch-all
];