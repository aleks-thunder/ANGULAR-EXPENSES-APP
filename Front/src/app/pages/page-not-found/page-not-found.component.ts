import { Component } from "@angular/core";

@Component({
  selector: "app-page-not-found",
  template: `
    <div>
      <!-- <svg-icon [icon]="'page-not-found'" [width]="'45rem'" [height]="'45rem'"></svg-icon> -->
    </div>
  `,
  styles: [
    `
      div {
        display: flex;
        justify-content: center;
      }
    `,
  ],
})
export class PageNotFoundComponent {
  constructor() {}
}
