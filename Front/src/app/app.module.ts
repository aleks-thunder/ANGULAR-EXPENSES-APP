import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
// TODO check if need
// import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
// External Lib Modules
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SimpleNotificationsModule } from "angular2-notifications";
import { JwtModule } from "@auth0/angular-jwt";
// Components
import { AppComponent } from "./app.component";
// Interceptor
import { AuthInterceptor } from "./core/interceptors/auth-interceptor";
// Modules
import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "@app/components/components.module";
import { SharedModules } from "./shared/modules";
import { PagesModule } from "./pages/pages.module";

const Modules = [SharedModules, PagesModule, AppRoutingModule, ComponentsModule];

@NgModule({
  declarations: [AppComponent],
  imports: [
    Modules,
    HttpClientModule,
    NgbModule,
    RouterModule,
    SimpleNotificationsModule.forRoot(),
    JwtModule.forRoot({
      config: { tokenGetter: () => localStorage.getItem("access_token") },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
