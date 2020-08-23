import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from './../service/login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  name: string

  constructor(
    private _formBuilder: FormBuilder,
    private route: Router,
    private loginService: LoginService
    ) { }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

  }

  onSubmit() {
    if(this.loginForm.invalid) {
      return false;
    }

    this.loginService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(
      data => {
        console.log("login response: ", data);
        localStorage.setItem('token', data.id);
        this.route.navigate(['product']);
      },
      error => {
        console.log("error in logging in: ", error);
      }
    );
  }

}
