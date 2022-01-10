import { Component, OnInit } from '@angular/core';

import {TransctionDetails} from '../../models/transction-details';
import { TransactionsService } from '../../services/transactions/transactions.service';

@Component({
  selector: 'app-transcations',
  templateUrl: './transcations.component.html',
  styleUrls: ['./transcations.component.scss']
})
export class TranscationsComponent implements OnInit {
    sno: any;
    date: any;
    time: any;
    amount:any;
    type: any;

  constructor(private transactionService: TransactionsService) { }
  
  ngOnInit(): void {
    this.transactionService.getTransactionDetails().subscribe((transcation_data) => {
      console.log(transcation_data);
      this.sno=transcation_data.slno;  
      this.date=transcation_data.transaction_date;
      this.time=transcation_data.transcation_time;
      this.amount=transcation_data.transcation_amount;
      this.type=transcation_data.transcation_type;        
    });
  }

}
