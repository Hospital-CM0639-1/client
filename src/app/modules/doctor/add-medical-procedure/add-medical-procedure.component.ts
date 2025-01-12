import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DoctorService } from '../../../shared/services/doctor.service';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-add-medical-procedure',
  standalone: true,
  imports: [CommonModule, FormsModule, DropdownModule, ButtonModule, CardModule, ReactiveFormsModule, CalendarModule],
  templateUrl: './add-medical-procedure.component.html',
  styleUrl: './add-medical-procedure.component.scss'
})
export class AddMedicalProcedureComponent implements OnInit {
  procedureForm!: FormGroup;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private fb: FormBuilder,
    private doctorService: DoctorService
  ) {}

  ngOnInit() {
    // Initialize the form
    this.procedureForm = this.fb.group({
      procedureName: [null, [Validators.required]],
      description: [null, [Validators.required]],
      procedureCost: [null, [Validators.required]],
    });
  }

  // Save the medical procedure
  saveProcedure() {
    if (this.procedureForm.valid) {
      const procedureData = this.procedureForm.value;
      const medicalProcedureDto = {
        ...procedureData,
        procedureTimestamp: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(),
        staff: { id: this.config.data.idD }, // Replace with actual staff ID
        emergencyVisit: { id: this.config.data.emergencyVisitId }, // Pass the emergency visit ID dynamically
      };

      this.doctorService.saveMedicalProcedure(medicalProcedureDto).subscribe(
        (response) => {
          this.ref.close(response); // Close the dialog and pass the response
        },
        (error) => {
          console.error('Error saving medical procedure:', error);
        }
      );
    }
  }

  // Close the dialog without saving
  closeDialog() {
    this.ref.close();
  }
}