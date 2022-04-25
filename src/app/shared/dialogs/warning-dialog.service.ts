import { Injectable } from '@angular/core';
import { WarningDialogComponent } from '@fe-template/shared/dialogs/warning-dialog/warning-dialog.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Injectable()
export class WarningDialogService {
    public bsModalRef: BsModalRef | undefined;

    constructor(private modalService: BsModalService) { }

    public showWarningDialog(message: string, title: string = '', btnLabel: string = ''): BsModalService {
      const initialState = {
        message,
        title,
        btnLabel
      };
      this.modalService.show(WarningDialogComponent, { initialState });
      
      return this.modalService;
    }
}
