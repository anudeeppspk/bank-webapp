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
  accountDetails: AccountDetails | null = null;
  acc_number: any;
  acc_ifsc: any;
  acc_branch: any;
  balance: any;
  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.getAcountDetails().subscribe((account_data) => {
      this.acc_number = account_data.accountnumber;
      this.acc_ifsc = account_data.ifsccode;
      this.acc_branch = account_data.branchname;
      this.balance = account_data.balance;
    });

    this.dashboardService.getUserDetails().subscribe(user_data => {
      this.full_name = user_data.firstname + " " + user_data.lastname;
    });

  }

}
