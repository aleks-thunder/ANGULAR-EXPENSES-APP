import { Injectable } from '@angular/core';
import { ExpenseItem } from '../interfaces/expense-item';
import { ExpenseService } from './http/expense.service';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})

export class ChartService {

  // Current
  private allTransactions: any;
  currentAmount = new BehaviorSubject<number>(0);
  allReceipts: number = 0
  allExpenses: number = 0

  monthlyObject: any = {};
  monthlyNames: any;
  monthlyValues: any;
  monthlyCategories: any;

  chartBarData = new BehaviorSubject<Array<any>>([]);
  chartPieData = new BehaviorSubject<Array<any>>([]);
  chartAdvancedPieData = new BehaviorSubject<Array<any>>([]);
  chartNumberData = new BehaviorSubject<Array<any>>([]);

  allCategories: any;
  
  constructor(
    private expenseService: ExpenseService,
  ) { }

  getallTransactions() {
    
    this.expenseService.getExpense()
    .subscribe((expenseList: any) => {
      // sort by earliest date
      expenseList.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
      this.allTransactions = expenseList;

      this.getValues();
      this.setChartBarData();
      this.setChartPieData();
      this.setChartAdvancedPieData();
      this.setChartNumberData();
    },
    error => console.log(error));
  }

  private getValues() {
    // All receipts amount
    this.allReceipts = this.allTransactions
      .filter((item: ExpenseItem) => Number(item.amount) > 0)
      .map((item: ExpenseItem) => Number(item.amount))
      .reduce((acc:number, item: number) => acc + item, 0);

    // All expenses amount
    this.allExpenses = this.allTransactions
      .filter((item: ExpenseItem) => Number(item.amount) < 0)
      .map((item: ExpenseItem)=> Number(item.amount))
      .reduce((acc:number, item: number) => acc + item, 0);

    // Current Amount
    this.currentAmount.next(this.allReceipts + this.allExpenses);

    
    const monthNames = [ "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December" ];

    this.allTransactions.reduce((acc: any, element: ExpenseItem) => {
      const [ year, month ]:any = element.date?.split('-');
      // 'Month YY' format
      const label = monthNames[+month - 1] + ' ' + year.slice(2);
      
      if (!acc[label]) acc[label] = [];
      acc[label].push(element);
      return this.monthlyObject = acc;
    }, {});

    const monthObjEntries = (name: string) => Object
      .entries(this.monthlyObject)
      .map((arrForEachMonth: Array<any>) => arrForEachMonth[1].map((item: any) => item[name]));
    
    this.monthlyNames = Object.keys(this.monthlyObject);
    this.monthlyValues = monthObjEntries('amount');
    this.monthlyCategories = monthObjEntries('category');
  }

  private setChartBarData() {
    const result = this.monthlyNames.map((month: string, mLength: number) => ({
      name: month,
      series: this.monthlyCategories[mLength].map((category: string, cLength: number) => ({
        name: category,
        value: +this.monthlyValues[mLength][cLength]
      }))
    }));
    
    return this.chartBarData.next(result);
  }

  private setChartPieData() {
    let result: Array<any> = [];
    result.push( 
      {
        "name": "Receipts",
        "value": this.allReceipts
      },
      {
        "name": "Expenses",
        "value": Math.abs(this.allExpenses)
      }
    )
    
    this.chartPieData.next(result);
  }

  private setChartAdvancedPieData() {
    let result: Array<any> = [];
    let subArray: Array<any> = [];  
    let categories = this.allTransactions.map((item: ExpenseItem) => item.category);

    for (let i = 0; i < categories.length; i++) {
      let filtered = this.allTransactions.filter((item: ExpenseItem) => item.category === categories[i]);
      subArray.push(
        {
        "name": categories[i],
          "value": Math.abs(filtered
            .map((item: ExpenseItem) => Number(item.amount)).reduce((acc: number, n: number)=> acc + n, 0))
        }
      ); 
    };

    [...new Set(categories)].forEach(item => result
      .push( subArray.find(element => element.name === item))
      );
    
    this.chartAdvancedPieData.next(result);
  }

  private setChartNumberData() {
    let result: Array<any> = [];

    const transactions = this.allTransactions
      .filter((item: any) => item.amount)
      .map((transaction: any) => transaction.category);

    const biggestReceipt = this.allTransactions
      .filter((item: any) => item.amount > 0)
      .map((value: any) => Number(value.amount));
  
    const biggestExpense = this.allTransactions
      .filter((item: any) => item.amount < 0)
      .map((value: any) => Number(value.amount));

    result.push( 
      { 
        "name": "First Transaction",
        "value": this.allTransactions[0].date 
      },
      { 
        "name": "Last Transaction", 
        "value": this.allTransactions[this.allTransactions.length -1].date 
      },
      { 
        "name": "Current Amount",
        "value": this.currentAmount.value + ' $' 
      },
      {
        "name": "Transactions",
        "value": transactions.length
      },
      {
        "name": "Receipts",
        "value": this.allReceipts + ' $'
      },
      {
        "name": "Expenses",
        "value": this.allExpenses + ' $'
      },
      {
        "name": "Biggest receipt",
        "value": Math.max.apply(Math, biggestReceipt) + ' $'
      },
      {
        "name": "Biggest expense",
        "value": Math.min.apply(Math, biggestExpense) + ' $'
      }
    )

    this.chartNumberData.next(result);
  }

}