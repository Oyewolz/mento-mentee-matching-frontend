import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule
  ],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  showPassword: boolean = false;

  constructor(private router: Router, private authService: AuthService
  ) { }
  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe({
      next: (isLoggedIn) => {
        if (isLoggedIn) {
          //TODO Get the type of user and navigate to the appropriate page
          this.router.navigate(['/onboarding']); // for now
        }
      }
    });
  }
  constructor(private router: Router, private authService: AuthService, private snackBar: MatSnackBar) {}

  login() {
    this.authService.login(this.username, this.password)
      .subscribe({
        next: (response) => {
          // Store token
          this.authService.setToken(response.token);

          // Show success message
          this.snackBar.open('Login successful!', 'Close', {
            duration: 3000,
          });

          // Navigate to appropriate page based on role
          const user = this.authService.getCurrentUser();
          if (user && user.role === 'preceptor') {
            this.router.navigate(['/preceptor/matches']);
          } else if (user && user.role === 'orientee') {
            this.router.navigate(['/orientee/dashboard']);
          } else {
            this.router.navigate(['/dashboard']);
          }
        },
        error: (error) => {
          console.error('Login error', error);
          this.snackBar.open('Login failed. Please check your credentials.', 'Close', {
            duration: 5000,
          });
        }
      });
  }

  loginWithGoogle() {
    this.authService.LoginGoogle().subscribe({
      next: (resp) => {
        console.log('Login successful');
        this.router.navigate(['/onboarding']);
      },
      error: (error) => {
        alert('Invalid username or password');
      },
    });


  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  createAccount() {
    // Navigate to the registration page
    this.router.navigate(['/registration']);

    // You can also add any additional logic here if needed
    console.log('Navigating to registration page');
  }
}
