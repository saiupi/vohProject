import { Analytics } from 'aws-amplify';
import { Component, OnInit, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService, AlertService } from '@app/account/services';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-otp-confirm',
  templateUrl: 'confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  resending = false;
  checkOTP = false;
  title = 'otp';
  worngPassword = false;
  mainOTP: any;
  // userPassword: any;
  //apiURL = "https://cognito-idp.ap-south-1.amazonaws.com/"
  formInput = ['input1', 'input2', 'input3', 'input4', 'input5', 'input6'];
  @ViewChildren('formRow') rows: any;
  userPresent: any;
  userVerify: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private alertService: AlertService,
    private route: Router
  ) {
    this.form = this.toFormGroup(this.formInput);
    this.onSubmit1();
  }

  ngOnInit() {
    // this.accountService.checkUser$.subscribe(
    //   (message) => (this.userPassword = message)
    // );
    let userDetail = JSON.parse(localStorage.getItem('user'));
    this.userPresent = userDetail;
    if (this.userPresent.username.includes('@')) {
      this.userVerify = true;
    } else {
      this.userVerify = false;
    }
    this.onSubmit1();
  }
  onSubmit1() {
    console.log(this.form.value);
    this.mainOTP = '';
    console.log(Object.values('main otp values' + this.form.value));
    let x: boolean;
    x = Object.values(this.form.value).some((y) => {
      if (this.mainOTP) this.mainOTP = this.mainOTP + y;
      else this.mainOTP = y;

      return y == '';
    });
    console.log(this.mainOTP, x);

    if (!x) {
      this.onSubmit(this.mainOTP);
    }
  }
  toFormGroup(elements) {
    const group: any = {};

    elements.forEach((key) => {
      console.log(group[key]);

      group[key] = new FormControl('', Validators.required);
    });
    console.log(new FormGroup(group));

    return new FormGroup(group);
  }

  keyUpEvent(event, index) {
    let pos = index;
    let x: boolean;

    if (event.keyCode === 8 && event.which === 8) {
      pos = index - 1;
    } else if (event.keyCode >= 48 && event.keyCode <= 57) {
      pos = index + 1;
    }

    console.log(this.formInput.length, this.form.value);

    if (pos > -1 && pos < this.formInput.length) {
      this.rows._results[pos].nativeElement.focus();
    }
    if (Object.values(this.form.value).length > 0) {
      this.worngPassword = false;
      x = Object.values(this.form.value).some((y) => {
        return y == '';
      });
      console.log(x, 'X');

      if (x == false) {
        this.checkOTP = true;
        console.log('hey buddy', this.checkOTP);
      }
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  async onSubmit(otp) {
    try {
      // let otp=parseFloat(x)
      // console.log(typeof otp);

      console.log(this.form.value);

      this.submitted = true;

      // reset alerts on submit
      this.alertService.clear();

      // stop here if form is invalid
      console.log(this.form.invalid, 'isloading');
      this.loading = true;
      console.log(this.loading, 'isloading');
      await this.accountService.setOtpConfirmedState(otp);
      await this.accountService.confirmSignUp(otp);
      await this.accountService.forceLogin();
      this.loading = false;
      Analytics.record({ name: 'ConfirmedUsers' });
      // if (this.loading === false) {
      //   let userDetail = JSON.parse(localStorage.getItem('user'));
      //   if (userDetail.username.length > 0) {
      //     this.accountService
      //       .login(userDetail.username, this.userPassword)
      //       .then((res) => {
      //         console.log(res);
      //       })
      //       .catch((error) => {
      //         console.log(error);
      //       });
      //   }
      // }
      this.accountService.postLoginEvent({ name: 'close' });
      //this.route.navigateByUrl('/');
      console.log(this.loading, 'isloading');
    } catch (err) {
      // error handling
      console.log(err, 'err');
      this.form.reset();
      this.loading = false;
      this.worngPassword = true;
      await this.accountService.setOtpConfirmedState(err.code);
    }
  }

  activated() {
    this.route.navigateByUrl('/');
  }

  async resend() {
    this.resending = true;
    await this.accountService.resendOTP();
    this.resending = false;
  }

  CloseOtpModal() {
    this.accountService.postLoginEvent({ name: 'close' });
    this.accountService.postLoginEvent({ name: 'register' });
  }
}
