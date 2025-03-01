import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrienteeService } from './orientee.service';
import { NotificationService } from '../shared/notification.service';

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


  userType: LearningStyle[] = [
    { 
      id: 'PRECEPTOR', 
      name: 'Mentor', 
      description: 'You are an experienced nurse who provides guidance and support to orientees.'
    },
    { 
      id: 'ORIENTEE', 
      name: 'Mentee', 
      description: 'You are a new nurse seeking guidance and support from a preceptor.'
    },
  
  ];
  
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
    private router: Router, 
    private orientationService: OrienteeService, 
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.profileForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required]],
      learning_style: ['', [Validators.required]],
      clinical_background: [[], [Validators.required]],
      availability: ['', [Validators.required]],
      type: ['ORIENTEE', [Validators.required]],
      years_experience: [0, [Validators.required, Validators.min(0)]],
      addition_information: [''],
      personality: this.fb.group({
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

   const clinicalInterestsList = this.profileForm.value.clinical_background
   .map((interest: ClinicalInterest)=> interest.name);

const personalityTraitsList = Object.keys(this.profileForm.value.personality)
    .filter(trait => this.profileForm.value.personality[trait]);

    const profileData = {
      ...this.profileForm.value,
      clinical_background: clinicalInterestsList,
      personality: personalityTraitsList
    };
     
    this.orientationService.saveProfile(profileData).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        console.log('Profile saved:', response);
        this.notificationService.showSuccess('Profile saved successfully');
        if(profileData.type === 'PRECEPTOR') {
          this.router.navigate(['/preceptor']);
        }else{
        const orienteeId = response.id;
        this.router.navigate(['/orientee/matches', orienteeId]);
        }
      },
      error: (error) => {
        this.isSubmitting = false;
        this.notificationService.showError('An error occurred while saving your profile. Please try again.');
      }
    });


  }

  toggleClinicalInterest(interest: ClinicalInterest): void {
    const currentInterests = this.profileForm.get('clinical_background')?.value as ClinicalInterest[];
    
    if (currentInterests?.some(i => i.id === interest.id)) {
      // Remove interest if already selected
      const updatedInterests = currentInterests.filter(i => i.id !== interest.id);
      this.profileForm.get('clinical_background')?.setValue(updatedInterests);
    } else {
      // Add interest if not already selected
      this.profileForm.get('clinical_background')?.setValue([...currentInterests, interest]);
    }
  }

  isInterestSelected(interestId: string): boolean {
    const currentInterests = this.profileForm.get('clinical_background')?.value as ClinicalInterest[];
    return currentInterests?.some(i => i.id === interestId);
  }
} 
