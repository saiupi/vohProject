import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '@app/config.service';
import {
  ChangeNotifyRequest,
  UserNotificationInfo,
  NotifyType,
} from '@ojashub/voyaah-common';
@Injectable({
  providedIn: 'root',
})
export class ChangeNotifyService {
  constructor(private http: HttpClient, private configService: ConfigService) { }

  public async newUserRegistered(
    email?: string,
    mobile?: string
  ): Promise<void> {
    await this._post(
      this.configService.apiUrl.changeNotify,
      'newUserRegistered',
      email,
      mobile
    );
  }

  public async forgotPassword(email?: string, mobile?: string): Promise<void> {
    await this._post(
      this.configService.apiUrl.changeNotify,
      'forgotPassword',
      email,
      mobile
    );
  }

  public async resetPassword(email?: string, mobile?: string): Promise<void> {
    await this._post(
      this.configService.apiUrl.changeNotify,
      'passwordChanged',
      email,
      mobile
    );
  }

  public async profileUpdated(
    email?: string,
    mobile?: string,
    firstName?: string,
    lastName?: string
  ): Promise<void> {
    await this._post(
      this.configService.apiUrl.changeNotify,
      'profileUpdated',
      email,
      mobile,
      firstName,
      lastName
    );
  }

  public async userQueryNotify(
    name?: string,
    email?: string,
    number?: number,
    message?: string
  ): Promise<void> {
    await this._post(
      this.configService.apiUrl.changeNotify,
      'adminMailNotify',
      email,
      null,
      null,
      null,
      name,
      message,
      number,
      null,
      null,
      null
    );
  }

  public async contactVerifiedNotify(verifiedFor?: string, sendTo?: string, userName?: string): Promise<void> {
    await this._post(
      this.configService.apiUrl.changeNotify,
      'contactVerified',
      null, null, null, null, null, null, null,
      verifiedFor,
      sendTo, userName
    );
  }

  private async _post(
    url: string,
    notifyType: NotifyType,
    email?: string,
    mobile?: string,
    firstName?: string,
    lastName?: string,
    name?: string,
    message?: string,
    number?: number,
    verifiedFor?: string,
    sendTo?: string,
    userName?: string
  ): Promise<void> {
    const requestBody: ChangeNotifyRequest = {
      notifyType: notifyType,
      data: {
        email,
        firstName,
        lastName,
        mobile,
        name,
        message,
        number,
        verifiedFor,
        sendTo,
        userName
      },
    };
    this.http.post(url, requestBody).subscribe(
      (res) => {
        return Promise.resolve();
      },
      (err) => {
        throw `Failed to post message for ${url} Error: ${err}`;
      }
    );
  }
}
