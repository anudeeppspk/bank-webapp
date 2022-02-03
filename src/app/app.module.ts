import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { AgGridModule } from 'ag-grid-angular'; 
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/components/header/header.component';
import { FooterComponent } from './common/components/footer/footer.component';
import { LoginComponent } from './bank-user/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from './bank-user/profile/profile.component';
import { TransferFundsComponent } from './bank-user/transfer-funds/transfer-funds.component';
import { SignupComponent } from './bank-user/signup/signup.component';

import { SelfiePanelComponent } from './bank-user/selfie-panel/selfie-panel.component';
import { DashboardComponent } from './bank-user/dashboard/dashboard.component';
import { TranscationsComponent } from './bank-user/transcations/transcations.component';
import { ErrorDialogComponent } from './common/components/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from './common/components/success-dialog/success-dialog.component';
import { BenificiaryComponent } from '../app/bank-user/benificiary/benificiary.component';
import { LoginService } from './services/login/login.service';
import { SignupService } from './services/signup/signup.service'
import { AuthGuard } from './auth.guard';
import { EasyLoginGuard } from './easy-login.guard';
import { RequestMoneyComponent } from './bank-user/request-money/request-money.component';
import { ApproveDeclineCellComponent } from './common/components/approve-decline-cell/approve-decline-cell.component';

import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { BenificiaryService } from './services/benificiary/benificiary.service';

import { HelpComponent } from './bank-user/help/help.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    ProfileComponent,
    TransferFundsComponent,
    SignupComponent,
    SelfiePanelComponent,
    DashboardComponent,
    TranscationsComponent,
    ErrorDialogComponent,
    SuccessDialogComponent,
    BenificiaryComponent,
    RequestMoneyComponent,
    ApproveDeclineCellComponent,
    HelpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    AgGridModule.withComponents([ApproveDeclineCellComponent]),
  ],
  providers: [LoginService, SignupService, AuthGuard, EasyLoginGuard, BenificiaryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
