import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DialogsModule } from '@fe-template/shared/dialogs/dialogs.module';
import { FormRequiredDirective } from '@fe-template/shared/directives/form-required.directive';
import { LoadingStateDirective } from '@fe-template/shared/directives/loading-state.directive';
import { LoadingStateService } from '@fe-template/shared/service/global/loading-state.service';


@NgModule({
  declarations: [
    LoadingStateDirective,
    FormRequiredDirective
  ],
  imports: [
    CommonModule,
    DialogsModule
  ],
  exports: [
    LoadingStateDirective,
    FormRequiredDirective
  ],
  providers: [
    LoadingStateService
  ]
})
export class SharedModule {}
