import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPenSquare } from '@fortawesome/free-solid-svg-icons';

import { ExpenseItem } from 'src/app/interfaces/expense-item';
import { ExpenseService } from 'src/app/services/http/expense.service';
import { NotificationService } from 'src/app/services/notification.service';
import { EditItemModalComponent } from '../edit-item-modal/edit-item-modal.component';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})


export class ExpenseRowComponent implements OnInit {

  expenseList?: any;
  faTrash = faTrash;
  faPenSquare = faPenSquare;

  constructor(
    public  dialog: MatDialog,
    private expenseService: ExpenseService,
    private router: Router,
    private notification: NotificationService
    ) { }

  ngOnInit(): void {
    this.getExpenses();
  }

  
  getExpenses() {
    this.expenseService.getExpense().subscribe((getExpense: ExpenseItem ) => this.expenseList = getExpense,
       error => console.log(error));
  }


  onEditBtn( item: ExpenseItem ) {
    this.router.navigate(['/dashboard', item._id]);

    const dialogRef = this.dialog.open(EditItemModalComponent, {
      width: '500px',
      height: '650px',
      data: item
    });
  }
  
  onDelBtn(item: ExpenseItem ) {
    this.router.navigate(['/dashboard', item._id]);

    this.expenseService.deleteExpense(item).subscribe(() => {
      this.notification.msgSuccess('Expense','Expense deleted');
    },
    error => this.notification.msgError('Expense',error.error.error))

    this.router.navigate(['/dashboard']);
  }

}
