import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DialogComponent } from '@fe-template/shared/dialogs/dialog/dialog.component';
import { DialogIconPipe } from '@fe-template/shared/dialogs/pipes/dialog-icon.pipe';
import { DialogStringToHtmlPipe } from '@fe-template/shared/dialogs/pipes/dialog-string-to-html.pipe';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    DialogComponent,
    DialogIconPipe,
    DialogStringToHtmlPipe
  ],
  imports: [
    CommonModule,
    ModalModule.forChild()
  ],
  exports: [
    DialogIconPipe,
    DialogStringToHtmlPipe
  ]
})
export class DialogsModule {}
