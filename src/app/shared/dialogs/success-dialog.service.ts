import { Injectable } from '@angular/core';
import { SuccessDialogComponent } from '@ricoffy/shared/dialogs/success-dialog/success-dialog.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

export interface SuccessModalAction {
  title: string;
  action: () => void;
}

@Injectable()
export class SuccessDialogService {
  public bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) {
  }

  public showSuccessDialog(message: string, title: string = null, actions: SuccessModalAction[] = null) {
    const initialState = {
      message,
      title,
      actions
    };
    this.modalService.show(SuccessDialogComponent, { initialState });
    return this.modalService;
  }
}
