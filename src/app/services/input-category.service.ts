import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class InputCategoryService {

  categoriesValue = new BehaviorSubject('');
  
  constructor() { }

  setCategoriesValue(value: string) {
    this.categoriesValue.next(value);
  }
}
