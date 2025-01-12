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
  private PATIENT = `${this.BASE_PATH}/patients`;

  constructor(public apiService: ApiService) {}

  getMedicalProceduresByPatient(
    patientID: number
  ): Observable<any>{
    let url = `${this.MEDICAL_PROCEDURE_PATH}/patient/${patientID}`;
    return this.apiService
      .get<any>(url)
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

  getEmergencyInfoByPatient(patientID: number): Observable<any> {
    let url = `${this.PATIENT}/${patientID}/emergency-info`;
    return this.apiService
      .get<any>(url)
      .pipe(
        map((data) => data)
      );
  }

  getMedicalProcedureDetails(patientID: number): Observable<any> {
    let url = `${this.MEDICAL_PROCEDURE_PATH}/patient/${patientID}?sort=procedureTimestamp,DESC`;
    return this.apiService
      .get<any>(url)
      .pipe(
        map((data) => data)
      );
  }

  getPatientVitalsByDoctor(doctorID: number): Observable<any> {
    let url = `${this.PATIENT_VITALS_PATH}/patient/${doctorID}?sort=recordedAt,desc`;
    return this.apiService
      .get<any>(url)
      .pipe(
        map((data) => data)
      );
  }

 getPatientVitals(patientID: number): Observable<any> {
    let url = `${this.PATIENT_VITALS_PATH}/patient/${patientID}`;
    return this.apiService
      .get<any>(url)
      .pipe(
        map((data) => data)
      );
  }


  addPatientVital(patientVitalDto: any): Observable<any> {
    let url = `${this.PATIENT_VITALS_PATH}`;
    return this.apiService
      .post<any>(url, patientVitalDto)
      .pipe(
        map((data) => data)
      );
  }

  getEmergencyVisitIdByPatientId(patientID: number): Observable<number> {
    let url = `${this.PATIENT}/${patientID}/emergency-visit-id`;
    return this.apiService
      .get<{ response: number }>(url)
      .pipe(
        map((response) => response.response)
      );
  }

  saveMedicalProcedure(medicalProcedureDto: any): Observable<any> {
    let url = `${this.MEDICAL_PROCEDURE_PATH}`;
    return this.apiService
      .post<any>(url, medicalProcedureDto)
      .pipe(
        map((data) => data)
      );
  }
}
