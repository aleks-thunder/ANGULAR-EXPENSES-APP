import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

// External Lib Modules
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { JwtModule } from '@auth0/angular-jwt';

// Custom Modules
import { MainModule } from './modules/main.module';

// Components
import { AppComponent } from './app.component';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { LoaderComponent } from './Components/loader/loader.component';
import { BottomLinksComponent } from './Components/layout/bottom-links/bottom-links.component';
import { NavbarComponent } from './Components/layout/navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    BottomLinksComponent,
    NavbarComponent,
    LoaderComponent
  ],
  imports: [
    MainModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    SimpleNotificationsModule.forRoot(),
    JwtModule.forRoot({
      config: { tokenGetter:() => localStorage.getItem('access_token') },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [ AppComponent ]
})
  
export class AppModule { }