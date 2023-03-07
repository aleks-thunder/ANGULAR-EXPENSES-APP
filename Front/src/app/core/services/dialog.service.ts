import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { DeleteConfirmationComponent } from "src/app/components/modals/delete-confirmation/delete-confirmation.component";
import { EditItemComponent } from "src/app/components/modals/edit-item/edit-item.component";
import { ExpenseItem } from "@shared/types/expense-item";

@Injectable({
  providedIn: "root",
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  confirmDialog(data: {}): Observable<boolean> {
    return this.dialog
      .open(DeleteConfirmationComponent, {
        data,
        width: "400px",
      })
      .afterClosed();
  }

  editItemDialog(item: ExpenseItem) {
    return this.dialog.open(EditItemComponent, {
      width: "500px",
      height: "650px",
      data: item,
    });
    // .afterClosed()
  }
}
