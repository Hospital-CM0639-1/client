import { Injectable } from '@angular/core';
import { apiManagementService } from "../../../../environments/environments";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../../interfaces/user/user";

@Injectable({
  providedIn: 'root'
})
export class UserDetailService {

  constructor(
      private http: HttpClient,
  ) { }

  onGetUserDetail(userId: string): Observable<User> {
    return this.http.get<User>(apiManagementService + 'user/' + userId);
  }
}
