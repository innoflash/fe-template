import { Injectable } from '@angular/core';
import { ConfirmDialogConfig, DialogType } from '@fe-template/shared/dialogs/config/dialog-types';
import { DialogComponent } from '@fe-template/shared/dialogs/dialog/dialog.component';
import { DialogService } from '@fe-template/shared/dialogs/services/dialog.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService extends DialogService {
  protected dialogType = DialogType.CONFIRM;

  public openConfirmDialog(message: string, onOkayClicked?: () => void): BsModalRef<DialogComponent>;
  public openConfirmDialog(message: string, confirmDialogConfig?: ConfirmDialogConfig): BsModalRef<DialogComponent>;
  public openConfirmDialog(message: string, title: string, onOkayClicked?: () => void): BsModalRef<DialogComponent>;
  public openConfirmDialog(messages: string[], onOkayClicked?: () => void): BsModalRef<DialogComponent>;
  public openConfirmDialog(messages: string[], confirmDialogConfig?: ConfirmDialogConfig): BsModalRef<DialogComponent>;
  public openConfirmDialog(messages: string[], title: string, onOkayClicked?: () => void): BsModalRef<DialogComponent>;
  public openConfirmDialog(confirmDialogConfig: ConfirmDialogConfig): BsModalRef<DialogComponent>;
  public openConfirmDialog(arg1: unknown, arg2?: unknown, arg3?: unknown): BsModalRef<DialogComponent> {
    return this.openDialog(this.resolveDialogConfig<ConfirmDialogConfig>(arg1, arg2, arg3));
  }
}
