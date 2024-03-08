import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ApplicantService } from '../applicant/applicant.service';
import { Applicant } from '../models/applicant';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-applicant-form',
  templateUrl: './applicant-form.component.html',
  styleUrl: './applicant-form.component.css'
})
export class ApplicantFormComponent implements OnInit {

  applicantForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private applicantService: ApplicantService,
    private router: Router,
    private activatedRoute: ActivatedRoute){

  }

  ngOnInit(): void {
    this.applicantForm = this.formBuilder.group({
      interviewDate: ['', Validators.required],
      Name: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      age: ['', Validators.required]
    })

    let id = this.activatedRoute.snapshot.paramMap.get('id')

    if(id){
      let applicant = this.applicantService.getApplicant(id)

      if(applicant)
        this.applicantForm.patchValue(applicant)
    }
  }

  onSubmit() {
    if(this.applicantForm.valid){

      let reservation: Applicant = this.applicantForm.value;

      let id = this.activatedRoute.snapshot.paramMap.get('id')

      if(id){
        // Update
        this.applicantService.updateApplicant(id, reservation)
      } else {
        // New
        this.applicantService.addApplicant(reservation)   

      }

      this.router.navigate(['/list'])
    }
  }

}
