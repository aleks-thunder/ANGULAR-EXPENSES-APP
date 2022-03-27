import { Component, OnInit } from '@angular/core';
import { BudgetItem } from 'src/app/models/budget-item.model';
import { EditedExpense } from 'src/app/interfaces/edited-expense';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  budgetItems: BudgetItem[] = new Array<BudgetItem>();
  totalBudget: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  addItem(newItem: BudgetItem) {
    
    this.budgetItems.push(newItem);

    this.totalBudget += newItem.amount;
  };
  
  deleteItem(item: BudgetItem) {
    
    let index = this.budgetItems.indexOf(item);
    this.budgetItems.splice(index, 1);
    this.totalBudget -= item.amount;
  }

  updateItem(UpdateEvent: EditedExpense) {
    this.budgetItems[this.budgetItems.indexOf (UpdateEvent.old)] = UpdateEvent.new;
    this.totalBudget -= UpdateEvent.old.amount;
    this.totalBudget += UpdateEvent.new.amount;
  }

}
