import { Component, OnInit } from '@angular/core';
import { Budget } from 'src/app/helpers/budget';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  currentBalance: number = 0;

  constructor(private budget:Budget) { }

  ngOnInit(): void {
    this.budget.getAllExpenses();
    
    setTimeout(() => {
      this.budget.getCurrentBalance();
      this.currentBalance = this.budget.currentBalance;
    }, 500);

    
  }

}
