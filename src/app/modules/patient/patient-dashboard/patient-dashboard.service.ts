import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { apiManagementService } from "../../../../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class PatientDashboardService  {

  constructor(
      private http: HttpClient,
  ) { }

  onGetPatientInfo(id: number) {
    return this.http.get<any>(apiManagementService + 'user/' + id);
  }
}
