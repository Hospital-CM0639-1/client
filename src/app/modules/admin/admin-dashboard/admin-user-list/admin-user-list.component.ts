import { Component, OnInit } from '@angular/core';
import { SimpleUser } from "../../../../shared/interfaces/user/user";
import { UserListService } from "../../../../shared/services/user/user-list.service";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthUserService } from "../../../../shared/services/user/auth-user.service";
import { UserListFilter } from "../../../../shared/interfaces/user/user-list-filter";
import { ToggleButtonModule } from "primeng/togglebutton";
import { ToggleButtonComponent } from "../../../../shared/component/toggle-button/toggle-button.component";
import { UserEnableDisableService } from "../../../../shared/services/user/user-enable-disable.service";
import { TableModule } from "primeng/table";
import { DropdownModule } from "primeng/dropdown";
import { Button, ButtonDirective } from "primeng/button";
import { ToolbarModule } from "primeng/toolbar";
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-admin-user-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ToggleButtonModule,
    ToggleButtonComponent,
    TableModule,
    DropdownModule,
    Button,
    ToolbarModule,
    ButtonDirective,
    RouterLink,
  ],
  templateUrl: './admin-user-list.component.html',
  styleUrl: './admin-user-list.component.scss'
})
export class AdminUserListComponent implements OnInit {
  protected readonly activeChoices = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Not active', value: 'not_active' },
  ];
  protected loading: boolean = true;
  protected users: SimpleUser[] = [];
  protected filterForm!: FormGroup;
  private filter: UserListFilter = {
    type: 'admin',
    role: null,
    status: null,
  }

  constructor(
      private userEnableDisableService: UserEnableDisableService,
      private userListService: UserListService,
      private fb: FormBuilder,
      protected authUserService: AuthUserService,
      protected router: Router,
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
            this.users = data;
            this.loading = false;
          }
        });
  }

  onEnableDisableUser(userId: number, action: boolean) {
    if (action) {
      this.userEnableDisableService.onEnableUser(userId).subscribe();
    } else {
      this.userEnableDisableService.onDisableUser(userId).subscribe();
    }
  }
}
