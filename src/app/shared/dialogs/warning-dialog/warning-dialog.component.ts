import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'ricoffy-warning-dialog',
  templateUrl: './warning-dialog.component.html',
  styleUrls: ['./warning-dialog.component.scss']
})
export class WarningDialogComponent implements OnInit {
  public title: string;
  public message: string;
  public btnLabel: string;

  constructor(public bsModalRef: BsModalRef) {
  }

  ngOnInit() {
  }

}
