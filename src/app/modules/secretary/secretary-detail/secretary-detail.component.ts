import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Button} from "primeng/button";
import {CardModule} from "primeng/card";
import {DropdownModule} from "primeng/dropdown";
import {FloatLabelModule} from "primeng/floatlabel";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CalendarModule} from "primeng/calendar";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {NgIf} from "@angular/common";
import {Patient} from "../../../shared/interfaces/interface";
import {ReceptionService} from "../../../shared/services/reception.service";


@Component({
  selector: 'app-secretary-detail',
  standalone: true,
  imports: [
    Button,
    CardModule,
    DropdownModule,
    FloatLabelModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    NgIf
  ],
  templateUrl: './secretary-detail.component.html',
  styleUrl: './secretary-detail.component.scss',
})

export class SecretaryDetailComponent implements OnInit {
  patientForm: FormGroup;
  detail: boolean = false;

  genderOptions = [
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
    {label: 'Other', value: 'Other'}
  ];

  constructor(
    private fb: FormBuilder,
    public config: DynamicDialogConfig,
    private receptionService: ReceptionService,
    private ref: DynamicDialogRef,
  ) {
    this.patientForm = this.fb.group({
      patientId: [{value: '', disabled: true}],
      createdAt: [{value: '', disabled: true}],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      contactNumber: ['', Validators.required],
      emergencyContactName: ['', Validators.required],
      emergencyContactNumber: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      insuranceProvider: [''],
      insurancePolicyNumber: ['']
    });
  }

  ngOnInit(): void {
    const patient = this.config.data.patient;
    if (patient) {
      this.patientForm.patchValue({
        patientId: patient.patientId,
        createdAt: patient.createdAt,
        firstName: patient.firstName,
        lastName: patient.lastName,
        dateOfBirth: patient.dateOfBirth,
        gender: patient.gender,
        contactNumber: patient.contactNumber,
        emergencyContactName: patient.emergencyContactName,
        emergencyContactNumber: patient.emergencyContactNumber,
        address: patient.address,
        email: patient.email,
        insuranceProvider: patient.insuranceProvider,
        insurancePolicyNumber: patient.insurancePolicyNumber
      });
    }
    this.detail = this.config.data.detail;
  }

  onSubmit(): void {
    if (this.patientForm.valid) {
      const patient = this.patientForm.getRawValue();
      if (this.detail) {
        this.receptionService.updatePatient(patient).subscribe({
          next: (response) => {
            console.log('Patient edited successfully', response);
            this.ref.close(true);
          },
          error: (err) => {
            console.error('Error updating patient:', err);
          }
        });
      }
    }
  }


  onRegistration(): void {
    if (this.patientForm.valid) {
      const formValue = this.patientForm.getRawValue();
      const patient = {
        ...formValue,
        dateOfBirth: new Date(formValue.dateOfBirth).toISOString().split('T')[0]
      };
      delete patient.patientId;
      delete patient.createdAt;

      this.receptionService.createPatient(patient).subscribe({
        next: (response) => {
          console.log('Patient created successfully', response);
          this.ref.close(true);
        },
        error: (err) => {
          console.error('Error creating patient:', err);
        }
      });
    }
  }
}
