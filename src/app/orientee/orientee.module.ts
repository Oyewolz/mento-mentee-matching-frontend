import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { OrienteeProfileComponent } from './orientee-profile/orientee-profile.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'profile', component: OrienteeProfileComponent },
  // more child routes...
];


@NgModule({
  declarations: [OrienteeProfileComponent],
  imports: [
    CommonModule, 
    FormsModule
  ]
})
export class OrienteeModule { }
