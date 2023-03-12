import { Injectable } from "@angular/core";
import { ExpenseItem } from "@shared/types/expense-item";
import { ExpenseService } from "./http/expense.service";
import { BehaviorSubject } from "rxjs";
import { ChartData } from "@shared/types/charts";

@Injectable({
  providedIn: "root",
})
export class DataService {
  // Current
  allReceipts: number = 0;
  allExpenses: number = 0;
  currentAmount = new BehaviorSubject<number>(0);

  private monthlyObject: [month: ExpenseItem[], arr: ExpenseItem[]] = [[], []];
  private monthlyNames: string[] = [];
  private monthlyValues: string[] = [];
  private monthlyCategories!: string[];

  chartBarData = new BehaviorSubject<ChartData[]>([]);
  chartPieData = new BehaviorSubject<ChartData[]>([]);
  chartNumberData = new BehaviorSubject<ChartData[]>([]);
  chartAdvancedPieData = new BehaviorSubject<ChartData[]>([]);

  constructor(private expenseService: ExpenseService) {}

  setChartsData() {
    this.expenseService.getExpense().subscribe((expenseList: ExpenseItem[]) => {
      // sort by earliest date
      expenseList.sort((a: ExpenseItem, b: ExpenseItem) => new Date(a.date!).getTime() - new Date(b.date!).getTime());

      if (Array.isArray(expenseList) && expenseList.length) {
        this.getValues(expenseList);
        this.setChartBarData();
        this.setChartPieData();
        this.setChartAdvancedPieData(expenseList);
        this.setChartNumberData(expenseList);
      }
    });
  }

  private getValues(expenseList: ExpenseItem) {
    // All receipts amount
    this.allReceipts = expenseList
      .filter((item: ExpenseItem) => Number(item.amount) > 0)
      .map((item: ExpenseItem) => Number(item.amount))
      .reduce((acc: number, item: number) => acc + item, 0);

    // All expenses amount
    this.allExpenses = expenseList
      .filter((item: ExpenseItem) => Number(item.amount) < 0)
      .map((item: ExpenseItem) => Number(item.amount))
      .reduce((acc: number, item: number) => acc + item, 0);

    // Current Amount
    this.currentAmount.next(this.allReceipts + this.allExpenses);

    // Monthly Objects
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    expenseList.reduce((acc: [month: ExpenseItem[], arr: ExpenseItem[]], element: ExpenseItem) => {
      const [year, month]: string[] = element.date!.split("-");

      // 'Month YY' format
      const label: any = monthNames[+month - 1] + " " + year.slice(2);

      if (!acc[label]) acc[label] = [];
      acc[label]!.push(element);
      return (this.monthlyObject = acc);
    }, {});

    const monthObjEntries = (name: string) =>
      Object.entries(this.monthlyObject).map((arrForEachMonth: [month: string, arr: ExpenseItem]) =>
        arrForEachMonth[1].map((item: any) => item[name]),
      );

    this.monthlyNames = Object.keys(this.monthlyObject);

    this.monthlyValues = monthObjEntries("amount");
    this.monthlyCategories = monthObjEntries("category");
  }

  private setChartBarData() {
    const result: ChartData[] = this.monthlyNames.map((month: string, mLength: number) => ({
      name: month,
      series: (this.monthlyCategories[mLength] as any).map((category: string, cLength: number) => ({
        name: category,
        value: +this.monthlyValues[mLength][cLength],
      })),
    }));

    return this.chartBarData.next(result);
  }

  private setChartPieData() {
    const result: ChartData[] = [];
    result.push(
      {
        name: "Receipts",
        value: this.allReceipts,
      },
      {
        name: "Expenses",
        value: Math.abs(this.allExpenses),
      },
    );

    this.chartPieData.next(result);
  }

  private setChartAdvancedPieData(expenseList: ExpenseItem[]) {
    const result: ChartData[] = expenseList.map((item: ExpenseItem) => ({
      name: item.category,
      value: Math.abs(item.amount!),
    }));
    this.chartAdvancedPieData.next(result);
  }

  private setChartNumberData(expenseList: ExpenseItem[]) {
    let result: ChartData[] = [];

    const transactions = expenseList
      .filter((item: ExpenseItem) => item.amount)
      .map((transaction: ExpenseItem) => transaction.category);

    const getBiggestReceipt = expenseList
      .filter((item: ExpenseItem) => item.amount! > 0)
      .map((value: ExpenseItem) => Number(value.amount));

    const getBiggestExpense =
      expenseList.filter((item: ExpenseItem) => item.amount! < 0).map((value: ExpenseItem) => Number(value.amount)) ||
      0;

    const setBiggestValue = (getBiggest: number[]) => {
      if (getBiggest.length != 0) return Math.max.apply(Math, getBiggest) + " $";
      else return 0;
    };

    result.push(
      {
        name: "First Transaction",
        value: expenseList[0].date,
      },
      {
        name: "Last Transaction",
        value: expenseList[expenseList.length - 1].date,
      },
      {
        name: "Current Amount",
        value: this.currentAmount.value + " $",
      },
      {
        name: "Transactions",
        value: transactions.length,
      },
      {
        name: "Receipts",
        value: this.allReceipts + " $",
      },
      {
        name: "Expenses",
        value: this.allExpenses + " $",
      },
      {
        name: "Biggest receipt",
        value: setBiggestValue(getBiggestReceipt),
      },
      {
        name: "Biggest expense",
        value: setBiggestValue(getBiggestExpense),
      },
    );

    this.chartNumberData.next(result);
  }
}
