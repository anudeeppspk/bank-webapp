import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private loginService: LoginService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
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
        this._snackBar.open('Login Successfully', 'OK', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 5000
        });
        
        localStorage.setItem('user', JSON.stringify(response));
        this.router.navigate(['home']);
      }, error: (e) => {
        this._snackBar.open('Username does not exists', 'OK', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 5000
        });
        this.isLoggingIn = false;
      }
    }))
  }

}
