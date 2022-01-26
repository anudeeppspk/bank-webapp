import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AccountDetails } from '../../models/account-details';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpClient: HttpClient) { }

  getAcountDetails(): Observable<any> {
    let user = JSON.parse(localStorage.getItem('user')!);
    return this.httpClient.get<Object>(environment.baseURL + `/accountDetails?accountNumber=${user.accountnumber}`);
  }

  getUserDetails(): Observable<any> {
    return this.httpClient.get<Object>(environment.baseURL + "/getUser");
  }
}
