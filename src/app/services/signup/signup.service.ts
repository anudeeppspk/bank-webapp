import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Signup } from "../../models/signup";

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  signup(payload: Signup) {
    return this.http.post(environment.baseURL + `/saveUser`, payload, { responseType: 'text' as 'json' });
  }
}
