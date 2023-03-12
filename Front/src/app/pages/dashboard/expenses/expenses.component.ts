import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";

import { Category } from "@shared/types/category";

import { ExpenseItem } from "@shared/types/expense-item";
import { DataService } from "@services/chart.service";
import { DialogService } from "@services/dialog.service";
import { CategoriesService } from "@services/http/categories.service";
import { ExpenseService } from "@services/http/expense.service";
import { NotificationService } from "@services/notification.service";
import { SortingService } from "@services/sorting.service";

@Component({
  selector: "app-expenses",
  templateUrl: "./expenses.component.html",
  styleUrls: ["./expenses.component.scss"],
})
export class ExpensesComponent implements OnInit {
  categories: Category[] = [];
  expenseList: ExpenseItem[] = [];
  expenseListCopy: ExpenseItem = [];

  totalLength: number = 0;
  page: number = 1;

  sortClickCount: number = 0;

  searchValue: string = "";

  constructor(
    public dialog: MatDialog,
    private expenseService: ExpenseService,
    private router: Router,
    private categoryService: CategoriesService,
    private notification: NotificationService,
    private dataService: DataService,
    private sortingService: SortingService,
    private dialogService: DialogService,
  ) {}

  ngOnInit(): void {
    this.getExpenses();
    this.categories = this.categoryService.getCategories();
  }

  private getExpenses() {
    this.expenseService.getExpense().subscribe({
      next: (expenseList: ExpenseItem[]) => {
        this.expenseList = expenseList;
        this.expenseListCopy = expenseList;
        this.totalLength = this.getExpenses.length;
      },
      error: error => console.log(error),
    });
  }

  sortBy(prop: string) {
    this.sortingService.sortBy(prop, this.expenseList);
  }

  sortByCategory(category?: string) {
    this.expenseList = this.sortingService.sortByCategory(this.expenseListCopy, category);
  }

  sortByDefault() {
    this.sortingService.sortByDefault(this.getExpenses());
  }

  onEditItemDialog(item: ExpenseItem) {
    this.router.navigate([], { queryParams: [item._id] });
    this.dialogService
      .editItemDialog(item)
      .afterClosed()
      .subscribe(() => this.getExpenses());
  }

  onDelItemBtn(item: ExpenseItem) {
    this.expenseService.deleteExpense(item).subscribe(
      () => {
        this.notification.msgSuccess("Expense", "Expense deleted");
        this.getExpenses();
        this.dataService.setChartsData();
        if (this.expenseList.length == 1) this.router.navigate(["/"]).then(() => window.location.reload());
      },
      error => this.notification.msgError("Expense", error.error.error),
    );
  }

  deleteAllDialog() {
    this.dialogService
      .confirmDialog({
        title: "Are you sure?",
        message: "Are you sure you want to do this?",
        confirmationText: "Yes",
        cancelText: "No",
      })
      .subscribe(yes => {
        if (yes) {
          this.expenseService.deleteAllExpenses().subscribe({
            next: () => {
              this.notification.msgSuccess("Expenses", "All Expenses deleted");
              this.router.navigate(["/"]).then(() => window.location.reload());
            },
            error: error => console.log(error),
          });
        }
      });
  }
}
