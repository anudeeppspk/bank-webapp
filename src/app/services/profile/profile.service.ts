import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProfileDetails } from 'src/app/models/ProfileDetails';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient: HttpClient) { }

  getProfileDetails(accountNumber: string): Observable<ProfileDetails> {
    let body = {
      accountNumber: accountNumber
    }
    return this.httpClient.post<any>(environment.baseURL + "/getUser", body);
  }

  updatePassword(accountNumber: string, oldPassword: string, newPassword: string): Observable<HttpResponse<string>> {
    let body = {
      accountNumber: accountNumber,
      currentPassword: oldPassword,
      newPassword: newPassword
    }
    return this.httpClient.post<any>(environment.baseURL + "/updatePassword", body);
  }


}
