import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map, Observable } from 'rxjs';
import { PaginatedList } from '../interfaces/interface';
import { StaffRoleEnums } from '../enums/staff-role.enums';
import { MedicalProcedure } from '../interfaces/doctor/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private BASE_PATH = 'api/v1/doctor-service';
  private MEDICAL_PROCEDURE_PATH = `${this.BASE_PATH}/medical-procedures`;
  private PATIENT_VITALS_PATH = `${this.BASE_PATH}/patient-vitals`;

  constructor(public apiService: ApiService) {}

  getMedicalProceduresByPatient(patientID: number): Observable<MedicalProcedure[]>{
    let url = `${this.MEDICAL_PROCEDURE_PATH}/patient/${patientID}`;
    return this.apiService
      .get<MedicalProcedure[]>(url)
      .pipe(
        map( (data) => { return data; } )
      );
  }

}
