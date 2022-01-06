import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  username: string="XYZ";
  account_number: number=123456789;
  account_ifsc: number=3333;
  account_branch: string="Visakhapatnam";
  balance: number=69000.00;
  constructor() { }

  ngOnInit(): void {
  }

}
