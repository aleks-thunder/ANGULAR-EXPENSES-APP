import { Injectable } from '@angular/core';
import { ExpenseItem } from '../interfaces/expense-item';
import { ExpenseService } from './http/expense.service';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})

export class BudgetService {

  // Current
  private allTransactions?: any;
  currentAmount: number = 0
  allReceipts: number = 0
  allExpenses: number = 0

  monthlyObject: any = {};
  monthlyNames: any;
  monthlyValues: any;
  monthlyCategories: any;

  chartBarData: Array<any> = [];
  chartPieData: Array<any> = [];
  chartAdvancedPieData: Array<any> = [];
  chartNumberData: Array<any> = [];

  allCategories: any;
  
  constructor(
    private expenseService: ExpenseService,
  ) { }
// OBservable, behavier suject 
  getallTransactions() {
    // Get all expenses from DB
    this.expenseService.getExpense()
    .pipe(
      filter(Boolean),
    )
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
    this.currentAmount = this.allReceipts + this.allExpenses;

    // [month, transaction]
    this.allTransactions.forEach((tras: any) => {
      const newDate = new Date(tras.date);
      const monthAndYear = newDate.toLocaleString('en-GB', { month: 'long' }) + ' ' + newDate.getFullYear();
    
      (this.monthlyObject[monthAndYear] && this.monthlyObject[monthAndYear].length)
      ? this.monthlyObject[monthAndYear].push(tras)
      : this.monthlyObject[monthAndYear] = [tras];
    });

    const monthObjEntries = (name: string) => Object
      .entries(this.monthlyObject)
      .map((arrForEachMonth: Array<any>) => arrForEachMonth[1].map((item: any) => item[name]));
    
    this.monthlyNames = Object.keys(this.monthlyObject);
    this.monthlyValues = monthObjEntries('amount');
    this.monthlyCategories = monthObjEntries('category');

  }

  private setChartBarData() {
    let result: Array<any> = [];
    let subArray: Array<any> = [];
    let subArray2: Array<any> = [];

    for (let i = 0; i < this.monthlyValues.length; i++) {
      // if 1 expense per month push to subArray => result
      if(this.monthlyValues[i].length == 1) {
        subArray.push([
          {
            "name": this.monthlyCategories[i],
            "value": +this.monthlyValues[i] 
          }
        ])
      } else {
        for (let j = 0; j < this.monthlyValues[i].length; j++) {
          // if more then 1 expense per month push to subArray2 => subArray => result
          subArray2.push({
              "name": this.monthlyCategories[i][j], 
              "value": +this.monthlyValues[i][j] 
            });
        };
        subArray.push(subArray2);
      };
    };

    //combine all together
    for (let i = 0; i < this.monthlyNames.length; i++) {
      result.push(
        {
          "name": this.monthlyNames[i],
          "series": subArray[i]
        }
      );
    };

    this.chartBarData = result;
  }

  private setChartPieData() {
    this.chartPieData.push( 
      {
        "name": "Receipts",
        "value": this.allReceipts
      },
      {
        "name": "Expenses",
        "value": Math.abs(this.allExpenses)
      }
    )
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
    
    this.chartAdvancedPieData = result;
  }

  private setChartNumberData() {
    let result: Array<any> = [];
    // First / Last Transaction
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
        "value": this.currentAmount + ' $' 
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

    this.chartNumberData = result;
  }

}