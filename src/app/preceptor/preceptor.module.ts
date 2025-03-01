import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreceptorDashboardComponent } from './preceptor-dashboard/preceptor-dashboard.component';
import { PreceptorMatchesComponent } from './preceptor-matches/preceptor-matches.component';
import { PreceptorService } from './preceptor.service';


@NgModule({
  declarations: [PreceptorDashboardComponent, PreceptorMatchesComponent],
  imports: [CommonModule],
  providers: [PreceptorService]
})
export class PreceptorModule { }


