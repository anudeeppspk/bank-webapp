import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SignupService } from 'src/app/services/signup/signup.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SignupComponent implements OnInit {
  step: any = 1;
  signupForm!: FormGroup;
  securityQuestions!: FormGroup;

  isSignIn: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router,
    private signupService: SignupService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z].*$/)]),
      lastName: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z].*$/)]),
      mobile: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].*')])
    })
    this.securityQuestions = this.formBuilder.group({
      securityquestion1: ['', [Validators.required]],
      securityquestion2: ['', [Validators.required, Validators.pattern(/^(.*?[a-zA-Z]){2,}$/)]]
    })
  }
  get formControls(): { [key: string]: AbstractControl } {
    return this.signupForm.controls;
  }
  get formcontrols(): { [key: string]: AbstractControl } {
    return this.securityQuestions.controls;
  }

  onPrevious() {
    this.step = this.step - 1;
  }
  onNext() {
    this.signupForm.markAllAsTouched()
    if (this.signupForm.valid) {

      this.step = this.step + 1;

    }
  }

  onSubmit() {

    this.securityQuestions.markAllAsTouched()
    if (this.securityQuestions.invalid) {
      return;
    }

    this.isSignIn = true;

    const payload = {
      username: this.signupForm.value.email,
      password: this.signupForm.value.password,
      firstname: this.signupForm.value.firstName,
      lastname: this.signupForm.value.lastName,
      phonenumber: this.signupForm.value.mobile,
      securityquestion1: this.securityQuestions.value.securityquestion1,
      securityquestion2: this.securityQuestions.value.securityquestion2
    }

    this.signupService.signup(payload).subscribe({
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
      }, error: (err) => {
        err.error = JSON.parse(err.error)
        console.log("here");
        this._snackBar.open(err.error.message, 'OK', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 5000
        });
        this.isSignIn = false;
      }

    })

  }
}
