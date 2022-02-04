import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { SuccessDialogComponent } from 'src/app/common/components/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from 'src/app/common/components/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { RequestMoneyService } from 'src/app/services/request-money/request-money.service';


@Component({
  selector: 'app-approve-decline-cell',
  templateUrl: './approve-decline-cell.component.html',
  styleUrls: ['./approve-decline-cell.component.scss']
})
export class ApproveDeclineCellComponent implements OnInit, ICellRendererAngularComp {
  
  constructor(public requestMoneyService: RequestMoneyService, public dialog: MatDialog) { }
  
  requestDetails:any;
  private cellvalue:any;
  
  ngOnInit(): void {}

  agInit(params: ICellRendererParams): void {
      this.cellvalue=params.value;
      let user = JSON.parse(localStorage.getItem('user')!);
      this.requestDetails={
        accountNumber:user.accountnumber,
        requestId:params.data.refno
      }
  }

  refresh(params: ICellRendererParams): boolean {
    this.cellvalue=params.value;
      return true;
  }

  sendRequestMoney(){    
    this.requestMoneyService.payRequest(this.requestDetails).subscribe((data) => {
      this.dialog.open(SuccessDialogComponent, {
        data: { successMessage: "Amount Send successfully." },
        width: '30%',
      });
    }, (err) => {
      console.log(err);
      this.dialog.open(ErrorDialogComponent, {
        data: { errorMessage: err.error.message },
        width: '30%',
      });
    });
  }

  declineTransfer(){    
    this.requestMoneyService.declineRequest(this.requestDetails).subscribe((data) => {
      this.dialog.open(SuccessDialogComponent, {
        data: { successMessage: "Transaction Declined successfully." },
        width: '30%',
      });
    }, (err) => {
      console.log(err);
      this.dialog.open(ErrorDialogComponent, {
        data: { errorMessage: err.error.message },
        width: '30%',
      });
    });
  }
}
