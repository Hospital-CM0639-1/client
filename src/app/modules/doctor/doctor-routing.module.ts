import { DoctorDetailPatientComponent } from './doctor-detail-patient/doctor-detail-patient.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';

const routes: Routes = [
  {
    path: 'dashboard/:id',
    component: DoctorDashboardComponent,
  },
  {
    path: 'dashboard/:idD/detail/:idP',
    component: DoctorDetailPatientComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
