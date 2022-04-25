import { Injectable } from '@angular/core';
import { DialogType, SuccessDialogConfig } from '@fe-template/shared/dialogs/config/dialog-types';
import { DialogComponent } from '@fe-template/shared/dialogs/dialog/dialog.component';
import { DialogService } from '@fe-template/shared/dialogs/services/dialog.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Injectable({
  providedIn: 'root'
})
export class SuccessDialogService extends DialogService {
  protected dialogType = DialogType.SUCCESS;

  public openSuccessDialog(message: string, onOkayClicked?: () => void): BsModalRef<DialogComponent>;
  public openSuccessDialog(message: string, title?: string, onOkayClicked?: () => void): BsModalRef<DialogComponent>;
  public openSuccessDialog(message: string, successDialogConfig?: SuccessDialogConfig): BsModalRef<DialogComponent>;
  public openSuccessDialog(messages: string[], onOkayClicked?: () => void): BsModalRef<DialogComponent>;
  public openSuccessDialog(messages: string[], title?: string, onOkayClicked?: () => void): BsModalRef<DialogComponent>;
  public openSuccessDialog(message: string[], successDialogConfig?: SuccessDialogConfig): BsModalRef<DialogComponent>;
  public openSuccessDialog(successDialogConfig?: SuccessDialogConfig): BsModalRef<DialogComponent>;
  public openSuccessDialog(arg1: unknown, arg2?: unknown, arg3?: unknown): BsModalRef<DialogComponent> {
    return this.openDialog(this.resolveDialogConfig<SuccessDialogConfig>(arg1, arg2, arg3));
  }
}
