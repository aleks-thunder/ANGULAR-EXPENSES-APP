import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { CategoryIfc } from 'src/app/interfaces/category';

import { ExpenseItem } from 'src/app/interfaces/expense-item';
import { SortingIfc } from 'src/app/interfaces/sotring';
import { DataService } from 'src/app/services/chart.service';
import { CategoriesService } from 'src/app/services/http/categories.service';
import { ExpenseService } from 'src/app/services/http/expense.service';
import { NotificationService } from 'src/app/services/notification.service';
import { EditItemModalComponent } from '../edit-item-modal/edit-item-modal.component';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})


export class ExpenseRowComponent implements OnInit {

  categories!: CategoryIfc[];
  expenseList: ExpenseItem = [];
  expenseListCopy: ExpenseItem = [];

  faTrash = faTrash;
  faPenSquare = faPenSquare;

  totalLength: number = 0;
  page: number = 1;

  dateClickCount: number = 0;
  amountClickCount: number = 0;

  searchValue: string = '';

  constructor(
    public  dialog: MatDialog,
    private expenseService: ExpenseService,
    private router: Router,
    private categoryService: CategoriesService,
    private notification: NotificationService,
    private dataService: DataService
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

  onEditBtn( item: ExpenseItem ) {
    this.router.navigate([], {queryParams: [item._id]});
    const dialogRef = this.dialog.open(EditItemModalComponent, {
      width: '500px',
      height: '650px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getExpenses();
    })
  }
  
  onDelBtn( item: ExpenseItem ) {
    
    this.expenseService.deleteExpense(item).subscribe(() => {
      this.notification.msgSuccess('Expense','Expense deleted');
      this.getExpenses();
      this.dataService.setChartsData();
      if(this.expenseList.length == 1) this.router.navigate(['/'])
        .then(() => window.location.reload());
    },
    error => this.notification.msgError('Expense',error.error.error))
  }

  sorting( prop: string, isTrue: boolean ){
    if(isTrue) return (bigger: SortingIfc, smaller: SortingIfc) => 
      bigger[prop] == smaller[prop] ? 0 : bigger[prop] > smaller[prop] ? -1 : 1;

    else return (smaller: SortingIfc, bigger: SortingIfc) => 
      smaller[prop] == bigger[prop] ? 0 : smaller[prop] < bigger[prop] ? -1 : 1;
  }

  sortBy(prop: string) {
    this.dateClickCount += 1;

    this.dateClickCount % 2 === 0
    ? this.expenseList.sort(this.sorting(prop ,true))
    : this.expenseList.sort(this.sorting(prop , false));
  }

  sortByCategory( category: string | undefined ) {
    this.expenseList = this.expenseListCopy.filter((items: ExpenseItem) => items.category === category);
  }

  sortByDefault() {
    return this.getExpenses();
  }

  deleteAll() {
    this.expenseService.deleteAllExpenses().subscribe(() => {
      this.notification.msgSuccess('Expenses','All Expenses deleted');
      this.router.navigate(['/'])
        .then(() => window.location.reload());
    },
    error => console.log(error)
    );
  }

}
