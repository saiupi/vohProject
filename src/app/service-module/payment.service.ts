import { environment } from '@environments/environment';
import { ConfigService } from '@app/config.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserProfileService } from './user-profile.service';
import { BehaviorSubject } from 'rxjs';
export type CurrencyType = 'INR' | 'USD';

interface PaymentResponse {
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  // for guards---------------------
  public staycationPaymentGuard = new BehaviorSubject<boolean>(false);
  staycationResponseGuard = this.staycationPaymentGuard.asObservable();
  public customPaymentGuard = new BehaviorSubject<boolean>(false);
  customResponseGuard = this.customPaymentGuard.asObservable();
  //--------------------------------
  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private userProfileService: UserProfileService
  ) {}

  public async getPaymentUrl(
    orderId: string,
    currency: CurrencyType = 'INR',
    amount: number,
    language: string = 'EN',
    merchant_param1: string = 'custom-travel',
    merchant_param2: string = 'browser',
    merchant_param3: string = 'unset'
  ): Promise<string> {
    let userProfileDetails = this.userProfileService.getUserDetails();
    let billing_name = userProfileDetails.firstName;
    let billing_address = userProfileDetails.address;
    let billing_zip = userProfileDetails.zipCode;
    let billing_tel = userProfileDetails.mobileNo;
    let billing_email = userProfileDetails.email;
    const { origin } = window.location;
    let responseUrl = `${origin}${this.config.apiUrl.paymentResponse}`;
    if (merchant_param2 == 'mobile') {
      responseUrl = this.config.apiUrl.paymentResponse;
    }
    console.log('getPaymentURL: responseURL: ', responseUrl);

    const inputParams = `order_id=${orderId}&currency=${currency}&language=${language}&amount=${amount}&merchant_param1=${merchant_param1}&merchant_param2=${merchant_param2}&merchant_param3=${merchant_param3}&billing_name=${billing_name}&billing_address=${billing_address}&billing_zip=${billing_zip}&billing_tel=${billing_tel}&billing_email=${billing_email}`;
    const body = {
      type: 'Request',
      content: `${inputParams}&redirect_url=${responseUrl}
      &cancel_url=${responseUrl}`,
      // origin + '/api/paymentResponse'
    };

    const response = await this.http
      .post<PaymentResponse>(this.config.apiUrl.payments, body)
      .toPromise();

    return response.url;
  }

  public async redirectToPayment(
    orderId: string,
    amount: number,
    currency: CurrencyType = 'INR',
    language: string = 'EN',
    merchant_param1: string = 'custom-travel',
    merchant_param2: string = 'browser',
    merchant_param3: string = 'unset'
  ) {
    const url = await this.getPaymentUrl(
      orderId,
      currency,
      amount,
      language,
      merchant_param1,
      merchant_param2,
      merchant_param3
    );
    window.location.href = url;
  }
}
