import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/common/components/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from 'src/app/common/components/success-dialog/success-dialog.component';
import { TransferFundsService } from 'src/app/services/transfer-funds/transfer-funds.service';
import SelectBeneficiary from 'src/app/triggers/selectBeneficiary';

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

  }

  clearSearchData() {
    this.transferFundsForm.patchValue({
      account_name: "",
      account_ifsc: ""
    });
  }

  sendMoney() {

    console.log(this.transferFundsForm.getRawValue());

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

    const user = JSON.parse(localStorage.getItem('user')!);

    this.transferFundService.transferAmount(user.accountnumber, this.transferFundsForm.getRawValue()).subscribe((data) => {

      console.log(data);

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

    console.log("Search account function called");
    this.transferAmountLoadStates.isSearchLoading = true;

    this.transferFundService.searchAccountNumber(this.transferFundsForm.get('account_number')?.value).subscribe((data: any) => {

      console.log(data);

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