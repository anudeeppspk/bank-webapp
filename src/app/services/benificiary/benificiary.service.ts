import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BenificiaryPayload, BenificiaryResponse } from 'src/app/models/benificiary-details';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BenificiaryService {

  constructor(private httpClient: HttpClient) { }

  getBenificiaries(accountNumber: string) {
    return this.httpClient.get<BenificiaryResponse>(environment.baseURL + '/getBeneficiaryList?myAccountNumber=' + accountNumber);
  }

  addBenificiary(benificiaryPayload: BenificiaryPayload) {
    return this.httpClient.post(environment.baseURL + '/addBeneficiaryList', benificiaryPayload, { responseType: 'text' as 'json' });
  }

}
