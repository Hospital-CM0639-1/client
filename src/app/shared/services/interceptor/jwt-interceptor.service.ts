import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { environment } from "../../../../environments/environments";
import { AuthUserService } from "../user/auth-user.service";

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {

  constructor(
      private loggedUserService: AuthUserService,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
  {
    let token = localStorage.getItem(environment.token_key);
    if (token && request.url.indexOf('/login') === -1) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token
        }
      });
    }

    return next.handle(request).pipe(catchError(error => {
      if (error.status == 401) {
        // todo: remove token, if exists, in case of 401
      }

      // todo: display error

      return throwError(error);
    }));
  }
}
