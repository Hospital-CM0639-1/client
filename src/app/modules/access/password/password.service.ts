import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ChangePassword } from "../../../shared/interfaces/access/password/change-password";
import { apiManagementService } from "../../../../environments/environments";
import { Observable, tap } from "rxjs";
import { AuthUserService } from "../../../shared/services/user/auth-user.service";

@Injectable({
  providedIn: 'root',
})
export class PasswordService {

  constructor(
      private http: HttpClient,
      private authUserService: AuthUserService,
  ) { }

  onChangePassword(changePassword: ChangePassword): Observable<any> {
    return this.http
        .post<any>(apiManagementService + 'user/change-password', changePassword)
        .pipe(
            tap(() => {
              this.authUserService.removeToken(); // remove token (as backend do)
            })
        );
  }

  onChangePasswordToAnotherUser(changePassword: ChangePassword, userId: string): Observable<any> {
      return this.http
          .post<any>(apiManagementService + 'user/' + userId + '/change-password', changePassword);
  }
}
