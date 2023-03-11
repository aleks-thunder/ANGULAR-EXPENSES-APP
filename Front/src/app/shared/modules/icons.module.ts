import { NgModule } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";

@NgModule({
  imports: [],
  exports: [MatIconModule],
})
export class IconsModule {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconSet(sanitizer.bypassSecurityTrustResourceUrl("assets/icons/icons.svg"));
  }
}
