import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NurseDashboardComponent } from './nurse-dashboard/nurse-dashboard.component';
import { BillingInvoiceComponent } from '../shared/billing-invoice/billing-invoice.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: NurseDashboardComponent,
  },
  {
    path: 'billing-invoice',
    component: BillingInvoiceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NurseRoutingModule { }
