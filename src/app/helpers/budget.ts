import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ExpenseItem } from '../interfaces/expense-item';
import { ExpenseService } from '../services/http/expense.service';

@Injectable({
  providedIn: 'root'
})

export class Budget implements OnInit {

  currentBalance!: number;
  fullExpenseList?: any;

  constructor(private expenseService: ExpenseService) { }

  ngOnInit() {
  }

  getAllExpenses() {
    this.expenseService.getExpense().subscribe((expenseList: ExpenseItem) => this.fullExpenseList = expenseList, 
    error => {
      console.log(error);
    });
  }

  getCurrentBalance() {
    return this.currentBalance = this.fullExpenseList
      .map((item: any)=> Number(item.amount))
      .reduce((acc:number, item: number) => acc + item, 0);
  }

}
