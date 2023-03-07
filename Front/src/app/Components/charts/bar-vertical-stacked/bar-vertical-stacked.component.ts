import { Component, OnInit } from "@angular/core";
// Services
import { DataService } from "@services/chart.service";
// Types
import { Color, ScaleType } from "@swimlane/ngx-charts";
import { ChartData } from "@shared/types/charts";

@Component({
  selector: "app-bar-vertical-stacked",
  templateUrl: "./bar-vertical-stacked.component.html",
  styleUrls: ["./bar-vertical-stacked.component.scss"],
})
export class BarVerticalStackedComponent implements OnInit {
  data: ChartData[] = [];

  // options
  view: [number, number] = [700, 300];
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;
  xAxisLabel: string = "Month";
  yAxisLabel: string = "Amount";
  animations: boolean = true;

  colorScheme: Color = {
    domain: ["#fd7f6f", "#7eb0d5", "#b2e061", "#bd7ebe", "#ffb55a", "#ffee65", "#beb9db", "#fdcce5", "#8bd3c7"],
    name: "Bar",
    selectable: false,
    group: ScaleType.Linear,
  };

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.chartBarData.subscribe((data: ChartData[]) => (this.data = data));
  }
}
