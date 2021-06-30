import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = ''
  password = ''
  invalidLogin = false
  userForm:FormGroup;

  constructor(private router: Router,
    private loginservice: AuthenticationService) { }

    // checkLogin() {
    //   if (this.loginservice.authenticate(this.username, this.password)
    //   ) {
    //     this.router.navigate([''])
    //     this.invalidLogin = false
    //   } else
    //     this.invalidLogin = true
    // }

  checkLogin() {
    if (this.loginservice.authenticate(this.userForm.value.username, this.userForm.value.password)) {
      this.router.navigate([''])
      this.invalidLogin = false;
    } else
      this.invalidLogin = true
  }


  ngOnInit(): void {
    this.userForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [ Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
    });
  }

}
