import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorDialogService } from '@fe-template/shared/dialogs/error-dialog.service';
import { ActionResponse } from '@fe-template/shared/models/responses/action.response';
import { PaginatedResponse } from '@fe-template/shared/models/responses/paginated.response';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

/**
 * HTTP default options
 * @export
 * @interface HttpOptions
 */
export interface HttpOptions {
  headers?:
    | HttpHeaders
    | {
    [header: string]: string | string[];
  };
  observe?: 'body';
  params?:
    | HttpParams
    | {
    [param: string]: string | string[];
  };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}

/**
 * Baseline HTTP service for main API backend
 * @export
 * @class HttpApiService
 */
@Injectable({
  providedIn: 'root'
})
export class HttpApiService<T = any, L = PaginatedResponse<T>, D = ActionResponse<T>> {

  /**
   * Base tld path of API
   * @protected
   * @type {string}
   * @memberof HttpApiService
   */
  protected apiBasePath = environment.apiBase;

  /**
   * base url of this service
   * @protected
   * @type {string}
   * @memberof HttpApiService
   */
  protected resourcePath = '';

  /**
   * Default Options per Request
   * @protected
   * @type {HttpOptions}
   * @memberof HttpApiService
   */
  protected defaultOptions: HttpOptions = {};

  /**
   * Creates an instance of HttpApiService.
   * @param {HttpClient} http
   * @memberof HttpApiService
   */
  constructor(
    protected http: HttpClient,
    private errorDialogService: ErrorDialogService
  ) {
  }

  /**
   * @param {HttpOptions} options
   * @returns
   * @memberof HttpApiService
   */
  public list(options?: HttpOptions): Observable<L> {
    return this.http.get<L>(this.buildAction(''), this.buildOptions(options)).pipe(
      catchError(err => {
        return throwError(this.handleValidationErrors(err));
      })
    );
  }

  /**
   * @param {*} id
   * @param {HttpOptions} options
   * @returns
   * @memberof HttpApiService
   */
  public find(id, options?: HttpOptions): Observable<T> {
    return this.http.get<T>(this.buildAction('/{:id}', { id }), this.buildOptions(options)).pipe(
      catchError(err => {
        return throwError(this.handleValidationErrors(err));
      })
    );
  }

  /**
   * @param {*} body
   * @param {HttpOptions} options
   * @returns
   * @memberof HttpApiService
   */
  public create(body, options?: HttpOptions): Observable<T> {
    return this.http.post<T>(this.buildAction(''), body, this.buildOptions(options)).pipe(
      catchError(err => {
        return throwError(this.handleValidationErrors(err));
      })
    );
  }

  /**
   * @param {*} id
   * @param {*} body
   * @param {HttpOptions} options
   * @returns
   * @memberof HttpApiService
   */
  public update(id, body, options?: HttpOptions): Observable<T> {
    return this.http.patch<T>(this.buildAction('/{:id}', { id }), body, this.buildOptions(options)).pipe(
      catchError(err => {
        return throwError(this.handleValidationErrors(err));
      })
    );
  }

  /**
   * @param {*} id
   * @param {HttpOptions} options
   * @returns
   * @memberof HttpApiService
   */
  public delete(id, options?: HttpOptions): Observable<D> {
    return this.http.delete<D>(this.buildAction('/{:id}', { id }), this.buildOptions(options)).pipe(
      catchError(err => {
        return throwError(this.handleValidationErrors(err));
      })
    );
  }

  /**
   * Build action url from path template and parameters
   * @param {string} path
   * @returns
   * @memberof HttpApiService
   */
  protected buildAction(path: string, params?: { [key: string]: string }, fromBaseUri: boolean = false) {
    params = params ? params : {};
    return Object.keys(params).reduce((url, paramKey) => {
      return url.replace(new RegExp(`\{\:${paramKey}\}`, 'ig'), params[paramKey]);
      // tslint:disable-next-line: max-line-length
    }, [
      this.apiBasePath.replace(/^\/|\/$/g, ''),
      ...(fromBaseUri ? [] : [
        this.getResourcePath().replace(/^\/|\/$/g, '')
      ]),
      path.replace(/^\/|\/$/g, '')
    ].join('/').replace(/\/$/g, ''));
  }

  /**
   * build param options from defaults and overrides
   * @protected
   * @param {HttpOptions} [options]
   * @returns {HttpOptions}
   * @memberof HttpApiService
   */
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

  /**
   * @protected
   * @param {Response} res
   * @returns
   * @memberof HttpApiService
   */
  protected handleValidationErrors(res: HttpErrorResponse): HttpErrorResponse {
    // only handle valdiation errors here
    if (res.status === 422) {
      if (res.error && res.error.errors) {
        this.errorDialogService.showErrorDialog(this.sanitizeMessage(res));
      }
    }

    return res;
  }

  /**
   * @private
   * @param {*} res
   * @returns
   * @memberof HttpApiService
   */
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

  protected getResourcePath(): string {
    return this.resourcePath;
  }
}
