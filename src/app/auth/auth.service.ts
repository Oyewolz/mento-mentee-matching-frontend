import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  
  constructor(private http: HttpClient) { }
  
  login(username: string, password: string): Observable<any> {
    // Mock login for testing
    return of({ 
      token: 'mock-jwt-token',
      user: {
        id: 1,
        username: username,
        role: 'admin'
      }
    });
  }
  
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }
  
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
