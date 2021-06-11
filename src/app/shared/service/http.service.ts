import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InterceptorService } from '@fe-template/shared/service/interceptor.service';
import { Observable, ObservableInput, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(public http: HttpClient, private interceptorService: InterceptorService) {
  }

  public httpGet(
    url: string,
    options: any = {},
    token = true,
    errorHandler?: (error: HttpErrorResponse, url: string) => ObservableInput<any>
  ): Observable<any> {
    return this.http.get(this.createUrl(url), { params: options }).pipe(
      map(response => response),
      catchError(error => this.catchError(error, url, errorHandler))
    );
  }

  public httpGetRaw(url: string, options: any = {}, token = true): Observable<any> {
    return this.http.get(this.createUrl(url), { params: options });
  }

  public httpPost(
    url: string,
    dataRaw: any,
    token: boolean = true,
    options: any = {},
    errorHandler?: (error: HttpErrorResponse, url: string) => ObservableInput<any>
  ): Observable<any> {
    return this.http.post<any>(this.createUrl(url), dataRaw, { params: options, observe: 'response' }).pipe(
      map(response => response),
      catchError(error => this.catchError(error, url, errorHandler))
    );
  }

  public httpPatch(
    url: string,
    dataRaw: any,
    token: boolean = true,
    options: any = {},
    errorHandler?: (error: HttpErrorResponse, url: string) => ObservableInput<any>
  ): Observable<any> {
    return this.http.patch<any>(this.createUrl(url), dataRaw, { params: options, observe: 'response' }).pipe(
      map(response => response),
      catchError(error => this.catchError(error, url, errorHandler))
    );
  }

  public httpPut(
    url: string,
    dataRaw: any,
    options: any = {},
    errorHandler?: (error: HttpErrorResponse, url: string) => ObservableInput<any>
  ): Observable<any> {
    return this.http.put(this.createUrl(url), dataRaw, { params: options }).pipe(
      map(response => response),
      catchError(error => this.catchError(error, url, errorHandler))
    );
  }

  public postFile(
    url: string,
    dataRaw: any,
    errorHandler?: (error: HttpErrorResponse, url: string) => ObservableInput<any>
  ): Observable<any> {
    return this.http.post(this.createUrl(url), dataRaw, {}).pipe(
      map(response => response),
      catchError(error => this.catchError(error, url, errorHandler))
    );
  }

  public putFile(
    url: string,
    dataRaw: any,
    errorHandler?: (error: HttpErrorResponse, url: string) => ObservableInput<any>
  ): Observable<any> {
    return this.http.put(this.createUrl(url), dataRaw, {}).pipe(
      map(response => response),
      catchError(error => this.catchError(error, url, errorHandler))
    );
  }

  public httpDelete(url: string, errorHandler?: (error: HttpErrorResponse, url: string) => ObservableInput<any>): Observable<any> {
    return this.http.delete(this.createUrl(url), {}).pipe(
      map(response => response),
      catchError(error => this.catchError(error, url, errorHandler))
    );
  }

  private createUrl(url: string): string {
    if (url.includes('http')) {
      return url;
    }
    return `${ environment.apiBase }/${ url }`;
  }

  private extractData(res: Response): Promise<any> {
    const body = res.json();
    return body || {};
  }

  private catchError(
    error: HttpErrorResponse | Response,
    url: string,
    errorHandler?: (error: HttpErrorResponse, url: string) => ObservableInput<any>
  ): ObservableInput<any> {
    if (errorHandler) {
      return errorHandler(error as HttpErrorResponse, url);
    } else {
      return throwError(this.interceptorService.handleError(error as Response));
    }
  }

  private handleError(error: {
    message?: string;
    status?: string;
    statusText?: string;
  }): Observable<never> {
    const errMsg = error.message ? error.message : error.status ? `${ error.status } - ${ error.statusText }` : 'Server error';
    console.error(errMsg);
    return throwError(errMsg);
  }
}
