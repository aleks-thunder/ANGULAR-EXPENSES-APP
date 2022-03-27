import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { faPen } from '@fortawesome/free-solid-svg-icons';

import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { BudgetItem } from 'src/app/models/budget-item.model';
import { InputCategoryService } from 'src/app/services/input-category.service';
import { InputInterface } from 'src/app/interfaces/input';
import { InputHTML} from 'src/app/helpers/input-html';
import { ReactiveFormsBuilder } from 'src/app/helpers/form-bilders';

const dateFormat = {
  display: {
    dateInput: 'll',
    monthYearLabel: 'MMMM YYYY',
  },
};

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

    { provide: MAT_DATE_FORMATS, useValue: dateFormat },
  ],
})

export class InputComponent implements OnInit {
  
  faPen = faPen;
  
  categories: string = '';
  
  reactiveForm!: FormGroup;
  
  htmlInput:InputInterface[] = this.InputHTML.inputComponent

  uniqueID = () => (new Date().getTime()).toString(36) + Math.random().toString(16).slice(2);
  
  @Input() item: BudgetItem = new BudgetItem(new Date().toISOString(),this.categories,'',NaN,this.uniqueID());
    
  @Output() formSubmit: EventEmitter<BudgetItem> = new EventEmitter<BudgetItem>();
    
  constructor(
    public fb: FormBuilder,
    private InputHTML: InputHTML,
    private InputCategoryService: InputCategoryService,
    private ReactiveFormsBuilder: ReactiveFormsBuilder
  ) { }

  ngOnInit(): void {
    this.reactiveForm = this.ReactiveFormsBuilder.formInputMainPage;

    this.InputCategoryService.categoriesValue.subscribe(x => this.reactiveForm.get('category')?.setValue(x));
  }

  onSubmit() {
    this.ReactiveFormsBuilder.onSubmit(this.reactiveForm);
    this.reactiveForm.controls['description'].reset();
    this.reactiveForm.controls['amount'].reset();
    this.reactiveForm.controls['id'].setValue(this.uniqueID());
    this.reactiveForm.controls['id'].reset();
  }
}