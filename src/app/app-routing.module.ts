import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './Components/pages/auth/auth.component';
import { DashboardComponent } from './Components/pages/dashboard/dashboard.component';
import { HomePageComponent } from './Components/pages/home/home-page/home-page.component';


const routes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '', component: HomePageComponent},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'auth', component: AuthComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}