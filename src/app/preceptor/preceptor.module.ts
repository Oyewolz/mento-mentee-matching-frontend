import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PreceptorDashboardComponent } from './preceptor-dashboard/preceptor-dashboard.component';

const preceptorRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full' as 'full'
  },
  {
    path: 'dashboard',
    component: PreceptorDashboardComponent
  }
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PreceptorDashboardComponent,
    RouterModule.forChild(preceptorRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class PreceptorModule { }
