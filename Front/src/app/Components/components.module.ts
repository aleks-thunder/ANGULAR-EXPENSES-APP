// NG
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
// Libs
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
// Components
import { Charts } from "./charts";
import { Layout } from "./layout";
import { Modals } from "./modals";
// Layout
import { LoaderComponent } from "./loader/loader.component";
import { SvgIconComponent } from "./svg/svg-icon.component";
import { NgMaterialModule } from "@app/shared/modules/ng-material.module";

const Modules = [
  CommonModule,
  RouterModule,
  NgxChartsModule,
  NgMaterialModule,
  FormsModule,
  FontAwesomeModule,
  ReactiveFormsModule,
];

@NgModule({
  imports: [Modules],
  declarations: [Charts, Layout, Modals, LoaderComponent, SvgIconComponent, Layout],
  exports: [Charts, Layout, LoaderComponent, SvgIconComponent],
})
export class ComponentsModule {}
