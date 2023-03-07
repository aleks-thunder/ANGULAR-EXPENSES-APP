import { Component, Input } from "@angular/core";

@Component({
  selector: "svg-icon",
  template: `<mat-icon
    [style.width]="_width"
    [style.height]="_height"
    [style.marginTop]="_mt"
    [style.marginRight]="_mr"
    [style.marginBottom]="_mb"
    [style.marginLeft]="_ml"
    [style.cursor]="_cursor"
    svgIcon="{{ _icon }}"
  ></mat-icon>`,
  styleUrls: [],
})
export class SvgIconComponent {
  @Input()
  set icon(icon: string) {
    this._icon = icon;
  }

  @Input()
  set width(width: string) {
    this._width = width;
  }

  @Input()
  set height(height: string) {
    this._height = height;
  }

  @Input()
  set mt(mt: string) {
    this._mt = mt;
  }

  @Input()
  set mr(mr: string) {
    this._mr = mr;
  }

  @Input()
  set mb(mb: string) {
    this._mb = mb;
  }

  @Input()
  set ml(ml: string) {
    this._ml = ml;
  }

  @Input()
  set cursor(cursor: string) {
    this._cursor = cursor;
  }
  _icon: string = "";
  _width: string = "24px";
  _height: string = "24px";
  _mt: string = "0px";
  _mr: string = "0px";
  _mb: string = "0px";
  _ml: string = "0px";
  _cursor: string = "default";

  constructor() {}
}
