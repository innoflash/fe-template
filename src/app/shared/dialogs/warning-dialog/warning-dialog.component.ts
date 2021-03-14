import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-warning-dialog',
  templateUrl: './warning-dialog.component.html',
  styleUrls: ['./warning-dialog.component.scss']
})
export class WarningDialogComponent implements OnInit {
  public title: string | undefined;
  public message: string | undefined;
  public btnLabel: string | undefined;

  constructor(public bsModalRef: BsModalRef) {
  }

  ngOnInit(): void {
  }

}
