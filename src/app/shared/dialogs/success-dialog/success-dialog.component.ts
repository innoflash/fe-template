import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SuccessModalAction } from '@ricoffy/shared/dialogs/success-dialog.service';

@Component({
  selector: 'ricoffy-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrls: ['./success-dialog.component.scss']
})
export class SuccessDialogComponent {
  public message: string;
  public actions: SuccessModalAction[] = null;
  public title: string = null;

  constructor(public bsModalRef: BsModalRef) {
  }

  callAction(action) {
    if (action()) {
      this.bsModalRef.hide();
    }
  }
}

