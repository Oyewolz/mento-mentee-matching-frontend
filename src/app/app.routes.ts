import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { TestComponent } from './test.component';
import { FallbackComponent } from './fallback.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'test', component: TestComponent },
  { path: 'fallback', component: FallbackComponent },
  {
    path: 'orientee',
    loadChildren: () =>
      import('./orientee/orientee.module').then((m) => m.OrienteeModule)
  },
  // Add routes for manager, educator, etc.
  { path: '**', redirectTo: 'fallback' } // Catch-all
];
