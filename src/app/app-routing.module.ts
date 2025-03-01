import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { PreceptorMatchesComponent } from './preceptor/preceptor-matches/preceptor-matches.component';
import { DevPreceptorMatchesComponent } from './dev/dev-preceptor-matches.component';

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
  {
    path: 'preceptor',
    loadChildren: () => import('./preceptor/preceptor.module').then(m => m.PreceptorModule),
    // AuthGuard removed for development purposes
    // IMPORTANT: Authentication should be implemented here for production!
    // comment by: Henok L
    // canActivate: [AuthGuard]
  },
  // Direct development route - bypasses all checks
  // IMPORTANT: Remove this in production!
  // comment by: Henok L
  {
    path: 'dev/preceptor-matches',
    component: PreceptorMatchesComponent
  },
  // Development route using standalone component
  {
    path: 'dev',
    component: DevPreceptorMatchesComponent
  },
  // Add other routes here
  { path: '**', redirectTo: '/login' } // Fallback route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 