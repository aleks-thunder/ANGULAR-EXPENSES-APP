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
    this.categoryService.getCategories().subscribe((res: any) => {

    if( Array.isArray(res) && res.length) {
      this.categories = [];
      res.forEach((x:any) => this.categories.push({'name': x}))
      
    } else {
      this.categories = [
        { name: 'Salary'},
        { name: 'Debt'},
        { name: 'Credit'},
        { name: 'Investments'},
      ]; 
    }
    }, err => {
      console.log(err);
    })
  };

  onSaveCategories(categories: any) {
    let serverObject :any = [];
    
    categories.forEach( (element:any) =>  serverObject.push(element.name) );
    
    this.categoryService.saveCategories(serverObject).subscribe( (res) => {
        this.notification.msgSuccess('Categories', 'Categories saved at database');
        res;
      }, err => {
        this.notification.msgError('Categories', 'Ooops, something went wrong');
        console.log(err);
      }
    );
  };

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
  
  chipSelection(chip: MatChip, name: any) {
    chip.select();
    this.categoryInputHelper.setCategoriesForInput(name);
  };

}
