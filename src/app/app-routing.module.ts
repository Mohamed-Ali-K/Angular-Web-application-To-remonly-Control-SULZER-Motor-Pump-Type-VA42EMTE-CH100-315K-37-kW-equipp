import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { ControlComponent } from './control/control.component';
import { HomeComponent } from './home/home.component';
import { LocalweatherComponent } from './weatherstation/localweather/localweather.component';
import { ChartweatherComponent } from './weatherstation/chartweather/chartweather.component';
import { LaboratoireComponent } from './laboratoire/laboratoire.component';
import { MagasinComponent } from './magasin/magasin.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'dashboard',  pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent},
      { path: 'control', component: ControlComponent, canActivate: [AuthGuard]},
      { path: 'meteo', component: LocalweatherComponent },
      { path: 'Meteochart', component: ChartweatherComponent, canActivate: [AuthGuard] },
      { path: 'Laboratoir', component: LaboratoireComponent, canActivate: [AuthGuard]},
      {path: 'Magasin', component: MagasinComponent, canActivate: [AuthGuard]}
    ]
  },
  { path: 'signup', component: SignupComponent},
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
