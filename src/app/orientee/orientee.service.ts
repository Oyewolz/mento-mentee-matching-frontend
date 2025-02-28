import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrienteeService {
  
  private baseUrl = 'https://your-backend-endpoint.com/api/orientee';

  constructor(private http: HttpClient) {}

  saveProfile(profileData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/profile`, profileData);
  }

  requestMatch(orienteeId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/match`, { orienteeId });
  }
}
