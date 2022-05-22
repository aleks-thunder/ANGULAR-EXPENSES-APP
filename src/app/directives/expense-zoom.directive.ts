import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[expenseZoom]'
})
export class ExpenseZoomDirective {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter(){
    this.changeSize(1.02, 1.2)
  }

  @HostListener('mouseleave') onMouseLeave(){
    this.changeSize(1,1)
  }

  private changeSize(x: number, y: number) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'transform', `scaleX(${x}) scaleY(${y})`)
  }
}
