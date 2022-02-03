import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//import { ErrorDialogComponent } from 'src/app/common/components/error-dialog/error-dialog.component';
import { ForgotPasswordService } from 'src/app/services/forgotpassword/forgotpassword.service';
//import { SuccessDialogComponent } from 'src/app/common/components/success-dialog/success-dialog.component';

import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  resetPasswordForm !: FormGroup;
  isUpdating=false;
  

  //forgotPasswordForm !: FormGroup;

  forgotPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    securityquestion1: new FormControl('', [Validators.required]),
    securityquestion2: new FormControl('', [Validators.required]),
    newpassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].*')]),
    // confirmpassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].*')])
  })

  constructor(private forgotpassService: ForgotPasswordService, private formBuilder: FormBuilder, private router: Router, private _snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit(): void {

    let bankuser = JSON.parse(localStorage.getItem('bankuser')!);
    this.forgotpassService.getUser(bankuser.email).subscribe((data: any) => {
      console.log(data);
    });

    // this.forgotPasswordForm = this.formBuilder.group({
    //   email: ['', [Validators.required, Validators.email]],
    //   securityquestion1: ['', [Validators.required]],
    //   securityquestion2: ['', [Validators.required, Validators.pattern(/^(.*?[a-zA-Z]){2,}$/)]],
    //   newpassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].*')]]
    // })
  }

  getErrorValue(errors: any): any {
    if (errors) {
      if (errors.required) {
        return "Input Field should not be empty";
      }
    }
  }

  get formControls(): { [key: string]: AbstractControl } {
    return this.forgotPasswordForm.controls;
  }


  onSubmit() {
    this.forgotPasswordForm.markAllAsTouched()
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.isUpdating=true;
    
    const payload = {
      email: this.forgotPasswordForm.value.email,
      securityquestion1: this.forgotPasswordForm.value.securityquestion1,
      securityquestion2: this.forgotPasswordForm.value.securityquestion2,
      newpassword: this.forgotPasswordForm.value.newpassword,
      // currentpassword: this.forgotPasswordForm.value.currentpassword      
    }

    this.forgotpassService.resetPassword(payload).subscribe(({
       next:(response: any)=>{
        this.isUpdating=false;
        this._snackBar.open('Update Successful!', 'OK', {
          horizontalPosition: 'end',
          verticalPosition: 'top',

       });
       localStorage.setItem('user', JSON.stringify(response.account));
        this.router.navigate(['home']);
      }, error: (err: { error: { message: 'Not Found'; }; }) => {
        this._snackBar.open(err.error.message, 'OK(not found)', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
        this.isUpdating=false;
      }
    }))
  }

  // resetPassword(){
  //   console.log(this.forgotPasswordForm.getRawValue());
    
  //   if (!this.resetPasswordForm.valid){
  //     let error_message = 'Invalid Details';

  //     if(this.forgotPasswordForm.get('email')?.valid && this.forgotPasswordForm.get('securityquestion1')?.valid && this.forgotPasswordForm.get('securityquestion2')){
  //       error_message = 'Invalid Details';
  //     }

  //     this.dialog.open(ErrorDialogComponent, {
  //       data: { errorMessage: error_message },
  //       width: '30%',
  //     });
  //     return;
  //   }
  //   console.log("Updating Password");
  //   this.isUpdating=true;

  //   let user = JSON.parse(localStorage.getItem('user')!);
    
  //   this.forgotpassService.resetPassword(this.forgotPasswordForm.getRawValue()).subscribe((data)=>{
  //     console.log(data);
  //     this.forgotPasswordForm.reset();
  //     this.dialog.open(SuccessDialogComponent, {
  //       data: { successMessage: "Updated successfully." },
  //       width: '30%',
  //     });
  //     this.isUpdating=false;
  //   },(err)=>{
  //     console.log(err);
  //     this.dialog.open(ErrorDialogComponent, {
  //       data: { errorMessage: err.error.message },
  //       width: '30%',
  //     });
  //     this.isUpdating=false;
  //   });
  // }


  //orginal code
  // resetPassword() {

  //   if (!this.resetPasswordForm.valid) {
  //     this.dialog.open(ErrorDialogComponent, {
  //       data: { errorMessage: 'Please fill in the details properly.' },
  //       width: '30%',
  //     });
  //   }

  //   console.log("reset password function is called");
  //   let forgotpassword_data = this.resetPasswordForm.getRawValue();
  //   let bankuser = JSON.parse(localStorage.getItem('bankuser')!);
  //   this.forgotpassService.resetPassword(bankuser.email, forgotpassword_data.newpassword).subscribe((data) => {
  //     console.log(data);
  //     this.forgotPasswordForm.reset();
  //     this.dialog.open(SuccessDialogComponent, {
  //       data: { successMessage: 'Passowrd has been reset successfully.' },
  //       width: '30%',
  //     });
  //   }, (err) => {
  //     console.log(err);
  //     this.dialog.open(ErrorDialogComponent, {
  //       data: { errorMessage: err.error },
  //       width: '30%',
  //     });
  //   });
  // }
}       