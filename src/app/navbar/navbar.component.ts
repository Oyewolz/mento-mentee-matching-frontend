import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  @Input() title: string = 'Nurse Orientation System';

  constructor(private authService: AuthService, private router: Router, private notificationService: NotificationService) {}

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.notificationService.showSuccess('Logout successful');
        this.router.navigate(['/login']);
      },
      error: (error) => {
         this.notificationService.showError('Logout failed');
      }
    });
  }
}
