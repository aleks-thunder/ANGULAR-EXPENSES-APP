import { Component, OnInit } from "@angular/core";
// Services
import { DataService } from "@services/chart.service";
// Types
import { Color, ScaleType } from "@swimlane/ngx-charts";
import { ChartData } from "@shared/types/charts";

@Component({
  selector: "advanced-pie",
  templateUrl: "./advanced-pie.component.html",
})
export class AdvancedPieComponent implements OnInit {
  data: ChartData[] = [];
  view: [number, number] = [1000, 300];
  gradient: boolean = false;
  colorScheme: Color = {
    domain: ["#fd7f6f", "#7eb0d5", "#b2e061", "#bd7ebe", "#ffb55a", "#ffee65", "#beb9db", "#fdcce5", "#8bd3c7"],
    name: "Advanced-pie",
    selectable: false,
    group: ScaleType.Linear,
  };

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.chartAdvancedPieData.subscribe((data: ChartData[]) => (this.data = data));
  }
}
