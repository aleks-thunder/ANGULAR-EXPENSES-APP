import { NgModule } from "@angular/core";

import { ExpenseColorDirective } from "./expense-color.directive";
import { ExpenseZoomDirective } from "./expense-zoom.directive";

const Directives = [ExpenseColorDirective, ExpenseZoomDirective];

@NgModule({
  declarations: [Directives],
  exports: [Directives],
})
export class DirectivesModule {}
