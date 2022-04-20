import { Component, OnDestroy, OnInit } from '@angular/core';
import { BudgetService } from 'src/app/services/budget.service';

@Component({
  selector: 'app-bar-vertical-stacked',
  templateUrl: './bar-vertical-stacked.component.html',
  styleUrls: ['./bar-vertical-stacked.component.scss']
})
export class BarVerticalStackedComponent implements OnInit, OnDestroy {

  data: Array<any> = [];

  view: [number, number] = [700, 400];

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

  colorScheme?: any = {
    domain: ["#fd7f6f", "#7eb0d5", "#b2e061", "#bd7ebe", "#ffb55a", "#ffee65", "#beb9db", "#fdcce5", "#8bd3c7"]
  };

  constructor(private budgetService: BudgetService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.data = this.budgetService.chartBarData;
      console.log(this.data);
    }, 1500);
  }

  ngOnDestroy(): void {
    this.data = [];
  }

}
