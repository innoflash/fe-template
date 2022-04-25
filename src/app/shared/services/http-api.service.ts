import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpOptions } from '@fe-template/shared/config/shared.types';
import { ErrorDialogService } from '@fe-template/shared/dialogs/services/error-dialog.service';
import { ActionResponse } from '@fe-template/shared/models/responses/action.response';
import { PaginatedResponse } from '@fe-template/shared/models/responses/paginated.response';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpApiService<T = any, L = PaginatedResponse<T>, D = ActionResponse<T>> {
  protected apiBasePath = environment.apiBase;
  protected resourcePath = '';
  protected defaultOptions: HttpOptions = {};

  public constructor(
    protected readonly http: HttpClient,
    protected errorDialogService: ErrorDialogService
  ) {
  }

  public list(options?: HttpOptions): Observable<L> {
    return this.http.get<L>(this.buildAction(''), this.buildOptions(options)).pipe(
      catchError(err => {
        return throwError(this.handleValidationErrors(err));
      })
    );
  }

  public find(id: any, options?: HttpOptions): Observable<T> {
    return this.http.get<T>(this.buildAction('/{:id}', { id }), this.buildOptions(options)).pipe(
      catchError(err => {
        return throwError(this.handleValidationErrors(err));
      })
    );
  }

  public create(body: any, options?: HttpOptions): Observable<T> {
    return this.http.post<T>(this.buildAction(''), body, this.buildOptions(options)).pipe(
      catchError(err => {
        return throwError(this.handleValidationErrors(err));
      })
    );
  }

  public delete(id: any, options?: HttpOptions): Observable<D> {
    return this.http.delete<D>(this.buildAction('/{:id}', { id }), this.buildOptions(options)).pipe(
      catchError(err => {
        return throwError(this.handleValidationErrors(err));
      })
    );
  }

  public update(id: any, body: any, options?: HttpOptions): Observable<T> {
    return this.http.patch<T>(this.buildAction('/{:id}', { id }), body, this.buildOptions(options)).pipe(
      catchError(err => {
        return throwError(this.handleValidationErrors(err));
      })
    );
  }

  protected buildAction(path: string, params?: { [key: string]: string }, fromBaseUri: boolean = false): string {
    params = params ? params : {};

    return Object.keys(params).reduce((url, paramKey) => {
      // @ts-ignore
      return url.replace(new RegExp(`\{\:${ paramKey }\}`, 'ig'), params ? params[paramKey] : '');
    }, [
      this.apiBasePath.replace(/^\/|\/$/g, ''),
      ...(fromBaseUri ? [] : [
        this.getResourcePath().replace(/^\/|\/$/g, '')
      ]),
      path.replace(/^\/|\/$/g, '')
    ].join('/').replace(/\/$/g, ''));
  }

  protected buildOptions(options?: HttpOptions): HttpOptions {
    // nothing set, use defaults (even if undefined)
    if (!options) {
      return this.defaultOptions;
    }

    // options set but no defaults, use what was set
    if (!this.defaultOptions) {
      return options;
    }

    return Object.assign({}, this.defaultOptions, options, {
      headers: Object.assign(
        {},
        this.defaultOptions.headers ? this.defaultOptions.headers : {},
        options.headers ? options.headers : {}
      ),
      params: Object.assign(
        {},
        this.defaultOptions.params ? this.defaultOptions.params : {},
        options.params ? options.params : {}
      )
    }) as HttpOptions;
  }

  protected handleValidationErrors(res: HttpErrorResponse): HttpErrorResponse {
    // only handle validation errors here
    if (res.status === 422) {
      if (res.error && res.error.errors) {
        this.errorDialogService.openErrorDialog(this.sanitizeMessage(res));
      }
    }

    return res;
  }

  protected getResourcePath(): string {
    return this.resourcePath;
  }

  private sanitizeMessage(res: HttpErrorResponse): string[] {
    const messages: string[] = [];
    messages.push(res.error.message);

    if (res.error.errors) {
      for (const value in res.error.errors) {
        if (Array.isArray(res.error.errors[value])) {
          res.error.errors[value].forEach((item: string) => {
            messages.push(item);
          });
        }
      }
    }

    return messages;
  }
}
