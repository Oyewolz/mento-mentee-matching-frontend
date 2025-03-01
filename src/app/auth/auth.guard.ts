import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isLoggedIn()) {
      // Check roles if required
      const requiredRole = route.data['role'];
      if (requiredRole) {
        const user = this.authService.getCurrentUser();
        if (user && user.role === requiredRole) {
          return true;
        }
        this.router.navigate(['/forbidden']);
        return false;
      }
      return true;
    }
    
    // Store the attempted URL for redirecting after login
    this.router.navigate(['/login'], { 
      queryParams: { returnUrl: state.url }
    });
    return false;
  }
}
