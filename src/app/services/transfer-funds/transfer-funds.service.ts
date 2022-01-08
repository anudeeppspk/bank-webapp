import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TransferFundsService {

  private url: string = "http://localhost:3000/api";

  constructor(private httpClient: HttpClient) { }

  searchAccountNumber(account_number: string): Observable<Object> {

    console.log("Account Number: ", account_number);

    let data = {
      account_name: "Navaneeth",
      account_ifsc: "ABCIN000001"
    }

    return of(data);

    // return this.httpClient.get<ProfileDetails>(this.url);
  }

  transferAmount(funds: object): Observable<Boolean> {
    console.log("Funds: ", funds);
    return of(true);
  }

}
