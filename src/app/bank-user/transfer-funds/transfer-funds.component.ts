import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/common/components/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from 'src/app/common/components/success-dialog/success-dialog.component';
import { TransferFundsService } from 'src/app/services/transfer-funds/transfer-funds.service';

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

  transferAmountLoadStates = {
    isSearchLoading: false,
    isTransferLoading: false,
  }

  constructor(public transferFundService: TransferFundsService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  clearSearchData(event: any) {
    console.log("onchange");
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

    console.log("Send money function called");
    this.transferAmountLoadStates.isTransferLoading = true;

    this.transferFundService.transferAmount(this.transferFundsForm.getRawValue()).subscribe((data) => {

      setTimeout(() => {
        this.transferFundsForm.reset();
        this.dialog.open(SuccessDialogComponent, {
          data: { successMessage: "Amount transferred successfully." },
          width: '30%',
        });
        this.transferAmountLoadStates.isTransferLoading = false;
      }, 1000);

    }, (err) => {
      this.dialog.open(ErrorDialogComponent, {
        data: { errorMessage: err.message },
        width: '30%',
      });
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

    console.log("Search account function called");
    this.transferAmountLoadStates.isSearchLoading = true;

    this.transferFundService.searchAccountNumber(this.transferFundsForm.get('account_number')?.value).subscribe((data: any) => {

      setTimeout(() => {
        this.transferFundsForm.patchValue({
          account_name: data.account_name,
          account_ifsc: data.account_ifsc
        });
        this.transferAmountLoadStates.isSearchLoading = false;
      }, 1000);

    }, (err) => {
      this.dialog.open(ErrorDialogComponent, {
        data: { errorMessage: err.message },
        width: '30%',
      });
    });
  }

}