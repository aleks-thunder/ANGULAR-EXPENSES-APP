import { Injectable } from "@angular/core";
import { ExpenseItem } from "@shared/types/expense-item";
import { SortingType } from "@app/shared/types/sorting";

@Injectable({
  providedIn: "root",
})
export class SortingService {
  sortClickCount: number = 0;

  constructor() {}

  sortByDefault(expenses: void) {
    return expenses;
  }

  sortByCategory(expenseListCopy: ExpenseItem, category?: string) {
    return (expenseListCopy.filter((items: ExpenseItem) => items.category === category));
  }

  sortBy(prop: string, expenseList: any) {
    this.sortClickCount += 1;

    this.sortClickCount % 2 === 0
      ? expenseList.sort(this.sorting(prop, true))
      : expenseList.sort(this.sorting(prop, false));
  }

  private sorting(prop: string, isTrue: boolean) {
    if (isTrue)
      return (bigger: SortingType, smaller: SortingType) =>
        bigger[prop] == smaller[prop] ? 0 : bigger[prop] > smaller[prop] ? -1 : 1;
    else
      return (smaller: SortingType, bigger: SortingType) =>
        smaller[prop] == bigger[prop] ? 0 : smaller[prop] < bigger[prop] ? -1 : 1;
  }
}
