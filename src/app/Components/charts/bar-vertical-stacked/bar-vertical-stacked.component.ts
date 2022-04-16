import { Component, OnInit } from '@angular/core';
import { Budget } from 'src/app/helpers/budget';

@Component({
  selector: 'app-bar-vertical-stacked',
  templateUrl: './bar-vertical-stacked.component.html',
  styleUrls: ['./bar-vertical-stacked.component.scss']
})
export class BarVerticalStackedComponent implements OnInit {

  data: any;

  view: any = [700, 400];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Month';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Amount';
  animations: boolean = true;

  colorScheme: any = {
    domain: ['#5AA454', '#C7B42C', '#AAAAAA', 'fff', '000', 'red']
  };

  constructor(private budget: Budget) {
  }

  ngOnInit(): void {
    this.budget.getAllExpenses();

    setTimeout(() => {

      this.budget.getMonthlyExpenses();
      this.budget.getMonthsNames();
      this.budget.getMonthsValues();
      this.budget.getMonthsCategories();
      this.budget.setChartBarData()

      this.data = this.budget.chartBarData
      
    }, 1500);
  }

}
