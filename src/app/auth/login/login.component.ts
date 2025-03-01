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
import { NotificationService } from '../../shared/notification.service';

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

  
  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe({
      next: (isLoggedIn) => {
        if (isLoggedIn) {
          //TODO Get the type of user and navigate to the appropriate page
         // this.router.navigate(['/onboarding']); // for now
        }
      }
    });
  }
  constructor(private router: Router, private authService: AuthService,
     private notificationService: NotificationService) {}

  login() {
    this.authService.login(this.username, this.password)
      .subscribe({
        next: (response) => {
          // Store token
          console.log('Login successful', response);

          // Show success message
          this.notificationService.showSuccess('Retrieving user information...');

          this.retrieveUserInformation(response);  

        },
        error: (error) => {
          console.error('Login error', error);
          this.notificationService.showError('Invalid username or password');
        }
      });
  }
  retrieveUserInformation(response: any) {
          // Navigate to appropriate page based on role
       
          this.authService.retrieveUserProfile(response.user.email as string).subscribe({
            next: (resp:any) => {
    
              console.log('User profile retrieved', resp);
              
              const user = {role: resp.type};
              if (user && user.role === 'PRECEPTOR') {
                this.router.navigate(['/dev/preceptor-matches']);
              } else if (user && user.role === 'ORIENTEE') {
                this.router.navigate(['/orientee/profile']);
              } else {
                this.notificationService.showError('Invalid user role');
              }
    
            },
            error: (err:any) => {
              this.router.navigate(['/orientee/profile']);
            }
           }); 
  }

  loginWithGoogle() {
    this.authService.loginGoogle().subscribe({
      next: (resp) => {
        console.log('Login successful');
        this.router.navigate(['/orientee']);
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
