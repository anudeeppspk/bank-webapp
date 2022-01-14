import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getAPIBaseUrl } from 'src/app/utils/common';

import { Signup} from "../../models/signup";

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http:HttpClient) { }

  signup(payload:Signup) {
    return this.http.post(`${getAPIBaseUrl()}saveUser`, payload);
  }
}
