import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import {
  DialogService,
  DynamicDialogModule,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { MenubarModule } from 'primeng/menubar';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { Column, Invoice } from '../../../shared/interfaces/interface';
import { EmergencyService } from '../../../shared/services/emergency.service';
import { DynamicNavbarComponent } from '../dynamic-navbar/dynamic-navbar.component';
import { AddBillingInvoiceComponent } from '../add-billing-invoice/add-billing-invoice.component';

@Component({
  selector: 'app-billing-invoice',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    TableModule,
    ButtonModule,
    DynamicDialogModule,
    MenubarModule,
    DynamicNavbarComponent,
  ],
  providers: [DialogService],
  templateUrl: './billing-invoice.component.html',
  styleUrl: './billing-invoice.component.scss',
})
export class BillingInvoiceComponent implements OnInit {
  invoices!: Invoice[];
  cols!: Column[];
  first = 0;
  rows = 10;
  page = 0; // starts from page index 0
  loading = false; // spinner used for loading data of table
  totalRecords!: number; // total rows
  sort!: string;
  ref: DynamicDialogRef | undefined;
  navItems = [
    {
      label: 'Nurse Dashboard',
      routerLink: '/nurse/dashboard',
      icon: 'pi pi-home',
    },
    {
      label: 'Billing Invoice',
      routerLink: '/nurse/billing-invoice',
      icon: 'pi pi-dollar',
    },
  ];

  constructor(
    private emergencyService: EmergencyService,
    private dialogService: DialogService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cols = [
      { field: 'totalAmount', header: 'Total Amount' },
      { field: 'paymentStatus', header: 'Payment Status' },
      { field: 'invoiceTimestamp', header: 'Invoice Timestamp' },
    ];
    this.getInvoices();
  }

  getInvoices(
    page: number = 0,
    rows: number = 5,
    sort: string = 'invoiceTimestamp,DESC'
  ): void {
    this.loading = true;
    this.emergencyService.getInvoices(page, rows, sort).subscribe(
      (data) => {
        this.invoices = data.content;
        this.totalRecords = data.totalElements;
        this.loading = false;
        this.cd.detectChanges();
      },
      (error) => {
        console.error('Error fetching invoices', error);
        this.loading = false;
      }
    );
  }

  lazyLoad(event: TableLazyLoadEvent): void {
    if (event.first != null && event.rows != null) {
      this.page = event.first / event.rows; // calculate rows
    }
    if (event.sortField != null && event.sortOrder != null) {
      this.sort =
        event.sortOrder === 1
          ? `${event.sortField},ASC`
          : `${event.sortField},DESC`;
    }

    this.getInvoices(this.page, this.rows, this.sort);
  }

  addInvoice() {
    this.ref = this.dialogService.open(AddBillingInvoiceComponent, {
      header: 'Create Billing Invoice',
    });
    this.ref.onClose.subscribe((response) => {
      console.log(response);
      if (response) {
        this.getInvoices();
        this.cd.detectChanges();
      }
    });
  }
}
