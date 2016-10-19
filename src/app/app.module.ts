import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import * as firebase from 'firebase';
import 'rxjs/Rx';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PersonalIoRoutingModule } from './app-routing.module';
import { AuthGuardService } from './dashboard/auth-guard.service';
import { InputNumberDirective } from './shared/form-controls/input-number.directive';

const myFirebaseConfig = {
  apiKey: 'AIzaSyAk0SF8s_cP12DrLhfSiUOT23MS8h4FXwA',
  authDomain: 'personal-io-335f0.firebaseapp.com',
  databaseURL: 'https://personal-io-335f0.firebaseio.com',
  storageBucket: 'personal-io-335f0.appspot.com',
}

const myFirebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Redirect
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    InputNumberDirective
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule,
    HttpModule,
    PersonalIoRoutingModule,
    MaterialModule.forRoot(),
    AngularFireModule.initializeApp(myFirebaseConfig, myFirebaseAuthConfig)
  ],
  providers: [
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
