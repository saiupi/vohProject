import { error } from 'protractor';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '@app/account/services';
import { ModalController } from '@ionic/angular';
import { UserProfileService } from '@app/service-module/user-profile.service';
import { ChangeNotifyService } from '../../../service-module/change-notify.service';

@Component({
  selector: 'app-entercode',
  templateUrl: './entercode.component.html',
  styleUrls: ['./entercode.component.scss'],
})
export class EntercodeComponent implements OnInit {
  @Input() verifyFor: string;
  @Input() sendTo: string;
  verifyErrorMessage;
  code;
  constructor(
    private accountService: AccountService,
    public modalController: ModalController,
    public userProfileService: UserProfileService,
    public changeNotifyService: ChangeNotifyService
  ) { }

  ngOnInit() { }
  async verify() {
    try {
      let result = await this.accountService.verifyUserAttributes(
        this.verifyFor,
        this.code
      );
      console.log(result);
      await this.userProfileService.updateUserProfileVerificationDetails(
        this.verifyFor,
        this.sendTo
      );
      let userName = this.userProfileService.userProfileDetails.firstName;
      this.changeNotifyService.contactVerifiedNotify(this.verifyFor, this.sendTo, userName);
      this.dismiss();
    } catch (error) {
      console.log(error);
      this.verifyErrorMessage = error.message;
    }
  }
  async resendCode() {
    try {
      let result = await this.accountService.resendCodeForVerifyAttributes(
        this.verifyFor
      );
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
  removeErrorMessage() {
    this.verifyErrorMessage = null;
  }
}
