import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ExpenseItem } from 'src/app/interfaces/expense-item';

import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { ExpenseService } from 'src/app/services/http/expense.service';
import { NotificationService } from 'src/app/services/notification.service';
import { InputComponent } from '../../pages/home/input/input.component';

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

  editedItem?: ExpenseItem;

  constructor(  
    public dialogRef: MatDialogRef<EditItemModalComponent>,
    @Inject(MAT_DIALOG_DATA) public expense: ExpenseItem,
    private expenseService: ExpenseService,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {

  }

  onSave(expense: ExpenseItem) {
    console.log(expense);
    
    this.expenseService.updateExpense(expense).subscribe(() => {
      this.notification.msgSuccess('Expense','Expense edited successfuly');
    },
    error => {
      this.notification.msgError('Expense',error.error.error);
      console.log(error);
    })
  }

}