import { NgModule } from "@angular/core";
import { FilterPipe } from "./filter.pipe";

const Pipes = [FilterPipe];

@NgModule({
  declarations: [Pipes],
  exports: [Pipes],
})
export class PipesModule {}
