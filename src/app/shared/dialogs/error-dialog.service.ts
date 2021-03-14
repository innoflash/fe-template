import { Injectable } from '@angular/core';
import { ErrorDialogComponent } from '@ricoffy/shared/dialogs/error-dialog/error-dialog.component';
import { SanitizerErrorMessageService } from '@ricoffy/shared/service/sanitizer-error-message.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Injectable()
export class ErrorDialogService {
  public bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService, private sanitizerErrorMessage: SanitizerErrorMessageService) {
  }

  public showErrorDialog(messages: string[] | string) {
    if (messages ! instanceof Array) {
      // @ts-ignore
      messages = [messages];
    }
    const config = {
      initialState: {
        messages
      }
    };
    // @ts-ignore
    this.bsModalRef = this.modalService.show(ErrorDialogComponent, config);
    return this.bsModalRef;
  }

  public showErrorDialogFromResponse(res: any) {
    const messages = this.sanitizerErrorMessage.sanitizeMessage(res);
    return this.showErrorDialog(messages);
  }
}
