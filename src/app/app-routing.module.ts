import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './bank-user/dashboard/dashboard.component';
import { ForgotpasswordComponent } from './bank-user/forgotpassword/forgotpassword.component';

import { LoginComponent } from './bank-user/login/login.component';
import { ProfileComponent } from './bank-user/profile/profile.component';
import { SignupComponent } from './bank-user/signup/signup.component';
import { TranscationsComponent } from './bank-user/transcations/transcations.component';
import { TransferFundsComponent } from './bank-user/transfer-funds/transfer-funds.component';
import { EasyLoginGuard } from './easy-login.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [EasyLoginGuard]
  },
  {
    path: "forgotPassword",
    component: ForgotpasswordComponent
  },
  {
    path: "signup",
    component: SignupComponent,
    canActivate: [EasyLoginGuard]
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "transfer-funds",
    component: TransferFundsComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"home",
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"transactions",
    component: TranscationsComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"**",
    redirectTo: 'login'
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
