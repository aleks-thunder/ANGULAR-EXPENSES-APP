import { Component, OnInit } from '@angular/core';
import { ChartsIfс } from 'src/app/interfaces/charts';
import { DataService } from 'src/app/services/chart.service';

@Component({
  selector: 'app-number-chart',
  templateUrl: './number-chart.component.html',
  styleUrls: ['./number-chart.component.scss']
})
export class NumberChartComponent implements OnInit {

  data: ChartsIfс[] = [];

  view: [number, number] = [1800, 150];
  animations: boolean = false;
  colorScheme: any = {
    domain: ["#e60049", "#0bb4ff", "#50e991", "#e6d800", "#9b19f5", "#ffa300", "#dc0ab4", "#b3d4ff", "#00bfa0"]
  };
  cardColor: string = '#f4ff4db3';
  textColor: string = 'black';

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.dataService.chartNumberData.subscribe((data: ChartsIfс[]) => this.data = data)
  }

}
