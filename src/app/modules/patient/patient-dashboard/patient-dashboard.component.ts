import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { SplitterModule } from 'primeng/splitter';
import { PanelModule } from 'primeng/panel';

import { LoggedUser } from "../../../shared/interfaces/user/user";

import { PatientDashboardService } from "./patient-dashboard.service";
import { AuthUserService } from "../../../shared/services/user/auth-user.service";

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [CardModule, TableModule, SplitterModule, PanelModule],
  templateUrl: './patient-dashboard.component.html',
  styleUrl: './patient-dashboard.component.scss'
})



export class PatientDashboardComponent implements OnInit {
  protected logged_user!: LoggedUser | null;
  procedures!: string[];
  vitals!: string[];
  public loading = true;

  constructor(
      private authUserService: AuthUserService,
  ) { }

 ngOnInit() {
    this.loading = true;
    this.logged_user = this.authUserService.getLoggedUser();
  }

}
