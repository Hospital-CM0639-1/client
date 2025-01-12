import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DoctorService } from '../../../shared/services/doctor.service';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
@Component({
  selector: 'app-add-patient-vital',
  standalone: true,
  imports: [CommonModule, FormsModule, DropdownModule, ButtonModule, CardModule, ReactiveFormsModule],
  templateUrl: './add-patient-vital.component.html',
  styleUrl: './add-patient-vital.component.scss'
})
export class AddPatientVitalComponent implements OnInit {
  vitalForm!: FormGroup;
  
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private fb: FormBuilder,
    private serviceDoctor: DoctorService
  ) {}

  ngOnInit() {
    // Initialize the form
    console.log(this.config.data);
    this.vitalForm = this.fb.group({
      bodyTemperature: [null, [Validators.required]],
      bloodPressureSystolic: [null, [Validators.required]],
      bloodPressureDiastolic: [null, [Validators.required]],
      heartRate: [null, [Validators.required]],
      respiratoryRate: [null, [Validators.required]],
      oxygenSaturation: [null, [Validators.required]],
      additionalObservations: [null, [Validators.required]],
    });
  }

  // Method to save the patient vital information
  saveVital() {
    if (this.vitalForm.valid) {
      const vitalData = this.vitalForm.value;
      const patientVitalDto = {
        ...vitalData,
        staff: { id: this.config.data.idD }, // Replace with actual staff ID
        emergencyVisit: { id: this.config.data.emergencyVisitId }, // Pass the emergency visit ID dynamically
        recordedAt: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(),
      };

      this.serviceDoctor.addPatientVital(patientVitalDto).subscribe(
        (response) => {
          this.ref.close(response); // Close the dialog and pass back the response
        },
        (error) => {
          console.error('Error adding patient vital:', error);
        }
      );
    }
  }

  // Close the dialog without saving
  closeDialog() {
    this.ref.close();
  }
}