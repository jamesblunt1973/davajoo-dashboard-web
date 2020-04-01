import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class UiService {

  constructor(private snackBar: MatSnackBar) { }

  showSuccessSnack(msg: string) {
    this.showSnackBar(msg, 'success-snack-bar');
  }

  showErrorSnack(msg: string) {
    this.showSnackBar(msg, 'error-snack-bar');
  }

  showWarningSnack(msg: string) {
    this.showSnackBar(msg, 'warn-snack-bar');
  }

  private showSnackBar(msg: string, className: string) {
    this.snackBar.open(msg, null, {
      duration: 4000,
      direction: 'rtl',
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: className
    });
  }
}
