import { Time } from "@angular/common";
import { DatePipe } from '@angular/common';

export interface TransctionDetails {
  //transaction_details:{
    slno:  Number | null,
    transaction_date:  string,
    transcation_time: string,
    transcation_amount: Number | null,
    transcation_type: String
 // }
}
