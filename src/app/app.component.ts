import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {
  title = 'Nurse Orientation System';
  
  constructor(private router: Router) {}
  
  ngOnInit(): void {
    // For development: Log route changes but don't redirect
    // comment by: Henok L
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      console.log('Current route:', event.url);
      
      // DEVELOPMENT MODE: Don't check authentication for specific development routes
      // In production, this should be removed and proper auth checks implemented
      if (event.url.includes('/preceptor/matches')) {
        console.log('Development mode: Allowing access to matches page without auth');
        return;
      }
    });
  }
}
