import { Component, OnInit } from '@angular/core';
import { LogoutComponent } from "../../../shared/component/logout/logout.component";
import { AdminDashboardService } from "./admin-dashboard.service";
import { AdminDashboard } from "../../../shared/interfaces/admin/admin-dashboard/admin-dashboard";
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    LogoutComponent,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {

  protected dashboardData?: AdminDashboard;
  protected showUserList: boolean = false;

  constructor(
      private adminDashboardService: AdminDashboardService
  ) {
  }

  ngOnInit() {

    this.adminDashboardService
        .onGetAdminDashboard()
        .subscribe({
          next: (data: AdminDashboard) => {
            this.dashboardData = data;
          }
        });
  }
}
