// NG
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgMaterialModule } from "@app/shared/modules/ng-material.module";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { NgxPaginationModule } from "ngx-pagination";

import { ComponentsModule } from "@app/components/components.module";
import { PipesModule } from "@app/shared/pipes/pipes.module";
import { DirectivesModule } from "@app/shared/directives/directives.module";

import { InputExpenseComponent } from "@app/pages/home/input-expense/input-expense.component";
import { CategoriesComponent } from "@app/pages/home/categories/categories.component";
import { ExpenseComponent } from "@app/pages/dashboard/expenses/expenses.component";

import { pages } from "./";

const modules = [
  CommonModule,
  ComponentsModule,
  NgMaterialModule,
  FormsModule,
  ReactiveFormsModule,
  DragDropModule,
  NgxPaginationModule,
];

@NgModule({
  imports: [modules, PipesModule, DirectivesModule],
  declarations: [pages, InputExpenseComponent, CategoriesComponent, ExpenseComponent],
  exports: [pages],
})
export class PagesModule {}
