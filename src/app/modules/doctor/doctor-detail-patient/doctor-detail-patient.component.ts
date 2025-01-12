import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DoctorService } from '../../../shared/services/doctor.service';
import { ActivatedRoute } from '@angular/router';
import { MedicalProcedure, Patient, PatientAdmission, VitalSigns } from '../../../shared/interfaces/interface';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { SpinnerLoaderComponent } from "../../../shared/component/spinner-loader/spinner-loader.component";
import { forkJoin } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import { AddPatientVitalComponent } from '../add-patient-vital/add-patient-vital.component';
import { ButtonModule } from 'primeng/button';
import { AddMedicalProcedureComponent } from '../add-medical-procedure/add-medical-procedure.component';
import { DynamicNavbarComponent } from "../../shared/dynamic-navbar/dynamic-navbar.component";

@Component({
  selector: 'app-doctor-detail-patient',
  standalone: true,
  providers: [DialogService],
  imports: [CardModule, TableModule, CommonModule, SpinnerLoaderComponent, ButtonModule, DynamicNavbarComponent],
  templateUrl: './doctor-detail-patient.component.html',
  styleUrl: './doctor-detail-patient.component.scss'
})
export class DoctorDetailPatientComponent implements OnInit {
  id: number | null = null;
  idD: number | null = null;
  loading = false;
  patient!: PatientAdmission;
  patientMedicalProcedures!: MedicalProcedure[]
  patientVitals!: VitalSigns[]
  constructor(private serviceDoctor: DoctorService, private route: ActivatedRoute, private dialogService: DialogService,     private cd: ChangeDetectorRef,) {}

  ngOnInit(): void {
    this.loading = true;
    this.id = +this.route.snapshot.paramMap.get('idP')!;
    this.idD = +this.route.snapshot.paramMap.get('idD')!;
    console.log(this.id);
    forkJoin({
      emergencyInfo: this.serviceDoctor.getEmergencyInfoByPatient(this.id),
      medicalProcedures: this.serviceDoctor.getMedicalProcedureDetails(this.id),
      patientVitals: this.serviceDoctor.getPatientVitalsByDoctor(this.id)
    }).subscribe({
      next: (responses) => {
        console.log(responses)
        this.patient = responses.emergencyInfo;
        this.patientMedicalProcedures = responses.medicalProcedures.content;
        this.patientVitals = responses.patientVitals.content;
        console.log('Emergency Info:', this.patient);
        console.log('Medical Procedures:', this.patientMedicalProcedures);
        console.log('Patient Vitals:', this.patientVitals);
        this.cd.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      },
      complete: () => {
        this.loading = false; // Stop loading when all requests are complete
      }
    });
  }

  getEmergencyInfoByPatient(patientId: number): void {
    this.serviceDoctor.getEmergencyInfoByPatient(patientId).subscribe(
      (data) => {
        this.patient = data;
        this.cd.detectChanges();
        console.log('Emergency Info:', data);
      },
      (error) => {
        console.error('Error fetching emergency info:', error);
      }
    );
  }

  getMedicalProcedureDetails(patientId: number): void {
    this.serviceDoctor.getMedicalProcedureDetails(patientId).subscribe(
      (data) => {
        this.patientMedicalProcedures = data.content;
        this.cd.detectChanges();
        console.log('Medical Procedure Details:', this.patientMedicalProcedures);
      },
      (error) => {
        console.error('Error fetching medical procedure details:', error);
      }
    );
  }

  getPatientVitalsByPatient(patientId: number): void {
    this.serviceDoctor.getPatientVitalsByDoctor(patientId).subscribe(
      (data) => {
        console.log('Patient Vitals:', data);
        this.patientVitals = data.content;
        this.cd.detectChanges();
      },
      (error) => {
        console.error('Error fetching patient vitals:', error);
      }
    );
  }

  openAddVitalDialog() {
    this.serviceDoctor.getEmergencyVisitIdByPatientId(this.id as number).subscribe((emergencyVisitId) => {
      const data = { emergencyVisitId: emergencyVisitId, idD: this.idD }; // Pass the relevant emergency visit ID here
      console.log(data)
      const ref = this.dialogService.open(AddPatientVitalComponent, {
        header: 'Add New Patient Vital',
        data: data, // Pass any data needed for the dialog
      });
  
      ref.onClose.subscribe((response: any) => {
        if (response) {
          this.getPatientVitalsByPatient(this.id as number);
          console.log('Vital added:', response);
          // Optionally update the table or perform additional actions here
        }
      });
    });
  }

  openAddProcedureDialog() {
    this.serviceDoctor.getEmergencyVisitIdByPatientId(this.id as number).subscribe((emergencyVisitId) => {
    const data = { emergencyVisitId: emergencyVisitId, idD: this.idD }; // Pass the relevant emergency visit ID here
    const ref = this.dialogService.open(AddMedicalProcedureComponent, {
      header: 'Add New Medical Procedure',
      data: data, // Pass any data needed for the dialog
    });

    ref.onClose.subscribe((response) => {
      if (response) {
        console.log('Procedure added:', response);
        this.getMedicalProcedureDetails(this.id as number);
      }
    });
  });
  }


}
