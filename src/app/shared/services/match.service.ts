import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private apiUrl = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient) {}

  // Get all orientees matched to a specific preceptor
  getMatchedOrientees(preceptorId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/mentor/matches/${preceptorId}`);
  }

  // Get a specific orientee's details
  getOrienteeDetails(orienteeId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/orientee/${orienteeId}`);
  }

  // Optional: Accept or decline a match
  updateMatchStatus(matchId: number, status: 'accepted' | 'declined'): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/matches/${matchId}/status`, { status });
  }
} 