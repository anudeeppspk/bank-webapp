import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Request} from "../../models/request";
@Injectable({
  providedIn: 'root'
})
export class RequestMoneyService {

  constructor(private httpClient: HttpClient) { }

  getRequestDetails(accountNumber: String): Observable<any> {
    return this.httpClient.get<Object>(environment.baseURL + `/requests/pending?accountNumber=${accountNumber}`);
  } 
 
  getCompletedRequest(accountNumber: String): Observable<any> {
    return this.httpClient.get<Object>(environment.baseURL + `/requests/completed?accountNumber=${accountNumber}`);
  } 
  getDeclinedRequest(accountNumber: String): Observable<any> {
    return this.httpClient.get<Object>(environment.baseURL + `/requests/declined?accountNumber=${accountNumber}`);
  } 
  createRequest(payload: Request) {
    console.log(payload);
    return this.httpClient.post(environment.baseURL + `/requests/create` , payload,{responseType: 'text' as 'json' });
  }
  payRequest(payload: Request)
  {
    location.reload();
    return this.httpClient.post(environment.baseURL + `/requests/pay` , payload,{responseType: 'text' as 'json' });
  }
  declineRequest(payload: Request)
  {
    location.reload();
    return this.httpClient.post(environment.baseURL + `/requests/decline` , payload,{responseType: 'text' as 'json' });
  }

  

}