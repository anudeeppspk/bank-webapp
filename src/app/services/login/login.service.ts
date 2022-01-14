import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getAPIBaseUrl } from 'src/app/utils/common';

import {login} from "../../models/login"

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {

  }

  login(payload:login) {
    return this.http.post<login>(`${getAPIBaseUrl()}login`, payload);
  }
}
