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

  getAcountDetails(accountNumber: string): Observable<any> {
    return this.httpClient.get<Object>(environment.baseURL + `/accountDetails?accountNumber=${accountNumber}`);
  }

  getUserDetails(accountNumber: string): Observable<any> {
    let body = {
      accountNumber: accountNumber
    }

    return this.httpClient.post<any>(environment.baseURL + "/getUser", body);
  }
}
