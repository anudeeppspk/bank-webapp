import { Component, OnInit } from '@angular/core';

import {TransctionDetails} from '../../models/transction-details';
import { TransactionsService } from '../../services/transactions/transactions.service';

@Component({
  selector: 'app-transcations',
  templateUrl: './transcations.component.html',
  styleUrls: ['./transcations.component.scss']
})
export class TranscationsComponent implements OnInit {
   /* sno: any;
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
    });*/
    columnDefs = [
      {headerName: 'Sno', field: 'sno',},
      {headerName: 'Date', field: 'Date'},
      {headerName: 'Time', field: 'Time'},
      {headerName: 'Amount', field: 'Amount'},
      {headerName: 'Type', field: 'Type'}
  ];

  rowData = [
      {sno: 1, Date: '12-12-2020', Time: "21:00", Amount:34999, Type:"debit"},
      {sno: 2, Date: '3-1-2022', Time: "21:00",Amount:4999, Type:"credit"},
      {sno: 3, Date: '9-1-2022', Time: "21:00",Amount:786875, Type:"debit"}
  ];

  defaultColDef = {
    sortable: true,
    filter: true
  };

constructor() { }

ngOnInit(): void {
}
  }


