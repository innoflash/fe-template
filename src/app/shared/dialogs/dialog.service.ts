import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private dialog: MatDialog) {
  }

  public showErrorDialog(message: string) {
    this.show(ErrorDialogComponent, {
      width: '300px',
      data: { message }
    });
  }

  public showDeleteDialog(component: MatDialogRef<any>) {
    this.show(component, {
      width: '600px'
    });
  }


  private show(component, obj, afterClosed = null) {
    const dialogRef = this.dialog.open(component, obj);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${ result }`);
    });
  }
}
