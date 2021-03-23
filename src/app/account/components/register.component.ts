import { Analytics } from 'aws-amplify';
import { Platform, IonInput } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService, AlertService } from '@app/account/services';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  confirmOtp = false;
  userExsist = false;
  errorMessage: any;
  passwordType = 'password';
  passwordIcon = 'eye-off';
  marked = false;
  containsAlphabet: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService,
    public platform: Platform,
    public ModalController: ModalController
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/
          ),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}'
          ),
        ],
      ],
      countryCode: ['+91', Validators.required],
      acceptTerms: [false, Validators.requiredTrue],
    });
  }
  onKey(event: any) {
    // without type info
    if (event.target.value) {
      this.userExsist = false;
    }
  }
  trackType(event) {
    let value: string = event.target.value;
    this.containsAlphabet = /[a-zA-Z]/.test(value) || /@/.test(value);
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  isMobile() {
    return this.platform.is('mobile');
  }

  async onSubmit() {
    try {
      this.submitted = true;

      // reset alerts on submit
      this.alertService.clear();

      // stop here if form is invalid
      if (this.form.invalid) {
        return;
      }
      let userName;
      if (this.f.username.value.includes('@')) {
        userName = this.f.username.value;
      } else {
        userName = this.f.countryCode.value + this.f.username.value;
      }
      console.log('adasdasdasdasdasdasd', userName);
      this.loading = true;
      const { user } = await this.accountService.register(
        userName,
        this.f.password.value
      );
      // this.accountService.createData(this.f.password.value);
      console.log('user returned data :', user);
      Analytics.record({
        name: 'RegisteredUser',
      });
      this.loading = false;
      this.confirmOtp = true;
      this.accountService.postLoginEvent({ name: 'Otp_enter' });
    } catch (err) {
      // error handling
      console.log(err, 'err');
      this.errorMessage = err.message;
      if (err.message) {
        this.userExsist = true;
        localStorage.clear();
      }
      this.loading = false;
      console.log(this.errorMessage, 'error');
    }
  }

  presentForgotPassword() {
    this.accountService.postLoginEvent({ name: 'forgot' });
  }

  renderLoginModel() {
    this.accountService.postLoginEvent({ name: 'login' });
  }
  dismissModel() {
    this.accountService.postLoginEvent({ name: 'dismiss' });
  }

  onClickGoogle() {
    this.accountService.googleSignIn();
  }

  onClickFacebook() {
    this.accountService.facebookSignIn();
  }
  closeModal() {
    this.ModalController.dismiss();
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }
  toggleVisibility(e) {
    this.marked = e.target.checked;
  }
}
