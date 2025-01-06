import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { MediaType } from 'express';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private defaultHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  });

  constructor(public http: HttpClient) { }

  public get apiUrl(): string {
    return environment.api_url_gateway;
  }

  get<T>(path: string, customOptions?: { params?: HttpParams }, url?: string): Observable<T> {
    if (!url) {
      url = this.apiUrl;
    }
    const options = {
      headers: this.defaultHeaders,
      params: customOptions != null ? customOptions.params : undefined,
    };
    return this.http.get<T>(`${url}${path}`, options);
  }

  post<T>(
    path: string,
    body: any,
    contentType?: MediaType,
    responseType?: string
  ): Observable<T> {
    const options = {
      headers: this.defaultHeaders,
    };
    if (contentType != null) {
      options.headers = this.defaultHeaders.set('Content-Type', contentType.value);
    }
    if (responseType != null) {
      (options as any).responseType = responseType;
    }
    return this.http.post<T>(`${this.apiUrl}${path}`, body, options);
  }

  put<T>(path: string, body: any, contentType?: MediaType): Observable<T> {
    const options = {
      headers: this.defaultHeaders,
    };
    if (contentType != null) {
      options.headers = this.defaultHeaders.set('Content-Type', contentType.value);
    }
    return this.http.put<T>(`${this.apiUrl}${path}`, body, options);
  }

  delete<T>(path: string, contentType?: MediaType, url?: string): Observable<T> {
    if (!url) {
      url = this.apiUrl;
    }
    const options = {
      headers: this.defaultHeaders,
    };
    if (contentType != null) {
      options.headers = this.defaultHeaders.set('Content-Type', contentType.value);
    }
    return this.http.delete<T>(`${url}${path}`, options);
  }
}
