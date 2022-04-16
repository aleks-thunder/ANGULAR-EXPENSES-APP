import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatChip } from '@angular/material/chips';
import { CategoryInterface } from 'src/app/interfaces/category';
import { CategoryInputHelper } from 'src/app/helpers/category-input-helper';
import { MatChipInputEvent } from '@angular/material/chips';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { CategoriesService } from 'src/app/services/http/categories.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  encapsulation: ViewEncapsulation.None
})


export class CategoriesComponent implements OnInit {

  categories!: CategoryInterface[]

  constructor(
    private categoryInputHelper: CategoryInputHelper,
    private categoryService: CategoriesService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void { 
    this.categories = this.categoryService.getCategories();
  };
  

  onSaveCategories(categories: any) {
    this.categoryService.saveCategories(categories)
  };

  addCategory(event: MatChipInputEvent): void {
    const value: string = event.value;
    this.categories.push({ name: value });
    event.chipInput!.clear();
  };

  removeCategory(category: CategoryInterface): void {
    const index: number = this.categories.indexOf(category);
    this.categories.splice(index, 1);
  };

  dragCategory(event: CdkDragDrop<any>) {
    this.categories[event.previousContainer.data.index] = event.container.data.item;
    this.categories[event.container.data.index] = event.previousContainer.data.item;
  };
  
  chipSelection(chip: MatChip, name: any) {
    chip.select();
    this.categoryInputHelper.setCategoriesForInput(name);
  };

}
