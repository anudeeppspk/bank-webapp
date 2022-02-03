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
  step: any=1;
  signupForm!: FormGroup;
  securityQuestions!: FormGroup;
  userDetails!: FormGroup;

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
      
      securityquestion1: ['', [Validators.required]],
      securityquestion2: ['', [Validators.required,Validators.pattern(/^(.*?[a-zA-Z]){2,}$/)]]
      
    })
  }
  get formControls(): { [key: string]: AbstractControl } {
    return this.signupForm.controls;
  }
  onPrevious(){
    this.step=this.step-1;
  }
  onNext(){
    this.step=this.step+1;
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
      phonenumber: this.signupForm.value.mobile,
      securityquestionone: this.signupForm.value.securityquestion1,
      securityquestiontwo: this.signupForm.value.securityquestion2
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
      }, error: (e) => {
        this._snackBar.open('Account already registered', 'OK', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 5000
        });
        this.isSignIn = false;
      }
    })
  }
}
