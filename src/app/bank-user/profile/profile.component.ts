import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  username: string = "Navaneeth Nivol";

  profileDetailsForm = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    mobile_number: new FormControl('', [Validators.required]),
    email_id: new FormControl('', [Validators.required])
  });

  updatePasswordForm = new FormGroup({
    current_password: new FormControl('', [Validators.required]),
    new_password: new FormControl('', [Validators.required])
  });

  constructor() { }

  ngOnInit(): void {
  }


  getErrorValue(errors: any): any {
    if (errors) {
      if (errors.required) {
        return "Input Field should not be empty";
      }
    }
  }

  saveProfileDetails() {
    console.log(this.profileDetailsForm.getRawValue());
  }

  updatePassword() {
    console.log(this.updatePasswordForm.getRawValue());
  }

}
