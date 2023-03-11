import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { DeleteModalComponents } from "@app/components/modals/delete-modal/delete-modal.component";
import { EditIModalComponent } from "@app/components/modals/edit-modal/edit-modal.component";
import { ExpenseItem } from "@shared/types/expense-item";

@Injectable({
  providedIn: "root",
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  confirmDialog(data: {}): Observable<boolean> {
    return this.dialog
      .open(DeleteModalComponents, {
        data,
        width: "400px",
      })
      .afterClosed();
  }

  editItemDialog(item: ExpenseItem) {
    return this.dialog
      .open(EditIModalComponent, {
        width: "500px",
        height: "650px",
        data: item,
      })
      .afterClosed();
  }
}
