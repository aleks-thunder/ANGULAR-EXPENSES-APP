import { Component, OnInit } from "@angular/core";
import { DataService } from "@services/chart.service";
import { ChartData } from "@shared/types/charts";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  constructor(private dataService: DataService) {}

  hasData: number = 0;

  ngOnInit(): void {
    this.dataService.setChartsData();
    setTimeout(() => {
      this.dataService.chartPieData.subscribe((data: ChartData[]) => {
        data.length > 0 ? this.show(1) : this.show(-1);
      });
    }, 500);
  }

  show(data: number): number {
    return (this.hasData = data);
  }
}
