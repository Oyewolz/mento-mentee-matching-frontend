import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-dev-preceptor-matches',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule, 
    MatIconModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="preceptor-matches-container">
      <h1>Your Matched Orientees (Development View)</h1>
      
      <div *ngIf="loading" class="loading-spinner">
        <mat-spinner diameter="40"></mat-spinner>
        <p>Loading your matches...</p>
      </div>
      
      <div *ngIf="error" class="error-message">
        <mat-icon>error</mat-icon>
        <p>{{ error }}</p>
        <button mat-raised-button color="primary" (click)="loadData()">Retry</button>
      </div>
      
      <div *ngIf="!loading && !error && orientees.length === 0" class="no-matches">
        <mat-icon>info</mat-icon>
        <p>You don't have any matched orientees yet.</p>
      </div>
      
      <div *ngIf="!loading && !error && orientees.length > 0" class="matches-list">
        <mat-card *ngFor="let orientee of orientees" class="orientee-card">
          <mat-card-header>
            <div mat-card-avatar class="orientee-avatar">
              <mat-icon>person</mat-icon>
            </div>
            <mat-card-title>{{ orientee.name }}</mat-card-title>
            <mat-card-subtitle>Match Score: {{ orientee.matchScore | number:'1.1-1' }}</mat-card-subtitle>
          </mat-card-header>
          
          <mat-card-content>
            <h3>Why This Is a Good Match:</h3>
            <ul class="match-reasons">
              <li *ngFor="let trait of orientee.matchTraits">{{ trait }}</li>
            </ul>
            
            <div class="orientee-details">
              <p><strong>Learning Style:</strong> {{ orientee.learningStyle }}</p>
              <p><strong>Clinical Background:</strong> {{ orientee.clinicalBackground }}</p>
              <p><strong>Interests:</strong> {{ orientee.interests }}</p>
            </div>
          </mat-card-content>
          
          <mat-card-actions align="end">
            <button mat-button color="primary" (click)="viewOrienteeDetails(orientee.id)">
              VIEW DETAILS
            </button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styleUrls: ['../preceptor/preceptor-matches/preceptor-matches.component.scss']
})
export class DevPreceptorMatchesComponent implements OnInit {
  orientees: any[] = [];
  loading = false;
  error: string | null = null;

  constructor() {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    // Mock data for development
    this.loading = true;
    setTimeout(() => {
      this.orientees = [
        {
          id: 1,
          name: 'Jane Smith',
          matchScore: 9.2,
          matchTraits: [
            'Similar teaching and learning styles',
            'Complementary clinical backgrounds',
            'Matching availability schedule'
          ],
          learningStyle: 'Visual and hands-on',
          clinicalBackground: 'Pediatric and Neonatal Care',
          interests: 'Emergency medicine, Critical care'
        },
        {
          id: 2,
          name: 'Robert Johnson',
          matchScore: 8.7,
          matchTraits: [
            'Strong interest in your specialty area',
            'Needs guidance in areas you excel at',
            'Personality compatibility'
          ],
          learningStyle: 'Analytical and reflective',
          clinicalBackground: 'Medical-Surgical',
          interests: 'Oncology, Patient education'
        },
        {
          id: 3,
          name: 'Maria Garcia',
          matchScore: 8.4,
          matchTraits: [
            'Looking to develop in your area of expertise',
            'Similar communication style',
            'Complementary strengths and weaknesses'
          ],
          learningStyle: 'Verbal and collaborative',
          clinicalBackground: 'Emergency Department',
          interests: 'Trauma care, Triage management'
        }
      ];
      this.loading = false;
    }, 1000); // Simulate network delay
  }

  viewOrienteeDetails(orienteeId: number): void {
    console.log('Viewing orientee details:', orienteeId);
    // No routing in this development version
  }
} 