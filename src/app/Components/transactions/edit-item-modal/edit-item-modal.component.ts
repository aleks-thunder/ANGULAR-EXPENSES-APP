import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ExpenseItem } from 'src/app/interfaces/expense-item';

import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { ExpenseService } from 'src/app/services/http/expense.service';
import { NotificationService } from 'src/app/services/notification.service';
import { CategoryInterface } from 'src/app/interfaces/category';
import { CategoriesService } from 'src/app/services/http/categories.service';
import { ReactiveFormsBuilder } from 'src/app/helpers/form-bilders';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

const dateFormat = { display: { dateInput: 'll', monthYearLabel: 'MMMM YYYY' } };

@Component({
  selector: 'app-edit-item-modal',
  templateUrl: './edit-item-modal.component.html',
  styleUrls: ['./edit-item-modal.component.scss'],
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

export class EditItemModalComponent implements OnInit {

  categories!: CategoryInterface[]

  editForm!: FormGroup;

  expId?: string =            this.oldExpense._id
  prevDate?: string =         this.oldExpense.date
  prevCategory?: string =     this.oldExpense.category
  prevDescription?: string =  this.oldExpense.description
  prevAmount?: number =       this.oldExpense.amount

  constructor(  
    public dialogRef: MatDialogRef<EditItemModalComponent>,
    @Inject(MAT_DIALOG_DATA) public oldExpense: ExpenseItem,
    private reactiveFormsBuilder: ReactiveFormsBuilder,
    private expenseService: ExpenseService,
    private notification: NotificationService,
    private categoryService: CategoriesService,
    private router: Router
  ) { }
    
  ngOnInit(): void {
    this.editForm = this.reactiveFormsBuilder.formEdit;

    this.categoryService.getCategories().subscribe((res: any) => {
      
      if( Array.isArray(res) && res.length) {
        this.categories = [];
        res.forEach((categoryName: string) => this.categories.push({'name': categoryName}))
        
      } else {
        this.categories = [
          { name: 'Salary'},
          { name: 'Debt'},
          { name: 'Credit'},
          { name: 'Investments'},
        ]; 
      };

      }, err => console.log(err)
    );
  }

  onEdit() {
    this.expenseService.updateExpense(this.expId, this.editForm.value).subscribe(() => {
      this.notification.msgSuccess('Expense','Expense edited successfuly');
      this.router.navigate(['/dashboard']);
    },
    error => {
      this.notification.msgError('Expense',error.error.error);
      console.log(error);
    })
  }

  onCancel() {
    this.dialogRef.close();
  }
}