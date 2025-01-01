import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecretaryDashboardComponent } from './secretary-dashboard/secretary-dashboard.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: SecretaryDashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecretaryRoutingModule { }
