import { Injectable } from '@angular/core';
import { ConfirmDialogComponent } from '@fe-template/shared/dialogs/confirm-dialog/confirm-dialog.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {
  public bsModalRef: BsModalRef | undefined;

  constructor(private modalService: BsModalService) {
  }

  public showConfirmDialog(message: string, subject?: any): BsModalService {
    const initialState = {
      message,
      subject: subject ? subject : undefined
    };
    this.modalService.show(ConfirmDialogComponent, { initialState });
    
    return this.modalService;
  }
}
