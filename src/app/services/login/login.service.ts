import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Observer } from 'rxjs';

import { login, LoginResponse } from "../../models/login"

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {

  }

  login(payload:login) {
    return this.http.post<LoginResponse>(environment.baseURL + "/login", payload);
  }
}
