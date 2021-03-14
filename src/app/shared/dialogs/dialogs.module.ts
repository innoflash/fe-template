import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogService } from '@ricoffy/shared/dialogs/confirm-dialog.service';
import { ConfirmDialogComponent } from '@ricoffy/shared/dialogs/confirm-dialog/confirm-dialog.component';
import { DialogService } from '@ricoffy/shared/dialogs/dialog.service';
import { ErrorDialogService } from '@ricoffy/shared/dialogs/error-dialog.service';
import { ErrorDialogComponent } from '@ricoffy/shared/dialogs/error-dialog/error-dialog.component';
import { SuccessDialogService } from '@ricoffy/shared/dialogs/success-dialog.service';
import { SuccessDialogComponent } from '@ricoffy/shared/dialogs/success-dialog/success-dialog.component';
import { WarningDialogService } from '@ricoffy/shared/dialogs/warning-dialog.service';
import { WarningDialogComponent } from '@ricoffy/shared/dialogs/warning-dialog/warning-dialog.component';
import { SanitizerErrorMessageService } from '@ricoffy/shared/service/sanitizer-error-message.service';


@NgModule({
  declarations: [
    ConfirmDialogComponent,
    ErrorDialogComponent,
    SuccessDialogComponent,
    WarningDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule
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
