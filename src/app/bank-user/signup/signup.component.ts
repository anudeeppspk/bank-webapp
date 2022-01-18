import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupService } from 'src/app/services/signup/signup.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  isSignIn: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router,
    private signupService: SignupService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[A-Z].*$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[A-Z].*$/)]],
      mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].*')]],

    })
  }
  get formControls(): { [key: string]: AbstractControl } {
    return this.signupForm.controls;
  }


  onSubmit() {
    this.signupForm.markAllAsTouched()
    if (this.signupForm.invalid) {
      return;
    }

    this.isSignIn = true;

    const payload = {
      username: this.signupForm.value.email,
      password: this.signupForm.value.password,
      firstname: this.signupForm.value.firstName,
      lastname: this.signupForm.value.lastName,
      phonenumber: this.signupForm.value.mobile
    }
    
    this.signupService.signup(payload).subscribe(({
      next: (response) => {
        this.isSignIn = false;
        this._snackBar.open('Account Registered Successfully', 'OK', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 5000
        });
        if (response) {
          this.router.navigate(["login"])
          return;
        }
      }, error: (e) => {
        this._snackBar.open('Account already registered', 'OK', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 5000
        });
        this.isSignIn = false;
      }
    }))
  }
}
