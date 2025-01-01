import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NurseDashboardComponent } from './nurse-dashboard/nurse-dashboard.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: NurseDashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NurseRoutingModule { }
