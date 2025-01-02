import { PaginatedList } from './../../../shared/interfaces/interface';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Column, WardBed } from '../../../shared/interfaces/interface';
import { NurseService } from '../../../shared/services/nurse.service';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BedAssignmentComponent } from '../bed-assignment/bed-assignment.component';

@Component({
  selector: 'app-nurse-dashboard',
  standalone: true,
  imports: [CommonModule, CardModule, TableModule, ButtonModule, DynamicDialogModule],
  providers: [DialogService],
  templateUrl: './nurse-dashboard.component.html',
  styleUrl: './nurse-dashboard.component.scss'
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

  constructor(private nurseService: NurseService, private dialogService: DialogService) {}

  ngOnInit(): void {
      this.cols = [
        { field: 'bedNumber', header: 'Bed Number' },
        { field: 'wardSection', header: 'Ward Section' },
        { field: 'currentStatus', header: 'Status' },
      ]
      this.populateWardBeds();
  }

  lazyLoad(event: TableLazyLoadEvent): void {
    if (event.first != null && event.rows != null) {
      this.page = event.first / event.rows; // calculate rows
    }
    if (event.sortField != null && event.sortOrder != null) {
      this.sort = event.sortOrder === 1 ? `${event.sortField},ASC` : `${event.sortField},DESC`;
    }

    this.populateWardBeds(this.page, this.rows, this.sort);
  }

  show() {
    this.ref = this.dialogService.open(BedAssignmentComponent, { header: 'Assign Patient to a bed'});
    this.ref.onClose.subscribe((response) => {
      if (response) {
          
      }
  });
  }

  private populateWardBeds(page: number = 0, rows: number = 5, sort: string = 'currentStatus,DESC'): void {
    this.nurseService.getWardBeds(page, rows, sort).subscribe({
      next: (response) => {
          this.totalRecords = response.totalElements;
          this.rows = response.size;
          this.wards_bed = response.content;
      },
    })
  }
}
