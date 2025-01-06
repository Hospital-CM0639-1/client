import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { AdminUserListComponent } from "./admin-dashboard/admin-user-list/admin-user-list.component";
import { StaffUserListComponent } from "./admin-dashboard/staff-user-list/staff-user-list.component";
import {
  AdminUserManagementComponent
} from "./user/user-management/admin-user-management/admin-user-management.component";
import {
  StaffUserManagementComponent
} from "./user/user-management/staff-user-management/staff-user-management.component";
import { PasswordComponent } from "../access/password/password.component";
import {
  PatientUserListComponent
} from "../../shared/component/user-list/patient-user-list/patient-user-list.component";
import {
  PatientUserManagementComponent
} from "../../shared/component/user-management/patient-user-management/patient-user-management.component";

const routes: Routes = [
  {
    path: 'dashboard',
    component: AdminDashboardComponent,
    children: [
      {
        path: 'admin/list',
        component: AdminUserListComponent,
      },
      {
        path: 'patient/list',
        component: PatientUserListComponent,
      },
      {
        path: 'staff/:role/list',
        component: StaffUserListComponent,
      }
    ]
  },
  {
    path: 'new-user',
    children: [
      {
        path: 'admin',
        component: AdminUserManagementComponent,
      },
      {
        path: 'patient',
        component: PatientUserManagementComponent,
      },
      {
        path: 'staff/:role',
        component: StaffUserManagementComponent,
      }
    ]
  },
  {
    path: 'edit-user/:userId',
    children: [
      {
        path: 'admin',
        component: AdminUserManagementComponent,
      },
      {
        path: 'patient',
        component: PatientUserManagementComponent,
      },
      {
        path: 'staff/:role',
        component: StaffUserManagementComponent,
      }
    ]
  },
  {
    path: 'change-user-password/:userId',
    component: PasswordComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
