import { Component, OnInit } from '@angular/core';
import { LoadingStateService } from '@ricoffy/shared/service/global/loading-state.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'ricoffy-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  public subject: Subject<any>;
  public closure: (bsModalRef: BsModalRef) => void;
  public title = 'Confirmation';
  public message = 'Are you sure?';

  constructor(
    public bsModalRef: BsModalRef,
    private loading: LoadingStateService
  ) {
  }

  ngOnInit() {
  }

  public confirm() {
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
