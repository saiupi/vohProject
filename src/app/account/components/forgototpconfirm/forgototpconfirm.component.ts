import { AccountService } from '@app/account/services';
import { Component, OnInit, ViewChildren } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-forgototpconfirm',
  templateUrl: './forgototpconfirm.component.html',
  styleUrls: ['./forgototpconfirm.component.scss'],
})
export class ForgotOtpConfirmComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  resending = false;
  checkOTP = false;
  username: string;
  title = 'otp';
  mainOTP: any;
  formInput = ['input1', 'input2', 'input3', 'input4', 'input5', 'input6'];
  @ViewChildren('formRow') rows: any;
  errorMsg: any;
  constructor(private accountService: AccountService) {
    this.form = this.toFormGroup(this.formInput);
  }

  ngOnInit() {}
  onSubmitForm() {
    console.log(this.form.value);
    this.mainOTP = '';
    console.log(Object.values(this.form.value));
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
      group[key] = new FormControl('', Validators.required);
    });
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

  async onSubmit(otp: string) {
    console.log(this.form.value);

    this.submitted = true;

    this.loading = true;
    const username = this.username;
    this.accountService.postLoginEvent({
      name: 'forgotConfirmPassword',
      data: { username, otp },
    });
  }

  resendOtp() {
    const forgotOtpVal = localStorage.getItem('forgotOtpVal');
    this.accountService
      .forgotPassword(forgotOtpVal)
      .then(() => {
        console.log('otp sent again');
        this.accountService.postLoginEvent({
          name: 'forgotOtp',
          data: { forgotOtpVal },
        });
      })
      .catch((error) => {
        console.log('forgot otp error', error);
        this.errorMsg = error;
        // this.loading = false;
      });
  }

  CloseOtpModal() {
    this.accountService.postLoginEvent({ name: 'close' });
    this.accountService.postLoginEvent({ name: 'forgot' });
  }
}
