import { Injectable } from '@angular/core';
import { CanDeactivate, UrlTree } from '@angular/router';
import { ConfirmDialogService } from '@fe-template/shared/dialogs/services/confirm-dialog.service';
import { SavedDataInterface } from '@fe-template/shared/interfaces/saved-data.interface';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

/**
 * Prevents user from exiting a page before having their data saved.
 *
 * All components that uses this route should implement the SavedDataInterface
 */
@Injectable({
  providedIn: 'root'
})
export class SavedDataGuard implements CanDeactivate<SavedDataInterface> {

  public constructor(private readonly confirmDialogService: ConfirmDialogService) {
  }

  public canDeactivate(component: SavedDataInterface): Observable<boolean | UrlTree> {
    if (!('getPageForm' in component)) {
      // @ts-ignore
      throw new Error(`${ component.constructor.name } did not implement the SavedDataInterface.
      Implement the interface to make the SavedDataGuard to work.`);
    }

    if (!component.getPageForm().dirty || component.getPageForm().valid) {
      return of(true);
    }

    const modalRef = this.confirmDialogService.openConfirmDialog('The data you entered will be lost!', {
      title: 'Are you sure you wanna leave this page?',
      cancelButton: 'No, stay on page!',
      okButton: {
        text: 'Yes, leave page!',
        onClick: () => console.log('This is still firing.')
      }
    });

    if (!modalRef.onHidden) {
      return of(false);
    }

    return modalRef.onHidden.pipe(
      switchMap((res) => of(typeof res === 'string'))
    );
  }

}
