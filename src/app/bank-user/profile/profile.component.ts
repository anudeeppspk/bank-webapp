import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/common/components/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from 'src/app/common/components/success-dialog/success-dialog.component';

import { ProfileDetails } from 'src/app/models/ProfileDetails';

import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  full_name: string | null = null;
  profileDetails: ProfileDetails | null = null;

  updatePasswordLoadStates = {
    isLoading: false,
  }

  updatePasswordForm = new FormGroup({
    current_password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    new_password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private profileService: ProfileService, public dialog: MatDialog) { }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('user')!);
    this.profileService.getProfileDetails(user.accountnumber).subscribe((data: any) => {
      console.log(data);
      this.full_name = data.user.firstname + " " + data.user.lastname;
      this.profileDetails = data.user;
    });
  }

  getErrorValue(errors: any): any {
    if (errors) {
      if (errors.required) {
        return "Input Field should not be empty";
      }
    }
  }

  updatePassword() {

    if (!this.updatePasswordForm.valid) {
      this.dialog.open(ErrorDialogComponent, {
        data: { errorMessage: 'Please fill in the details properly.' },
        width: '30%',
      });
      return;
    }

    console.log("update password function called");
    let password_data = this.updatePasswordForm.getRawValue();
    this.updatePasswordLoadStates.isLoading = true;
    let user = JSON.parse(localStorage.getItem('user')!);
    this.profileService.updatePassword(user.accountnumber, password_data.current_password, password_data.new_password).subscribe((data) => {
      console.log(data);
      this.updatePasswordForm.reset();
      this.dialog.open(SuccessDialogComponent, {
        data: { successMessage: 'Password has been updated successfully.' },
        width: '30%',
      });
      this.updatePasswordLoadStates.isLoading = false;
    }, (err) => {
      console.log(err);
      this.dialog.open(ErrorDialogComponent, {
        data: { errorMessage: err.error },
        width: '30%',
      });
      return;
    });

  }

}
