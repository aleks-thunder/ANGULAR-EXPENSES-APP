import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/chart.service';
import { ChartsIfс } from 'src/app/interfaces/charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private dataService: DataService) {
  }

  hasData: ChartsIfс[] = []; 

  ngOnInit() {
    this.dataService.setChartsData();
    this.dataService.chartPieData.subscribe((data: ChartsIfс[]) => this.hasData = data);
  }

}
