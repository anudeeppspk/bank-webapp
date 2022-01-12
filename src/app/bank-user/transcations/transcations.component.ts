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
  rowData = [
    { sno: 1, Date: '12-12-2020', Time: "21:00", Amount: 34999, Type: "Debit" },
    { sno: 2, Date: '3-1-2022', Time: "08:00", Amount: 4999, Type: "Credit" },
    { sno: 3, Date: '9-1-2022', Time: "13:00", Amount: 786875, Type: "Debit" }
  ];

  constructor() { }

  ngOnInit(): void {
    /* dynamic data
    fetch('https://www.ag-grid.com/example-assets/row-data.json')
        .then(result => result.json())
        .then(rowData => this.rowData = rowData);
  */
  }
}


