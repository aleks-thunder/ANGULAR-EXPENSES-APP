import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/chart.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  currentAmount: number = 0;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.dataService.setChartsData();
    this.dataService.currentAmount.subscribe((value: number) => this.currentAmount = value);
  }
}
