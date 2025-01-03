import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { AdminUserListComponent } from "./admin-dashboard/admin-user-list/admin-user-list.component";
import { StaffUserListComponent } from "./admin-dashboard/staff-user-list/staff-user-list.component";
import { PatientUserListComponent } from "./admin-dashboard/patient-user-list/patient-user-list.component";
import { UserManagementComponent } from "./user/user-management/user-management.component";

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
    component: UserManagementComponent,
  }
  ,
  {
    path: 'edit-user/:userId',
    component: UserManagementComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
