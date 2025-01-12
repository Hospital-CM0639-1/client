import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { SplitterModule } from 'primeng/splitter';
import { PanelModule } from 'primeng/panel';

import { LoggedUser } from "../../../shared/interfaces/user/user";
import { MedicalProcedure } from "../../../shared/interfaces/doctor/doctor";
import { PaginatedList } from "../../../shared/interfaces/interface";
import { VitalSigns } from "../../../shared/interfaces/interface";

import { PatientDashboardService } from "./patient-dashboard.service";
import { AuthUserService } from "../../../shared/services/user/auth-user.service";
import { DoctorService } from "../../../shared/services/doctor.service";
import { DynamicNavbarComponent } from "../../shared/dynamic-navbar/dynamic-navbar.component";
import { SpinnerLoaderComponent } from "../../../shared/component/spinner-loader/spinner-loader.component";

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [CommonModule, CardModule, TableModule, SplitterModule, PanelModule, DynamicNavbarComponent, SpinnerLoaderComponent],
  templateUrl: './patient-dashboard.component.html',
  styleUrl: './patient-dashboard.component.scss'
})



export class PatientDashboardComponent implements OnInit {
  protected logged_user!: LoggedUser | null;
  protected procedures!: MedicalProcedure[];
  protected vitals!: VitalSigns[];
  public loading = true;

  constructor(
      private authUserService: AuthUserService,
      private doctorService: DoctorService,
  ) {
  }

 ngOnInit() {
    this.loading = true;
    this.authUserService.onLogged().subscribe({
                  next: (response: LoggedUser) => {
                    this.logged_user = response;
                    if(this.logged_user.patientInfo != null){
                      this.doctorService.getMedicalProceduresByPatient(this.logged_user.patientInfo.id)
                        .subscribe({
                           next: (response: PaginatedList<MedicalProcedure>) => {
                              this.procedures = response.content;
                              this.loading = false;
                            },
                            error: () => {
                              this.loading = false;
                            }
                        });
                      this.loading = true;
                      this.doctorService.getPatientVitals(this.logged_user.patientInfo.id)
                        .subscribe({
                           next: (response: PaginatedList<VitalSigns>) => {
                              this.vitals = response.content;
                              this.loading = false;
                            }, error: () => {
                              this.loading = false;
                            }
                        });
                    }
                  }
                });

  }

}
