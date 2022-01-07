import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transcations',
  templateUrl: './transcations.component.html',
  styleUrls: ['./transcations.component.scss']
})
export class TranscationsComponent implements OnInit {

  

  rows: any[]= [
    {
      sno: 1,
      date: "12-12-2020",
      time : "21:00",
      amount : 5000,
      type : "debit"
    },
  
    {
      sno : 2,
      date : "3-1-2022",
      time : "09:00",
      amount : 28000,
      type : "credit"
    },

    {
      sno : 3,
      date : "9-1-2022",
      time : "19:00",
      amount : 8000,
      type : "credit"
    }
  ]
  constructor() { }
  
  ngOnInit(): void {
  }

}
