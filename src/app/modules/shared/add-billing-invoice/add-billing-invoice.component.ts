import { EmergencyService } from './../../../shared/services/emergency.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { EmergencyVisit, Invoice } from '../../../shared/interfaces/interface';
import { FormsModule } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { SpinnerLoaderComponent } from "../../../shared/component/spinner-loader/spinner-loader.component";

@Component({
  selector: 'app-add-billing-invoice',
  standalone: true,
  imports: [CardModule, ButtonModule, CommonModule, DropdownModule, FormsModule, SpinnerLoaderComponent],
  templateUrl: './add-billing-invoice.component.html',
  styleUrl: './add-billing-invoice.component.scss'
})
export class AddBillingInvoiceComponent implements OnInit {

  emergencyVisits!: EmergencyVisit[];
  emergencyVisit!: EmergencyVisit;
  amountInvoice!: number;

  protected loading: boolean = false;
  constructor(private emergencyService: EmergencyService, private ref: DynamicDialogRef) {}

  ngOnInit(): void {
      this.getDischargedEmergencyVisits();
  }

  getDischargedEmergencyVisits(): void {
    this.loading = true;
    this.emergencyService.getDischargedEmergencyVisits().subscribe(
      (data) => {
        this.loading = false;
        this.emergencyVisits = data;
      },
      (error) => {
        this.loading = false;
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

    this.loading = true;
    this.emergencyService.saveInvoice(invoice).subscribe(
      (response) => {
        this.loading = false;
        console.log('Invoice saved successfully', response);
        this.ref.close(response);
      },
      (error) => {
        this.loading = false;
        console.error('Error saving invoice', error);
      }
    );
  }

  onPatientChange(event: any) {
    this.loading = true;
    this.emergencyService.getTotalInvoiceAmountByVisitId(event.value.id).subscribe(
      (amount) => {
        this.loading = false;
        this.amountInvoice = amount.response;
      },
      (error) => {
        this.loading = false;
        console.error('Error fetching total invoice amount', error);
      }
    );
  }
}
