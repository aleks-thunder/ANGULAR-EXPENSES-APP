import { Component, OnInit } from '@angular/core';
import { ChartsIfс } from 'src/app/interfaces/charts';
import { DataService } from 'src/app/services/chart.service';

@Component({
  selector: 'app-advanced-pie',
  templateUrl: './advanced-pie.component.html',
  styleUrls: ['./advanced-pie.component.scss']
})

export class AdvancedPieComponent implements OnInit {

  data: ChartsIfс[] = [];
  view: [number, number] = [1000, 300];
  gradient: boolean = false;
  colorScheme: any = {
    domain: ["#fd7f6f", "#7eb0d5", "#b2e061", "#bd7ebe", "#ffb55a", "#ffee65", "#beb9db", "#fdcce5", "#8bd3c7"]
  };

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.chartAdvancedPieData.subscribe((data: ChartsIfс[]) => this.data = data)
  }

}
