import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupService } from 'src/app/services/signup/signup.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';

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
    private signupService: SignupService, private snackbarService: SnackbarService) { }

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
    
    this.signupService.signup(payload).subscribe({
      next: (response) => {
        this.isSignIn = false;
        this.snackbarService.open('success', 'Account Registered Successfully');
        if (response) {
          this.router.navigate(["login"])
          return;
        }
      }, error: (e) => {
        this.snackbarService.open('error', 'Something went wrong. Try again.');
        this.isSignIn = false;
      }
    })
  }
}
