import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadSpinnerComponent } from '@fe-template/shared/components/load-spinner/load-spinner.component';
import { DialogsModule } from '@fe-template/shared/dialogs/dialogs.module';
import { LoadingStateDirective } from '@fe-template/shared/directives/loading-state.directive';
import { StringToHtmlPipe } from '@fe-template/shared/pipes/string-to-html.pipe';
import { SessionStorageService } from '@fe-template/shared/services/session-storage.service';
import { StorageService } from '@fe-template/shared/services/storage.service';


@NgModule({
  declarations: [
    LoadingStateDirective,
    LoadSpinnerComponent,
    StringToHtmlPipe
  ],
  imports: [
    CommonModule,
    DialogsModule
  ],
  exports: [
    LoadingStateDirective,
    StringToHtmlPipe,
    LoadSpinnerComponent
  ],
  providers: [
    {
      provide: StorageService,
      useClass: SessionStorageService
    }
  ]
})
export class SharedModule {}
