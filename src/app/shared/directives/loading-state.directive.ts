import { AfterViewInit, Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import { LoadingStateService } from '@fe-template/shared/service/global/loading-state.service';
import { Subscription } from 'rxjs';

/**
 * Directive to manage element loading states throughout application based on aliases.
 * Any elements bound to that alias will be in loading state when loading begins and reset when loading ends
 * @see LoadingStateService for triggers
 * @export
 * @class LoadingStateDirective
 */
@Directive({
  selector: '[appLoadingState]'
})
export class LoadingStateDirective implements AfterViewInit, OnDestroy {
  /**
   * @private
   * @type {(string | string[])}
   * @memberof LoadingStateDirective
   */
  @Input('appLoadingState') private aliasList: string | string[] = [];

  /**
   * @private
   * @type {(string | null)}
   * @memberof LoadingStateDirective
   */
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('appLoadingStateChild') private loadingStateChild: string | null = null;

  /**
   * @private
   * @type {Subscription}
   * @memberof LoadingStateDirective
   */
  private stateSub: Subscription | undefined;

  /**
   * Creates an instance of LoadingStateDirective.
   * @param {ElementRef} element
   * @param {LoadingStateService} loading
   * @memberof LoadingStateDirective
   */
  constructor(private element: ElementRef, private loading: LoadingStateService) {
  }

  /**
   * @memberof LoadingStateDirective
   */
  // eslint-disable-next-line 
  ngAfterViewInit() {
    this.stateSub = this.loading.on(this.aliasList).subscribe(change => {
      change ? this.loadingOn() : this.loadingOff();
    });
  }

  /**
   * @memberof LoadingStateDirective
   */
  // eslint-disable-next-line
  ngOnDestroy() {
    this.stateSub?.unsubscribe();
  }

  /**
   * @memberof LoadingStateDirective
   */
  loadingOn(): void {
    this.element.nativeElement.setAttribute('disabled', true);
    this.element.nativeElement.classList.add('loading-state');
    // this.handleChildElement(true);
  }

  /**
   * @memberof LoadingStateDirective
   */
  loadingOff(): void {
    this.element.nativeElement.removeAttribute('disabled');
    this.element.nativeElement.classList.remove('loading-state');
    // this.handleChildElement(false);
  }

  handleChildElement(state: boolean): void {
    if (!this.loadingStateChild) {
      return;
    }

    const elem = this.element.nativeElement.querySelector(this.loadingStateChild);

    if (!elem) {
      return;
    }

    if (state) {
      elem.setAttribute('disabled', true);
      elem.classList.add('loading-state');
    } else {
      elem.removeAttribute('disabled');
      elem.classList.remove('loading-state');
    }
  }
}
