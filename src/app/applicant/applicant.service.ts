import { Injectable } from '@angular/core';
import { Applicant } from '../models/applicant';

@Injectable({
  providedIn: 'root'
})
export class ApplicantService {

  private Applicants: Applicant[] = [];

  constructor(){
    let savedReservations = localStorage.getItem("applicants");
    this.Applicants = savedReservations? JSON.parse(savedReservations) : [];
  }

  // CRUD

  getApplicants(): Applicant[] {
    return this.Applicants;
  }

  getApplicant(id: string): Applicant | undefined {
    return this.Applicants.find(res => res.id === id);
  }

  addApplicant(applicant: Applicant): void {

    applicant.id = Date.now().toString();

    this.Applicants.push(applicant);
    localStorage.setItem("applicants", JSON.stringify(this.Applicants));
  }

  deleteApplicant(id: string): void {
    let index = this.Applicants.findIndex(res => res.id === id);
    this.Applicants.splice(index,1)
    localStorage.setItem("applicants", JSON.stringify(this.Applicants));
  }

  updateApplicant(id: string, updatedApplicant: Applicant): void {
    let index = this.Applicants.findIndex(res => res.id === id);
    this.Applicants[index] = updatedApplicant;
    localStorage.setItem("applicants", JSON.stringify(this.Applicants));
  }
}