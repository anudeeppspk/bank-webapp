import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ProfileDetails } from 'src/app/models/ProfileDetails';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private url: string = "http://localhost:3000/api";

  constructor(private httpClient: HttpClient) { }

  getProfileDetails(): Observable<ProfileDetails> {

    let data: ProfileDetails = {
      first_name: "Navaneeth",
      last_name: "Nivol",
      mobile_number: 1234567890,
      email_id: "nivol@gmail.com"
    };

    return of(data);

    // return this.httpClient.get<ProfileDetails>(this.url);
  }

  updatePassword(oldPassword: string, newPassword: string) {
    
  }


}
