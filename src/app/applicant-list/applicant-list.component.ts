import { Component, OnInit } from '@angular/core';
import { ApplicantService } from '../applicant/applicant.service';
import { Applicant } from '../models/applicant';

@Component({
  selector: 'app-applicant-list',
  templateUrl: './applicant-list.component.html',
  styleUrl: './applicant-list.component.css'
})
export class ApplicantListComponent implements OnInit {

  applicants: Applicant[] = [];

  constructor(private applicantService: ApplicantService){}

  ngOnInit(): void {
    this.loadApplicants();
  }

  loadApplicants(): void {
    this.applicantService.getApplicants().subscribe(applicants => {
      this.applicants = applicants;
    });
  }

  deleteApplicant(id: string){
    this.applicantService.deleteApplicant(id);

    this.loadApplicants();
  }

  // ngOnInit(): void {
  //   this.applicants = this.applicantService.getApplicants();
  // }

  // deleteApplicant(id: string){
  //   this.applicantService.deleteApplicant(id);
  // }

}
