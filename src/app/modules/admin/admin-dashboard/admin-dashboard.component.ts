import { Component, OnInit } from '@angular/core';
import { LogoutComponent } from "../../../shared/component/logout/logout.component";
import { AdminDashboardService } from "./admin-dashboard.service";
import { AdminDashboard } from "../../../shared/interfaces/admin/admin-dashboard/admin-dashboard";
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import { CardModule } from "primeng/card";
import { SpinnerLoaderComponent } from "../../../shared/component/spinner-loader/spinner-loader.component";
import { DynamicNavbarComponent } from "../../shared/dynamic-navbar/dynamic-navbar.component";
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    CardModule,
    ButtonModule,
    SpinnerLoaderComponent,
    DynamicNavbarComponent
],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  public loading = true;
  protected dashboardData?: AdminDashboard;

  constructor(
      private adminDashboardService: AdminDashboardService,
      private router: Router
  ) {}

  ngOnInit() {
    this.loading = true;
    this.adminDashboardService
        .onGetAdminDashboard()
        .subscribe({
          next: (data: AdminDashboard) => {
            this.dashboardData = data;
            this.loading = false;
          },
          error: () => {
            this.loading = false;
          }
        });
  }

  addUser(role: string) {
    switch (role) {
      case 'admin':
        this.router.navigate(['/admin/dashboard/admin/list']);
        break;
      case 'doctor':
        this.router.navigate(['/admin/dashboard/staff/doctor/list']);
        break;
      case 'nurse':
        this.router.navigate(['/admin/dashboard/staff/nurse/list']);
        break;
      case 'secretary':
        this.router.navigate(['/admin/dashboard/staff/secretary/list']);
        break;
      case 'patient':
        this.router.navigate(['/admin/dashboard/patient/list']);
        break;
      default:
        console.log('Invalid role');
    }
  }
}
