import { Injectable } from '@angular/core';
import { LoggedUser } from "../../interfaces/user/user";
import { apiManagementService, environment } from "../../../../environments/environments";
import { UserTypeEnums } from "../../enums/user/user-type.enums";
import { StaffRoleEnums } from "../../enums/staff-role.enums";
import { LoginRequest } from "../../interfaces/access/login-request";
import { Observable, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  private loggedUser: LoggedUser|null = null;

  constructor(
      private http: HttpClient,
  ) { }

  onLogin(data: LoginRequest): Observable<LoggedUser> {
    return this.http
      .post<LoggedUser>(apiManagementService + 'login', data)
      .pipe(
          tap((loggedUser: LoggedUser) => {
            this.setLoggedUser(loggedUser);
          })
      );
  }

  onLogged(): Observable<LoggedUser> {
    return this.http
        .get<LoggedUser>(apiManagementService + 'logged')
        .pipe(
            tap((loggedUser: LoggedUser) => {
              this.setLoggedUser(loggedUser);
            })
        );
  }

  onLogout(): Observable<any> {
    return this.http
        .post(apiManagementService + 'logout', []);
  }

  /**
   * @return LoggedUser|null
   */
  getLoggedUser(): LoggedUser| null {
    return this.loggedUser;
  }

  /**
   * Set the logged user and the jwt token on local storage
   *
   * @param loggedUser
   */
  setLoggedUser(loggedUser: LoggedUser): void {
    this.loggedUser = loggedUser;
    localStorage.setItem(environment.token_key, loggedUser.token);
  }

  /**
   * Get dashboard page for logged user
   *
   * @return string
   */
  getDashboardPageRoute(): string {
    let route = '/';
    let loggedUser = this.getLoggedUser();

    if (loggedUser !== null) {
      if (UserTypeEnums.ADMIN === loggedUser.type) {
        route = '/admin/dashboard';
      } else if (UserTypeEnums.STAFF === loggedUser.type) {
        if (StaffRoleEnums.DOCTOR === loggedUser.staffInfo?.role) {
          route = '/doctor/dashboard';
        } else if (StaffRoleEnums.NURSE === loggedUser.staffInfo?.role) {
          route = '/nurse/dashboard';
        } else if (StaffRoleEnums.SECRETARY === loggedUser.staffInfo?.role) {
          route = '/secretary/dashboard';
        }
      } else if (UserTypeEnums.PATIENT === loggedUser.type) {
        route = '/patient/dashboard';
      }
    }

    return route;
  }

  public getToken(): null | string {
    return localStorage.getItem(environment.token_key);
  }

  public getType(): undefined | string {
    return this.getLoggedUser()?.type;
  }

  public getRole(): undefined | string {
    return this.getLoggedUser()?.staffInfo?.role;
  }

  public removeToken(): void {
    localStorage.removeItem(environment.token_key);
  }
  // todo: implement remove logged user for logout
}
