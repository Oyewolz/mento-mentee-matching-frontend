import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { TestComponent } from './test.component';
import { FallbackComponent } from './fallback.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { OnboardingComponent } from './onboarding/onboarding.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'onboarding', component: OnboardingComponent },
  {
    path: 'orientee',
    loadChildren: () =>
      import('./orientee/orientee.module').then((m) => m.OrienteeModule)
  },
  // Add routes for manager, educator, etc.
  { path: '**', redirectTo: 'onboarding' } // Catch-all
];
