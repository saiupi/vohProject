import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CanceltripService } from '@app/service-module/canceltrip.service';
import { StaycationPackagesService } from '@app/service-module/staycation-packages.service';
import { UserProfileService } from '@app/service-module/user-profile.service';

@Component({
  selector: 'app-canceltrip',
  templateUrl: './canceltrip.component.html',
  styleUrls: ['./canceltrip.component.scss'],
})
export class CanceltripComponent implements OnInit {
  refundDetails = undefined;
  passengers = undefined;
  selectedPackage = undefined;
  noOfAdults = undefined;
  noOfChildren = undefined;
  selectedBooking = undefined;
  couponReducedAmount = undefined;
  cancelled = false;
  modalDisplay = false;
  validationModal = false;
  primaryContact = undefined;
  transactionId = undefined;
  transactionStatus = undefined;
  constructor(
    private canceltripService: CanceltripService,
    private userProfileService: UserProfileService,
    private staycationService: StaycationPackagesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cancelled = false;
    this.refundDetails = this.canceltripService.getRefundDetailsResponse();
    console.log(this.refundDetails);
    this.selectedPackage = this.canceltripService.getSelectedPackage();
    console.log('selectedPackage', this.selectedPackage);
    this.selectedBooking = this.canceltripService.getSelectedBooking();
    console.log('selectedBooking', this.selectedBooking);
    this.passengers = this.selectedBooking.bookingDetails;
    if (this.selectedBooking.discountedValue == 'NA') {
      this.couponReducedAmount = 0;
    } else {
      this.couponReducedAmount = this.selectedBooking.discountedValue;
    }
    console.log('passengers', this.passengers);
    this.noOfAdults = this.passengers.adults.length;
    this.noOfChildren = this.passengers.children.length;
    this.primaryContact = this.userProfileService.userProfileDetails;
    console.log(this.primaryContact, 'sgsfgsdgsdgsdfdfgdhfghfghdfdf');
    this.transactionId = this.selectedBooking.id;
  }
  cancelBooking() {
    try {
      this.modalDisplay = true;
      this.validationModal = true;
      this.canceltripService.cancelTrip().then(
        (response) => {
          console.log(response);
          if (response.status == 'success') {
            this.dbPollForBookingStatus();
          } else {
            this.cancelled = false;
            this.modalDisplay = false;
            this.validationModal = false;
          }
        },
        (error) => {
          console.log(error);
          this.modalDisplay = false;
          this.validationModal = false;
        }
      );
    } catch (error) {
      console.log(error);
      this.modalDisplay = false;
      this.validationModal = false;
    }
  }
  dbPollForBookingStatus() {
    try {
      var status = setInterval(async () => {
        await this.staycationService
          .getStaycationWithBookingId(this.transactionId)
          .then((res) => {
            this.transactionStatus = res.bookingStatus;
            console.log('poll', this.transactionStatus);
            if (this.transactionStatus == 'initiatedCancelProcess') {
              this.cancelled = true;
              this.modalDisplay = false;
              this.validationModal = false;
              this.staycationService.changeStaycationBookings.next(true);
              clearInterval(status);
            }
          }),
          (error) => {
            this.modalDisplay = false;
            this.validationModal = false;
            console.log(error);
          };
      }, 3000);
    } catch (error) {
      this.modalDisplay = false;
      this.validationModal = false;
      console.log(error);
    }
  }
  goToMyBookings() {
    this.router.navigate(['/myaccount/bookings']);
  }
}
// bookingRef: "1614286673793"
// message: "cancel request has been initiated"
// status: "success"
