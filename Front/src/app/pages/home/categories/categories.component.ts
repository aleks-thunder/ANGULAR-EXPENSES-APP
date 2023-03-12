import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { MatChip } from "@angular/material/chips";
import { Category } from "@shared/types/category";
import { CategoryInputHelper } from "src/app/shared/helpers/category-input-helper";
import { MatChipInputEvent } from "@angular/material/chips";
import { CdkDragDrop } from "@angular/cdk/drag-drop";
import { CategoriesService } from "@services/http/categories.service";

@Component({
  selector: "categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class CategoriesComponent implements OnInit {
  categories!: Category[];

  constructor(private categoryInputHelper: CategoryInputHelper, private categoryService: CategoriesService) {}

  ngOnInit(): void {
    this.categories = this.categoryService.getCategories();
  }

  onSaveCategories(categories: Category[]) {
    this.categoryService.saveCategories(categories);
  }

  addCategory(event: MatChipInputEvent): void {
    const value: string = event.value;
    this.categories.push({ name: value });
    event.chipInput!.clear();
  }

  removeCategory(category: Category): void {
    const index: number = this.categories.indexOf(category);
    this.categories.splice(index, 1);
  }

  dragCategory(event: CdkDragDrop<any>) {
    this.categories[event.previousContainer.data.index] = event.container.data.item;
    this.categories[event.container.data.index] = event.previousContainer.data.item;
  }

  chipSelection(chip: MatChip, name: any) {
    chip.select();
    this.categoryInputHelper.setCategoriesForInput(name);
  }
}
