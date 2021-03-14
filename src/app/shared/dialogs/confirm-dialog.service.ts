import { Injectable } from '@angular/core';
import { ConfirmDialogComponent } from '@ricoffy/shared/dialogs/confirm-dialog/confirm-dialog.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {
  public bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) {
  }

  public showConfirmDialog(message: string, subject?) {
    const initialState = {
      message,
      subject: subject ? subject : undefined
    };
    this.modalService.show(ConfirmDialogComponent, { initialState });
    return this.modalService;
  }
}
