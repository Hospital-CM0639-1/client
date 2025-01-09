import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthUserService } from "../../../../../shared/services/user/auth-user.service";
import { USERNAME_REGEX } from "../../../../../shared/regexs/user/user-regex";
import { UserDetailService } from "../../../../../shared/services/user/user-detail.service";
import { User } from "../../../../../shared/interfaces/user/user";
import { UserCreateEditService } from "../../../../../shared/services/user/user-create-edit.service";

@Component({
  selector: 'app-admin-user-management',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './admin-user-management.component.html',
  styleUrl: './admin-user-management.component.scss'
})
export class AdminUserManagementComponent implements OnInit {

  @Input() userId: null | string = null;

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
      type: ['admin', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('userId');

      if (this.userId !== null) {
        this.userDetailService.onGetUserDetail(this.userId).subscribe({
          next: (user: User) => {
            this.userForm.patchValue({
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              username: user.username,
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
        this.router.navigate(['/admin/dashboard']);
      }
    })
  }
}
