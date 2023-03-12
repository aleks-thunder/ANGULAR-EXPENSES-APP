import { HomeComponent } from "./home/home.component";
import { SignInComponent } from "./auth/sign-in/sign-in.component";
import { SignUpComponent } from "./auth/sign-up/sign-up.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

import { NewExpenseComponent } from "./home/new-expense/new-expense.component";
import { CategoriesComponent } from "./home/categories/categories.component";
import { ExpensesComponent } from "./dashboard/expenses/expenses.component";

export const Pages = [HomeComponent, SignInComponent, SignUpComponent, DashboardComponent, PageNotFoundComponent];
export const PagesComponents = [NewExpenseComponent, CategoriesComponent, ExpensesComponent];
