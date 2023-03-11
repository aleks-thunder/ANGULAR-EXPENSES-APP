import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { SignUpComponent } from "./pages/auth/sign-up/sign-up.component";
import { SignInComponent } from "./pages/auth/sign-in/sign-in.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";

import { HomeComponent } from "./pages/home/home.component";
import { AuthGuard } from "./core/guards/auth.guard";
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "login",
    component: SignInComponent,
  },
  {
    path: "register",
    component: SignUpComponent,
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "dashboard/:id",
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "404",
    component: PageNotFoundComponent,
    canActivate: [AuthGuard],
  },

  {
    path: "**",
    redirectTo: "404",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
