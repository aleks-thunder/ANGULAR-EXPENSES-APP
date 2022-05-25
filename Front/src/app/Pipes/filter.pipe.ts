import { Pipe, PipeTransform } from '@angular/core';
import { ExpenseItem } from '../interfaces/expense-item';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(itemList: ExpenseItem, search: string) {
    
    if(itemList && search) 
      return itemList.filter((item: ExpenseItem) => 

        item.amount!.toString().indexOf(search) > -1  
          || item.description!.indexOf(search) > -1 
          || item.category!.indexOf(search) > -1 
          || item.date!.indexOf(search) > -1 
          
      );
    return itemList;
  }

}
