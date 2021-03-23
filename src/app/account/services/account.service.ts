import { ChangeNotifyService } from './../../service-module/change-notify.service';
import {
  CognitoUser,
  ICognitoUserAttributeData,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Auth, Hub } from 'aws-amplify';
import { User } from '@app/account/models';
import { environment } from '@environments/environment';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth/lib/types';
import { createInput } from '@angular/compiler/src/core';
export interface LoginEvent {
  name: LoginEventName;
  data?: unknown;
}
export type LoginEventName =
  | 'none'
  | 'close'
  | 'login'
  | 'Otp_enter'
  | 'register'
  | 'forgot'
  | 'forgotOtp'
  | 'forgotConfirmPassword'
  | 'dismiss';

@Injectable({ providedIn: 'root' })
export class AccountService {


  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  private loginEvent = new BehaviorSubject<LoginEvent>({ name: 'none' });
  private authenticatedUsername = new BehaviorSubject<string>('');

  private userAttributesvalue = new BehaviorSubject<boolean>(false);
  currentUserAttributes = this.userAttributesvalue.asObservable();
  baseURL: any = environment.apiServer;
  currentAuthUsername = this.authenticatedUsername.asObservable();
  currentLoginEvent = this.loginEvent.asObservable();
  private username;
  private password;
  private userAttributes = null;
  partnerResponce: any;

  // createData(data: any) {
  //   this.userData.next(data);
  // }
  constructor(
    private router: Router,
    private http: HttpClient,
    private changeNofifyService: ChangeNotifyService
  ) {
    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('user'))
    );
    this.user = this.userSubject.asObservable();

    Hub.listen('auth', ({ payload: { event } }) => {
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          this.getUsername();
          break;
        case 'signOut':
          localStorage.removeItem('user');
          break;
      }
    });
  }
  async getUsername() {
    const userData = await this.getCognitoUser();
    userData.getUserAttributes((err, attributes) => {
      const emailAttribute = attributes.filter(
        (attribute) => attribute.getName() === 'email'
      )[0];

      if (emailAttribute) {
        const email = emailAttribute.getValue();
        const user = new User();
        user.username = email;
        this.save(user);
      }
    });
  }



  getCognitoUser(): Promise<CognitoUser> {
    return Auth.currentAuthenticatedUser()
      .then((userData) => userData)
      .catch(() => console.log('Not signed in'));
  }

  public async isLoggedIn(): Promise<boolean> {
    return await Auth.currentAuthenticatedUser()
      .then((res) => {
        console.log('currentauthenticatedUser response', res, res.attributes);
        return true;
      })
      .catch((error) => {
        console.log('currentauthenticatedUser response', error);
        return false;
      });
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  save(user: User) {
    this.userSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));
    //localStorage.setItem('otpconfirmed', JSON.stringify('yes'));
  }

  async getAccessToken(): Promise<string> {
    const credentials = await Auth.currentSession();
    const accessToken = credentials.getAccessToken();
    const jwtToken = accessToken.getJwtToken();
    console.log('AccountService: getAccesstoken:', jwtToken);
    return jwtToken;
  }
  async login(username: string, password: string) {
    const user = new User();
    user.username = username;
    this.save(user);
    user.cognitoUser = await Auth.signIn(username, password);
    return Promise.resolve();
  }

  logout() {
    return Auth.signOut();
  }

  register(username: string, password: string) {
    const user = new User();
    user.username = username;
    this.save(user);
    this.username = username;
    this.password = password;
    return Auth.signUp({
      username,
      password,
    });
  }
  public forceLogin() {
    this.login(this.username, this.password);
    this.username = null;
    this.password = null;
    if (this.isValidEmail(this.userValue.username)) {
      this.changeNofifyService.newUserRegistered(this.userValue.username, null);
    } else {
      this.changeNofifyService.newUserRegistered(null, this.userValue.username);
    }
  }
  forgotPassword(username: string) {
    console.log(username);
    if (this.isValidEmail(username)) {
      this.changeNofifyService.forgotPassword(username, null);
    } else {
      this.changeNofifyService.forgotPassword(null, username);
    }
    return Auth.forgotPassword(username);
  }

  resetPassword(username: string, code: string, newPassword: string) {
    if (this.isValidEmail(username)) {
      this.changeNofifyService.resetPassword(username, null);
    } else {
      this.changeNofifyService.resetPassword(null, username);
    }
    return Auth.forgotPasswordSubmit(username, code, newPassword);
  }
  setOtpConfirmedState(code: string) {
    var state;
    if (code === 'CodeMismatchException') {
      state = 'no';
    } else if (code === 'login_user') {
      state = 'yes';
    } else {
      state = 'yes';
    }
    localStorage.setItem('otpconfirmed', state);
  }
  confirmSignUp(code: string) {
    return Auth.confirmSignUp(this.userValue.username, code);
  }

  private isValidEmail(val: string): boolean {
    // eslint-disable-next-line max-len
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(val).toLowerCase());
  }

  confirmSignIn(code: string) {
    // handle MFA
  }

  resendOTP() {
    return Auth.resendSignUp(this.userValue.username);
  }

  googleSignIn() {
    Auth.federatedSignIn({
      provider: 'Google' as CognitoHostedUIIdentityProvider,
    });
  }

  facebookSignIn() {
    Auth.federatedSignIn({
      provider: 'Facebook' as CognitoHostedUIIdentityProvider,
    });
  }

  onSocialLogin() {}

  postLoginEvent(next: LoginEvent) {
    this.loginEvent.next(next);
  }

  updateAuthUsername(next: string) {
    this.authenticatedUsername.next(next);
  }

  async updateUserEmail(userattributeValue: string): Promise<string> {
    try {
      let user = await Auth.currentAuthenticatedUser();
      let result = await Auth.updateUserAttributes(user, {
        email: userattributeValue,
      });
      console.log(result); // SUCCESS
      return result;
    } catch (err) {
      throw err;
    }
  }
  async updateUserMobile(userattributeValue: string) {
    try {
      let user = await Auth.currentAuthenticatedUser();
      let result = await Auth.updateUserAttributes(user, {
        phone_number: userattributeValue,
      });
      // let result = await Auth.verifyCurrentUserAttribute('phone_number');
      console.log(result); // SUCCESSl
      return result;
    } catch (err) {
      throw err;
    }
  }

  async resendCodeForVerifyAttributes(attributeName: string) {
    try {
      let result = await Auth.verifyCurrentUserAttribute(attributeName);
      console.log(result);
      return result;
    } catch (err) {
      throw err;
    }
  }

  async verifyUserAttributes(userAttributeName: string, code: string) {
    try {
      let result = await Auth.verifyCurrentUserAttributeSubmit(
        userAttributeName,
        code
      );
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
