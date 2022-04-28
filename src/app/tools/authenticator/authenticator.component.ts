import { Component, OnInit } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/FirebaseTSAuth';

@Component({
  selector: 'app-authenticator',
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.css'],
})
export class AuthenticatorComponent implements OnInit {
  state = AuthenticatorCompState.LOGIN;
  firebasetsAuth: FirebaseTSAuth;
  constructor() {
    this.firebasetsAuth = new FirebaseTSAuth();
  }

  ngOnInit(): void {

  }

  onRegisterClick(
    registerEmail: HTMLInputElement,
    registerPassword: HTMLInputElement,
    registerConfirmPassword: HTMLInputElement,
  ){
    let email = registerEmail.value;
    let password = registerPassword.value;
    let confirmPassword = registerConfirmPassword.value;

    if(
      this.isNotEmpty(email) &&
      this.isNotEmpty(password) &&
      this.isNotEmpty(confirmPassword) &&
      this.isAMatch(password,confirmPassword)
    )
    {
      this.firebasetsAuth.createAccountWith(
        {
          email: email,
          password: password,
          onComplete: (uc) => {
            alert("Account created");
            registerEmail.value = "";
            registerPassword.value = "";
            registerConfirmPassword.value = "";
          },
          onFail: (err) => {
            alert("Falied to create account.");
          }
        }
      );
    }


  }

  isNotEmpty(text: string)
  {
    return text != null && text.length > 0;
  }

  isAMatch(text: string, comparedWith: string)
  {
    return text == comparedWith;
  }

  onForgotPasswordClick() {
    this.state = AuthenticatorCompState.FORGOT_PASSWORD;
  }

  onCreateAccountClick() {
    this.state = AuthenticatorCompState.REGISTER;
  }

  onLoginClick() {
    this.state = AuthenticatorCompState.LOGIN;
  }

  isLoginState() {
    return this.state == AuthenticatorCompState.LOGIN;
  }

  isRegisterState() {
    return this.state == AuthenticatorCompState.REGISTER;
  }

  isForgotPasswordState() {
    return this.state == AuthenticatorCompState.FORGOT_PASSWORD;
  }

  getStateText() {
    switch (this.state) {
      case AuthenticatorCompState.LOGIN:
        return 'Login';
      case AuthenticatorCompState.REGISTER:
        return 'Register';
      case AuthenticatorCompState.FORGOT_PASSWORD:
        return 'Forgot Password';
    }
  }
}

export enum AuthenticatorCompState {
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD,
}
