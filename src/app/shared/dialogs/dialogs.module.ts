import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogService } from '@fe-template/shared/dialogs/confirm-dialog.service';
import { ConfirmDialogComponent } from '@fe-template/shared/dialogs/confirm-dialog/confirm-dialog.component';
import { DialogService } from '@fe-template/shared/dialogs/dialog.service';
import { ErrorDialogService } from '@fe-template/shared/dialogs/error-dialog.service';
import { ErrorDialogComponent } from '@fe-template/shared/dialogs/error-dialog/error-dialog.component';
import { SuccessDialogService } from '@fe-template/shared/dialogs/success-dialog.service';
import { SuccessDialogComponent } from '@fe-template/shared/dialogs/success-dialog/success-dialog.component';
import { WarningDialogService } from '@fe-template/shared/dialogs/warning-dialog.service';
import { WarningDialogComponent } from '@fe-template/shared/dialogs/warning-dialog/warning-dialog.component';
import { SanitizerErrorMessageService } from '@fe-template/shared/service/sanitizer-error-message.service';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    ConfirmDialogComponent,
    ErrorDialogComponent,
    SuccessDialogComponent,
    WarningDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    ModalModule.forRoot()
  ],
  providers: [
    DialogService,
    ErrorDialogService,
    SuccessDialogService,
    WarningDialogService,
    SanitizerErrorMessageService,
    ConfirmDialogService
  ]
})
export class DialogsModule {
}
