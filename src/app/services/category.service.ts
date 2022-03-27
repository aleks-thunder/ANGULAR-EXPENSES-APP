import { Injectable } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatChipInputEvent } from '@angular/material/chips';
import { CategoryInterface } from 'src/app/interfaces/category';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  private categories: CategoryInterface[] = [
    { name: 'Salary'},
    { name: 'Debt'},
    { name: 'Credit'},
    { name: 'Investments'},
  ];

  constructor() { };

  getCategory(): any {
    return [this.categories];
  }

  addCategory(event: MatChipInputEvent): void {
    const value: string = event.value;
    this.categories.push({ name: value })
    event.chipInput!.clear();
  };

  removeCategory(category: CategoryInterface): void {
    const index: number = this.categories.indexOf(category);
    this.categories.splice(index, 1)
  };

  dragCategory(event: CdkDragDrop<any>) {
    this.categories[event.previousContainer.data.index] = event.container.data.item;
    this.categories[event.container.data.index] = event.previousContainer.data.item;
  };

}
