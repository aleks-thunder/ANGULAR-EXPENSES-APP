import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
}
