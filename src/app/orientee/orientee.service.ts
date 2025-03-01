import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { RestService } from '../shared/http/rest.service';

@Injectable({
  providedIn: 'root'
})
export class OrienteeService {
  
  private baseUrl = environment.baseUrl;

  constructor(private restService: RestService) {}

  saveProfile(profileData: any): Observable<any> {
    return this.restService.post(`${this.baseUrl}/user`, profileData);
  }

  requestMatch(orienteeId: string): Observable<any> {
    return this.restService.get(`${this.baseUrl}/match/retrieve/${orienteeId}`);
  }

  match(orienteeId: string, mentorId: string): Observable<any> {
    return this.restService.post(`${this.baseUrl}/match`, { orientee_id: orienteeId, preceptor_id: mentorId });
  }

  getOrientees(preceptorId: string): Observable<any> {
    return this.restService.get(`${this.baseUrl}/user/preceptor/${preceptorId}`);
  }

}
