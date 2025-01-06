import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { AdminUserListComponent } from "./admin-dashboard/admin-user-list/admin-user-list.component";
import { StaffUserListComponent } from "./admin-dashboard/staff-user-list/staff-user-list.component";
import { PatientUserListComponent } from "./admin-dashboard/patient-user-list/patient-user-list.component";
import {
  AdminUserManagementComponent
} from "./user/user-management/admin-user-management/admin-user-management.component";

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
      }
    ]
  },
  {
    path: 'edit-user/:userId',
    children: [
      {
        path: 'admin',
        component: AdminUserManagementComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
