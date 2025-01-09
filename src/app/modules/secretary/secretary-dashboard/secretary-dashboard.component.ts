import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DynamicNavbarComponent} from "../../shared/dynamic-navbar/dynamic-navbar.component";
import {Button} from "primeng/button";
import {CardModule} from "primeng/card";
import {NgForOf, NgIf} from "@angular/common";
import {PrimeTemplate} from "primeng/api";
import {TableLazyLoadEvent, TableModule} from "primeng/table";
import {Column, Patient} from "../../../shared/interfaces/interface";
import {ReceptionService, searchFilter} from '../../../shared/services/reception.service';
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {SecretaryDetailComponent} from "../secretary-detail/secretary-detail.component";
import {FloatLabelModule} from "primeng/floatlabel";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-secretary-dashboard',
  standalone: true,
  imports: [
    DynamicNavbarComponent,
    Button,
    CardModule,
    NgForOf,
    NgIf,
    PrimeTemplate,
    TableModule,
    FloatLabelModule,
    InputTextModule,
    PaginatorModule,
    ReactiveFormsModule
  ],
  providers: [DialogService],
  templateUrl: './secretary-dashboard.component.html',
  styleUrl: './secretary-dashboard.component.scss'
})

export class SecretaryDashboardComponent implements OnInit {
  cols!: Column[];
  first = 0;
  rows = 5;
  page = 0; // starts from page index 0
  loading = false; // spinner used for loading data of table
  totalRecords!: number; // total rows
  patients!: Patient[]; // data of table
  ref: DynamicDialogRef | undefined;
  navItems = [
    { label: 'Secretary Dashboard', routerLink: '/secretary/dashboard', icon: 'pi pi-home' },
    { label: 'Billing Invoice', routerLink: '/nurse/billing-invoice', icon: 'pi pi-dollar' },
  ];

  searchById: number | undefined;
  searchBySurname: string | undefined;
  searchByPriority: string | undefined;
  searchByStatus: string | undefined;

  statusOptions = [
    {label: 'IN_TREATMENT', value: 'IN_TREATMENT'},
    {label: 'DISCHARGED', value: 'DISCHARGED'},
    {label: 'WAITING', value: 'WAITING'},
    {label: 'ADMITTED', value: 'ADMITTED'}
  ];

  priorityOptions = [
    {label: 'RED', value: 'RED'},
    {label: 'ORANGE', value: 'ORANGE'},
    {label: 'GREEN', value: 'GREEN'}
  ];

  constructor(
    private receptionService: ReceptionService,
    private dialogService: DialogService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.cols = [
      { field: 'patientId', header: 'Patient ID' },
      { field: 'name', header: 'Patient Name' },
      { field: 'priorityLevel', header: 'Priority' },
      { field: 'currentStatus', header: 'Current Status' },
    ];
    this.populatePatientTable();
  }

  lazyLoad(event: TableLazyLoadEvent): void {
    console.log(event)
    if (event.first != null && event.rows != null) {
      this.page = event.first / event.rows; // calculate rows
    }

    this.populatePatientTable(this.rows,this.page+1);
  }

  private populatePatientTable(size: number = 10, page: number = 1): void {
    console.log(this.buildFilter())
    this.receptionService.getAllPatients(size,page,this.buildFilter()).subscribe((data) => {
        this.patients = data.content;
        this.totalRecords = data.totalElements;
        this.loading = false;
      });
    }

  patientDetail(data?: Patient) {
    this.ref = this.dialogService.open(SecretaryDetailComponent, {
      header: 'Detail',
      data: {patient: data, detail: true}
    });
    this.ref.onClose.subscribe((response) => {
      console.log(response);
      console.log("AASASAS")
      if (response) {
        this.populatePatientTable();
      }
    });
  }

  patientRegister(){
    this.ref = this.dialogService.open(SecretaryDetailComponent, {
      header: 'Registration',
      data: {detail: false}
    });
  }

  onSearchChange(){
    this.populatePatientTable();
  }

  private buildFilter(): searchFilter {
    return {
      byId: this.searchById ,
      bySurname: this.searchBySurname,
      byPriority: this.searchByPriority,
      byStatus: this.searchByStatus,
    };
  }
}
