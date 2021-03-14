import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ErrorDialogComponent } from '@fe-template/shared/dialogs/error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private dialog: MatDialog) {
  }

  public showErrorDialog(message: string): void {
    this.show(ErrorDialogComponent, {
      width: '300px',
      data: { message }
    });
  }

  public showDeleteDialog(component: MatDialogRef<any>): void {
    this.show(component, {
      width: '600px'
    });
  }


  // @ts-ignore
  private show(component, obj, afterClosed = null): void {
    const dialogRef = this.dialog.open(component, obj);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${ result }`);
    });
  }
}
