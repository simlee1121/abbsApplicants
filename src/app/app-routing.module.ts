import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ApplicantFormComponent } from './applicant-form/applicant-form.component';
import { ApplicantListComponent } from './applicant-list/applicant-list.component';

const routes: Routes = [
  {path:"", component: HomeComponent},
  {path:"list", component: ApplicantListComponent},
  {path:"new", component: ApplicantFormComponent},
  {path:"edit/:id", component:ApplicantFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
