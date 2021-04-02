import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadSpinnerComponent } from '@fe-template/shared/components/load-spinner/load-spinner.component';
import { DialogsModule } from '@fe-template/shared/dialogs/dialogs.module';
import { LoadingStateDirective } from '@fe-template/shared/directives/loading-state.directive';
import { LoadingStateService } from '@fe-template/shared/service/global/loading-state.service';


@NgModule({
  declarations: [
    LoadingStateDirective,
    LoadSpinnerComponent
  ],
  imports: [
    CommonModule,
    DialogsModule
  ],
  exports: [
    LoadingStateDirective,
    LoadSpinnerComponent
  ],
  providers: [
    LoadingStateService
  ]
})
export class SharedModule {}
