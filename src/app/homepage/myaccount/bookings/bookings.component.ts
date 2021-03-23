import { error } from 'protractor';
import { CurrentItinerary } from '@ojashub/voyaah-common';
import { Component, OnInit } from '@angular/core';
import { BookingServiceService } from '../../../service-module/booking-service.service';
import { Router } from '@angular/router';
import { UserItineraryService } from '@app/service-module/user-itinerary.service';
import { UserProfileService } from '@app/service-module/user-profile.service';
import { threadId } from 'worker_threads';
import { StaycationPackagesService } from '@app/service-module/staycation-packages.service';
import { CanceltripService } from '@app/service-module/canceltrip.service';
@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss'],
})
export class BookingsComponent implements OnInit {
  transactions: CurrentItinerary[] = [];
  customTravelHistory: CurrentItinerary[] = [];
  customTravelUpcoming: CurrentItinerary[] = [];
  stycationTravelHistory: any = [];
  stycationTravelUpcoming: any = [];
  staycationTravelCancelled: any = [];
  staycationTransactions: any;
  totalstaycation: any;
  packageId: any;
  totalStacationBookings: any;
  today: Date = new Date();
  stycationimageone: any;
  stycationimagetwo: any;
  totalStacationBookingsHistory: any;
  userNavigate: any;
  previewStaycation = 'booking';

  constructor(
    private bookingService: BookingServiceService,
    private staycationService: StaycationPackagesService,
    private router: Router,
    private canceltripService: CanceltripService
  ) {
    this.getCustomTravelTransactions();
    this.getStaycationTransactions();
  }

  ngOnInit() {
    this.staycationService.getStaycations().then((transactions) => {
      console.log(transactions, 'transactions');
      this.totalstaycation = [];
      this.totalstaycation = transactions;
    });
    this.staycationService.staycationBookingChanges.subscribe((res) => {
      if (res) {
        console.log('bookings changed', res);
        this.getStaycationTransactions();
      }
    });
  }

  getpackageValueImage(packageid: string) {
    for (let i = 0; i < this.totalstaycation?.length; i++) {
      if (packageid === this.totalstaycation[i].id) {
        return this.totalstaycation[i].packageValues.mainImage;
      }
    }
  }
  getpackageValuecityname(packageid: string) {
    for (let i = 0; i < this.totalstaycation?.length; i++) {
      if (packageid === this.totalstaycation[i].id) {
        return this.totalstaycation[i].packageValues.cityName;
      }
    }
  }
  getpackageValuename(packageid: string) {
    for (let i = 0; i < this.totalstaycation?.length; i++) {
      if (packageid === this.totalstaycation[i].id) {
        return this.totalstaycation[i].packageValues.name;
      }
    }
  }
  getpackageValuecountryName(packageid: string) {
    for (let i = 0; i < this.totalstaycation?.length; i++) {
      if (packageid === this.totalstaycation[i].id) {
        return this.totalstaycation[i].packageValues.countryName;
      }
    }
  }
  getpackageValuecityImage1(packageid: string) {
    for (let i = 0; i < this.totalstaycation?.length; i++) {
      if (packageid === this.totalstaycation[i].id) {
        return this.totalstaycation[i].packageValues.additionalImages[0];
      }
    }
  }
  getpackageValuecityImage2(packageid: string) {
    for (let i = 0; i < this.totalstaycation?.length; i++) {
      if (packageid === this.totalstaycation[i].id) {
        return this.totalstaycation[i].packageValues.additionalImages[1];
      }
    }
  }
  getpackageValuecityImage3(packageid: string) {
    for (let i = 0; i < this.totalstaycation?.length; i++) {
      if (packageid === this.totalstaycation[i].id) {
        return this.totalstaycation[i].packageValues.additionalImages[2];
      }
    }
  }
  getpackageValuecityImage4(packageid: string) {
    for (let i = 0; i < this.totalstaycation?.length; i++) {
      if (packageid === this.totalstaycation[i].id) {
        return this.totalstaycation[i].packageValues.additionalImages[3];
      }
    }
  }
  getpackageValuecurrency(packageid: string) {
    for (let i = 0; i < this.totalstaycation?.length; i++) {
      if (packageid === this.totalstaycation[i].id) {
        return this.totalstaycation[i].packageValues.fare.totalFare;
      }
    }
  }
  getpackageValuecurrencyType(packageid: string) {
    for (let i = 0; i < this.totalstaycation?.length; i++) {
      if (packageid === this.totalstaycation[i].id) {
        return this.totalstaycation[i].packageValues.fare.currency;
      }
    }
  }

  async getCustomTravelTransactions() {
    try {
      await this.bookingService.getBookingHistory().then((transactions) => {
        this.transactions = transactions;
        this.categorizeCustomBookings();
      });
      console.log('transactions', this.transactions);
    } catch (error) {
      console.log(error);
    }
  }
  async getStaycationTransactions() {
    try {
      await this.staycationService
        .getUsersStaycationBooking()
        .then(async (transactions) => {
          this.stycationTravelHistory = [];
          this.stycationTravelUpcoming = [];
          this.staycationTravelCancelled = [];
          this.staycationTransactions = [];
          this.staycationTransactions = transactions;
          await this.staycationTransactions.map((res, index) => {
            this.staycationTransactions[index].bookingDetails = JSON.parse(
              res.bookingDetails
            );
            this.staycationTransactions[index].paymentDetails = JSON.parse(
              res.paymentDetails
            );
          });

          console.log(this.staycationTransactions);
          this.categorizeStaycationBookings();
        });
    } catch (err) {
      console.log('staycation transaction error in booking component.ts', err);
    }
  }

  categorizeCustomBookings() {
    this.customTravelUpcoming = [];
    this.customTravelHistory = [];
    for (let i = 0; i < this.transactions.length; i++) {
      console.log(this.transactions[i])
      if (new Date(this.transactions[i].endDate) > this.today || new Date(this.transactions[i].endDate).getDate() == this.today.getDate()) {
        this.customTravelUpcoming.push(this.transactions[i]);
      } else {
        this.customTravelHistory.push(this.transactions[i]);
      }
    }
    console.log('customTravelHistory', this.customTravelHistory);
    console.log('upcoming', this.customTravelUpcoming);
  }
  categorizeStaycationBookings() {
    for (let i = 0; i < this.staycationTransactions.length; i++) {
      if (this.staycationTransactions[i].bookingStatus === 'completedSuccess') {
        if (
          new Date(this.staycationTransactions[i].travelStartDate) >
            this.today ||
          new Date(this.staycationTransactions[i].travelStartDate).getDate() ==
            this.today.getDate()
        ) {
          this.stycationTravelUpcoming.push(this.staycationTransactions[i]);
        } else {
          this.stycationTravelHistory.push(this.staycationTransactions[i]);
        }
      } else if (
        this.staycationTransactions[i].bookingStatus ===
          'initiatedCancelProcess' ||
        this.staycationTransactions[i].bookingStatus === 'refundInitiated' ||
        this.staycationTransactions[i].bookingStatus === 'amountRefunded'
      ) {
        this.staycationTravelCancelled.push(this.staycationTransactions[i]);
      }
    }
    console.log(this.stycationTravelUpcoming, 'this.stycationTravelUpcoming');
    console.log(this.stycationTravelHistory, 'this.stycationTravelHistory');
    console.log(
      this.staycationTravelCancelled,
      'this.staycationTravelCancelled'
    );
  }
  viewTrip(index) {
    localStorage.setItem("customId", index);
    this.bookingService.selectedBooking.next(this.customTravelUpcoming[index]);
    this.router.navigate(['/view-booking']);
  }
  viewTripstycation(booking) {
    for (let i = 0; i < this.totalstaycation?.length; i++) {
      if (booking.packageId === this.totalstaycation[i].id) {
        console.log(booking.packageId, '---------', this.totalstaycation[i].id);
        this.staycationService.setpreviewOption(this.previewStaycation);
        this.canceltripService.setSelectedBooking(booking);
        this.canceltripService.setSelectedPackage(this.totalstaycation[i]);
        this.router.navigate([
          '/staycation/' +
            this.totalstaycation[i].packageReference +
            '/bookedDetails',
        ]);
        break;
      }
    }
  }
}
