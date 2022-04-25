import { Injectable } from '@angular/core';
import { DialogType, WarningDialogConfig } from '@fe-template/shared/dialogs/config/dialog-types';
import { DialogComponent } from '@fe-template/shared/dialogs/dialog/dialog.component';
import { DialogService } from '@fe-template/shared/dialogs/services/dialog.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Injectable({
  providedIn: 'root'
})
export class WarningDialogService extends DialogService {
  protected dialogType = DialogType.WARNING;

  public openWarningDialog(message: string, onOkayClicked?: () => void): BsModalRef<DialogComponent>;
  public openWarningDialog(message: string, title?: string, onOkayClicked?: () => void): BsModalRef<DialogComponent>;
  public openWarningDialog(message: string, warningDialogConfig?: WarningDialogConfig): BsModalRef<DialogComponent>;
  public openWarningDialog(messages: string[], onOkayClicked?: () => void): BsModalRef<DialogComponent>;
  public openWarningDialog(messages: string[], title?: string, onOkayClicked?: () => void): BsModalRef<DialogComponent>;
  public openWarningDialog(messages: string[], warningDialogConfig?: WarningDialogConfig): BsModalRef<DialogComponent>;
  public openWarningDialog(warningDialogConfig?: WarningDialogConfig): BsModalRef<DialogComponent>;
  public openWarningDialog(arg1: unknown, arg2?: unknown, arg3?: unknown): BsModalRef<DialogComponent> {
    return this.openDialog(this.resolveDialogConfig<WarningDialogConfig>(arg1, arg2, arg3));
  }
}
