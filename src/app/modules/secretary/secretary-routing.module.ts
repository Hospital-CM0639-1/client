import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecretaryDashboardComponent } from './secretary-dashboard/secretary-dashboard.component';
import {
  PatientUserListComponent
} from "../../shared/component/user-list/patient-user-list/patient-user-list.component";
import {
  AdminUserManagementComponent
} from "../admin/user/user-management/admin-user-management/admin-user-management.component";
import {
  PatientUserManagementComponent
} from "../../shared/component/user-management/patient-user-management/patient-user-management.component";
import {
  StaffUserManagementComponent
} from "../admin/user/user-management/staff-user-management/staff-user-management.component";

const routes: Routes = [
  {
    path: 'dashboard',
    component: SecretaryDashboardComponent,
    children: [
      {
        path: 'patient/list',
        component: PatientUserListComponent,
      }
    ],
  },
  {
    path: 'new-user',
    children: [
      {
        path: 'patient',
        component: PatientUserManagementComponent,
      }
    ]
  },
  {
    path: 'edit-user/:userId',
    children: [
      {
        path: 'patient',
        component: PatientUserManagementComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecretaryRoutingModule { }
