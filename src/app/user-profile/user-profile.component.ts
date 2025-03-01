import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  profileForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.profileForm = this.fb.group({
      skills: ['', Validators.required],
      experience: ['', Validators.required],
      teachingStyle: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.profileForm.valid) {
      console.log('Profile Data:', this.profileForm.value);
      // Here you can send data to an API or store it in a service
      this.router.navigate(['/dashboard']); // Redirect after profile completion
    }
  }
}
