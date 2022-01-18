import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getAPIBaseUrl } from 'src/app/utils/common';

import { Signup } from "../../models/signup";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  signup(payload: Signup) {
    return this.http.post(environment.baseURL + `/saveUser`, payload, { responseType: 'text' as 'json' });
  }
}
