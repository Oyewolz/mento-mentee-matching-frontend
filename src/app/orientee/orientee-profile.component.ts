import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface LearningStyle {
  id: string;
  name: string;
  description: string;
}

interface ClinicalInterest {
  id: string;
  name: string;
}

@Component({
  selector: 'app-orientee-profile',
  templateUrl: './orientee-profile.component.html',
  styleUrls: ['./orientee-profile.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class OrienteeProfileComponent implements OnInit {
  profileForm!: FormGroup;
  isSubmitting = false;
  submitError: string | null = null;
  
  learningStyles: LearningStyle[] = [
    { 
      id: 'visual', 
      name: 'Visual Learner', 
      description: 'You learn best through seeing information presented visually through charts, diagrams, and demonstrations.'
    },
    { 
      id: 'auditory', 
      name: 'Auditory Learner', 
      description: 'You learn best through listening to lectures, discussions, and verbal instructions.'
    },
    { 
      id: 'kinesthetic', 
      name: 'Hands-on Learner', 
      description: 'You learn best through physical activities, practice, and direct experience.'
    },
    { 
      id: 'reading', 
      name: 'Reading/Writing Learner', 
      description: 'You learn best through reading materials and writing notes.'
    }
  ];
  
  clinicalInterests: ClinicalInterest[] = [
    { id: 'emergency', name: 'Emergency Care' },
    { id: 'medsurg', name: 'Medical-Surgical' },
    { id: 'pediatrics', name: 'Pediatrics' },
    { id: 'obstetrics', name: 'Obstetrics/Labor & Delivery' },
    { id: 'critical', name: 'Critical Care/ICU' },
    { id: 'oncology', name: 'Oncology' },
    { id: 'geriatrics', name: 'Geriatrics' },
    { id: 'psychiatric', name: 'Psychiatric/Mental Health' },
    { id: 'community', name: 'Community Health' },
    { id: 'surgical', name: 'Surgical/Perioperative' }
  ];
  
  availabilityOptions = [
    'Weekdays only',
    'Weekends available',
    'Evenings preferred',
    'Day shifts only',
    'Night shifts only',
    'Flexible schedule'
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      learningStyle: ['', [Validators.required]],
      clinicalInterests: [[], [Validators.required]],
      availability: ['', [Validators.required]],
      yearsExperience: [0, [Validators.required, Validators.min(0)]],
      additionalInfo: [''],
      personalityTraits: this.fb.group({
        teamOriented: [false],
        detailFocused: [false],
        adaptable: [false],
        selfDirected: [false],
        analyticalThinker: [false],
        creativeApproach: [false]
      })
    });
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.profileForm.controls).forEach(key => {
        const control = this.profileForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    this.isSubmitting = true;
    this.submitError = null;

    // Mock API call to save profile
    setTimeout(() => {
      // In a real app, you would send this data to your backend
      console.log('Profile data:', this.profileForm.value);
      
      // Navigate to the preceptor matching page after successful profile creation
      this.router.navigate(['/orientee/matches']);
      
      this.isSubmitting = false;
    }, 1500);
  }

  toggleClinicalInterest(interest: ClinicalInterest): void {
    const currentInterests = this.profileForm.get('clinicalInterests')?.value as ClinicalInterest[];
    
    if (currentInterests.some(i => i.id === interest.id)) {
      // Remove interest if already selected
      const updatedInterests = currentInterests.filter(i => i.id !== interest.id);
      this.profileForm.get('clinicalInterests')?.setValue(updatedInterests);
    } else {
      // Add interest if not already selected
      this.profileForm.get('clinicalInterests')?.setValue([...currentInterests, interest]);
    }
  }

  isInterestSelected(interestId: string): boolean {
    const currentInterests = this.profileForm.get('clinicalInterests')?.value as ClinicalInterest[];
    return currentInterests.some(i => i.id === interestId);
  }
} 