import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {AccountDetails} from '../../models/account-details';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private url: string ="http://localhost:3000/api";

  constructor(private httpClient: HttpClient) { }

  getAcountDetails(): Observable<AccountDetails>{
    let user_data: AccountDetails = {
      account_number: 1234567899,
      account_ifsc:"SBI45678911",
      account_branch: "vizag",
      account_balance: 87654,
      first_name: "Xyz",
      last_name: "Abc"
    };
    return of(user_data);
  }
}
