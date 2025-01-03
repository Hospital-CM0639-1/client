import { Component, OnInit } from '@angular/core';
import { LogoutComponent } from "../../../shared/component/logout/logout.component";
import { AdminDashboardService } from "./admin-dashboard.service";
import { AdminDashboard } from "../../../shared/interfaces/admin/admin-dashboard/admin-dashboard";

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    LogoutComponent
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {

  protected dashboardData!: AdminDashboard;

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
            console.log(this.dashboardData)
          }
        });
  }
}
