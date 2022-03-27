import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BudgetItem } from 'src/app/models/budget-item.model';

@Component({
  selector: 'app-expense-row',
  templateUrl: './expense-row.component.html',
  styleUrls: ['./expense-row.component.scss']
})


export class ExpenseRowComponent implements OnInit {

  
  @Input()  item!: BudgetItem;
  @Output() delBtnClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() cardClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onDelBtnClick() {
     this.delBtnClick.emit();
  }

  onCardClick() {
    this.cardClick.emit();
    
  }
}
