import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthService } from './auth/auth.service';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';


import { AppComponent } from './app.component';
import { AppRoutingModule} from './app-routing.module';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';

import { ControlComponent } from './control/control.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { NavtabsComponent } from './navigation/navtabs/navtabs.component';
import { HomeComponent } from './home/home.component';
import { GaugesModule } from '@progress/kendo-angular-gauges';
import { LocalweatherComponent } from './weatherstation/localweather/localweather.component';
import { ChartweatherComponent } from './weatherstation/chartweather/chartweather.component';
import { LaboratoireComponent } from './laboratoire/laboratoire.component';
import { MagasinComponent } from './magasin/magasin.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    ControlComponent,
    DashboardComponent,
    NavigationComponent,
    NavtabsComponent,
    HomeComponent,
    LocalweatherComponent,
    ChartweatherComponent,
    LaboratoireComponent,
    MagasinComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    GaugesModule

  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
