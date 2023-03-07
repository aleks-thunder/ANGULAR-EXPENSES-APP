import { Component, OnInit } from "@angular/core";
import { DataService } from "@services/chart.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  currentAmount: number = 0;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.setChartsData();
    this.dataService.currentAmount.subscribe((value: number) => (this.currentAmount = value));
  }
}
