import { Component } from "@angular/core";

@Component({
  selector: "app-page-not-found",
  template: `
    <div>
      <img src="../../../assets/images/404.png" />
    </div>
  `,
  styles: [
    `
      div {
        height: calc(100% - 50px);
        width: 100%;
      }
    `,
  ],
})
export class PageNotFoundComponent {
  constructor() {}
}
