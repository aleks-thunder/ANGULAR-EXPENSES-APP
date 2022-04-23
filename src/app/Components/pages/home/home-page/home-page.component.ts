import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BudgetService } from 'src/app/services/budget.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public currentAmount: any = new BehaviorSubject(0)


  constructor(
    private budgetService: BudgetService) {
  }

  ngOnInit() {
    this.budgetService.getallTransactions();
    this.budgetService.currentAmount.subscribe(val => this.currentAmount = val);
  }
}
