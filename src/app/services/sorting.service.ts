import { ChangeDetectorRef, Injectable } from '@angular/core';
import { ExpenseItem } from '../interfaces/expense-item';
import { SortingIfc } from '../interfaces/sotring';

@Injectable({
  providedIn: 'root'
})
export class SortingService {

  sortClickCount: number = 0;

  constructor() { }

  sortByDefault( expenses: void ) {
    return expenses;
  }

  sortByCategory( 
    expenseList: ExpenseItem, 
    expenseListCopy: ExpenseItem, 
    category: string | undefined 
    ) {
    return expenseList = expenseListCopy.filter((items: ExpenseItem) => items.category === category);
  }

  sortBy(prop: string, expenseList:any) {
    this.sortClickCount += 1;
    // console.log(this.CDR.markForCheck);
    
    this.sortClickCount % 2 === 0
    ? expenseList.sort(this.sorting(prop,true))
    : expenseList.sort(this.sorting(prop, false));
  }

  private sorting( prop: string, isTrue: boolean ){
    if(isTrue) return (bigger: SortingIfc, smaller: SortingIfc) => 
      bigger[prop] == smaller[prop] ? 0 : bigger[prop] > smaller[prop] ? -1 : 1;

    else return (smaller: SortingIfc, bigger: SortingIfc) => 
      smaller[prop] == bigger[prop] ? 0 : smaller[prop] < bigger[prop] ? -1 : 1;
  }

}
