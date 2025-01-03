import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Column, WardBed } from '../../../shared/interfaces/interface';
import { EmergencyService } from '../../../shared/services/emergency.service';
import { MenubarModule } from 'primeng/menubar';
import {
  DialogService,
  DynamicDialogModule,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { BedAssignmentComponent } from '../bed-assignment/bed-assignment.component';
import { DynamicNavbarComponent } from "../../shared/dynamic-navbar/dynamic-navbar.component";

@Component({
  selector: 'app-nurse-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    TableModule,
    ButtonModule,
    DynamicDialogModule,
    MenubarModule,
    DynamicNavbarComponent
],
  providers: [DialogService],
  templateUrl: './nurse-dashboard.component.html',
  styleUrl: './nurse-dashboard.component.scss',
})
export class NurseDashboardComponent implements OnInit {
  wards_bed!: WardBed[];
  cols!: Column[];
  first = 0;
  rows = 10;
  page = 0; // starts from page index 0
  loading = false; // spinner used for loading data of table
  totalRecords!: number; // total rows
  sort!: string;
  ref: DynamicDialogRef | undefined;
  navItems = [
    { label: 'Nurse Dashboard', routerLink: '/nurse/dashboard', icon: 'pi pi-home' },
    { label: 'Billing Invoice', routerLink: '/nurse/billing-invoice', icon: 'pi pi-dollar' },
  ];

  constructor(
    private emergencyService: EmergencyService,
    private dialogService: DialogService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.cols = [
      { field: 'bedNumber', header: 'Bed Number' },
      { field: 'wardSection', header: 'Ward Section' },
      { field: 'currentStatus', header: 'Status' },
    ];
    this.populateWardBeds();
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

    this.populateWardBeds(this.page, this.rows, this.sort);
  }

  assignBed(data?: WardBed) {
    this.ref = this.dialogService.open(BedAssignmentComponent, {
      header: 'Assign Patient to a bed',
      data: data
    });
    this.ref.onClose.subscribe((response) => {
      console.log(response);
      if (response) {
        this.populateWardBeds();
      }
    });
  }

  onFreeBed(data: WardBed) {
    this.emergencyService.getBedById(data.id).subscribe({
      next: (bed) => {
        const patientId = bed.emergencyVisit?.patient?.id;
        if (patientId) {
          this.emergencyService.freeBed(patientId).subscribe({
            next: (response) => {
              this.populateWardBeds();
            },
            error: (err) => {
              console.error('Error freeing bed:', err);
            }
          });
        }
      },
      error: (err) => {
        console.error('Error retrieving bed:', err);
      }
    });
  }

  private populateWardBeds(
    page: number = 0,
    rows: number = 5,
    sort: string = 'currentStatus,DESC'
  ): void {
    this.emergencyService.getWardBeds(page, rows, sort).subscribe({
      next: (response) => {
        this.totalRecords = response.totalElements;
        this.rows = response.size;
        this.wards_bed = response.content;
        this.cd.detectChanges();
      },
    });
  }
}
