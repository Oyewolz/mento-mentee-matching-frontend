import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RestService } from '../shared/http/rest.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';

  private baseUrl = 'http://localhost:8080/api/auth'; // Update to match your backend

  constructor(private restService: RestService) {}

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
    const loginData = { username, password };
    return this.restService.post(`${this.baseUrl}/login`, loginData);
  }

  signup(username: string, password: string ): Observable<any>  {
    const loginData = { username, password };
    return this.restService.post(`${this.baseUrl}/login`, loginData);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
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
