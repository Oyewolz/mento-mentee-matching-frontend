// preceptor.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RestService } from '../shared/http/rest.service';

@Injectable({
    providedIn: 'root'
})
export class PreceptorService {
    private baseUrl = 'http://localhost:8080/api/preceptors';

    constructor(private restService: RestService) { }

    getPreceptorProfile(preceptorId: number): Observable<any> {
        return this.restService.get(`<span class="math-inline">\{this\.baseUrl\}/</span>{preceptorId}`);
    }

    getMatchedOrientees(preceptorId: number): Observable<any> {
        return this.restService.get(`<span class="math-inline">\{this\.baseUrl\}/</span>{preceptorId}/matches`);
    }

    // ... other preceptor-related methods
}