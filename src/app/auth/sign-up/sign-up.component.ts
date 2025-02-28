import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  username = '';
  password = '';
  confirmPassword = '';
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSignup(): void {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.authService.signup(this.username, this.password)
      .subscribe({
        next: (response: AuthResponse) => {
          if (response && response.token) {
            this.authService.setToken(response.token);
            this.router.navigate(['/orientee']);
          } else {
            this.errorMessage = 'Invalid sign-up response';
          }
        },
        error: (err:HttpErrorResponse) => {
          this.errorMessage = 'Sign-up failed or server error.';
          console.error('Sign-up error:', err);
        }
      });
  }
}

interface AuthResponse {
  token: string;
  firstname: string;
  lastname: string;
}

