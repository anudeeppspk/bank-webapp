import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { benificiary, BenificiaryPayload } from "../../models/benificiary-details";
import{FormBuilder,FormGroup} from '@angular/forms';
import { BenificiaryService } from 'src/app/services/benificiary/benificiary.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import SelectBeneficiary from 'src/app/triggers/selectBeneficiary';


@Component({
  selector: 'app-benificiary',
  templateUrl: './benificiary.component.html',
  styleUrls: ['./benificiary.component.scss']
})
export class BenificiaryComponent implements OnInit {
   
  formValue!:FormGroup;
  

  constructor( private formbuilder:FormBuilder, private benificiaryService: BenificiaryService,
    private _snackBar: MatSnackBar) { }

  getBeneficiaries() {
    const user = JSON.parse(localStorage.getItem('user')!);

    this.benificiaryService.getBenificiaries(user.accountnumber).subscribe((response) => {
      const dataMapped = response.beneficiary.map((b, ind) => ({
        position: ind + 1,
        benAccNum: b.receiverAccNo,
        name: b.name,
        nickname: b.nick_name
      }))
      this.dataSource.data = dataMapped;
    })
  }

  ngOnInit(): void {

    this.getBeneficiaries();

    this.formValue = this.formbuilder.group({
      benAccNum : [''],
      nickname  : [''] ,
      name :['']
    })
  }


  displayedColumns = ['position', 'nickname'];

  dataSource = new MatTableDataSource<benificiary>([]);

  

  add() {

    const user = JSON.parse(localStorage.getItem('user')!);

    const payload: BenificiaryPayload = {
      myAccountNumber: user.accountnumber,
      name: this.formValue.value.name,
      nick_name: this.formValue.value.nickname,
      receiverAccNo: this.formValue.value.benAccNum
    }
    
    this.benificiaryService.addBenificiary(payload).subscribe({
      next: () => {
        this.formValue.reset();
        this.getBeneficiaries();
      },
      error: (e) => {
        this.formValue.reset();
        this._snackBar.open(e.error, 'OK', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 5000
        });
      }
    })
  }

  select(beneficiary: benificiary) {
    SelectBeneficiary.trigger(beneficiary.benAccNum)
  }

}
