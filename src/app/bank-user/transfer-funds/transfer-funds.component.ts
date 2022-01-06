import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-transfer-funds',
  templateUrl: './transfer-funds.component.html',
  styleUrls: ['./transfer-funds.component.scss']
})
export class TransferFundsComponent implements OnInit {

  transferFundsForm = new FormGroup({
    account_number: new FormControl('', [Validators.required]),
    account_name: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
  });

  constructor() { }

  ngOnInit(): void {
  }

  sendMoney() {
    console.log("Send money function called");
  }

}
