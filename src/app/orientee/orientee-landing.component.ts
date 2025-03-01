import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { NotificationService } from '../shared/notification.service';
import { OrienteeService } from './orientee.service';

interface Specialty {
  name: string;
  description?: string;
}

interface Preceptor {
  id: string;
  name: string;
  title?: string;
  email: string;
  department: string;
  phoneNumber?: string;
  imageUrl?: string;
  specialty: Specialty;
  experience: number;
  clinicalBackground: string[];
  teachingStyle: string[];
  personality: string[];
  highlights: string[];
  overview: string;
}

@Component({
  selector: 'app-orientee-landing',
  templateUrl: './orientee-landing.component.html',
  styleUrls: ['./orientee-landing.component.scss'],
  standalone: true,
  imports: [CommonModule, NavbarComponent],
})
export class OrienteeLandingComponent implements OnInit {
  isMatched = false;
  isLoading = true;
  matchInProgress = false;
  preceptor: Preceptor | null = null;
  error: string | null = null;
  potentialMatches: Preceptor[] = [];
  showMatchDetails = false;
  orienteeId: string = '';

  private imageUrls: string[] = [
    'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1584516150909-c43483ee7932?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
  ];

  // Updated preceptors with real images
  availablePreceptors: Preceptor[] = [
    {
      id: 'p001',
      name: 'Samantha Blake',
      title: 'RN',
      email: 'samantha.blake@hospital.org',
      department: 'Emergency Department',
      phoneNumber: '(555) 123-4567',
      imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      specialty: { name: 'Emergency Nursing' },
      experience: 10,
      overview: 'Samantha Blake is an energetic ER nurse with over a decade of experience in fast-paced trauma centers and busy community hospitals. She excels at providing life-saving interventions under pressure and is deeply committed to mentorship.',
      clinicalBackground: [
        'Skilled in advanced cardiac life support (ACLS), pediatric advanced life support (PALS), and rapid trauma care',
        'Frequently leads interprofessional drills to maintain readiness for mass-casualty scenarios',
        'Experienced in triaging diverse cases, including severe injuries, cardiac events, and respiratory crises'
      ],
      teachingStyle: [
        'Favors high-fidelity simulations to replicate urgent, real-world situations',
        'Focuses on rapid decision-making, encouraging orientees to develop keen assessment skills',
        'Conducts detailed debriefs after each shift to highlight lessons learned and foster continuous improvement'
      ],
      personality: [
        'Calm under pressure, yet upbeat and encouraging in challenging moments',
        'Welcomes questions and open discussion, creating a supportive learning climate',
        'Believes in resilience-building strategies, guiding new nurses to manage stress effectively'
      ],
      highlights: [
        'Honored with departmental awards for exceptional emergency care and teamwork',
        'Mentors newly hired RNs through hospital orientation and ongoing professional development',
        'Leads public education workshops on first aid and safety awareness'
      ]
    },
    {
      id: 'p002',
      name: 'Marcus Lee',
      title: 'RN',
      email: 'marcus.lee@hospital.org',
      department: 'Medical/Surgical Unit',
      phoneNumber: '(555) 234-5678',
      imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      specialty: { name: 'Medical/Surgical Nursing' },
      experience: 12,
      overview: 'Marcus Lee has spent the last 12 years supporting patients in medical-surgical units, balancing evidence-based protocols with compassionate care. Known for his methodical approach, he ensures that both patients and new nurses feel supported and informed.',
      clinicalBackground: [
        'Comprehensive experience managing postoperative recovery, complex wound care, and chronic disease coordination',
        'Well-versed in collaborating with physicians, dietitians, and rehab specialists for holistic patient care',
        'Maintains strict adherence to infection control measures and patient safety guidelines'
      ],
      teachingStyle: [
        'Integrates structured presentations with real patient stories to contextualize clinical concepts',
        'Encourages ongoing self-reflection and goal setting, helping orientees track their progress',
        'Uses evidence-based tools, such as checklists and care bundles, to streamline learning'
      ],
      personality: [
        'Patient, detail-oriented, and approachable, especially with nurses who are new to acute care',
        'Prioritizes respectful, clear communication and sets realistic performance expectations',
        'Offers consistent feedback loops to refine both clinical skills and bedside manner'
      ],
      highlights: [
        'Recognized for spearheading quality improvement initiatives in the med-surg department',
        'Speaks at internal workshops on optimizing patient flow and interprofessional teamwork',
        'Actively contributes to professional organizations that shape best practices in med-surg nursing'
      ]
    },
    {
      id: 'p003',
      name: 'Lisa Ramirez',
      title: 'RN',
      email: 'lisa.ramirez@hospital.org',
      department: 'Intensive Care Unit',
      phoneNumber: '(555) 345-6789',
      imageUrl: 'https://images.unsplash.com/photo-1584516150909-c43483ee7932?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      specialty: { name: 'Critical/Intensive Care Nursing' },
      experience: 13,
      overview: 'Lisa Ramirez has devoted 13 years to intensive care units, confidently handling high-acuity patients with complex conditions. Her leadership in the ICU, combined with a passion for evidence-based practice, helps shape the next generation of critical care nurses.',
      clinicalBackground: [
        'Expertise in advanced life support, ventilator management, and continuous renal replacement therapy (CRRT)',
        'Oversees rapid responses and code teams, ensuring seamless coordination under tight time constraints',
        'Actively updates protocols on sepsis management and sedation practices'
      ],
      teachingStyle: [
        'Emphasizes scenario-based training to replicate emergent ICU events and interventions',
        'Stresses tight communication loops, reinforcing how interdisciplinary input saves lives',
        'Provides precise, timely debriefs, helping orientees build on strengths and correct weaknesses'
      ],
      personality: [
        'Maintains a composed, solutions-driven outlook even in high-stress situations',
        'Adopts a collaborative stance, encouraging mentees to share concerns and voice new ideas',
        'Balances strict safety standards with supportive guidance, fostering professional confidence'
      ],
      highlights: [
        'Earned multiple accolades for critical care excellence and team leadership',
        'Develops ICU-specific quality improvement projects aimed at reducing complications',
        'Speaks regularly at educational sessions, training healthcare staff in cutting-edge ICU practices'
      ]
    },
    {
      id: 'p004',
      name: 'Gabriella Green',
      title: 'RN',
      email: 'gabriella.green@hospital.org',
      department: 'Pediatrics',
      phoneNumber: '(555) 456-7890',
      imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      specialty: { name: 'Pediatric Nursing' },
      experience: 10,
      overview: 'Gabriella "Gabi" Green brings over 10 years of pediatric experience in both hospital and outpatient clinic settings. She is passionate about guiding new nurses to provide holistic, family-centered care for infants, children, and adolescents.',
      clinicalBackground: [
        'Skilled in managing common childhood conditions, administering vaccinations, and monitoring developmental milestones',
        'Experience in pediatric emergency stabilization, including respiratory distress and injury triage',
        'Regularly coordinates with child life specialists and social workers to ensure family engagement and emotional support'
      ],
      teachingStyle: [
        'Incorporates playful, child-friendly communication techniques into instruction, highlighting how to reduce fear and anxiety',
        'Uses case studies to illustrate the importance of growth and development milestones in clinical decision-making',
        'Emphasizes hands-on learning, especially for procedures like IV starts, medication administration, and pediatric assessments'
      ],
      personality: [
        'Warm, nurturing, and patient, Gabi fosters a supportive atmosphere for learning',
        'Encourages curiosity and creativity, helping mentees adapt care techniques to a child\'s unique needs',
        'Shares empathetic communication strategies to build trust with both young patients and their families'
      ],
      highlights: [
        'Awarded "Nurse of the Quarter" multiple times for excellence in pediatric care',
        'Facilitates hospital-wide training on pediatric pain management and family education',
        'Volunteers in community health fairs, focusing on childhood wellness and preventative screening'
      ]
    },
    {
      id: 'p005',
      name: 'DeAndre Powell',
      title: 'RN',
      email: 'deandre.powell@hospital.org',
      department: 'Psychiatric Unit',
      phoneNumber: '(555) 567-8901',
      imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      specialty: { name: 'Psychiatric/Mental Health Nursing' },
      experience: 9,
      overview: 'With 9 years of psychiatric and mental health nursing experience, DeAndre Powell is dedicated to de-stigmatizing mental illness and empowering nurses to care for patients with empathy and evidence-based interventions.',
      clinicalBackground: [
        'Experienced in acute psychiatric settings, crisis intervention, and long-term behavioral health management',
        'Skilled in de-escalation techniques, therapeutic communication, and trauma-informed care approaches',
        'Collaborates closely with psychiatrists, psychologists, and social services to develop interdisciplinary treatment plans'
      ],
      teachingStyle: [
        'Uses scenario-based role-playing and motivational interviewing exercises to build confidence in communicating with mental health patients',
        'Emphasizes the importance of comprehensive assessment, including psychosocial and environmental factors',
        'Promotes reflection on personal biases to encourage compassionate, patient-centered care'
      ],
      personality: [
        'Calm, patient, and genuine, DeAndre helps new nurses navigate challenging emotional scenarios',
        'Maintains a judgment-free space where mentees can discuss anxieties and learn coping strategies',
        'Encourages continuous self-care practices for nurses to safeguard their own mental well-being'
      ],
      highlights: [
        'Recognized for introducing innovative group therapy sessions tailored for adolescents with anxiety',
        'Leads mental health awareness workshops for nursing students and community outreach programs',
        'Spearheads staff resilience initiatives, such as mindfulness and peer support groups'
      ]
    }
  ];

  constructor(private router: Router, private route: ActivatedRoute, 
    private orientationService: OrienteeService, private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
  

    this.orienteeId = this.route.snapshot.paramMap.get('id') as string;
    console.log('Orientee ID:', this.orienteeId);
      // Check if orientee is already matched
      this.checkMatchStatus();

  }

  private checkMatchStatus(): void {
    
   this.generatePotentialMatches();
    
  }

  generatePotentialMatches(): void {
    // In a real app, this would use an algorithm to find compatible preceptors
    // For now, we'll randomly select 2 preceptors as potential matches
  

    console.log('calling endpoint Potential matches: ', this.orienteeId);

    this.orientationService.requestMatch(this.orienteeId).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Potential matches:', response);
        this.availablePreceptors = response.data.map((preceptor: any) => this.adaptPreceptor(preceptor));
        const shuffled = [...this.availablePreceptors];
        this.potentialMatches = shuffled.slice(0, 2);
        this.notificationService.showSuccess('Potential matches found');
      },
      error: (error) => {
        this.isLoading = false;
        this.notificationService.showError('An error occurred while fetching potential matches. Please try again.');
      }});
  }

  requestMatch(): void {
    this.matchInProgress = true;
    this.error = null;
    
    // Mock API call to request a match - replace with actual service
    setTimeout(() => {
      // For demo purposes, randomly decide if match successful
      const matchSuccessful = Math.random() > 0.3;
      
      if (matchSuccessful) {
        this.isMatched = true;
        // Select a random preceptor from our available preceptors
        this.preceptor = this.availablePreceptors[
          Math.floor(Math.random() * this.availablePreceptors.length)
        ];
      } else {
        this.error = 'Unable to find a match at this time. Please try again later.';
      }
      
      this.matchInProgress = false;
    }, 2000);
  }

  showPreceptorDetails(preceptor: Preceptor): void {
    this.preceptor = preceptor;
    this.showMatchDetails = true;
  }

  hidePreceptorDetails(): void {
    this.showMatchDetails = false;
  }

  selectPreceptor(preceptor: Preceptor): void {
    this.matchInProgress = true;
    
    // Mock API call to request a specific preceptor
    setTimeout(() => {
      this.isMatched = true;
      this.preceptor = preceptor;
      this.matchInProgress = false;
    }, 1500);
  }

  private adaptPreceptor(preceptor: any): any {
    const randomImageUrl = this.imageUrls[Math.floor(Math.random() * this.imageUrls.length)];

    return {
      id: `p00${preceptor.id}`,
      name: `${preceptor.first_name} ${preceptor.last_name}`,
      title: 'RN',
      email: preceptor.email,
      department: 'Unknown', // Assuming department is not provided
      phoneNumber: preceptor.phone_number,
      imageUrl: randomImageUrl, // Placeholder image URL
      specialty: { name: preceptor.clinical_background },
      experience: 0, // Assuming experience is not provided
      overview: preceptor.match_information,
      clinicalBackground: preceptor.clinical_background.split(', '),
      teachingStyle: [], // Assuming teaching style is not provided
      personality: preceptor.personality.split(', '),
      highlights: [] // Assuming highlights are not provided
    };
  }
} 