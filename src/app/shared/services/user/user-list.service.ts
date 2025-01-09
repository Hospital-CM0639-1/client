import { Injectable } from '@angular/core';
import { apiManagementService } from "../../../../environments/environments";
import { HttpClient } from "@angular/common/http";
import { UserListFilter } from "../../interfaces/user/user-list-filter";

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  constructor(
      private http: HttpClient,
  ) { }

  onGetUserList(filter: UserListFilter) {
    let params =
        'type=' + filter.type
        + '&role=' + filter.role
        + '&status=' + filter.status
    return this.http.get<any>(apiManagementService + 'user?' + params);
  }
}
