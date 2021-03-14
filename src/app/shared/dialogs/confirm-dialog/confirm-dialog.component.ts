import { Component, OnInit } from '@angular/core';
import { LoadingStateService } from '@fe-template/shared/service/global/loading-state.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  public subject: Subject<any> | undefined;
  public closure: ((bsModalRef: BsModalRef) => void) | undefined;
  public title = 'Confirmation';
  public message = 'Are you sure?';

  constructor(
    public bsModalRef: BsModalRef,
    private loading: LoadingStateService
  ) {
  }

  ngOnInit(): void {
  }

  public confirm(): void {
    this.loading.start('confirm-dialog-buttons');
    if (this.closure) {
      this.closure(this.bsModalRef);
    }
    if (this.subject) {
      this.subject.next(true);
      this.bsModalRef.hide();
    }
    this.loading.end('confirm-dialog-buttons');
  }
}
