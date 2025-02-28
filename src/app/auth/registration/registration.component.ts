import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  firstName: string = '';
  lastName: string = '';
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  isLoading: boolean = false;
  
  // Error messages
  firstNameError: string = '';
  lastNameError: string = '';
  usernameError: string = '';
  emailError: string = '';
  passwordError: string = '';
  confirmPasswordError: string = '';

  constructor(private router: Router) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  
  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
  
  backToLogin() {
    this.router.navigate(['/login']);
  }
  
  validateForm(): boolean {
    let isValid = true;
    
    // Reset error messages
    this.firstNameError = '';
    this.lastNameError = '';
    this.usernameError = '';
    this.emailError = '';
    this.passwordError = '';
    this.confirmPasswordError = '';
    
    // Validate first name
    if (!this.firstName.trim()) {
      this.firstNameError = 'First name is required';
      isValid = false;
    }
    
    // Validate last name
    if (!this.lastName.trim()) {
      this.lastNameError = 'Last name is required';
      isValid = false;
    }
    
    // Validate username
    if (!this.username.trim()) {
      this.usernameError = 'Username is required';
      isValid = false;
    } else if (this.username.length < 4) {
      this.usernameError = 'Username must be at least 4 characters';
      isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.email.trim()) {
      this.emailError = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(this.email)) {
      this.emailError = 'Please enter a valid email address';
      isValid = false;
    }
    
    // Validate password
    if (!this.password) {
      this.passwordError = 'Password is required';
      isValid = false;
    } else if (this.password.length < 8) {
      this.passwordError = 'Password must be at least 8 characters';
      isValid = false;
    }
    
    // Validate confirm password
    if (!this.confirmPassword) {
      this.confirmPasswordError = 'Please confirm your password';
      isValid = false;
    } else if (this.password !== this.confirmPassword) {
      this.confirmPasswordError = 'Passwords do not match';
      isValid = false;
    }
    
    return isValid;
  }
  
  register() {
    if (this.validateForm()) {
      this.isLoading = true;
      
      // Simulate API call
      setTimeout(() => {
        this.isLoading = false;
        
        // Show success message
        alert('Account created successfully! You can now log in.');
        
        // Navigate to login page
        this.router.navigate(['/login']);
      }, 1500);
    }
  }
} 