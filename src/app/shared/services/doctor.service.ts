import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {map, Observable} from 'rxjs';
import {PaginatedList} from '../interfaces/interface';
import {MedicalProcedure, StaffAssignment, TransformedData} from '../interfaces/doctor/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private BASE_PATH = 'api/v1/doctor-service';
  private MEDICAL_PROCEDURE_PATH = `${this.BASE_PATH}/medical-procedures`;
  private PATIENT_VITALS_PATH = `${this.BASE_PATH}/patient-vitals`;
  private EMERGENCY_VISIT_STAFF = `${this.BASE_PATH}/emergency-visit-staff`;

  constructor(public apiService: ApiService) {}

  getMedicalProceduresByPatient(patientID: number): Observable<MedicalProcedure[]>{
    let url = `${this.MEDICAL_PROCEDURE_PATH}/patient/${patientID}`;
    return this.apiService
      .get<MedicalProcedure[]>(url)
      .pipe(
        map( (data) => { return data; } )
      );
  }

  getAssignedPatientsByDoctor(doctorID: number): Observable<{
    PatientId: number;
    Name: string;
    Priority: string;
    TriageNotes: string
  }[]>{
    let url = `${this.EMERGENCY_VISIT_STAFF}/doctor/${doctorID}`;
    return this.apiService
      .get<StaffAssignment[]>(url)
      .pipe(
        map( (data) => {
          console.log()
          return data.map(item => ({
            PatientId: item.emergencyVisit.patient.id,
            Name: `${item.emergencyVisit.patient.firstName} ${item.emergencyVisit.patient.lastName}`,
            Priority: item.emergencyVisit.priorityLevel.toUpperCase(),
            TriageNotes: item.emergencyVisit.triageNotes
          }));
        } )
      );
  }
}
