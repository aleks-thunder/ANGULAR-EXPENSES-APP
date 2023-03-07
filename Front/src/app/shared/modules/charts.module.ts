import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NgxChartsModule } from "@swimlane/ngx-charts";

import { AdvancedPieComponent } from "src/app/components//charts/advanced-pie/advanced-pie.component";
import { BarVerticalStackedComponent } from "src/app/components//charts/bar-vertical-stacked/bar-vertical-stacked.component";
import { NumberChartComponent } from "src/app/components//charts/number-chart/number-chart.component";
import { PieChartComponent } from "src/app/components//charts/pie-chart/pie-chart.component";

const Charts = [AdvancedPieComponent, BarVerticalStackedComponent, NumberChartComponent, PieChartComponent];

@NgModule({
  imports: [CommonModule, NgxChartsModule],
  declarations: [Charts],
  exports: [Charts],
})
export class ChartsModule {}
