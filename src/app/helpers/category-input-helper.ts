import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CategoryInterface } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})

export class CategoryInputHelper {

  categoriesInput = new BehaviorSubject('');
  // categoriesGet: Subject<CategoryInterface> = new BehaviorSubject<CategoryInterface>({});

  constructor() { }

  setCategoriesForInput(name: string) {
    this.categoriesInput.next(name);
  }
  
  // getCategories(category: CategoryInterface) {
  //   this.categoriesGet.next(category);
  // }
}
