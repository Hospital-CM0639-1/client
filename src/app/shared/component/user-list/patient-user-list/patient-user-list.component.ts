import { Component, OnInit } from '@angular/core';
import { PrimeTemplate } from "primeng/api";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { TableModule } from "primeng/table";
import { DropdownModule } from "primeng/dropdown";
import { Button } from "primeng/button";
import { RouterLink } from "@angular/router";
import { UserListService } from "../../../services/user/user-list.service";
import { UserListFilter } from "../../../interfaces/user/user-list-filter";
import { SimpleUser } from "../../../interfaces/user/user";
import { AuthUserService } from "../../../services/user/auth-user.service";
import { UserTypeEnums } from "../../../enums/user/user-type.enums";

@Component({
  selector: 'app-patient-user-list',
  standalone: true,
  imports: [
    PrimeTemplate,
    ReactiveFormsModule,
    TableModule,
    DropdownModule,
    Button,
    RouterLink,
  ],
  templateUrl: './patient-user-list.component.html',
  styleUrl: './patient-user-list.component.scss'
})
export class PatientUserListComponent implements OnInit {

  protected readonly activeChoices = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Not active', value: 'not_active' },
  ];
  protected loading: boolean = true;
  protected users: SimpleUser[] = [];
  protected filterForm!: FormGroup;
  protected readonly UserTypeEnums = UserTypeEnums;
  private filter: UserListFilter = {
    type: 'patient',
    role: null,
    status: null,
  }

  constructor(
      protected authUserService: AuthUserService,
      private userListService: UserListService,
      private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.filterForm = this.fb.group({
      status: ['all'],
    });
    this.onGetUserList();
  }

  onGetUserList() {
    this.filter.status = this.filterForm.value.status;

    this.loading = true;
    this.userListService
        .onGetUserList(this.filter)
        .subscribe({
          next: (data: SimpleUser[]) => {
            this.loading = false;
            this.users = data;
          }
        });
  }
}
