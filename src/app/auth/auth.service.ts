import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080/api/auth'; // Update to match your backend

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const loginData = { username, password };
    return this.http.post(`${this.baseUrl}/login`, loginData);
  }

  // Example method to store token
  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Example method to retrieve token
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Example method to remove token
  logout(): void {
    localStorage.removeItem('authToken');
  }

  // Utility: check if user is logged in
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
