import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TransferFundsService {

  private url: string = "http://localhost:3000/api";

  constructor(private httpClient: HttpClient) { }

  searchAccountNumber(account_number: string): Observable<Object> {

    console.log("Account Number: ", account_number);

    return this.httpClient.get<Object>(environment.baseURL + `/accountDetails?accountNumber=${account_number}`);
  }

  transferAmount(funds: any): Observable<Object> {
    return this.httpClient.post<any>(environment.baseURL + `/accountBalance?toAccountNumber=${funds.account_number}&amount=${funds.amount}`, {}, { responseType: 'text' as 'json' });
  }

}
