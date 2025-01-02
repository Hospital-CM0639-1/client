import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map, Observable } from 'rxjs';
import { PaginatedList, WardBed } from '../interfaces/interface';

@Injectable({
  providedIn: 'root',
})
export class NurseService {
  constructor(public apiService: ApiService) {}
  private BASE_PATH_HOSPITAL_BEDS = 'api/v1/hospital-beds'
  getWardBeds(
    page: number,
    size: number,
    order: string
  ): Observable<PaginatedList<WardBed>> {
    return this.apiService
      .get<PaginatedList<WardBed>>(
        `${this.BASE_PATH_HOSPITAL_BEDS}?page=${page}&size=${size}&sort=${order}`
      )
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
}
