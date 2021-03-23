import { AccountService } from '@app/account/services';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  username: string;
  form: FormGroup;
  submitted = false;
  loading = false;
  showEmailModel = true;
  emailForm: FormGroup;
  submitEmail = false;
  invalidUser = false;
  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService
  ) {
    this.accountService.currentAuthUsername.subscribe((x) => {
      this.username = x;
    });
  }

  ngOnInit() {
    console.log(this.username);

    this.form = this.formBuilder.group({
      otp: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}'
          ),
        ],
      ],
    });
    this.emailForm = this.formBuilder.group({
      username: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }
  get v() {
    return this.emailForm.controls;
  }
  onSubmitEmail() {
    // this.submitEmail = true;

    console.log(
      this.emailForm.invalid,
      this.emailForm,
      'this.emailForm.invalid'
    );

    if (this.emailForm.invalid) {
      return;
    }

    this.accountService
      .forgotPassword(this.emailForm.value.username)
      .then(async () => {
        this.showEmailModel = false;
      })
      .catch((error) => {
        console.log(error);
        this.invalidUser = true;
        // this.loading = false;
      });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.accountService
      .resetPassword(this.username, this.f.otp.value, this.f.password.value)
      .then((res) => {
        this.loading = false;
        this.accountService.postLoginEvent({ name: 'close' });
      })
      .catch((error) => {
        console.log(error);
        this.accountService.postLoginEvent({ name: 'close' });
        this.loading = false;
      });
  }
}
