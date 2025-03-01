import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment.development';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp, getApp } from 'firebase/app';


export const appConfig: ApplicationConfig = {

  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),

    provideFirebaseApp(() =>
      initializeApp(environment.firebase)),

    provideAuth(() => getAuth()),


    provideFirestore(() =>
      initializeFirestore(getApp(), {
        localCache: persistentLocalCache({
          tabManager: persistentMultipleTabManager(),
        }),
      })),
  ]

};
//const appRoutes: Routes = [
//   { path: '', redirectTo: '/login', pathMatch: 'full' },
//   {
//     path: 'login',
//     loadComponent: () => import('./auth/login/login.component').then(c => c.LoginComponent)
//   },
//   {
//     path: 'registration',
//     loadComponent: () => import('./auth/registration/registration.component').then(c => c.RegistrationComponent)
//   },
//   // Add the preceptor module
//   {
//     path: 'preceptor',
//     loadChildren: () => import('./preceptor/preceptor.module').then(m => m.PreceptorModule),
//   },
//   // Add orientee landing page
//   {
//     path: 'orientee',
//     children: [
//       {
//         path: '',
//         redirectTo: 'profile',
//         pathMatch: 'full'
//       },
//       {
//         path: 'profile',
//         loadComponent: () => import('./orientee/orientee-profile.component').then(m => m.OrienteeProfileComponent)
//       },
//       {
//         path: 'matches',
//         loadComponent: () => import('./orientee/orientee-landing.component').then(m => m.OrienteeLandingComponent)
//       }
//     ]
//   },
//   // Development route - direct access to matches
//   {
//     path: 'dev/preceptor-matches',
//     loadComponent: () => import('./dev/dev-preceptor-matches.component').then(c => c.DevPreceptorMatchesComponent)
//   },
//   // Fallback route
//   { path: '**', redirectTo: '/login' }
// ];
