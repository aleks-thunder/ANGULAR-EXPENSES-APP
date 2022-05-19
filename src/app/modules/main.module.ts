import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgxPaginationModule } from 'ngx-pagination';

// Custom Modules
import { ChartsModule } from './charts.module';
import { NgMaterialModule } from './ng-material.module';

// Components
import { HomeComponent } from '../Components/pages/home/home.component';
import { DashboardComponent } from '../Components/pages/dashboard/dashboard.component';
import { SignInComponent } from '../Components/pages/auth/sign-in/sign-in.component';
import { SignUpComponent } from '../Components/pages/auth/sign-up/sign-up.component';
import { InputExpenseComponent } from '../Components/transactions/input-expense/input-expense.component';
import { CategoriesComponent } from '../Components/transactions/categories/categories.component';
import { ExpenseComponent } from '../Components/transactions/expenses/expenses.component';
import { EditItemModalComponent } from '../Components/transactions/edit-item-modal/edit-item-modal.component';

// Pipe
import { FilterPipe } from '../Pipes/filter.pipe';


const Components = [
  HomeComponent,
  SignInComponent,
  SignUpComponent,
  InputExpenseComponent,
  EditItemModalComponent,
  CategoriesComponent,
  DashboardComponent,
  ExpenseComponent,
  FilterPipe
]

const Modules = [
  CommonModule, 
  ChartsModule,
  NgMaterialModule, 
  FormsModule,
  ReactiveFormsModule,
  FontAwesomeModule,
  DragDropModule,
  NgxPaginationModule
];

@NgModule({
  declarations: [ Components ],
  imports: [ Modules ],
  exports: [ Modules ],
})

export class MainModule { }
