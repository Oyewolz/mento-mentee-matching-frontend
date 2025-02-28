import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient ) { }

  get(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  post(url: string, body: any, options?: { headers?: HttpHeaders }): Observable<any> {
    return this.http.post<any>(url, body, options);
  }

  put(url: string, body: any, options?: { headers?: HttpHeaders }): Observable<any> {
    return this.http.put<any>(url, body, options);
  }

  delete(url: string, options?: { headers?: HttpHeaders }): Observable<any> {
    return this.http.delete<any>(url, options);
  }
}
