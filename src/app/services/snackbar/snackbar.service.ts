import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackBar: MatSnackBar) { }

  open(type: 'error' | 'info' | 'success', message: string) {
    this._snackBar.open(message , 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 5000,
      panelClass: type
    })
  }

}
