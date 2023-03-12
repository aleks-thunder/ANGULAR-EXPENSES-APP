// NG
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgMaterialModule } from "@app/shared/modules/ng-material.module";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { NgxPaginationModule } from "ngx-pagination";

import { ComponentsModule } from "@app/components/components.module";
import { PipesModule } from "@app/shared/pipes/pipes.module";
import { DirectivesModule } from "@app/shared/directives/directives.module";

import { Pages, PagesComponents } from "./";

const Modules = [
  CommonModule,
  ComponentsModule,
  NgMaterialModule,
  FormsModule,
  ReactiveFormsModule,
  DragDropModule,
  NgxPaginationModule,
];

@NgModule({
  imports: [Modules, PipesModule, DirectivesModule],
  declarations: [Pages, PagesComponents],
  exports: [Pages],
})
export class PagesModule {}
