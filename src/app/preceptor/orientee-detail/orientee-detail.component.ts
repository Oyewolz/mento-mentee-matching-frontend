import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatchService } from '../../shared/services/match.service';

@Component({
  selector: 'app-orientee-detail',
  templateUrl: './orientee-detail.component.html',
  styleUrls: ['./orientee-detail.component.scss']
})
export class OrienteeDetailComponent implements OnInit {
  orienteeId!: number;
  orientee: any = null;
  loading = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private matchService: MatchService
  ) {}

  ngOnInit(): void {
    this.orienteeId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadOrienteeDetails();
  }

  loadOrienteeDetails(): void {
    this.loading = true;
    this.error = null;
    
    this.matchService.getOrienteeDetails(this.orienteeId).subscribe({
      next: (data) => {
        this.orientee = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load orientee details.';
        console.error('Error loading orientee details:', err);
        this.loading = false;
      }
    });
  }
} 