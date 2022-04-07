import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatChip } from '@angular/material/chips';
import { CategoryInterface } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  encapsulation: ViewEncapsulation.None
})


export class CategoriesComponent implements OnInit {

  categories!: CategoryInterface[]

  ngOnInit(): void { 
    [this.categories] = this.categoryService.getCategory();
  };

  constructor(
    private categoryService: CategoryService
    ) {}

  addCategory(event: MatChipInputEvent) {
    this.categoryService.addCategory(event);
  }

  removeCategory(category: CategoryInterface) {
    this.categoryService.removeCategory(category);
  }

  dragCategory(event: CdkDragDrop<any>) {
    this.categoryService.dragCategory(event);
  }
  
  chipSelection(chip: MatChip, name: string) {
    chip.select();
    this.categoryService.setCategoriesForInput(name);
  };

}
