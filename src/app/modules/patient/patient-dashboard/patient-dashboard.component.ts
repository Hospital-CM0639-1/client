import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { SplitterModule } from 'primeng/splitter';
import { PanelModule } from 'primeng/panel';

import { LoggedUser } from "../../../shared/interfaces/user/user";
import { MedicalProcedure } from "../../../shared/interfaces/doctor/doctor";

import { PatientDashboardService } from "./patient-dashboard.service";
import { AuthUserService } from "../../../shared/services/user/auth-user.service";
import { DoctorService } from "../../../shared/services/doctor.service";

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [CardModule, TableModule, SplitterModule, PanelModule],
  templateUrl: './patient-dashboard.component.html',
  styleUrl: './patient-dashboard.component.scss'
})



export class PatientDashboardComponent implements OnInit {
  protected logged_user!: LoggedUser | null;
  protected procedures!: MedicalProcedure[];
  vitals!: string[];
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
                    this.doctorService.getMedicalProceduresByPatient(this.logged_user.id)
                      .subscribe({
                          next: (response: MedicalProcedure[]) => {
                              this.procedures = response;
                            }
                        })
                  }
                });

  }

}
