import { AfterViewInit, Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import { LoadingStateService } from '@fe-template/shared/services/loading-state.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[feTemplateLoadingState]'
})
export class LoadingStateDirective implements AfterViewInit, OnDestroy {

  @Input('feTemplateLoadingState')
  private aliasList!: string | string[];

  private stateSub!: Subscription;

  public constructor(private element: ElementRef, private loadingStateService: LoadingStateService) {
  }

  public ngAfterViewInit(): void {
    this.stateSub = this.loadingStateService.on(this.aliasList).subscribe({
      next: change => change ? this.loadingOn() : this.loadingOff()
    });
  }

  public ngOnDestroy(): void {
    this.stateSub?.unsubscribe();
  }

  /**
   * Disables the input and add the 'loading-state' class.
   */
  private loadingOn(): void {
    this.element.nativeElement.setAttribute('disabled', true);
    this.element.nativeElement.classList.add('loading-state');
  }

  /**
   * Enables the input and remove the 'loading-state' class.
   */
  private loadingOff(): void {
    this.element.nativeElement.removeAttribute('disabled');
    this.element.nativeElement.classList.remove('loading-state');
  }
}
