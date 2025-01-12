import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from '@angular/common';
import { UserDetailService } from "../../../../../shared/services/user/user-detail.service";
import { UserCreateEditService } from "../../../../../shared/services/user/user-create-edit.service";
import { USERNAME_REGEX } from "../../../../../shared/regexs/user/user-regex";
import { User } from "../../../../../shared/interfaces/user/user";
import { CommonModule, DatePipe } from "@angular/common";
import { DropdownModule } from "primeng/dropdown";
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { CardModule } from 'primeng/card';
import { SpinnerLoaderComponent } from "../../../../../shared/component/spinner-loader/spinner-loader.component";
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";

@Component({
  selector: 'app-staff-user-management',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DropdownModule,
    FieldsetModule,
    CommonModule,
    InputTextModule,
    CalendarModule,
    InputMaskModule,
    CardModule,
    SpinnerLoaderComponent,
    ToastModule
  ],
  templateUrl: './staff-user-management.component.html',
  styleUrl: './staff-user-management.component.scss',
  providers: [MessageService, DatePipe] // Provide DatePipe for use in the component
})
export class StaffUserManagementComponent implements OnInit {

  @Input() userId: string | null = null;
  @Input({ required: true }) role!: string;
  specializationOptions = [
    { name: 'Cardiology' },
    { name: 'Neurology' },
    { name: 'Orthopedics' },
    { name: 'Pediatrics' },
    { name: 'Dermatology' },
    { name: 'Oncology' },
    { name: 'Radiology' },
    { name: 'General Surgery' },
    { name: 'Internal Medicine' },
    { name: 'Emergency Medicine' }
  ];
  
  departmentOptions = [
    { name: 'Cardiology Department' },
    { name: 'Neurology Department' },
    { name: 'Orthopedics Department' },
    { name: 'Pediatrics Department' },
    { name: 'Dermatology Department' },
    { name: 'Oncology Department' },
    { name: 'Radiology Department' },
    { name: 'General Surgery Department' },
    { name: 'Internal Medicine Department' },
    { name: 'Emergency Medicine Department' },
    { name: 'Human Resources' },
    { name: 'Information Technology' },
    { name: 'Finance' },
    { name: 'Marketing' },
    { name: 'Research and Development' }
  ];
  loading = false;

  protected userForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userDetailService: UserDetailService,
    private userCreateEditService: UserCreateEditService,
    private datePipe: DatePipe,
    private messageService: MessageService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.initializeForm();

    this.route.paramMap.subscribe(params => {
      this.userId = params.get('userId');
      this.role = params.get('role') || this.role;

      if (this.userId) {
        this.loadUserDetails(this.userId);
      } else {
        this.userForm.patchValue({
          staffInfo: {
            role: this.role.toUpperCase(),
          }
        });
      }
    });
  }

  private initializeForm(): void {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.pattern(USERNAME_REGEX)]],
      type: ['staff', Validators.required],
      staffInfo: this.fb.group({
        role: [this.role, Validators.required],
        phoneNumber: [''],
        department: [''],
        specialization: [''],
        hireDate: [null, Validators.required],
      })
    });
  }

  private loadUserDetails(userId: string): void {
    this.loading = true;
    this.userDetailService.onGetUserDetail(userId).subscribe({
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
            hireDate: user.staffInfo?.hireDate ? new Date(user.staffInfo.hireDate) : null,
          }
        });
        this.loading = false;
        // Disable username field after patching value
        this.userForm.get('username')?.disable({ emitEvent: false });
      },
      error: (err) => {
        this.loading = false;
        console.error('Failed to load user details:', err);
      }
    });
  }

  onSaveUser(): void {
    if (this.userForm.invalid) {
      console.error('Form is invalid');
      return;
    }
    this.loading = true;
    const userData = this.userForm.getRawValue();
    
    // Convert Date to ISO string if it exists
    if (userData.staffInfo?.hireDate) {
      userData.staffInfo.hireDate = userData.staffInfo.hireDate.toISOString();
    }
  
    const obs = this.userId
      ? this.userCreateEditService.onEditUser(this.userId, userData)
      : this.userCreateEditService.onCreateUser(userData);
  
    obs.subscribe({
      next: () => {
        this.router.navigate(['/admin/dashboard/staff/' + this.role.toLowerCase() + '/list']);
        this.loading = false;
      },
      error: (r) => {
        console.log(r);
        this.messageService.add({ severity: 'error', summary: r.error?.error, detail: '' });
        this.loading = false; // Hide loader on error
      },
    });
  }

  goBack() {
    this.location.back();
  }

}