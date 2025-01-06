import { Component, OnInit } from '@angular/core';
import { PrimeTemplate } from "primeng/api";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { TableModule } from "primeng/table";
import { SimpleUser } from "../../../../shared/interfaces/user/user";
import { UserListFilter } from "../../../../shared/interfaces/user/user-list-filter";
import { UserListService } from "../../../../shared/services/user/user-list.service";
import { DropdownModule } from "primeng/dropdown";
import { Button } from "primeng/button";
import { RouterLink } from "@angular/router";

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
  private filter: UserListFilter = {
    type: 'patient',
    role: null,
    status: null,
  }

  constructor(
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
