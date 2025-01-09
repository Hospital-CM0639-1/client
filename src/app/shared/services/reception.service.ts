import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map, Observable } from 'rxjs';
import {
  PaginatedList,
  Patient,
} from '../interfaces/interface';

@Injectable({
  providedIn: 'root',
})
export class ReceptionService {
  constructor(public apiService: ApiService) {}
  private BASE_PATH_HOSPITAL_PATIENT = 'api/v1/reception-service/patient';

  getPatientInfo(patientId: number): Observable<Patient> {
    return this.apiService
      .get<Patient>(`${this.BASE_PATH_HOSPITAL_PATIENT}/get?id=${patientId}`)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  getAllPatients(number: number, page: number): Observable<PaginatedList<Patient>> {
    const url = `${this.BASE_PATH_HOSPITAL_PATIENT}/getall?number=${number}&page=${page}`;
    return this.apiService
      .get<PaginatedList<Patient>>(url)
      .pipe(
        map((data) => {
          console.log(data);
          return data;
        })
      );
  }

  addPatient(patient: Patient): Observable<Patient> {
    return this.apiService
      .post<Patient>(`${this.BASE_PATH_HOSPITAL_PATIENT}/add`, patient)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  updatePatient(patient: Patient): Observable<Patient> {
    return this.apiService
      .put<Patient>(`${this.BASE_PATH_HOSPITAL_PATIENT}/update`, patient)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  createPatient(patient: Patient): Observable<Patient> {
    console.log('Registering patient');
    return this.apiService
      .post<Patient>(`${this.BASE_PATH_HOSPITAL_PATIENT}/create`, patient)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

}
