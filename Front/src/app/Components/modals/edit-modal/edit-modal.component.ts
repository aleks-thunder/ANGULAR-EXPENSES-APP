import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ExpenseItem } from "@shared/types/expense-item";

import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from "@angular/material-moment-adapter";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";

import { ExpenseService } from "@services/http/expense.service";
import { NotificationService } from "@services/notification.service";
import { Category } from "@shared/types/category";
import { CategoriesService } from "@services/http/categories.service";
import { ReactiveFormsBuilder } from "@shared/helpers/form-bilders";
import { FormGroup } from "@angular/forms";
import { DataService } from "@services/chart.service";

const dateFormat = {
  display: { dateInput: "ll", monthYearLabel: "MMMM YYYY" },
};

@Component({
  selector: "app-edit-modal",
  templateUrl: "./edit-modal.component.html",
  styleUrls: ["./edit-modal.component.scss"],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: dateFormat,
    },
  ],
})
export class EditIModalComponent implements OnInit {
  categories!: Category[];

  editForm!: FormGroup;

  expId?: string = this.oldExpense._id;
  prevDate?: string = this.oldExpense.date;
  prevCategory?: string = this.oldExpense.category;
  prevDescription?: string = this.oldExpense.description;
  prevAmount?: number = this.oldExpense.amount;

  constructor(
    @Inject(MAT_DIALOG_DATA) public oldExpense: ExpenseItem,
    public dialogRef: MatDialogRef<EditIModalComponent>,
    private reactiveFormsBuilder: ReactiveFormsBuilder,
    private expenseService: ExpenseService,
    private notification: NotificationService,
    private categoryService: CategoriesService,
    private dataService: DataService,
  ) {}

  ngOnInit(): void {
    this.categories = this.categoryService.getCategories();
    this.editForm = this.reactiveFormsBuilder.formEdit;
  }

  onEdit() {
    this.expenseService.updateExpense(this.expId, this.editForm.value).subscribe({
      next: () => {
        this.notification.msgSuccess("Expense", "Expense edited successfuly");
        this.dataService.setChartsData();
        this.closeDialog();
      },
      error: error => this.notification.msgError("Expense", error.error.error),
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
