import { Component } from '@angular/core';
import { OrienteeService } from '../orientee.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-orientee-profile',
  templateUrl: './orientee-profile.component.html',
  styleUrl: './orientee-profile.component.scss',
  standalone:false
})
export class OrienteeProfileComponent {
  
  learningStyle = '';
  // Additional fields...

  constructor(private orienteeService: OrienteeService) {}

  onSaveProfile() {
    const profileData = {
      learningStyle: this.learningStyle,
      // ...
    };
    this.orienteeService.saveProfile(profileData)
      .subscribe(response => {
        console.log('Profile saved:', response);
      });
  }

  onRequestMatch() {
    const orienteeId = '12345'; // Typically from auth or route param
    this.orienteeService.requestMatch(orienteeId)
      .subscribe(matchResponse => {
        console.log('Match result:', matchResponse);
      });
  }
}

