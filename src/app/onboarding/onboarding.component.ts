import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './onboarding.component.html',
  styleUrl: './onboarding.component.scss'
})
export class OnboardingComponent {
  onboardingForm: FormGroup;
  learningStyles: string[] = ['Visual', 'Auditory', 'Kinesthetic'];
  teachingStyles: string[] = ['Lecture', 'Discussion', 'Hands-on'];

  
  constructor(private fb: FormBuilder) {
    this.onboardingForm = this.fb.group({
      firstName: ['', Validators.required],
      learningStyle: ['', Validators.required],
      teachingStyle: ['', Validators.required],
      type: ['', Validators.required],
      interestsArea: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.onboardingForm.valid) {
      console.log(this.onboardingForm.value);
      // Handle form submission logic here
    }
  }
}
