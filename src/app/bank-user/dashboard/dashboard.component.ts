import { Component, OnInit } from '@angular/core';

import { AccountDetails } from '../../models/account-details';
import { DashboardService } from '../../services/dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  full_name: string | null = null;
  accountDetails: AccountDetails | null =null;
  acc_number:any;
  acc_ifsc:any;
  acc_branch: any;
  balance:any;
  constructor(private dashboardService:DashboardService ) { }

  ngOnInit(): void {
    this.dashboardService.getAcountDetails().subscribe((user_data) => {
      console.log(user_data);
      this.full_name = user_data.first_name + " " + user_data.last_name;
      this.acc_number=user_data.account_number;
      this.acc_ifsc=user_data.account_ifsc;
      this.acc_branch = user_data.account_branch;
      this.balance=user_data.account_balance;            
    });
  }

}
