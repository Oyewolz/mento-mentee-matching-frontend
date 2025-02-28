import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
 
  const token = localStorage.getItem('token');
  if (!token) {
    // Redirect to login page 
    return false;
  }
  return true;

  
};
