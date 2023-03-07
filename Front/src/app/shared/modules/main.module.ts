import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { NgxPaginationModule } from "ngx-pagination";

// Custom Modules
import { ChartsModule } from "./charts.module";
import { NgMaterialModule } from "./ng-material.module";

// Components
import { HomeComponent } from "src/app/pages/home/home.component";
import { DashboardComponent } from "src/app/pages/dashboard/dashboard.component";
import { SignInComponent } from "src/app/pages/auth/sign-in/sign-in.component";
import { SignUpComponent } from "src/app/pages/auth/sign-up/sign-up.component";
import { InputExpenseComponent } from "src/app/components/transactions/input-expense/input-expense.component";
import { CategoriesComponent } from "src/app/components/transactions/categories/categories.component";
import { ExpenseComponent } from "src/app/components/transactions/expenses/expenses.component";
import { EditItemComponent } from "src/app/components/modals/edit-item/edit-item.component";
import { DeleteConfirmationComponent } from "src/app/components/modals/delete-confirmation/delete-confirmation.component";

// Pipe
import { FilterPipe } from "../pipes/filter.pipe";

// Directives
import { ExpenseZoomDirective } from "../directives/expense-zoom.directive";
import { ExpenseColorDirective } from "../directives/expense-color.directive";
import { SharedIconsModule } from "@shared/modules/shared-icons.module";

const Components = [
  HomeComponent,
  SignInComponent,
  SignUpComponent,
  InputExpenseComponent,
  EditItemComponent,
  CategoriesComponent,
  DashboardComponent,
  ExpenseComponent,
  FilterPipe,
  ExpenseZoomDirective,
  ExpenseColorDirective,
  DeleteConfirmationComponent,
];

const Modules = [
  CommonModule,
  SharedIconsModule,
  ChartsModule,
  NgMaterialModule,
  FormsModule,
  ReactiveFormsModule,
  FontAwesomeModule,
  DragDropModule,
  NgxPaginationModule,
];

@NgModule({
  declarations: [Components],
  imports: [Modules],
  exports: [Modules],
})
export class MainModule {}
