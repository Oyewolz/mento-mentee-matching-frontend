import { Component, OnInit } from '@angular/core';
import { PreceptorService } from '../preceptor.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-preceptor-matches',
  templateUrl: './preceptor-matches.component.html',
  styleUrls: ['./preceptor-matches.component.scss']
})
export class PreceptorMatchesComponent implements OnInit {
  loading = true;
  matches: any = []; // Use an appropriate type for your match data

  constructor(
    private preceptorService: PreceptorService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.fetchMatches();
  }

  fetchMatches() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.role === 'preceptor') {
      const preceptorId = currentUser.id;

      // Now you can use preceptorId in the subscribe block
      this.preceptorService.getMatchedOrientees(preceptorId).subscribe(
        (matches) => {
          this.matches = matches;
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching matches:', error);
          this.loading = false;
        }
      );
    }
  }


  // Add methods for handling actions (e.g., view details, send message)
  viewOrienteeDetails(orienteeId: number) {
    // Implement navigation to orientee details page
    // ...
  }

  sendMessage(orienteeId: number) {
    // Implement logic to send a message to the orientee
    // ...
  }
}