import { Component, OnInit } from "@angular/core";
// Services
import { DataService } from "@services/chart.service";
// Types
import { Color, ScaleType } from "@swimlane/ngx-charts";
import { ChartData } from "@shared/types/charts";

@Component({
  selector: "app-pie-chart",
  templateUrl: "./pie-chart.component.html",
})
export class PieChartComponent implements OnInit {
  data: ChartData[] = [];
  view: [number, number] = [500, 300];
  showLabels: boolean = true;
  gradient: boolean = true;
  colorScheme: Color = {
    domain: ["#5AA454", "#A10A28"],
    name: "Pie",
    selectable: false,
    group: ScaleType.Linear,
  };

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.chartPieData.subscribe((data: ChartData[]) => (this.data = data));
  }
}
