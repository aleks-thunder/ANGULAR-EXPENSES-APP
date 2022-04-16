import { Component, OnInit } from '@angular/core';
import { Budget } from 'src/app/helpers/budget';
// import { single } from './data';


@Component({
  selector: 'app-ngx-charts',
  templateUrl: './ngx-charts.component.html',
  styleUrls: ['./ngx-charts.component.scss']
})
export class NgxChartsComponent implements OnInit {


  data: any = [
    {
      "name": "Germany",
      "value": 8940000
    },
    {
      "name": "USA",
      "value": 5000000
    },
    {
      "name": "France",
      "value": 7200000
    },
    {
      "name": "UK",
      "value": 6200000
    }
  ];

  // single: any[];
  view: any = [1000, 500];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  colorScheme: any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private budget: Budget) {
  }
  ngOnInit(): void {
    // this.budget.getAllExpenses();

    // setTimeout(() => {
      // this.budget.getCurrentBalance();

      // this.budget.getMonthlyExpenses();
      // // console.log(this.budget.monthlyObject);

      // this.budget.getMonthsNames();
      // // console.log(this.budget.monthlyNames);

      // this.budget.getMonthsValues();
      // console.log(this.budget.monthlyValues);

      // this.chartData();
    // }, 300);
  }
  private chartData() {
    let a: any = [];
    // let b = this.budget.monthlyValues.forEach((arr: any) => {
    //   a.push({data: arr})
    // })  
    let arr = this.budget.monthlyValues;
    let arr2 = this.budget.monthlyNames;

    for (let i = 0; i < arr.length; i++) {
      a.push({ data: arr[i], label: arr2[i] });
    }

    console.log(a);

    return this.data = 
    [
      { 
        "name": "mar", 
        "value": 50
      },
      { 
        "name": "apr", 
        "value": 100
      },
      { 
        "name": "may", 
        "value": 200
      },
    ];
  }

}
