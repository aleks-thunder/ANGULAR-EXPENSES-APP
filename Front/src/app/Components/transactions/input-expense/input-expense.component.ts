import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";

import { faPen } from "@fortawesome/free-solid-svg-icons";

import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from "@angular/material-moment-adapter";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { Input } from "@shared/types/input";
import { InputHTML } from "src/app/shared/helpers/input-html";
import { ReactiveFormsBuilder } from "@shared/helpers/form-bilders";

import { ExpenseService } from "@services/http/expense.service";
import { NotificationService } from "@services/notification.service";
import { CategoryInputHelper } from "src/app/shared/helpers/category-input-helper";
import { DataService } from "@services/chart.service";

const dateFormat = {
  display: { dateInput: "ll", monthYearLabel: "MMMM YYYY" },
};

@Component({
  selector: "app-input-expense",
  templateUrl: "./input-expense.component.html",
  styleUrls: ["./input-expense.component.scss"],
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
export class InputExpenseComponent implements OnInit {
  faPen = faPen;

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
