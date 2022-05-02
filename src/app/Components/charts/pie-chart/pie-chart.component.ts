import { Component, OnInit } from '@angular/core';
import { ChartsIfс } from 'src/app/interfaces/charts';
import { DataService } from 'src/app/services/chart.service';
// import { single } from './data';


@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  data: ChartsIfс[] = [];
  view: [number, number] = [500, 300];
  showLabels: boolean = true;
  gradient: boolean = true;
  colorScheme: any = {
    domain: ['#5AA454', '#A10A28']
  };

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.dataService.chartPieData.subscribe((data: ChartsIfс[]) => this.data = data);
  }
 

}
