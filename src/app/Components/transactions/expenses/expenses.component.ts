import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { CategoryIfc } from 'src/app/interfaces/category';

import { ExpenseItem } from 'src/app/interfaces/expense-item';
import { DataService } from 'src/app/services/chart.service';
import { DialogService } from 'src/app/services/dialog.service';
import { CategoriesService } from 'src/app/services/http/categories.service';
import { ExpenseService } from 'src/app/services/http/expense.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SortingService } from 'src/app/services/sorting.service';
import { EditItemComponent } from '../../dialog/edit-item/edit-item.component';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})


export class ExpenseComponent implements OnInit {

  categories: CategoryIfc[] = [];
  expenseList: ExpenseItem = [];
  expenseListCopy: ExpenseItem = [];

  faTrash = faTrash;
  faPenSquare = faPenSquare;

  totalLength: number = 0;
  page: number = 1;

  sortClickCount: number = 0;

  searchValue: string = '';

  constructor(
    public  dialog: MatDialog,
    private expenseService: ExpenseService,
    private router: Router,
    private categoryService: CategoriesService,
    private notification: NotificationService,
    private dataService: DataService,
    private sortServ: SortingService,
    private dialogService: DialogService
    ) { }

  ngOnInit(): void {
    this.getExpenses();
    this.categories = this.categoryService.getCategories();
  }
  
  private getExpenses() {
    this.expenseService.getExpense().subscribe((getExpenses: ExpenseItem ) => {
      this.expenseList = getExpenses;
      this.expenseListCopy = getExpenses;
      this.totalLength = this.getExpenses.length;
    },
       error => console.log(error));
  }

  sortBy(prop: string) {
    this.sortServ.sortBy( prop, this.expenseList )
  }

  sortByCategory( category: string | undefined ) {
    this.expenseList = this.sortServ.sortByCategory( this.expenseList, this.expenseListCopy, category )
  }

  sortByDefault() {
    this.sortServ.sortByDefault( this.getExpenses() )
  }

  onEditItemDialog( item: ExpenseItem,  ) {
    this.router.navigate([], {queryParams: [item._id]});

    this.dialogService.editItemDialog(item).afterClosed().subscribe(result => {
      this.getExpenses();
    })
  }
  
  onDelItemBtn( item: ExpenseItem ) {
    this.expenseService.deleteExpense( item ).subscribe(() => {
      this.notification.msgSuccess('Expense','Expense deleted');
      this.getExpenses();
      this.dataService.setChartsData();
      if( this.expenseList.length == 1 ) this.router.navigate(['/'])
        .then(() => window.location.reload());
    },
    error => this.notification.msgError('Expense',error.error.error))
  }

  deleteAllDialog() {
    this.dialogService.confirmDialog({
      title: 'Are you sure?',
      message: 'Are you sure you want to do this?',
      confirmCaption: 'Yes',
      cancelCaption: 'No',
    })
    .subscribe((yes) => {
      if(yes) {
        this.expenseService.deleteAllExpenses().subscribe(() => {
          this.notification.msgSuccess('Expenses','All Expenses deleted');
          this.router.navigate(['/'])
            .then(() => window.location.reload());
        },
        error => console.log(error)
        );
      }
    });
  }

}