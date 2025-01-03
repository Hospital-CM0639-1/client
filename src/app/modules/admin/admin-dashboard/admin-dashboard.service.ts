import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { apiManagementService } from "../../../../environments/environments";
import { AdminDashboard } from "../../../shared/interfaces/admin/admin-dashboard/admin-dashboard";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService  {

  constructor(
      private http: HttpClient,
  ) { }

  onGetAdminDashboard(): Observable<AdminDashboard> {
    return this.http.get<AdminDashboard>(apiManagementService + 'admin/dashboard');
  }
}
