import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { EmergencyVisitStaff, PaginatedList } from '../interfaces/interface';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmergencyVisitStaffService {

  constructor(public apiService: ApiService) {
  }

    private BASE_PATH_EMERGENCY_VISIT_STAFF = 'api/v1/emergency-visit-staff';
  
    getEmergencyVisitStaff(
      page: number,
      size: number,
      order: string,
      currentPatientStatus: string
    ): Observable<PaginatedList<EmergencyVisitStaff>> {
      let url = `${this.BASE_PATH_EMERGENCY_VISIT_STAFF}?page=${page}&size=${size}&sort=${order}`;
      if (currentPatientStatus != null) {
        url = url + `&currentStatus=${currentPatientStatus}`;
      }
      return this.apiService
        .get<PaginatedList<EmergencyVisitStaff>>(url)
        .pipe(
          map((data) => {
            return data;
          })
        );
    }
}
