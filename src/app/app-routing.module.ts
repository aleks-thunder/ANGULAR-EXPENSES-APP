import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './Components/pages/auth/sign-in/sign-in.component';
import { SignUpComponent } from './Components/pages/auth/sign-up/sign-up.component';

import { DashboardComponent } from './Components/pages/dashboard/dashboard.component';
import { HomePageComponent } from './Components/pages/home/home-page/home-page.component';
import { AuthGuard } from './guard/auth.guard';


const routes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '', component: HomePageComponent, canActivate: [AuthGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: SignInComponent },
  { path: 'register', component: SignUpComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [AuthGuard]
})
export class AppRoutingModule {}