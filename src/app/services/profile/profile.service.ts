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

  getProfileDetails(): Observable<ProfileDetails> {
    return this.httpClient.get<ProfileDetails>(environment.baseURL + "/getUser");
  }

  updatePassword(oldPassword: string, newPassword: string): Observable<HttpResponse<string>> {
    let body = {
      currentPassword: oldPassword,
      newPassword: newPassword
    }
    return this.httpClient.post<any>(environment.baseURL + "/updatePassword", JSON.parse(JSON.stringify(body)), { responseType: 'text' as 'json' });
  }


}
