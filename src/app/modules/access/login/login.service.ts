import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { LoginRequest } from "../../../shared/interfaces/access/login-request";
import { Observable, tap } from "rxjs";
import { LoggedUser } from "../../../shared/interfaces/user/user";
import { apiManagementService, environment } from "../../../../environments/environments";
import { LoggedUserService } from "../../../shared/services/user/logged-user.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
      private http: HttpClient,
      private loggedUserService: LoggedUserService,
  ) {}

  onLogin(data: LoginRequest): Observable<LoggedUser> {
    return this.http
        .post<LoggedUser>(apiManagementService + '/login', data)
        .pipe(
            tap((loggedUser: LoggedUser) => {
              this.loggedUserService.setLoggedUser(loggedUser);
            })
        );
  }
}
