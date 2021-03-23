import { Analytics } from 'aws-amplify';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreateVYStaycationBookingModelInput } from '@app/service-module/aws-current-itinerary.service';
import { PaymentService } from '@app/service-module/payment.service';
import { StaycationPackagesService } from '@app/service-module/staycation-packages.service';
@Component({
  selector: 'app-staycation-payment',
  templateUrl: './staycation-payment.component.html',
  styleUrls: ['./staycation-payment.component.scss'],
})
export class StaycationPaymentComponent implements OnInit {
  params;
  transactionStatus: string;
  transactionId: string;
  polling = true;
  paymentDetails = undefined;
  totalTransaction = undefined;
  constructor(
    private staycationService: StaycationPackagesService,
    private paymentService: PaymentService
  ) {}

  ngOnInit() {
    let AWSStaycationBookingType: CreateVYStaycationBookingModelInput = JSON.parse(
      localStorage.getItem('staycationTransaction')
    );
    this.transactionId = AWSStaycationBookingType.id;
    this.paymentService.staycationPaymentGuard.next(false);
    this.dbPoll();
  }
  dbPoll() {
    try {
      var status = setInterval(async () => {
        await this.staycationService
          .getStaycationWithBookingId(this.transactionId)
          .then((res) => {
            this.transactionStatus = res.bookingStatus;
            console.log('poll', this.transactionStatus);
            Analytics.record({
              name: 'StaycationPaymentResponse',
              attributes: { status: this.transactionStatus },
            });
            if (
              this.transactionStatus == 'completedFailed' ||
              this.transactionStatus == 'completedSuccess'
            ) {
              console.log('paymentDetails', res);
              this.totalTransaction = res;
              this.paymentDetails = JSON.parse(res.paymentDetails);
              this.polling = false;
              clearInterval(status);
            }
          });
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  }
}
