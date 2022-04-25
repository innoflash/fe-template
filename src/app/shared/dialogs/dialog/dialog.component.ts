import { Component, SkipSelf } from '@angular/core';
import { DialogType, TextAndClass } from '@fe-template/shared/dialogs/config/dialog-types';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'fe-template-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  public dialogType!: DialogType;
  public icon!: string;
  public title!: TextAndClass;
  public message!: TextAndClass;
  public okButton!: TextAndClass;
  public cancelButton!: TextAndClass;

  public constructor(
    public readonly bsModalRef: BsModalRef<DialogComponent>,
    @SkipSelf() private modalService: BsModalService
  ) {
  }

  public onOkayClicked(): void {
    this.modalService.setDismissReason('ok-clicked');
    this.bsModalRef.hide();
  }

  public get showCancelButton(): boolean {
    return this.dialogType === DialogType.CONFIRM;
  }
}
