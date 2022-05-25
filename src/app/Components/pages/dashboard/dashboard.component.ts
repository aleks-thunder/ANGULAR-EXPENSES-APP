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

  hasData: number = 0;

  ngOnInit():void {
    this.dataService.setChartsData();
    setTimeout(() => {
      this.dataService.chartPieData.subscribe((data: ChartsIfс[]) => {
        data.length > 0 ? this.show(1) : this.show(-1);
      });
    }, 500);
  }

  show(data: number): number {
    return this.hasData = data;
  }
}
