import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';

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
  template: `
    <div class="login-page">
      <!-- Left Column - Gray Background with Branding -->
      <div class="brand-section">
        <div class="brand-overlay">
          <div class="logo-container">
            <div class="logo">
              <img src="assets/logo.png" alt="Logo" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDY2Y2MiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMjIgMTJoLTRsLTMgOUw5IDNsLTMgOUgyIi8+PC9zdmc+'; this.onerror='';">
            </div>
          </div>
          <div class="brand-text">
            <h1>Nurse Orientation System</h1>
            <p>Professional Development Platform</p>
          </div>
        </div>
      </div>

      <!-- Right Column - Simple Login Form -->
      <div class="login-content">
        <div class="login-card">
          <div class="login-header">
            <h1 class="welcome-heading">Welcome</h1>
            <p>Sign in to continue to Nurse Orientation System</p>
          </div>

          <form (ngSubmit)="login()" class="login-form">
            <div class="form-group">
              <mat-form-field appearance="outline" class="w-full">
                <mat-label>Username</mat-label>
                <input matInput [(ngModel)]="username" name="username" required>
              </mat-form-field>
            </div>

            <div class="form-group">
              <mat-form-field appearance="outline" class="w-full">
                <mat-label>Password</mat-label>
                <input matInput [type]="showPassword ? 'text' : 'password'" [(ngModel)]="password" name="password" required>
                <button mat-icon-button matSuffix (click)="togglePasswordVisibility()" type="button">
                  <mat-icon>{{ showPassword ? 'visibility_off' : 'visibility' }}</mat-icon>
                </button>
              </mat-form-field>
            </div>

            <button mat-flat-button color="primary" type="submit" class="login-button">
              Sign in
            </button>
            
            <button mat-stroked-button color="primary" type="button" class="create-account-button" (click)="createAccount()">
              Create Account
            </button>
          </form>

          <div class="divider">
            <span>Or</span>
          </div>

          <div class="login-options">
            <button mat-stroked-button class="google-signin-button" (click)="loginWithGoogle()">
              <div class="google-button-content">
                <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google logo" class="google-logo">
                <span>Continue with Google</span>
              </div>
            </button>
          </div>

          <div class="terms-text">
            By clicking continue, you agree to our 
            <a href="#">Terms of Service</a> and 
            <a href="#">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-page {
      display: grid;
      grid-template-columns: 1fr;
      min-height: 100vh;
      background-color: #ffffff;
    }

    .brand-section {
      display: none;
      position: relative;
      overflow: hidden;
      background-color: #777777;
    }

    .brand-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 2rem;
      color: white;
    }

    .logo-container {
      margin-bottom: 1.5rem;
    }

    .logo {
      width: 100px;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: white;
      border-radius: 12px;
      margin: 0 auto;
      overflow: hidden;
    }

    .logo img {
      max-width: 80%;
      max-height: 80%;
    }

    .brand-text h1 {
      font-size: 2rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: white;
    }

    .brand-text p {
      font-size: 1.125rem;
      opacity: 0.9;
      margin-top: 0;
    }

    .login-content {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      background-color: #ffffff;
    }

    .login-card {
      width: 100%;
      max-width: 450px;
      padding: 2rem;
    }

    .login-header {
      text-align: center;
      margin-bottom: 2rem;
      background-color: transparent;
    }

    .login-header h1 {
      font-size: 1.75rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: #333;
      background-color: transparent;
    }

    .welcome-heading {
      color: #333333;
      background-color: transparent;
    }

    .login-header p {
      font-size: 0.9rem;
      color: #6c757d;
      margin: 0;
      background-color: transparent;
    }

    .login-form {
      margin-bottom: 1.5rem;
    }

    .form-group {
      margin-bottom: 0.75rem;
    }

    .login-button {
      width: 100%;
      padding: 0.75rem;
      margin-top: 0.5rem;
      background-color: #0066cc !important;
    }

    .divider {
      display: flex;
      align-items: center;
      text-align: center;
      margin: 1.5rem 0;
      color: #6c757d;
    }

    .divider::before,
    .divider::after {
      content: '';
      flex: 1;
      border-bottom: 1px solid #e0e0e0;
    }

    .divider span {
      padding: 0 1rem;
      font-size: 0.875rem;
    }

    .login-options {
      margin-bottom: 1.5rem;
    }

    .google-signin-button {
      width: 100%;
      padding: 0.75rem 1.5rem;
      font-size: 0.9rem;
      font-weight: 500;
      border-radius: 4px;
      border: 1px solid rgba(0, 0, 0, 0.15);
      transition: background-color 0.2s;
      height: auto;
      line-height: normal;
    }

    .google-button-content {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
    }

    .google-signin-button:hover {
      background-color: #f8f9fa;
    }

    .google-logo {
      width: 18px;
      height: 18px;
      margin-right: 12px;
      vertical-align: middle;
    }

    .terms-text {
      text-align: center;
      font-size: 0.75rem;
      color: #6c757d;
      line-height: 1.5;
    }

    .terms-text a {
      color: #0066cc;
      text-decoration: none;
    }

    .terms-text a:hover {
      text-decoration: underline;
    }

    /* Explicitly removing any blue background colors */
    ::ng-deep .mat-toolbar,
    ::ng-deep .mat-card-header,
    ::ng-deep .mat-card-title,
    ::ng-deep .mat-card-content {
      background-color: transparent !important;
    }

    /* Responsive styles */
    @media (min-width: 1024px) {
      .login-page {
        grid-template-columns: 1fr 1fr;
      }

      .brand-section {
        display: block;
      }
    }

    /* Material styles overrides */
    ::ng-deep .mat-mdc-form-field {
      width: 100%;
    }

    /* Reduce spacing between Material form fields */
    ::ng-deep .mat-mdc-form-field-subscript-wrapper {
      height: 0;
    }

    .w-full {
      width: 100%;
    }

    .create-account-button {
      width: 100%;
      margin-top: 12px;
      color: #0066CC;
      border: 1px solid #0066CC;
      border-radius: 4px;
      font-weight: 500;
      transition: all 0.2s ease;
    }

    .create-account-button:hover {
      background-color: #f0f7ff;
    }
  `]
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  showPassword: boolean = false;

  constructor(private router: Router) {}

  login() {
    if (!this.username || !this.password) {
      alert('Please enter both username and password');
      return;
    }
    
    alert('Login successful! Username: ' + this.username);
    // Navigate to home page after login
    // this.router.navigate(['/home']);
  }

  loginWithGoogle() {
    alert('Google sign-in would be implemented here');
    // Navigate to home page after login
    // this.router.navigate(['/home']);
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
