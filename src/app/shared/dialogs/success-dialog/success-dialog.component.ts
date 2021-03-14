import { Component, Input } from '@angular/core';
import { SuccessModalAction } from '@fe-template/shared/dialogs/success-dialog.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrls: ['./success-dialog.component.scss']
})
export class SuccessDialogComponent {
  public message: string | undefined;
  public actions: SuccessModalAction[] = [];
  public title = null;

  constructor(public bsModalRef: BsModalRef) {
  }

  callAction(action: () => boolean): void {
    if (action()) {
      this.bsModalRef.hide();
    }
  }
}

