import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { apiManagementService } from "../../../../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService  {

  constructor(
      private http: HttpClient,
  ) { }

  onGetAdminDashboard() {
    return this.http.get<any>(apiManagementService + 'admin/dashboard');
  }
}
