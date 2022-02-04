import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/common/components/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from 'src/app/common/components/success-dialog/success-dialog.component';
import { TransferFundsService } from 'src/app/services/transfer-funds/transfer-funds.service';
import SelectBeneficiary from 'src/app/triggers/selectBeneficiary';
import { ApproveDeclineCellComponent } from 'src/app/common/components/approve-decline-cell/approve-decline-cell.component';
import { RequestMoneyService } from 'src/app/services/request-money/request-money.service';


@Component({
  selector: 'app-transfer-funds',
  templateUrl: './transfer-funds.component.html',
  styleUrls: ['./transfer-funds.component.scss']
})
export class TransferFundsComponent implements OnInit {

  transferFundsForm = new FormGroup({
    account_number: new FormControl('', [Validators.required, Validators.minLength(6)]),
    account_ifsc: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
    account_name: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
  });

  columnDef = [
    { headerName: 'Sno', field: 'sno',width:50 },
    { headerName: 'AccountNumber', field: 'AccountNumber',width:150, headerTooltip: "Name of the requester" },
    //{ headerName: 'Name', field: 'Name',width:100, headerTooltip: "Amount transferes/received" },
    { headerName: 'Amount', field: 'Amount',width:100, headerTooltip: "Amount transferes/received" },
    { headerName: 'Approve', field: 'status',width:150, 
    headerTooltip: "Amount transferes/received", cellRenderer:"ApproveDecline"},  
  ];
  completedDef=[
    {headerName: 'Sno', field: 'sno',width:50 },
    { headerName: 'AccountNumber', field: 'AccountNumber',width:150, headerTooltip: "Name of the requester" },
    //{ headerName: 'Name', field: 'Name',width:100, headerTooltip: "Amount transferes/received" },
    { headerName: 'Amount', field: 'Amount',width:100, headerTooltip: "Amount transferes/received" },
    { headerName: 'Status', field: 'status',width:150}, 
  ];
  declinedDef=[
    {headerName: 'Sno', field: 'sno',width:50 },
    { headerName: 'AccountNumber', field: 'AccountNumber',width:150, headerTooltip: "Name of the requester" },
    //{ headerName: 'Name', field: 'Name',width:100, headerTooltip: "Amount transferes/received" },
    { headerName: 'Amount', field: 'Amount',width:100, headerTooltip: "Amount transferes/received" },
    { headerName: 'Status', field: 'status',width:150}, 
  ];

  defaultColDef = {
    sortable: true,
    filter: true
  };

  rowData: any = [];
  completedRow:any=[];
  declinedRow:any=[];
  selStatus:string="PENDING";
  frameworkComponents:any;

  transferAmountLoadStates = {
    isSearchLoading: false,
    isTransferLoading: false,
  }
  
  constructor(public requestMoneyService: RequestMoneyService, 
    public transferFundService: TransferFundsService, public dialog: MatDialog) {}

  ngOnInit(): void {

    SelectBeneficiary.subscribe((benAccountNumber: string) => {
      this.transferFundsForm.patchValue({
        account_number: benAccountNumber,
      })
      this.transferFundService.searchAccountNumber(benAccountNumber).subscribe((account_data: any) => {
        this.transferFundsForm.patchValue({
          account_ifsc: account_data.account.ifsccode,
          account_name: account_data.account.name,
        })
      });
    })

    let user = JSON.parse(localStorage.getItem('user')!);
    this.frameworkComponents={
      ApproveDecline:ApproveDeclineCellComponent
    }
    this.requestMoneyService.getRequestDetails(user.accountnumber).subscribe(data => {
      let sno = 1;
      for (let item of data.requests) {
        let request = {
          sno: sno,
          AccountNumber:item.fromAccount,
          Amount:item.amount,
          refno:item.requestId,
          status:item.status
        }
        sno++;
        this.rowData.push(request);
        console.log(request.refno);
      }
    });
    this.requestMoneyService.getCompletedRequest(user.accountnumber).subscribe(data => {
      let sno = 1;
      for (let item of data.requests) {
        let request = {
          sno: sno,
          AccountNumber:item.fromAccount,
          Amount:item.amount,
          refno:item.requestId,
          status:item.status
        }
        sno++;
        this.completedRow.push(request);
        console.log(request);
      }
    });
    this.requestMoneyService.getDeclinedRequest(user.accountnumber).subscribe(data => {
      let sno = 1;
      for (let item of data.requests) {
        let request = {
          sno: sno,
          AccountNumber:item.fromAccount,
          Amount:item.amount,
          refno:item.requestId,
          status:item.status
        }
        sno++;
        this.declinedRow.push(request);
        console.log(request);
      }
    });
  }

  selectedStatus (event: any) {
    this.selStatus = event.target.value;
    console.log(this.selStatus);
  }

  clearSearchData() {
    this.transferFundsForm.patchValue({
      account_name: "",
      account_ifsc: ""
    });
  }

  sendMoney() {
    if (!this.transferFundsForm.valid) {
      let error_message = 'Please fill in the details properly.';
      if (this.transferFundsForm.get('account_number')?.valid && this.transferFundsForm.get('amount')?.valid) {
        error_message = 'Please search the account number.';
      }
      this.dialog.open(ErrorDialogComponent, {
        data: { errorMessage: error_message },
        width: '30%',
      });
      return;
    }
    this.transferAmountLoadStates.isTransferLoading = true;

    let user = JSON.parse(localStorage.getItem('user')!);
    
    this.transferFundService.transferAmount(user.accountnumber, this.transferFundsForm.getRawValue()).subscribe((data) => {
      this.transferFundsForm.reset();
      this.dialog.open(SuccessDialogComponent, {
        data: { successMessage: "Amount transferred successfully." },
        width: '30%',
      });
      this.transferAmountLoadStates.isTransferLoading = false;
    }, (err) => {
      console.log(err);
      this.dialog.open(ErrorDialogComponent, {
        data: { errorMessage: err.error.message },
        width: '30%',
      });
      this.transferAmountLoadStates.isTransferLoading = false;
    });
  }

  searchAccount() {
    if (!this.transferFundsForm.get('account_number')?.valid) {
      this.dialog.open(ErrorDialogComponent, {
        data: { errorMessage: "Please enter account number." },
        width: '30%',
      });
      return;
    }
    this.transferAmountLoadStates.isSearchLoading = true;
    this.transferFundService.searchAccountNumber(this.transferFundsForm.get('account_number')?.value).subscribe((data: any) => {
      this.transferFundsForm.patchValue({
        account_name: data.account.name,
        account_ifsc: data.account.ifsccode
      });
      this.transferAmountLoadStates.isSearchLoading = false;
    }, (err) => {
      console.log(err);
      this.dialog.open(ErrorDialogComponent, {
        data: { errorMessage: "Account not found" },
        width: '30%',
      });
      this.transferAmountLoadStates.isSearchLoading = false;
    });
  }
} 

