import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { PrimeTemplate } from "primeng/api";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { TableModule } from "primeng/table";
import { SimpleUser } from "../../../../shared/interfaces/user/user";
import { UserListFilter } from "../../../../shared/interfaces/user/user-list-filter";
import { UserListService } from "../../../../shared/services/user/user-list.service";
import { ToggleButtonComponent } from "../../../../shared/component/toggle-button/toggle-button.component";
import { UserEnableDisableService } from "../../../../shared/services/user/user-enable-disable.service";
import { SelectButtonModule } from "primeng/selectbutton";
import { DropdownModule } from "primeng/dropdown";
import { SpinnerLoaderComponent } from "../../../../shared/component/spinner-loader/spinner-loader.component";
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-staff-user-list',
  standalone: true,
  imports: [
    PrimeTemplate,
    ReactiveFormsModule,
    TableModule,
    ToggleButtonComponent,
    SelectButtonModule,
    DropdownModule,
    RouterLink,
    SpinnerLoaderComponent,
    CardModule,
    ToolbarModule
],
  templateUrl: './staff-user-list.component.html',
  styleUrl: './staff-user-list.component.scss'
})
export class StaffUserListComponent implements OnInit {
  public visible = false;
  protected readonly activeChoices = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Not active', value: 'not_active' },
  ];
  protected role: null|string = null;
  protected users: SimpleUser[] = [];
  protected filterForm!: FormGroup;
  private filter: UserListFilter = {
    type: 'staff',
    role: null,
    status: null,
  }

  constructor(
      private route: ActivatedRoute,
      private userListService: UserListService,
      private userEnableDisableService: UserEnableDisableService,
      private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.visible = true;
    this.route.paramMap.subscribe(params => {
      this.role = params.get('role');
      this.filterForm = this.fb.group({
        status: ['all'],
        role: this.role
      });
      this.visible = false;
      this.onGetUserList();
    }, () => {this.visible = false;});
  }

  onGetUserList() {
    this.visible = true;
    this.filter.status = this.filterForm.value.status;
    this.filter.role = this.filterForm.value.role.toUpperCase();

    this.userListService
      .onGetUserList(this.filter)
      .subscribe({
        next: (data: SimpleUser[]) => {
          this.users = data;
          this.visible = false;
        }, error: () => {this.visible = false;}
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
