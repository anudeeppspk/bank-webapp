import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(private dashboardService: DashboardService,  private router: Router) { }

  ngOnInit(): void {

    let user = JSON.parse(localStorage.getItem('user')!);

    if(user == null) {
      this.router.navigate(['login']);
      localStorage.clear();
    }

    this.dashboardService.getAcountDetails(user.accountnumber).subscribe((account_data) => {
      this.acc_number = account_data.account.accountnumber;
      this.acc_ifsc = account_data.account.ifsccode;
      this.acc_branch = account_data.account.branchname;
      this.balance = account_data.account.balance;
    });

    this.dashboardService.getUserDetails(user.accountnumber).subscribe(user_data => {
      this.full_name = user_data.user.firstname + " " + user_data.user.lastname;
    });

  }

}
