import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestService } from './http/rest.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ], 
  providers: [RestService]
})
export class SharedModule { }
