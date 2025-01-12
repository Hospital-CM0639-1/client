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
import { DatePipe, NgIf } from "@angular/common";
import { USERNAME_REGEX } from "../../../shared/regexs/user/user-regex";
import { User } from "../../../shared/interfaces/user/user";
import { UserDetailService } from "../../../shared/services/user/user-detail.service";
import { UserCreateEditService } from "../../../shared/services/user/user-create-edit.service";
import { SpinnerLoaderComponent } from "../../../shared/component/spinner-loader/spinner-loader.component";

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
    NgIf,
    SpinnerLoaderComponent
],
  templateUrl: './secretary-detail.component.html',
  styleUrl: './secretary-detail.component.scss',
})

export class SecretaryDetailComponent implements OnInit {
  patientForm: FormGroup;
  detail: boolean = false;
  loading = false;

  genderOptions = [
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
    {label: 'Other', value: 'Other'}
  ];

  constructor(
    fb: FormBuilder,
    public config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private userDetailService: UserDetailService,
    private userCreateEditService: UserCreateEditService
  ) {
    this.patientForm = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.email],
      username: ['', Validators.pattern(USERNAME_REGEX)],
      type: ['patient', Validators.required],
      patientInfo: fb.group({
        dateOfBirth: ['', Validators.required],
        gender: ['', Validators.required],
        contactNumber: ['', Validators.required],
        emergencyContactName: ['', Validators.required],
        emergencyContactNumber: ['', Validators.required],
        address: ['', Validators.required],
        insuranceProvider: ['', Validators.required],
        insurancePolicyNumber: ['', Validators.required],
      }),
    });
  }

  ngOnInit(): void {
    this.loading = true;
    const patient = this.config.data.patient;
    if (patient) {
      this.userDetailService.onGetUserPatientId(patient.patientId).subscribe({
        next: (id: { id: string }) => {
          this.userDetailService.onGetUserDetail(id.id).subscribe({
            next: (user: User) => {
              let datePipe = new DatePipe("en-US");

              this.patientForm.patchValue({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                username: user.username,
                patientInfo: {
                  dateOfBirth: datePipe.transform(user.patientInfo?.dateOfBirth, 'yyyy-MM-dd'),
                  gender: user.patientInfo?.gender,
                  contactNumber: user.patientInfo?.contactNumber,
                  emergencyContactName: user.patientInfo?.emergencyContactName,
                  emergencyContactNumber: user.patientInfo?.emergencyContactNumber,
                  address: user.patientInfo?.address,
                  insuranceProvider: user.patientInfo?.insuranceProvider,
                  insurancePolicyNumber: user.patientInfo?.insurancePolicyNumber,
                },
              });
              this.loading = false;
              this.patientForm.controls['username'].disable({ emitEvent: false });

            }, error: () => {
              this.loading = false;
            }
          })
        }, error: () => {
          this.loading = false;
        }
      })

    }
    this.detail = this.config.data.detail;
  }

  onSubmit(): void {
    if (this.patientForm.valid) {
      const patient = this.patientForm.getRawValue();
      if (this.detail) {
        this.userDetailService.onGetUserPatientId(patient.patientId).subscribe({
          next: (id: { id: string }) => {
            this.userCreateEditService.onEditUser(id.id, this.patientForm.value).subscribe({
              next: (response) => {
                console.log('Patient edited successfully', response);
                this.ref.close(true);
              },
              error: (err) => {
                console.error('Error updating patient:', err);
              }
            })
          }
        })
      }
    }
  }


  onRegistration(): void {
    if (this.patientForm.valid) {
      const formValue = this.patientForm.getRawValue();
      const patient = {
        ...formValue,
      };
      console.log(patient)
      delete patient.patientId;
      delete patient.createdAt;

      this.userCreateEditService.onCreateUser(this.patientForm.value).subscribe({
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
