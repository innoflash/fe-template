import { Injectable } from '@angular/core';
import { DialogType, ErrorDialogConfig } from '@fe-template/shared/dialogs/config/dialog-types';
import { DialogComponent } from '@fe-template/shared/dialogs/dialog/dialog.component';
import { DialogService } from '@fe-template/shared/dialogs/services/dialog.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Injectable({
  providedIn: 'root'
})
export class ErrorDialogService extends DialogService {
  protected dialogType = DialogType.ERROR;

  public openErrorDialog(message: string, onOkayClicked?: () => void): BsModalRef<DialogComponent>;
  public openErrorDialog(message: string, title?: string, onOkayClicked?: () => void): BsModalRef<DialogComponent>;
  public openErrorDialog(message: string, errorDialogConfig?: ErrorDialogConfig): BsModalRef<DialogComponent>;
  public openErrorDialog(messages: string[], onOkayClicked?: () => void): BsModalRef<DialogComponent>;
  public openErrorDialog(messages: string[], title?: string, onOkayClicked?: () => void): BsModalRef<DialogComponent>;
  public openErrorDialog(messages: string[], errorDialogConfig?: ErrorDialogConfig): BsModalRef<DialogComponent>;
  public openErrorDialog(errorDialogConfig?: ErrorDialogConfig): BsModalRef<DialogComponent>;
  public openErrorDialog(arg1: unknown, arg2?: unknown, arg3?: unknown): BsModalRef<DialogComponent> {
    return this.openDialog(this.resolveDialogConfig<ErrorDialogConfig>(arg1, arg2, arg3));
  }
}
