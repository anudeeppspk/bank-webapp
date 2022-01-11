import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {TransctionDetails} from '../../models/transction-details';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  private url: string ="http://localhost:3000/api";

  constructor(private httpClient: HttpClient) { }
/*
  getTransactionDetails(): Observable<TransctionDetails>{
    let transcation_data: TransctionDetails = 
      {
        slno: 1,
        transaction_date: "12-12-2020",
        transcation_time : "21:00",
        transcation_amount : 5000,
        transcation_type : "debit"
    };
    
  return of(transcation_data);
  }*/
}
