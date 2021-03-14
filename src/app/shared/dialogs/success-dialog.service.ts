import { Injectable } from '@angular/core';
import { SuccessDialogComponent } from '@fe-template/shared/dialogs/success-dialog/success-dialog.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

export interface SuccessModalAction {
  title: string;
  action: () => void;
}

@Injectable()
export class SuccessDialogService {
  public bsModalRef: BsModalRef | undefined;

  constructor(private modalService: BsModalService) {
  }

  public showSuccessDialog(message: string, title: string = '', actions: SuccessModalAction[] = []): BsModalService {
    const initialState = {
      message,
      title,
      actions
    };
    // @ts-ignore
    this.modalService.show(SuccessDialogComponent, { initialState });
    return this.modalService;
  }
}
