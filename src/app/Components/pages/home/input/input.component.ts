import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { faPen } from '@fortawesome/free-solid-svg-icons';

import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { InputInterface } from 'src/app/interfaces/input';
import { InputHTML} from 'src/app/helpers/input-html';
import { ReactiveFormsBuilder } from 'src/app/helpers/form-bilders';

import { ExpenseItem } from 'src/app/interfaces/expense-item';
import { ExpenseService } from 'src/app/services/http/expense.service';
import { NotificationService } from 'src/app/services/notification.service';
import { CategoryInputHelper } from 'src/app/helpers/category-input-helper';

const dateFormat = { display: { dateInput: 'll', monthYearLabel: 'MMMM YYYY' } };

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { 
      provide: MAT_DATE_FORMATS, 
      useValue: dateFormat 
    },
  ],
})

export class InputComponent implements OnInit {
  
  faPen = faPen;
  
  categories: string = '';
  
  reactiveForm!: FormGroup;
  
  htmlInput:InputInterface[] = this.inputHTML.inputComponent

    
  constructor(
    public fb: FormBuilder,
    private inputHTML: InputHTML,
    private categoryInputHelper: CategoryInputHelper,
    private reactiveFormsBuilder: ReactiveFormsBuilder,
    private expenseService: ExpenseService,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    this.reactiveForm = this.reactiveFormsBuilder.formInputMainPage;
    this.categoryInputHelper.categoriesValue.subscribe(x => this.reactiveForm.get('category')?.setValue(x));
  }

  onSubmit() {
    this.expenseService.addExpense(this.reactiveForm.value).subscribe((response: ExpenseItem) => {
      this.notification.msgSuccess('Expense','Expense created !');
      this.reactiveForm.controls['description'].reset();
      this.reactiveForm.controls['amount'].reset();
    },
    error => {
      this.notification.msgError('Expense',error.error.error)
      console.log(error);
    }
    );
  }


}