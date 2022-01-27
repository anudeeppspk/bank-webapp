import { Component, OnInit } from '@angular/core';

import { TransctionDetails } from '../../models/transction-details';
import { TransactionsService } from '../../services/transactions/transactions.service';

@Component({
  selector: 'app-transcations',
  templateUrl: './transcations.component.html',
  styleUrls: ['./transcations.component.scss']
})
export class TranscationsComponent implements OnInit {
  columnDefs = [
    { headerName: 'Sno', field: 'sno' },
    { headerName: 'Date', field: 'Date', headerTooltip: "Date of transaction" },
    { headerName: 'Time', field: 'Time', headerTooltip: "Time of transaction" },
    { headerName: 'Amount', field: 'Amount', headerTooltip: "Amount transferes/received" },
    { headerName: 'Type', field: 'Type', headerTooltip: "Type of transaction" }
  ];

  defaultColDef = {
    sortable: true,
    filter: true
  };

  //temp col data
  rowData: any = [];

  constructor(private transactionService: TransactionsService) { }

  ngOnInit(): void {

    let user = JSON.parse(localStorage.getItem('user')!);

    this.transactionService.getTransactionDetails(user.accountnumber).subscribe(data => {

      let sno = 1;

      for (let item of data.transactions) {
        let transaction = {
          sno: sno,
          Date: item.date,
          Time: item.time,
          Amount: item.amount,
          Type: item.type
        };

        sno++;
        this.rowData.push(transaction);
      }

    });

  }
}


