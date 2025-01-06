import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UserDetailService } from "../../../../../shared/services/user/user-detail.service";
import { UserCreateEditService } from "../../../../../shared/services/user/user-create-edit.service";
import { USERNAME_REGEX } from "../../../../../shared/regexs/user/user-regex";
import { User } from "../../../../../shared/interfaces/user/user";
import { DatePipe } from "@angular/common";
import { DropdownModule } from "primeng/dropdown";
import { log } from "node:util";

@Component({
  selector: 'app-staff-user-management',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DropdownModule
  ],
  templateUrl: './staff-user-management.component.html',
  styleUrl: './staff-user-management.component.scss'
})
export class StaffUserManagementComponent implements OnInit {
  @Input() userId: null | string = null;
  @Input({required: true}) role!: string;

  protected userForm!: FormGroup;

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
      type: ['staff', Validators.required],
      staffInfo: fb.group({
        role: [this.role, Validators.required],
        phoneNumber: ['', Validators.required],
        department: ['', Validators.required],
        specialization: ['', Validators.required],
        hireDate: ['', Validators.required],
      })
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('userId');
      this.role = <string>params.get('role');

      if (this.userId !== null) {
        let datePipe = new DatePipe("en-US");
        this.userDetailService.onGetUserDetail(this.userId).subscribe({
          next: (user: User) => {
            this.userForm.patchValue({
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              username: user.username,
              staffInfo: {
                role: user.staffInfo?.role,
                phoneNumber: user.staffInfo?.phoneNumber,
                department: user.staffInfo?.department,
                specialization: user.staffInfo?.specialization,
                hireDate: datePipe.transform(user.staffInfo?.hireDate, 'yyyy-MM-dd'),
              }
            })
          }
        })

        this.userForm.controls['username'].disable({ emitEvent: false });
      } else {
        this.userForm.patchValue({
          staffInfo: {
            role: this.role.toUpperCase(),
          }
        })
      }
    });

    setInterval(() => console.log(this.userForm.controls), 5000);
  }

  onSaveUser() {
    let obs = this.userId === null
        ? this.userCreateEditService.onCreateUser(this.userForm.value)
        : this.userCreateEditService.onEditUser(this.userId, this.userForm.value);

    obs.subscribe({
      next: () => {
        this.router.navigate(['/admin/dashboard']);
      }
    })
  }
}
