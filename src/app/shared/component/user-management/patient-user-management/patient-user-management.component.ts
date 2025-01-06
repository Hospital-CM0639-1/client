import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { DropdownModule } from "primeng/dropdown";
import { DatePipe } from "@angular/common";
import { PatientGenderEnums } from "../../../enums/user/patient-gender.enums";
import { UserDetailService } from "../../../services/user/user-detail.service";
import { UserCreateEditService } from "../../../services/user/user-create-edit.service";
import { USERNAME_REGEX } from "../../../regexs/user/user-regex";
import { User } from "../../../interfaces/user/user";

@Component({
  selector: 'app-staff-user-management',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    DropdownModule
  ],
  templateUrl: './patient-user-management.component.html',
  styleUrl: './patient-user-management.component.scss'
})
export class PatientUserManagementComponent implements OnInit {
  @Input() userId: null | string = null;
  @Input() redirectTo!: string;

  protected userForm!: FormGroup;
  protected readonly genderChoices = [
    { label: PatientGenderEnums.MALE, value: PatientGenderEnums.MALE },
    { label: PatientGenderEnums.FEMALE, value: PatientGenderEnums.FEMALE },
  ]

  constructor(
      fb: FormBuilder,
      private router: Router,
      private route: ActivatedRoute,
      private userDetailService: UserDetailService,
      private userCreateEditService: UserCreateEditService
  ) {
    this.userForm = fb.group({
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
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('userId');

      if (this.userId !== null) {
        let datePipe = new DatePipe("en-US");
        this.userDetailService.onGetUserDetail(this.userId).subscribe({
          next: (user: User) => {
            this.userForm.patchValue({
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
            })
          }
        })

        this.userForm.controls['username'].disable({ emitEvent: false });
      }
    });
  }

  onSaveUser() {
    let obs = this.userId === null
        ? this.userCreateEditService.onCreateUser(this.userForm.value)
        : this.userCreateEditService.onEditUser(this.userId, this.userForm.value);

    obs.subscribe({
      next: () => {
        this.router.navigate([this.redirectTo]);
      }
    })
  }
}
