import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgMaterialModule } from './ng-material/ng-material.module';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxChartsModule } from '@swimlane/ngx-charts';



import { GraphicComponent } from './Components/graphic/graphic.component';
import { PopUpsComponent } from './Components/pop-ups/pop-ups.component';
import { HeaderMenuComponent } from './Components/header-menu/header-menu.component';
import { LeftRightContentComponent } from './Components/left-right-content/left-right-content.component';


@NgModule({
  declarations: [
    AppComponent,
    GraphicComponent,
    PopUpsComponent,
    HeaderMenuComponent,
    LeftRightContentComponent 
  ],
  imports: [
    BrowserModule,
    NgMaterialModule,
    FontAwesomeModule,
    NgxChartsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }