import { Injectable, OnInit } from '@angular/core';
import { ExpenseItem } from '../interfaces/expense-item';
import { ExpenseService } from '../services/http/expense.service';

@Injectable({
  providedIn: 'root'
})

export class Budget implements OnInit {

  private allExpenses?: any;

  // Current
  public amountTotal!: number;
  public amountReceipts?: number;
  public amountExpenses?: number;

  // public monthlyReceipts?: number;
  // public monthlyExpenses?: number;

  public monthlyObject?: any = {};
  public monthlyNames: any;
  public monthlyValues: any;
  public monthlyCategories: any;

  public chartBarData: any;

  constructor(private expenseService: ExpenseService) { }

  ngOnInit() {
  }

  public getAllExpenses() {
    //get from DB
    this.expenseService.getExpense().subscribe((expenseList: any) => {
      // sort by earliest date
      expenseList.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
      this.allExpenses = expenseList
    },
    error => console.log(error));
  }

  public getCurrentBalance() {
    this.amountTotal = this.allExpenses
      .map((item: ExpenseItem)=> Number(item.amount))
      .reduce((acc:number, item: number) => acc + item, 0);
    
    // this.amountReceipts = this.allExpenses
    //   .filter((item: ExpenseItem) => Number(item.amount) > 0)
    //   .map((item: ExpenseItem) => Number(item.amount))
    //   .reduce((acc:number, item: number) => acc + item, 0);

    // this.amountExpenses = this.allExpenses
    //   .filter((item: ExpenseItem) => Number(item.amount) < 0)
    //   .map((item: ExpenseItem)=> Number(item.amount))
    //   .reduce((acc:number, item: number) => acc + item, 0);
  }


  public getMonthlyExpenses() {
    // [month, expense]
    this.allExpenses.forEach((obj: any) => {
      const newDate = new Date(obj.date);
      const monthAndYear = newDate.toLocaleString('en-GB', { month: 'long' }) + ' ' + newDate.getFullYear();
    
      (this.monthlyObject[monthAndYear] && this.monthlyObject[monthAndYear].length)
      ? this.monthlyObject[monthAndYear].push(obj)
      : this.monthlyObject[monthAndYear] = [obj];
    });


    return this.monthlyObject;
  }

  public getMonthsNames() {
    this.monthlyNames = Object.keys(this.monthlyObject);
  }

  public getMonthsValues() {
    this.monthlyValues = Object.entries(this.monthlyObject).map((arrForEachMonth: any) => {
      return arrForEachMonth[1].map((expense: any) => expense.amount);
    })
  }

  public getMonthsCategories() {
    this.monthlyCategories = Object.entries(this.monthlyObject).map((arrForEachMonth: any) => {
      return arrForEachMonth[1].map((expense: any) => expense.category);
    })
  }

  public setChartBarData() {
    
    let result: Array<any> = [];

    let expenseMonth: Array<any> = this.monthlyNames;
    let expenseValues: Array<any> = this.monthlyValues;
    let expenseCategories: Array<any> = this.monthlyCategories;

    let subArray: Array<any> = [];
    let subArray2: Array<any> = [];

    for (let i = 0; i < expenseValues.length; i++) {
      // if 1 expense per month push to subArray => result
      if(expenseValues[i].length == 1) {
        subArray.push([
          {
            "name": expenseCategories[i],
            "value": +expenseValues[i] 
          }
        ])
      } else {
        for (let j = 0; j < expenseValues[i].length; j++) {
          // if more then 1 expense per month push to subArray2 => subArray => result
          subArray2.push({
              "name": expenseCategories[i][j], 
              "value": +expenseValues[i][j] 
            });
        };
        subArray.push(subArray2);
      };
    };

    //combine all together
    for (let i = 0; i < expenseMonth.length; i++) {
      result.push(
        {
          "name": expenseMonth[i],
          "series": subArray[i]
        }
      );
    };
    this.chartBarData = result;
  }


  setCategoriesData(update: boolean = false) {
    // const totals = [];
    // const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    //   'July', 'August', 'September', 'October', 'November', 'December'
    // ];
    // for (const category of this.categories) {
    //   const categorySumByMonth = monthNames.map(e => 0);
    //   const matchingExpenses = this.data.filter(c => c.category === category);
    //   matchingExpenses.forEach(e => {
    //     const expenseDate = new Date(e.date);
    //     if (expenseDate.getFullYear() === this.date.getFullYear()) {
    //       categorySumByMonth[expenseDate.getMonth()] = categorySumByMonth[expenseDate.getMonth()] + <number>e.amount;
    //     }
    //   });
    //   const dataObj = {name: category, data: categorySumByMonth, type: 'line'};
    //   totals.push(dataObj);
    // }
    // this.options.series = totals;
    // this.options.xAxis.categories = monthNames.map(m => `${m} ${this.date.getFullYear()}`);
    // if (update) {
    //   this.chart.update(this.options);
    // }
  }

  // [
  //   {
  //     "name": "Germany",
  //     "series": [
  //       {
  //         "name": "1990",
  //         "value": 20
  //       },
  //       {
  //         "name": "2010",
  //         "value": 30
  //       },
  //       {
  //         "name": "2011",
  //         "value": 40
  //       }
  //     ]
  //   },
  // ]
}
