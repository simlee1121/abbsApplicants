import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicantFormComponent } from '../applicant-form/applicant-form.component';
import { ApplicantListComponent } from '../applicant-list/applicant-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomeModule } from '../home/home.module';



@NgModule({
  declarations: [
    ApplicantFormComponent,
    ApplicantListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HomeModule
  ]
})
export class ApplicantModule { }
