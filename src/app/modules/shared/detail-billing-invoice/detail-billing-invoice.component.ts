import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Invoice } from '../../../shared/interfaces/interface';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-detail-billing-invoice',
  standalone: true,
  imports: [CardModule, TagModule, CommonModule, FormsModule, ButtonModule],
  templateUrl: './detail-billing-invoice.component.html',
  styleUrl: './detail-billing-invoice.component.scss',
})
export class DetailBillingInvoiceComponent implements OnInit {

  invoice!: Invoice;

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.invoice = this.config.data?.invoice;
    console.log(this.invoice);
  }

  updatePaymentReceivedAmount() {
    
  }
}
