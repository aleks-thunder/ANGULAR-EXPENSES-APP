import { Directive, ElementRef, Input, Renderer2 } from "@angular/core";

@Directive({
  selector: "[expenseColor]",
})
export class ExpenseColorDirective {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  @Input("expenseColor") set setExpenseColor(amount: number) {
    amount > 0
      ? this.renderer.setStyle(this.elementRef.nativeElement, "color", "green")
      : this.renderer.setStyle(this.elementRef.nativeElement, "color", "red");
  }
}
