import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CategoryInputHelper {

  categoriesValue = new BehaviorSubject('');
  
  constructor() { }

  setCategoriesForInput(value: string) {
    this.categoriesValue.next(value);
  }
  
}
