import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService } from './dashboard/auth-guard.service';
import { environment } from '../environments/environment';
import { LoginService } from './login/login.service';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [LoginService] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: false // environment.production ? false : true
  })],
  exports: [RouterModule],
  providers: []
})
export class PersonalIoRoutingModule { }
