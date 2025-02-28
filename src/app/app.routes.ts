import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes  = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
      path: 'orientee',
      loadChildren: () =>
        import('./orientee/orientee.module').then((m) => m.OrienteeModule)
    },
    // Add routes for manager, educator, etc.
    { path: '**', redirectTo: '/orientee' } // Catch-all
  ];
