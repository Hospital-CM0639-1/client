import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthUserService } from "../../../../../shared/services/user/auth-user.service";
import { USERNAME_REGEX } from "../../../../../shared/regexs/user/user-regex";
import { UserDetailService } from "../../../../../shared/services/user/user-detail.service";
import { User } from "../../../../../shared/interfaces/user/user";
import { UserCreateEditService } from "../../../../../shared/services/user/user-create-edit.service";
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { SpinnerLoaderComponent } from "../../../../../shared/component/spinner-loader/spinner-loader.component";
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";

@Component({
  selector: 'app-admin-user-management',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    CommonModule,
    SpinnerLoaderComponent,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './admin-user-management.component.html',
  styleUrl: './admin-user-management.component.scss'
})
export class AdminUserManagementComponent implements OnInit {

  @Input() userId: null | string = null;

  protected userForm!: FormGroup;
  protected loading: boolean = false;

  constructor(
              fb: FormBuilder,
      private router: Router,
      private route: ActivatedRoute,
      private userDetailService: UserDetailService,
      private userCreateEditService: UserCreateEditService,
      private messageService: MessageService,
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
        this.loading = true;
        this.userDetailService.onGetUserDetail(this.userId).subscribe({
          next: (user: User) => {
            this.userForm.patchValue({
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              username: user.username,
            });
            this.loading = false;
          },
          error: (r) => {
            this.messageService.add({ severity: 'error', summary: r.message, detail: '' });
            this.loading = false; // Hide loader on error
          },
        })

        this.userForm.controls['username'].disable({ emitEvent: false });
      }
    });
  }

  onSaveUser() {
    this.loading = true;
    let obs = this.userId === null
        ? this.userCreateEditService.onCreateUser(this.userForm.value)
        : this.userCreateEditService.onEditUser(this.userId, this.userForm.value);

    obs.subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/admin/dashboard/admin/list']);
      },
      error: (r) => {
        console.log(r);
        this.messageService.add({ severity: 'error', summary: r.error?.error, detail: '' });
        this.loading = false; // Hide loader on error
      },
    })
  }
}
