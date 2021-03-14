import { Injectable } from '@angular/core';
import { WarningDialogComponent } from '@ricoffy/shared/dialogs/warning-dialog/warning-dialog.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Injectable()
export class WarningDialogService {
    public bsModalRef: BsModalRef;

    constructor(private modalService: BsModalService) { }

    public showWarningDialog(message: string, title: string = null, btnLabel: string = null) {
        const initialState = {
            message,
            title,
            btnLabel
        };
        this.modalService.show(WarningDialogComponent, { initialState });
        return this.modalService;
    }
}
