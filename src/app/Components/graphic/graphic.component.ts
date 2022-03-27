import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.scss']
})
export class GraphicComponent implements OnInit {

  public data: ChartDataset[] = [
    {data: [10, 5, 20, 30], label: 'a1'},
    {data: [20, 5, 15, 20], label: 'a2'}
  ];
  public labels: string[] = ['jan', 'feb', 'mar'];
  public options: ChartOptions = {
    scales: {
      y: { beginAtZero: true}
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
