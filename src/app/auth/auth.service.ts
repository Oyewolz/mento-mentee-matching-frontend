import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RestService } from '../shared/http/rest.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'current_user';

  private baseUrl = 'http://localhost:8080/api/auth'; // Update to match your backend

  constructor(private restService: RestService) {}

  login(username: string, password: string): Observable<any> {
    // Mock login for testing
    return of({
      token: 'mock-jwt-token',
      user: {
        id: 1,
        username: username,
        role: 'preceptor' // Changed to preceptor role
      }
    }).pipe(
      tap(response => {
        this.setToken(response.token);
        this.setCurrentUser(response.user);
      })
    );
    // Real implementation (commented out for now)
    // const loginData = { username, password };
    // return this.restService.post(`${this.baseUrl}/login`, loginData);
  }

  // Add this method to get the current user ID
  getCurrentUserId(): number {
    const user = this.getCurrentUser();
    return user ? user.id : 0;
  }

  // Add this method to store and retrieve user data
  getCurrentUser(): any {
    const userJson = localStorage.getItem(this.USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  }

  setCurrentUser(user: any): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  signup(username: string, password: string ): Observable<any>  {
    const loginData = { username, password };
    return this.restService.post(`${this.baseUrl}/login`, loginData);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  // Example method to store token
  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
