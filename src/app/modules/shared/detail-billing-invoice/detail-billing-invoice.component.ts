import { EmergencyService } from './../../../shared/services/emergency.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Invoice } from '../../../shared/interfaces/interface';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
@Component({
  selector: 'app-detail-billing-invoice',
  standalone: true,
  imports: [CardModule, TagModule, CommonModule, FormsModule, ButtonModule, CheckboxModule],
  templateUrl: './detail-billing-invoice.component.html',
  styleUrl: './detail-billing-invoice.component.scss',
})
export class DetailBillingInvoiceComponent implements OnInit, OnDestroy {

  invoice!: Invoice;

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private emergencyService: EmergencyService
  ) {}

  ngOnInit(): void {
    this.invoice = this.config.data?.invoice;
    console.log(this.invoice);
  }

  ngOnDestroy(): void {
    if (this.invoice.paymentStatus == 'PENDING') {
      this.invoice.paymentReceived = false;
    }
  }

  updatePaymentReceivedAmount() {
    if (this.invoice) {
      this.invoice.paymentStatus = 'COMPLETED'
      this.invoice.paymentReceivedTimestamp = new Date(new Date().getTime() + 60 * 60 * 1000).toISOString();
      this.emergencyService.updateInvoice(this.invoice.id as number, this.invoice).subscribe(
        (updatedInvoice) => {
          this.invoice = updatedInvoice;
          console.log('Invoice updated successfully');
          this.ref.close(updatedInvoice);
        },
        (error) => {
          console.error('Error updating invoice', error);
        }
      );
    }
  }
}
