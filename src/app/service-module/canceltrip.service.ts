import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountService } from '@app/account/services/account.service';
import { ConfigService } from '@app/config.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CanceltripService {
  public selectedBooking = undefined;
  public refundDetailsResponse = undefined;
  public selectedPackage = undefined;
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private accountService: AccountService
  ) {}
  public setSelectedBooking(staycationBooking) {
    this.selectedBooking = staycationBooking;
  }
  public getSelectedBooking() {
    return this.selectedBooking;
  }
  public setSelectedPackage(packageDetails) {
    this.selectedPackage = packageDetails;
  }
  public getSelectedPackage() {
    return this.selectedPackage;
  }
  public getRefundDetailsResponse() {
    return this.refundDetailsResponse;
  }
  public setRefundDetailsResponse(refundDetails) {
    this.refundDetailsResponse = refundDetails;
  }
  public async getRefundDetails(): Promise<any> {
    console.log(this.selectedBooking);
    try {
      let payload = {
        transcationId: this.selectedBooking.id,
      };
      console.log('payload', payload);
      let accessToken = await this.accountService.getAccessToken();
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: accessToken,
        }),
      };
      let response = await this.http.post<any>(
        this.configService.apiUrl.getRefundDetails,
        payload,
        httpOptions
      );
      let responseAsPromise = response.toPromise();
      console.log(responseAsPromise);
      return responseAsPromise;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  public async cancelTrip() {
    try {
      let payload = {
        transcationId: this.refundDetailsResponse.transcationId,
        status: 'initiatedCancelProcess',
        refundAmount: this.refundDetailsResponse.refundAmount,
      };
      console.log('payload', payload);
      let accessToken = await this.accountService.getAccessToken();
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: accessToken,
        }),
      };
      let response = await this.http.post<any>(
        this.configService.apiUrl.cancelStaycationBooking,
        payload,
        httpOptions
      );
      let responseAsPromise = response.toPromise();
      return responseAsPromise;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
