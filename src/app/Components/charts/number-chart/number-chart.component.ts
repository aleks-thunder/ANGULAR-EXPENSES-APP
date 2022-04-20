import { Component, OnInit } from '@angular/core';
import { BudgetService } from 'src/app/services/budget.service';

@Component({
  selector: 'app-number-chart',
  templateUrl: './number-chart.component.html',
  styleUrls: ['./number-chart.component.scss']
})
export class NumberChartComponent implements OnInit {

  data: Array<any> = [];

  view: [number, number] = [1800, 150];
  animations: boolean = false;
  colorScheme: any = {
    domain: ["#e60049", "#0bb4ff", "#50e991", "#e6d800", "#9b19f5", "#ffa300", "#dc0ab4", "#b3d4ff", "#00bfa0"]
  };
  cardColor: string = '#2f2e29';

  constructor(private budgetService: BudgetService) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.data = this.budgetService.chartNumberData;
    }, 1500);
  }

}
