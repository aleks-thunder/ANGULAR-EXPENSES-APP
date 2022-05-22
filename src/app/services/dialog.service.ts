import { HostListener, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DeleteConfirmationComponent } from '../Components/dialog/delete-confirmation/delete-confirmation.component';
import { EditItemComponent } from '../Components/dialog/edit-item/edit-item.component';
import { ExpenseItem } from '../interfaces/expense-item';
// import { ConfirmDelete } from '../interfaces/deleteConfirm';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) {}

  confirmDialog(data: {}): Observable<boolean> {
    return this.dialog
      .open(DeleteConfirmationComponent, {
        data,
        width: '400px'
      })
      .afterClosed();
  }

  editItemDialog(item: ExpenseItem){
    return this.dialog
      .open(EditItemComponent, {
        width: '500px',
        height: '650px',
        data: item
      })
      // .afterClosed()
  }
}
