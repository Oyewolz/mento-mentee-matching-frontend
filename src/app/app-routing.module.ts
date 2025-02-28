import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { 
    path: 'login', 
    loadComponent: () => import('./auth/login/login.component').then(c => c.LoginComponent) 
  },
  { 
    path: 'registration', 
    loadComponent: () => import('./auth/registration/registration.component').then(c => c.RegistrationComponent) 
  },
  { 
    path: 'orientee', 
    loadChildren: () => import('./orientee/orientee.module').then(m => m.OrienteeModule) 
  },
  // Add other routes here
  { path: '**', redirectTo: '/login' } // Fallback route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 