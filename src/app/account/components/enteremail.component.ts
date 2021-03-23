import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { json } from 'express';
import { AccountService } from '../services/account.service';
import { ModalController, Platform } from '@ionic/angular';
@Component({
  selector: 'app-enteremail',
  templateUrl: 'enteremail.component.html',
  styleUrls: ['./enteremail.component.scss'],
})
export class EnterEmailComponent implements OnInit {
  emailForm: FormGroup;
  submitted = false;
  invalidUser = false;
  errorMsg: any;
  containsAlphabet: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    public modalController: ModalController
  ) {}
  ngOnInit() {
    this.emailForm = this.formBuilder.group({
      username: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/
            // /^(\+([0-9]{2,3})\)?[-.]?([0-9]{5})[-. ]?([0-9]{5})$|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/
          ),
        ],
      ],
      countryCode: ['+91', Validators.required],
    });
  }
  trackType(event) {
    let value: string = event.target.value;
    this.containsAlphabet = /[a-zA-Z]/.test(value) || /@/.test(value);
  }

  get v() {
    return this.emailForm.controls;
  }
  onSubmitEmail() {
    let username;
    if (this.v.username.value.includes('@')) {
      username = this.v.username.value;
    } else {
      username = this.v.countryCode.value + this.v.username.value;
    }
    this.submitted = true;
    localStorage.setItem('forgotOtpVal', JSON.stringify(username));
    if (this.emailForm.invalid) {
      return;
    }
    try {
      this.accountService
        .forgotPassword(username)
        .then(async () => {
          this.accountService.postLoginEvent({
            name: 'forgotConfirmPassword',
            data: { username },
          });
        })
        .catch((error) => {
          console.log(error);
          this.errorMsg = error;
          this.invalidUser = true;
          // this.loading = false;
        });
    } catch (err) {
      console.log(err, 'ttt');
    }
  }
  closeModal() {
    this.modalController.dismiss();
  }
}
