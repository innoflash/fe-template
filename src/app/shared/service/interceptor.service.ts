import { Injectable } from '@angular/core';
import { ErrorDialogService } from '@fe-template/shared/dialogs/error-dialog.service';
import { UserProfileService } from '@fe-template/shared/service/user-profile.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor(
    private errorDialogService: ErrorDialogService,
    private userProfileService: UserProfileService
  ) {
  }

  // TODO REFACTOR AFTER DEMO
  public handleError(res: Response, url = null) {
    if (!res['error']) {
      return res;
    }
    const messages = [res['error']['message']];

    if (
      [
        'Token has expired',
        'The token has been blacklisted',
        'Unauthenticated.'
      ].indexOf(res['error'].message) !== -1
    ) {
      this.userProfileService.clearSession();
      return res;
    }
    if (res['error'].code !== 'case_deleted.') {
      // show errors for 4xx's
      if (String(res.status)[0] === '4') {
        this.errorDialogService.showErrorDialog(messages);
      }
      // if (String(res.status)[0] === '5') {
      //   this.errorHandler.handleError(res['error']);
      // }
    }

    if (res.status === 500) {
      this.errorDialogService.showErrorDialog(messages);
    }
    return res;
  }
}
