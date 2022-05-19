import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './Components/pages/auth/sign-in/sign-in.component';
import { SignUpComponent } from './Components/pages/auth/sign-up/sign-up.component';

import { DashboardComponent } from './Components/pages/dashboard/dashboard.component';
import { HomeComponent } from './Components/pages/home/home.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '',           component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'login',      component: SignInComponent },
  { path: 'register',   component: SignUpComponent },
  { path: 'dashboard',  component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/:id',  component: DashboardComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule {}