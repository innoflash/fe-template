import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

/**
 * Service to trigger loading states across application
 * @see LoadingStateDirective for state management
 * @export
 * @class LoadingStateService
 */
@Injectable({
  providedIn: 'root'
})
export class LoadingStateService {

  public loadingMessage = 'Please wait...';
  /**
   * Replay the last 10 loading states to ensure components are up to date with their correct loading state when subscribe
   * @type {ReplaySubject<string>}
   * @memberof LoadingStateService
   */
  private loadingStates$: ReplaySubject<{ alias: string; state: boolean }> = new ReplaySubject<{ alias: string; state: boolean }>(10);

  /**
   * @readonly
   * @type {Observable<{ alias: string; state: boolean }>}
   * @memberof LoadingStateService
   */
  public get loadingStates(): Observable<{ alias: string; state: boolean }> {
    return this.loadingStates$.asObservable();
  }

  /**
   * Creates an instance of LoadingStateService.
   * @memberof LoadingStateService
   */
  constructor() {
  }

  /**
   * @param {string} alias
   * @param message
   * @memberof LoadingStateService
   */
  start(alias: string | string[], message = 'Please wait...'): void {
    alias = alias instanceof Array ? alias : [alias];

    // assign loader message.
    this.loadingMessage = message;

    // eslint-disable-next-line @typescript-eslint/no-shadow
    alias.forEach((alias: string) => {
      this.loadingStates$.next({
        alias,
        state: true
      });
    });
  }

  /**
   * @param {string} alias
   * @memberof LoadingStateService
   */
  end(alias: string | string[]): void {
    alias = alias instanceof Array ? alias : [alias];

    // eslint-disable-next-line @typescript-eslint/no-shadow
    alias.forEach(alias => {
      this.loadingStates$.next({
        alias,
        state: false
      });
    });
  }

  /**
   * helper method to filter listening events to those required
   * @param {string} alias
   * @returns {Observable<boolean>}
   * @memberof LoadingStateService
   */
  on(alias: string | string[]): Observable<boolean> {
    alias = alias instanceof Array ? alias : [alias];

    return this.loadingStates.pipe(
      filter((stateChange: { alias: string; state: boolean }) => {
        return alias.indexOf(stateChange.alias) !== -1;
      }),
      map(stateChange => stateChange.state)
    );
  }
}
