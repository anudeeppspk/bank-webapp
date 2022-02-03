import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { forgotpw } from "src/app/models/forgotpw";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class ForgotPasswordService {
    constructor(private httpClient: HttpClient) { }

    getUser(email: string): Observable<Object> {
        return this.httpClient.get<Object>(environment.baseURL + `/getBankUser?email=${email}`);
    }
    
    resetPassword(email: string, newpassword: string): Observable<HttpResponse<string>> {

        let body = {
            email: email,
            newpassword: newpassword
        }
        return this.httpClient.post<any>(environment.baseURL + "/resetPassword", body);
    }

}