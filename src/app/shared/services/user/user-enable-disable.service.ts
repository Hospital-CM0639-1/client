import { Injectable } from '@angular/core';
import { apiManagementService } from "../../../../environments/environments";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserEnableDisableService {

  constructor(
      private http: HttpClient,
  ) { }

  onEnableUser(userId: number) {
    return this.http.put<any>(apiManagementService + 'user/' + userId + '/enable', {});
  }

  onDisableUser(userId: number) {
    return this.http.put<any>(apiManagementService + 'user/' + userId + '/disable', {});
  }
}
