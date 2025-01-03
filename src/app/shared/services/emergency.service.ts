import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map, Observable } from 'rxjs';
import {
  EmergencyVisitStaff,
  Invoice,
  PaginatedList,
  PatientNeedingBed,
  WardBed,
  WardBedDetail,
} from '../interfaces/interface';

@Injectable({
  providedIn: 'root',
})
export class EmergencyService {
  constructor(public apiService: ApiService) {}
  private BASE_PATH_HOSPITAL_BEDS = 'api/v1/hospital-beds';
  private BASE_PATH_EMERGENCY_VISIT_STAFF = 'api/v1/emergency-visit-staff';
  private BASE_PATH_INVOICE = 'api/v1/patient-invoices';

  getPatientFromEmergencyVisit(
    page: number,
    size: number,
    order: string,
    currentPatientStatus?: string
  ): Observable<PaginatedList<EmergencyVisitStaff>> {
    let url = `${this.BASE_PATH_EMERGENCY_VISIT_STAFF}?page=${page}&size=${size}&sort=${order}`;
    if (currentPatientStatus != null) {
      url = url + `&currentStatus=${currentPatientStatus}`;
    }
    return this.apiService.get<PaginatedList<EmergencyVisitStaff>>(url).pipe(
      map((data) => {
        return data;
      })
    );
  }

  getBedById(bedId: number): Observable<WardBedDetail> {
    return this.apiService
      .get<WardBedDetail>(`${this.BASE_PATH_HOSPITAL_BEDS}/${bedId}`)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  getPatientsNeedingBed(): Observable<PatientNeedingBed[]> {
    let url = `${this.BASE_PATH_HOSPITAL_BEDS}/patients-needing-beds`;
    return this.apiService.get<PatientNeedingBed[]>(url).pipe(
      map((data) => {
        return data;
      })
    );
  }

  getWardBeds(
    page: number,
    size: number,
    order: string
  ): Observable<PaginatedList<WardBed>> {
    return this.apiService
      .get<PaginatedList<WardBed>>(
        `${this.BASE_PATH_HOSPITAL_BEDS}?page=${page}&size=${size}&sort=${order}`
      )
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  assignBedToPatient(
    bedId: number,
    patientId: number,
    bedStatus: string
  ): Observable<WardBed> {
    return this.apiService
      .put<WardBed>(
        `${this.BASE_PATH_HOSPITAL_BEDS}/assign-patient/${patientId}/hospital-bed/${bedId}/status/${bedStatus}`,
        null
      )
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  getHospitalBedByPatientId(patientId: number): Observable<WardBed> {
    return this.apiService
      .get<WardBed>(`${this.BASE_PATH_HOSPITAL_BEDS}/patient/${patientId}`)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  freeBed(patientId: number): Observable<WardBed> {
    return this.apiService
      .put<WardBed>(
        `${this.BASE_PATH_HOSPITAL_BEDS}/free-bed/patient/${patientId}`,
        null
      )
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  getWardBedsByStatusAndSection(
    ward: string,
    status: string
  ): Observable<WardBed[]> {
    return this.apiService
      .get<WardBed[]>(
        `${this.BASE_PATH_HOSPITAL_BEDS}/status/${status}/ward-section/${ward}`
      )
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  getPatientInvoices(
    page: number,
    size: number,
    order: string
  ): Observable<PaginatedList<Invoice>> {
    return this.apiService
      .get<PaginatedList<Invoice>>(
        `${this.BASE_PATH_INVOICE}?page=${page}&size=${size}&sort=${order}`
      )
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
}
