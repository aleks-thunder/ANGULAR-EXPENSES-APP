import { Component, OnInit } from '@angular/core';
import { ChartsIfс } from 'src/app/interfaces/charts';
import { DataService } from 'src/app/services/chart.service';

@Component({
  selector: 'app-bar-vertical-stacked',
  templateUrl: './bar-vertical-stacked.component.html',
  styleUrls: ['./bar-vertical-stacked.component.scss']
})
export class BarVerticalStackedComponent implements OnInit {

  data: ChartsIfс[] = [];

  // options
  view: [number, number] = [700, 300];
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Month';
  yAxisLabel: string = 'Amount';
  animations: boolean = true;

  colorScheme: any = {
    domain: ["#fd7f6f", "#7eb0d5", "#b2e061", "#bd7ebe", "#ffb55a", "#ffee65", "#beb9db", "#fdcce5", "#8bd3c7"]
  };

  constructor(private dataService: DataService) { }
  
  ngOnInit(): void {
    this.dataService.chartBarData.subscribe((data: ChartsIfс[]) => this.data = data);
  }
}
