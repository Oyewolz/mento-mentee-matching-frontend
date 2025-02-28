import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin(): void {
    this.authService.login(this.username, this.password)
      .subscribe({
        next: (response) => {
          // Suppose the backend returns { token: '...' }
          if (response && response.token) {
            this.authService.setToken(response.token);
            // Navigate to a protected page, e.g., '/dashboard'
            this.router.navigate(['/dashboard']);
          } else {
            this.errorMessage = 'Invalid login response';
          }
        },
        error: (err) => {
          this.errorMessage = 'Invalid credentials or server error.';
          console.error('Login error:', err);
        }
      });
  }
}
