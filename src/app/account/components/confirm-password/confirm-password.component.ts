import { AccountService } from '@app/account/services';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.scss'],
})
export class ConfirmPasswordComponent implements OnInit {
  username: string;
  otp: string;
  form: FormGroup;
  submitted = false;
  loading = false;
  showEmailModel = true;
  submitEmail = false;
  invalidUser = false;
  successMessage = false;
  checkPassword: boolean;
  wrongOtpMessage: string;
  otpInvalid: boolean;
  passwordType = 'password';
  passwordIcon = 'eye-off';
  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    public ModalController: ModalController
  ) {}

  ngOnInit() {
    console.log(this.username);
    var forgotOtpVal = localStorage.getItem('forgotOtpVal');
    console.log(forgotOtpVal, 'forgotOtpVal');
    var user = { username: forgotOtpVal?.replace(/"/g, '') };
    localStorage.setItem('user', JSON.stringify(user));
    this.form = this.formBuilder.group({
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}'
          ),
        ],
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}'
          ),
        ],
      ],
      confirmOtp: ['', [Validators.required]],
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmitConfirmPassword() {
    // this.submitEmail = true;

    let pass_word = this.f.password.value;
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    if (this.f.confirmPassword.value !== pass_word) {
      this.checkPassword = true;
      return;
    } else {
      this.checkPassword = false;
    }
    this.loading = true;

    this.accountService
      .resetPassword(this.username, this.f.confirmOtp.value, pass_word)
      .then((res) => {
        this.successMessage = true;
        this.accountService.postLoginEvent({ name: 'close' });
      })
      .finally(() => {
        this.loading = false;
      })
      .catch((error) => {
        this.otpInvalid = true;
        this.wrongOtpMessage = error.message;
        console.log(error);
      });
  }

  resendOtp() {
    const forgotOtpVal = localStorage.getItem('forgotOtpVal');
    this.accountService
      .forgotPassword(forgotOtpVal)
      .then(() => {
        this.wrongOtpMessage = 'OTP has been sent again.';
      })
      .catch((error) => {
        console.log('forgot otp error', error);
      });
  }
  CloseOtpModal() {
    this.accountService.postLoginEvent({ name: 'close' });
    this.accountService.postLoginEvent({ name: 'forgot' });
  }
  closeModal() {
    this.ModalController.dismiss();
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }
}
