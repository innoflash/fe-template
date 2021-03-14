import { Injectable } from '@angular/core';
import { SanitizerErrorMessageService } from '@fe-template/shared/service/sanitizer-error-message.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Injectable()
export class ErrorDialogService {
  public bsModalRef: BsModalRef | undefined;

  constructor(private modalService: BsModalService, private sanitizerErrorMessage: SanitizerErrorMessageService) {
  }

  public showErrorDialog(messages: string[] | string): BsModalRef {
    // tslint:disable-next-line:no-non-null-assertion
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

  public showErrorDialogFromResponse(res: any): BsModalRef {
    const messages = this.sanitizerErrorMessage.sanitizeMessage(res);
    return this.showErrorDialog(messages);
  }
}
