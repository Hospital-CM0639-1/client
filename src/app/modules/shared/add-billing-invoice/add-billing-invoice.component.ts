import { EmergencyService } from './../../../shared/services/emergency.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { EmergencyVisit, Invoice } from '../../../shared/interfaces/interface';
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

  emergencyVisits!: EmergencyVisit[];
  emergencyVisit!: EmergencyVisit;
  amountInvoice!: number;

  constructor(private emergencyService: EmergencyService, private ref: DynamicDialogRef) {}

  ngOnInit(): void {
      this.getDischargedEmergencyVisits();
  }

  getDischargedEmergencyVisits(): void {
    this.emergencyService.getDischargedEmergencyVisits().subscribe(
      (data) => {
        this.emergencyVisits = data;
      },
      (error) => {
        console.error('Error fetching invoices', error);
      }
    );
  }

  saveInvoice(): void {
    const invoice: Invoice = {
      totalAmount: this.amountInvoice,
      paymentStatus: 'PENDING',
      invoiceTimestamp: new Date().toISOString(),
      paymentReceivedTimestamp: null,
      paymentReceived: false,
      emergencyVisit: {
        id: this.emergencyVisit.id,
      },
      createdByStaff: {
        id: 5
      }
    };

    this.emergencyService.saveInvoice(invoice).subscribe(
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
    this.emergencyService.getTotalInvoiceAmountByVisitId(event.value.id).subscribe(
      (amount) => {
        this.amountInvoice = amount.response;
      },
      (error) => {
        console.error('Error fetching total invoice amount', error);
      }
    );
  }
}
