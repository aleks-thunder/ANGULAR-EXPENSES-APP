import { Component, OnInit } from '@angular/core';
import { ChartService } from 'src/app/services/chart.service';
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

  constructor(private chartService: ChartService) {
  }

  ngOnInit(): void {
    this.chartService.chartPieData.subscribe((data: Array<any>) => this.data = data);
  }
 

}
