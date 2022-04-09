import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

import { NgMaterialModule } from './ng-material.module';

// external libs
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgChartsModule } from 'ng2-charts';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SimpleNotificationsModule } from 'angular2-notifications';

// components
import { AppComponent } from './app.component';
import { GraphicComponent } from './Components/graphic/graphic.component';
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
import { JwtModule } from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    AppComponent,
    GraphicComponent,
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
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgMaterialModule,
    FontAwesomeModule,
    NgChartsModule,
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
   })
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