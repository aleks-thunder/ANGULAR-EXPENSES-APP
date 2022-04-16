import { Component, OnInit } from '@angular/core';
import { Budget } from 'src/app/helpers/budget';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public amountTotal: number = 0;


  constructor(private budget:Budget) { }

  ngOnInit(): void {
    this.budget.getAllExpenses();
    
    setTimeout(() => {
      this.budget.getCurrentBalance();
      this.amountTotal = this.budget.amountTotal;

      // this.budget.getMonthlyExpenses();
      // // console.log(this.budget.monthlyObject)
      
      // this.budget.getMonthsNames();

      // // console.log(this.budget.monthlyNames);
      
      // this.budget.getMonthsValue();
      // // console.log(this.budget.monthlyValues);
      

      // this.budget.getMonthsCategories()
      // // console.log(this.budget.monthlyCategories);
      
    }, 500);
  }

}
