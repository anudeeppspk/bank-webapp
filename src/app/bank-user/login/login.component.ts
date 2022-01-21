import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login/login.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { AuthStorageService } from 'src/app/services/auth-storage/auth-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  isLoggingIn: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, 
    private loginService: LoginService, private snackbarSerivice: SnackbarService, private authStorageService: AuthStorageService) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.minLength(8), Validators.maxLength(15), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].*')]]
    });
   

  }

  get formControls(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  onSubmit() {

    this.loginForm.markAllAsTouched()

    if (this.loginForm.invalid) {
      return;
    }

    this.isLoggingIn = true;

     const payload = {
      userName: this.loginForm.value.email,
      password: this.loginForm.value.password
     }

    this.loginService.login(payload).subscribe(({
      next: (response) => {
        this.isLoggingIn = false;
        this.snackbarSerivice.open('success', 'Logged in Successfully');
        this.authStorageService.setAuthIdentity(JSON.stringify(response));
        this.router.navigate(['home']);
      }, error: (e) => {
        console.log(e);
        this.snackbarSerivice.open('error', e.error.statusMessage);
        this.isLoggingIn = false;
      }
    }))
  }

}
