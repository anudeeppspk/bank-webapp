import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private formBuilder:FormBuilder,private router: Router) { }

  ngOnInit(): void {
    this.signupForm=this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      
    })
  }
  get formControls(): { [key: string]: AbstractControl } {
    return this.signupForm.controls;
  }
  onSubmit() {


    this.signupForm.markAllAsTouched()

    // stop here if form is invalid
    if (this.signupForm.invalid) {
        return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.signupForm.value, null, 4));
    this.router.navigate(["login"])
  }

  

}
