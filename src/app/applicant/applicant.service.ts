import { Injectable } from '@angular/core';
import { Applicant } from '../models/applicant';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicantService {

  private apiUrl = "http://localhost:3002";
  private Applicants: Applicant[] = [];

  constructor(private http: HttpClient){
    let savedReservations = localStorage.getItem("applicants");
    this.Applicants = savedReservations? JSON.parse(savedReservations) : [];
  }

  // CRUD
  // getApplicants(): Applicant[] {
  //   return this.Applicants;
  // }

  getApplicants(): Observable<Applicant[]> {
    // Retrieve reservations from both API and local storage
    const apiapplicant = this.http.get<Applicant[]>(this.apiUrl + "/applicants");
    const localStorageapplicants = of(this.Applicants);

    // Combine both observables and return
    return new Observable(observer => {
      const combined = forkJoin([apiapplicant, localStorageapplicants]);
      combined.subscribe(
        ([apiapplicant, localStorageapplicants]: [Applicant[], Applicant[]]) => { // Specify the types for array elements
          // Merge data from both sources
          const mergedapplicants = [...apiapplicant, ...localStorageapplicants];
          observer.next(mergedapplicants);
          observer.complete();
        },
        (err: any) => { // Explicitly specify the type for 'err'
          observer.error(err);
        }
      );
    });
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
    if(index != -1){
    this.Applicants.splice(index,1)
    localStorage.setItem("applicants", JSON.stringify(this.Applicants));
    }
  }

  updateApplicant(id: string, updatedApplicant: Applicant): void {
    let index = this.Applicants.findIndex(res => res.id === id);
    if (index !== -1) {
      updatedApplicant.id = id; // Ensure the updated reservation has the same id
      this.Applicants[index] = updatedApplicant;
      localStorage.setItem("applicants", JSON.stringify(this.Applicants));
    }
  }
}