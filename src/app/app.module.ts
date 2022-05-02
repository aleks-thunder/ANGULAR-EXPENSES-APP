import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

// ng material modules
import { NgMaterialModule } from './ng-material.module';

// external libs
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxPaginationModule } from 'ngx-pagination';

// components
import { AppComponent } from './app.component';
import { BottomLinksComponent } from './Components/bottom-links/bottom-links.component';
import { ExpenseRowComponent } from './Components/transactions/expenses/expenses.component';
import { HomePageComponent } from './Components/pages/home/home-page/home-page.component';
import { EditItemModalComponent } from './Components/transactions/edit-item-modal/edit-item-modal.component';
import { InputComponent } from './Components/pages/home/input/input.component';
import { CategoriesComponent } from './Components/transactions/categories/categories.component';
import { DashboardComponent } from './Components/pages/dashboard/dashboard.component';
import { SignUpComponent } from './Components/pages/auth/sign-up/sign-up.component';
import { SignInComponent } from './Components/pages/auth/sign-in/sign-in.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { InterceptorService } from './services/http/interceptor.service';

import { PieChartComponent } from './Components/charts/pie-chart/pie-chart.component';
import { BarVerticalStackedComponent } from './Components/charts/bar-vertical-stacked/bar-vertical-stacked.component';
import { AdvancedPieComponent } from './Components/charts/advanced-pie/advanced-pie.component';
import { NumberChartComponent } from './Components/charts/number-chart/number-chart.component';
import { FilterPipe } from './Pipes/filter.pipe';
import { LoaderComponent } from './Components/loader/loader.component';


@NgModule({
  declarations: [
    AppComponent,
    BottomLinksComponent,
    ExpenseRowComponent,
    HomePageComponent,
    EditItemModalComponent,
    InputComponent,
    CategoriesComponent,
    DashboardComponent,
    SignUpComponent,
    SignInComponent,
    NavbarComponent,
    PieChartComponent,
    BarVerticalStackedComponent,
    AdvancedPieComponent,
    NumberChartComponent,
    FilterPipe,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgMaterialModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    NgbModule,
    RouterModule,
    DragDropModule,
    AppRoutingModule,
    SimpleNotificationsModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter:() => {
           return localStorage.getItem('access_token'); 
        },
      },
   }),
   NgxChartsModule,
   NgxPaginationModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  entryComponents: [EditItemModalComponent],
  bootstrap: [AppComponent]
})
  
export class AppModule { }