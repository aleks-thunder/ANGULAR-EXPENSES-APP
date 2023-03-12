import { Component, OnInit } from "@angular/core";
// Services
import { DataService } from "@services/chart.service";
// Types
import { Color, ScaleType } from "@swimlane/ngx-charts";
import { ChartData } from "@shared/types/charts";

@Component({
  selector: "number-chart",
  templateUrl: "./number-chart.component.html",
  styleUrls: ["./number-chart.component.scss"],
})
export class NumberChartComponent implements OnInit {
  data: ChartData[] = [];

  view: [number, number] = [1800, 150];
  animations: boolean = false;
  colorScheme: Color = {
    domain: ["#e60049", "#0bb4ff", "#50e991", "#e6d800", "#9b19f5", "#ffa300", "#dc0ab4", "#b3d4ff", "#00bfa0"],
    name: "Number",
    selectable: false,
    group: ScaleType.Linear,
  };

  cardColor: string = "#f4ff4db3";
  textColor: string = "black";

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.chartNumberData.subscribe((data: ChartData[]) => (this.data = data));
  }
}
