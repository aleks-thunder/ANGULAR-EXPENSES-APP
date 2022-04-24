import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChartService } from 'src/app/services/chart.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public currentAmount: any = new BehaviorSubject(0)


  constructor(
    private chartService: ChartService) {
  }

  ngOnInit() {
    this.chartService.getallTransactions();
    this.chartService.currentAmount.subscribe(val => this.currentAmount = val);
  }
}
