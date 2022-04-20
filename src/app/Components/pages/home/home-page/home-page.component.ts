import { Component, OnInit } from '@angular/core';
import { BudgetService } from 'src/app/services/budget.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public amountTotal: number = 0;


  constructor(
    private budgetService: BudgetService) {
  }

  ngOnInit() {
    this.budgetService.getallTransactions();
    
    setTimeout(() => {
      this.amountTotal = this.budgetService.currentAmount;
    }, 500);
  }
}
