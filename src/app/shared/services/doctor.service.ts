import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map, Observable } from 'rxjs';
import { PaginatedList } from '../interfaces/interface';
import { StaffRoleEnums } from '../enums/staff-role.enums';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(public apiService: ApiService) {
  }

}
