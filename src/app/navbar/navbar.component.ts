import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  @Input() title: string = 'Nurse Orientation System';

  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        // this.authService.showSuccess('Logout successful');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        // this.authService.showError('Logout failed');
      }
    });
  }
}
