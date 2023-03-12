import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";

import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from "@angular/material-moment-adapter";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";

import { InputHTML } from "src/app/shared/helpers/input-html";
import { ReactiveFormsBuilder } from "@shared/helpers/form-bilders";
import { CategoryInputHelper } from "@shared/helpers/category-input-helper";

import { ExpenseService } from "@services/http/expense.service";
import { NotificationService } from "@services/notification.service";
import { DataService } from "@services/chart.service";

import { Input } from "@shared/types/input";

const dateFormat = {
  display: { dateInput: "ll", monthYearLabel: "MMMM YYYY" },
};

@Component({
  selector: "new-expense",
  templateUrl: "./new-expense.component.html",
  styleUrls: ["./new-expense.component.scss"],
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
export class NewExpenseComponent implements OnInit {
  categories: string = "";

  inputForm!: FormGroup;

  htmlInput: Input[] = this.inputHTML.inputComponent;

  constructor(
    private inputHTML: InputHTML,
    private reactiveFormsBuilder: ReactiveFormsBuilder,
    private categoryInputHelper: CategoryInputHelper,
    private notification: NotificationService,
    private expenseService: ExpenseService,
    private dataService: DataService,
  ) {}

  ngOnInit(): void {
    this.inputForm = this.reactiveFormsBuilder.formInputMainPage;
    this.categoryInputHelper.categoriesInput.subscribe(x => this.inputForm.get("category")?.setValue(x));
  }

  onSubmit() {
    this.expenseService.addExpense(this.inputForm.value).subscribe({
      next: () => {
        this.notification.msgSuccess("Expense", "Expense created !");
        this.inputForm.controls["description"].reset();
        this.inputForm.controls["amount"].reset();
        this.dataService.setChartsData();
      },
      error: error => this.notification.msgError("Expense", error.error.error),
    });
  }
}
