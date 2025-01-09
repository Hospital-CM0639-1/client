import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { environment } from "../../../../environments/environments";
import { AuthUserService } from "../user/auth-user.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(
      private loggedUserService: AuthUserService,
      private router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
  {
    return next.handle(request).pipe(catchError(error => {
      console.log(error);
      if (error.status === 401) {
        this.loggedUserService.removeToken();
        this.router.navigate(['/']);
      }

      // todo: display error

      return throwError(error);
    }));
  }
}
