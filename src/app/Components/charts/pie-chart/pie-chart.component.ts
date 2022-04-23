import { Component, OnInit } from '@angular/core';
import { BudgetService } from 'src/app/services/budget.service';
// import { single } from './data';


@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  data: Array<any> = [];

  view: [number, number] = [500, 300];

  // options
  gradient: boolean = true;
  showLegend: boolean = false;
  isDoughnut: boolean = false;
  legendPosition: any = 'below';

  colorScheme: any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private budgetService: BudgetService) {
  }

  ngOnInit(): void {
    this.budgetService.chartPieData.subscribe((data: Array<any>) => this.data = data);
  }
 

}
