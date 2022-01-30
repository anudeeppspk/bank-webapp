import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TransferFundsService {

  constructor(private httpClient: HttpClient) { }

  searchAccountNumber(account_number: string): Observable<Object> {
    return this.httpClient.get<Object>(environment.baseURL + `/accountDetails?accountNumber=${account_number}`);
  }

  transferAmount(userAccountNumber: String, funds: any): Observable<Object> {
    return this.httpClient.post<any>(environment.baseURL + `/accountBalance?toAccountNumber=${funds.account_number}&amount=${funds.amount}&accountNumber=${userAccountNumber}`, {});
  }

}
