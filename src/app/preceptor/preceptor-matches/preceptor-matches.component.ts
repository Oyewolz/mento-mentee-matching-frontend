import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Specialty {
  name: string;
  description?: string;
}

interface Preceptor {
  id: string;
  name: string;
  title?: string;
  email: string;
  department: string;
  phoneNumber?: string;
  imageUrl?: string;
  specialty: Specialty;
  experience: number;
  clinicalBackground: string[];
  teachingStyle: string[];
  personality: string[];
  highlights: string[];
  overview: string;
}

@Component({
  selector: 'app-preceptor-matches',
  templateUrl: './preceptor-matches.component.html',
  styleUrls: ['./preceptor-matches.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class PreceptorMatchesComponent implements OnInit {
  isMatched = false;
  isLoading = true;
  matchInProgress = false;
  preceptor: Preceptor | null = null;
  error: string | null = null;
  potentialMatches: Preceptor[] = [];
  showMatchDetails = false;

  // Available preceptors database
  availablePreceptors: Preceptor[] = [
    {
      id: 'p001',
      name: 'Samantha Blake',
      title: 'RN',
      email: 'samantha.blake@hospital.org',
      department: 'Emergency Department',
      phoneNumber: '(555) 123-4567',
      imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      specialty: { name: 'Emergency Nursing' },
      experience: 10,
      overview: 'Samantha Blake is an energetic ER nurse with over a decade of experience in fast-paced trauma centers and busy community hospitals. She excels at providing life-saving interventions under pressure and is deeply committed to mentorship.',
      clinicalBackground: [
        'Skilled in advanced cardiac life support (ACLS), pediatric advanced life support (PALS), and rapid trauma care',
        'Frequently leads interprofessional drills to maintain readiness for mass-casualty scenarios',
        'Experienced in triaging diverse cases, including severe injuries, cardiac events, and respiratory crises'
      ],
      teachingStyle: [
        'Favors high-fidelity simulations to replicate urgent, real-world situations',
        'Focuses on rapid decision-making, encouraging orientees to develop keen assessment skills',
        'Conducts detailed debriefs after each shift to highlight lessons learned and foster continuous improvement'
      ],
      personality: [
        'Calm under pressure, yet upbeat and encouraging in challenging moments',
        'Welcomes questions and open discussion, creating a supportive learning climate',
        'Believes in resilience-building strategies, guiding new nurses to manage stress effectively'
      ],
      highlights: [
        'Honored with departmental awards for exceptional emergency care and teamwork',
        'Mentors newly hired RNs through hospital orientation and ongoing professional development',
        'Leads public education workshops on first aid and safety awareness'
      ]
    },
    // ... other preceptors (keeping them from the original component)
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Check if orientee is already matched
    this.checkMatchStatus();
  }

  private checkMatchStatus(): void {
    // Mock API call - replace with actual service
    setTimeout(() => {
      // For demo purposes, randomly decide if matched
      const mockMatched = Math.random() > 0.7;

      if (mockMatched) {
        this.isMatched = true;
        // Randomly select a preceptor from our database
        this.preceptor = this.availablePreceptors[
          Math.floor(Math.random() * this.availablePreceptors.length)
        ];
      } else {
        // Generate potential matches
        this.generatePotentialMatches();
      }

      this.isLoading = false;
    }, 1000);
  }

  generatePotentialMatches(): void {
    // In a real app, this would use an algorithm to find compatible preceptors
    // For now, we'll randomly select 2 preceptors as potential matches
    const shuffled = [...this.availablePreceptors].sort(() => 0.5 - Math.random());
    this.potentialMatches = shuffled.slice(0, 2);
  }

  requestMatch(): void {
    this.matchInProgress = true;
    this.error = null;

    // Mock API call to request a match - replace with actual service
    setTimeout(() => {
      // For demo purposes, randomly decide if match successful
      const matchSuccessful = Math.random() > 0.3;

      if (matchSuccessful) {
        this.isMatched = true;
        // Select a random preceptor from our available preceptors
        this.preceptor = this.availablePreceptors[
          Math.floor(Math.random() * this.availablePreceptors.length)
        ];
      } else {
        this.error = 'Unable to find a match at this time. Please try again later.';
      }

      this.matchInProgress = false;
    }, 2000);
  }

  showPreceptorDetails(preceptor: Preceptor): void {
    this.preceptor = preceptor;
    this.showMatchDetails = true;
  }

  hidePreceptorDetails(): void {
    this.showMatchDetails = false;
  }

  selectPreceptor(preceptor: Preceptor): void {
    this.matchInProgress = true;

    // Mock API call to request a specific preceptor
    setTimeout(() => {
      this.isMatched = true;
      this.preceptor = preceptor;
      this.matchInProgress = false;
    }, 1500);
  }
} 