import { Injectable } from '@angular/core';
import { apiManagementService } from "../../../../environments/environments";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../../interfaces/user/user";

@Injectable({
  providedIn: 'root'
})
export class UserCreateEditService {

  constructor(
      private http: HttpClient,
  ) { }

  onCreateUser(user: User): Observable<any> {
    return this.http.post<any>(apiManagementService + 'user', user);
  }

  onEditUser(userId: string, user: User): Observable<any> {
    return this.http.put<any>(apiManagementService + 'user/' + userId, user);
  }
}
