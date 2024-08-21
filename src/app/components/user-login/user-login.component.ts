import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { Global, TokenDetails } from 'src/GlobalVar';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  signupUsers: any[] = [];
  signupObj: any = {
    userName: '',
    email: '',
    password: ''
  }
  message: string | undefined;

  loginObj: any = {
    userName: '',
    password: ''
  }
  tokenDetails: TokenDetails | undefined;
  email = '';
  password = ''
  responseData: any;
  credentials!: {
    email: string;
    password: string;
  };

  public formValidate!: FormGroup;
  public isInValid!: boolean;
  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {
    localStorage.clear();
    console.log(' message' + this.message);
    const navigation = this.router.getCurrentNavigation();
    this.message = navigation?.extras.state?.['message'];
  }
  ngOnInit(): void {

    const localData = localStorage.getItem('signUpUsers');
    if (localData != null) {
      this.signupUsers = JSON.parse(localData);
    }

    this.formValidate = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],

    })
    console.log(' message' + this.message);
  }

  onLogin() {

    debugger
    //const isUserExist = this.signupUsers.find(m=>m.userName===this.loginObj.userName && m.password===this.loginObj.password);
    const isUserExist = (this.loginObj.userName === 'ram' && this.loginObj.password === 'ram');
    if (isUserExist) {
      this.authService.getTokenForAdmin();
      console.log("user login successfully")
      localStorage.setItem("isLoggedId", "true");
      this.router.navigateByUrl("/home");
    } else {
      console.log("Wrong credentials")
      localStorage.setItem("isLoggedId", "false");
    }
    //this.authService.login(this.credentials).subscribe(
    this.authService.getTokenForAdmin().subscribe(
      (data) => {
        this.responseData = data;
        this.router.navigate(['/home']);
      },
      error => {
        console.error(' login failed ', error);
      }

    )
  }
  onSignup() {
    this.signupUsers.push(this.signupObj);
    localStorage.setItem('signUpUsers', JSON.stringify(this.signupUsers))
    this.signupObj = {
      userName: '',
      email: '',
      password: ''
    }
    console.log(" signup Done successfully")
  }

  details: any;
  onLoginFetchTokenLatest() {
    debugger
    this.authService.getTokenLatest({ username: this.loginObj.userName, password: this.loginObj.password }).subscribe(
      tokenResponse => {
        const token = tokenResponse.token; // Adjust based on your API response
        console.log('Stored token from onLoginFetchTokenLatest' + token)
        if (tokenResponse && tokenResponse.token) {
          // Global.appValues.set("admintoken", token);
          // Global.appValues.set("adminexpiresIn", tokenResponse.expiresIn);

          // localStorage.setItem('token', token);
          this.authService.setToken(this.loginObj.userName, token);
          //this.authService.setToken(this.loginObj.userName, token);

          this.router.navigateByUrl("/home");

        }


      },
      error => {
        console.error('Error fetching token', error);
      }
    );
  }
}
