import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {CardModule} from "primeng/card";
import {DropdownModule} from "primeng/dropdown";
import {DynamicNavbarComponent} from "../../shared/dynamic-navbar/dynamic-navbar.component";
import {FloatLabelModule} from "primeng/floatlabel";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {LogoutComponent} from "../../../shared/component/logout/logout.component";
import {NgForOf, NgIf} from "@angular/common";
import {PrimeTemplate} from "primeng/api";
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from "@angular/router";
import {TableLazyLoadEvent, TableModule} from "primeng/table";
import {Column, Patient} from "../../../shared/interfaces/interface";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {ReceptionService, searchFilter} from "../../../shared/services/reception.service";
import {SecretaryDetailComponent} from "../../secretary/secretary-detail/secretary-detail.component";
import {TriageComponent} from "../../secretary/triage/triage.component";
import {DoctorService} from "../../../shared/services/doctor.service";
import {TransformedData} from "../../../shared/interfaces/doctor/doctor";

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [
    Button,
    CardModule,
    DropdownModule,
    FloatLabelModule,
    FormsModule,
    InputTextModule,
    NgForOf,
    NgIf,
    PrimeTemplate,
    RouterOutlet,
    TableModule,
    LogoutComponent,
    DynamicNavbarComponent
  ],
  templateUrl: './doctor-dashboard.component.html',
  styleUrl: './doctor-dashboard.component.scss'
})
export class DoctorDashboardComponent implements OnInit{
  cols!: Column[];
  first = 0;
  rows = 10;
  page = 0; // starts from page index 0
  loading = false; // spinner used for loading data of table
  totalRecords!: number; // total rows
  patients!: TransformedData[] // data of table
  doctorId!: number;
  // ref: DynamicDialogRef | undefined;

  constructor(
    private doctorService: DoctorService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private router: Router
  ) {}
  navItems = [];

  ngOnInit(): void {
    this.cols = [
      { field: 'PatientId', header: 'Patient ID' },
      { field: 'Name', header: 'Patient Name' },
      { field: 'Priority', header: 'Priority' },
      { field: 'TriageNotes', header: 'Triage notes' },
    ];
    this.route.paramMap.subscribe(params => {
      this.populatePatientTable(+params.get('id')!);
      this.doctorId = +params.get('id')!
    });
  }

  private populatePatientTable(doctorId: number = 0): void {
    this.doctorService.getAssignedPatientsByDoctor(doctorId).subscribe((data) => {
      console.log(data);
      this.patients = data;
      this.loading = false;
    });
  }

  medicalHistory(data?: TransformedData) {
    console.log(data?.PatientId)
    this.router.navigate([`/doctor/dashboard`, this.doctorId, 'detail', data?.PatientId]);
    // this.ref = this.dialogService.open(SecretaryDetailComponent, {
    //   header: 'Detail',
    //   data: {patient: data, detail: true}
    // });
    // this.ref.onClose.subscribe((response) => {
    //   if (response) {
    //     this.populatePatientTable();
    //   }
    // });
  }
}
