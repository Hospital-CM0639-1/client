import { EmergencyService } from './../../../shared/services/emergency.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { Invoice } from '../../../shared/interfaces/interface';
import { FormsModule } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-add-billing-invoice',
  standalone: true,
  imports: [CardModule, ButtonModule, CommonModule, DropdownModule, FormsModule],
  templateUrl: './add-billing-invoice.component.html',
  styleUrl: './add-billing-invoice.component.scss'
})
export class AddBillingInvoiceComponent implements OnInit {

  invoices!: Invoice[];
  invoice!: Invoice;

  constructor(private emergencyService: EmergencyService, private ref: DynamicDialogRef) {}

  ngOnInit(): void {
      this.getInvoices();
  }

  getInvoices(
    page: number = 0,
    rows: number = 1000,
    sort: string = 'invoiceTimestamp,DESC'
  ): void {
    this.emergencyService.getInvoices(page, rows, sort).subscribe(
      (data) => {
        this.invoices = data.content;
      },
      (error) => {
        console.error('Error fetching invoices', error);
      }
    );
  }

  saveInvoice(): void {
    this.emergencyService.saveInvoice(this.invoice).subscribe(
      (response) => {
        console.log('Invoice saved successfully', response);
        this.ref.close(response);
      },
      (error) => {
        console.error('Error saving invoice', error);
      }
    );
  }

  onPatientChange(event: any) {
  }
}
