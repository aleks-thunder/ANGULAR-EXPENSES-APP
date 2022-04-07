import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BudgetItem } from 'src/app/models/budget-item.model';
import { ExpenseService } from 'src/app/services/http/expense.service';

@Component({
  selector: 'app-expense-row',
  templateUrl: './expense-row.component.html',
  styleUrls: ['./expense-row.component.scss']
})


export class ExpenseRowComponent implements OnInit {

  
  @Input()  item!: BudgetItem;
  @Output() delBtnClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() cardClick: EventEmitter<any> = new EventEmitter<any>();
  
  expenseList?: any;

  constructor(
    private expenseService: ExpenseService
    ) { }

  ngOnInit(): void {
    this.getExpenses() 
  }

  
  getExpenses() {
    this.expenseService.getExpenseFromDB().subscribe((expenseList: any ) => {
      this.expenseList = expenseList;
      console.log(expenseList);
      
    }, error => {
      console.log(error);
      
    });
  }

  onDelBtnClick() {
     this.delBtnClick.emit();
  }

  onCardClick() {
    this.cardClick.emit();
  }

}
