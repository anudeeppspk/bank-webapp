import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './bank-user/login/login.component';
import { ProfileComponent } from './bank-user/profile/profile.component';
import { SignupComponent } from './bank-user/signup/signup.component';
import { TransferFundsComponent } from './bank-user/transfer-funds/transfer-funds.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "signup",
    component: SignupComponent
  },
  {
    path: "profile",
    component: ProfileComponent
  },
  {
    path: "transfer-funds",
    component: TransferFundsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
