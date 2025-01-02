import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { JwtInterceptorService } from "./shared/services/interceptor/jwt-interceptor.service";
import { ErrorInterceptorService } from "./shared/services/interceptor/error-interceptor.service";

export const appConfig: ApplicationConfig = {
  providers: [
      provideRouter(routes),
      provideHttpClient(withInterceptorsFromDi()),
      {
        provide:HTTP_INTERCEPTORS,
        useClass:JwtInterceptorService,
        multi:true
      },
      {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorInterceptorService,
          multi: true
      },
      provideClientHydration()
  ]
};
