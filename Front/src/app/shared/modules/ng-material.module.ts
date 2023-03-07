import { NgModule } from "@angular/core";

import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatMenuModule } from "@angular/material/menu";
import { MatDialogModule } from "@angular/material/dialog";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { MatTabsModule } from "@angular/material/tabs";
import { MatSelectModule } from "@angular/material/select";

const MaterialModules = [
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule,
  MatCardModule,
  MatChipsModule,
  MatTabsModule,
  MatSelectModule,
  MatMenuModule,
];

@NgModule({
  imports: [MaterialModules],
  exports: [MaterialModules],
})
export class NgMaterialModule {}
