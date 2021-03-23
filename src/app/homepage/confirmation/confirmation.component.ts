import { Analytics } from 'aws-amplify';
import { Component, OnInit } from '@angular/core';
import { UserItineraryService } from '@app/service-module/user-itinerary.service';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { FORMERR } from 'dns';
import { SubSink } from 'subsink';
import { UserProfileService } from '@app/service-module/user-profile.service';
import { BookingServiceService } from '@app/service-module/booking-service.service';
import { AwsTranscationSyncService } from '../../service-module/aws-transcation-sync.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { promise } from 'protractor';
import { PaymentService } from '@app/service-module/payment.service';
@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent implements OnInit {
  private subs = new SubSink();

  previewItenaryDetails: any;
  fromCity: any;
  flightCountLength: any;
  hotelCountLength: any;
  ActivityCountLength: any;
  AcivityPreferanceNew: any;
  ActivePreferance: any;
  randomActiveImage: any;
  totalDate: any;
  TotalPersons: any;
  firstDate: any;
  endDate: any;
  stars = [1, 2, 3, 4, 5];

  dailyplan: any;
  booking: any;
  hotelRooms: any;
  userName: any;
  userDetails: any;
  data: any;

  hoteldetail: any;
  flightdetail: any;
  transactions: any;
  isLoading = false;
  dayPlannerDetails: any;
  pendingPay = false;
  successPay = false;
  flightDetails: any;
  hotelDetailsDb: any;
  flightDetailsDb: any;
  bookingFail = false;
  tempMessage = false;
  countTime = 0;
  paymentNotCommpleted = false;
  partialSuccess = false;
  paymentSuccess = false;
  reloadFails = false;
  reloadPage: any;
  flightStatus: any;
  Hotelstatus: any;
  flightFali = false;
  flightSuccess = false;
  hotelFali = false;
  hotelSuccess = false;
  flightsStatus: any = [];
  hotelStatus: any = [];

  constructor(
    private UserItinerary: UserItineraryService,
    private bookingService: BookingServiceService,
    private userProfileService: UserProfileService,
    private AwsTranscationSyncService: AwsTranscationSyncService,
    private router: Router,
    private paymentService: PaymentService
  ) {}

  async ngOnInit(): Promise<void> {
    this.randomActiveImage = [
      'https://voyaah-package-images-dev.s3.ap-south-1.amazonaws.com/public/about/sea.png',
      'https://voyaah-package-images-dev.s3.ap-south-1.amazonaws.com/public/about/Traveler2.png',
      'https://voyaah-package-images-dev.s3.ap-south-1.amazonaws.com/public/about/huts.png',
      'https://voyaah-package-images-dev.s3.ap-south-1.amazonaws.com/public/about/mountain.png',
    ];

    let UserData = this.UserItinerary.userItineraryData();
    let UserDataFlights = UserData.dayPlanner;

    let newFlightObject = UserDataFlights.map((fli) => {
      let flightData = {
        flightData: fli,
      };
      return flightData;
    });
    this.flightStatus = newFlightObject;

    let newHotelData = UserDataFlights.map((h) => {
      let HotelObject = {
        hotelData: h,
      };
      return HotelObject;
    });

    this.Hotelstatus = newHotelData;
    console.log(this.Hotelstatus, 'UserData');

    // window.onclick = (e) => {
    //   if (e.target) {
    //     this.bookingFail = false;
    //   }
    // };
    this.AwsTranscationSyncService.checkUser$.subscribe(
      (message) => (this.reloadPage = message)
    );
    if (this.reloadPage === true) {
      this.getTransactionsId();
    }
    let PreviewItenary = this.UserItinerary.userItineraryData();

    console.log(PreviewItenary, 'Peview');
    this.fromCity = PreviewItenary.originCity.cityName;
    this.previewItenaryDetails = PreviewItenary.dayPlanner;
    //Total Days
    this.firstDate = moment(this.previewItenaryDetails[0]?.date?.start);
    this.endDate = moment(
      this.previewItenaryDetails[this.previewItenaryDetails.length - 1]?.date
        ?.end
    );
    var EndDate = new Date(this.endDate);
    var startDate = new Date(this.firstDate);
    this.totalDate =
      (Date.UTC(EndDate.getFullYear(), EndDate.getMonth(), EndDate.getDate()) -
        Date.UTC(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate()
        )) /
      86400000;
    console.log(this.totalDate, this.endDate, 'totalDuration');
    //Total Travelers
    this.TotalPersons =
      PreviewItenary.travellers.adultCount +
      PreviewItenary.travellers.childCount +
      PreviewItenary.travellers.infantCount;
    console.log(this.TotalPersons, 'TotalPersons');
    //ActiveImage
    let ActivityImage = this.previewItenaryDetails.map((h) =>
      h.activityDetails.map((y) => y.activityData.coverImageUrl)
    );
    let ActivityImageList = ActivityImage.flat();
    // this.randomActiveImage = ActivityImageList.sort(
    //   () => Math.random() - Math.random()
    // ).slice(0, 4);
    console.log(
      this.AcivityPreferanceNew,
      this.ActivePreferance,
      // this.randomActiveImage,
      'ActivePreff'
    );
    this.transactions = await this.bookingService.getBookingHistoryTranscation();
    //this.getIndividualDetails();
    console.log('transactions', this.transactions);
    this.paymentService.customPaymentGuard.next(false);
  }

  async getTransactionsId() {
    try {
      this.transactions = await this.bookingService.getBookingHistoryTranscation();
      console.log('transactions', this.transactions);
      for (let i = 0; i < this.transactions.length; i++) {
        let bookingStatus = this.transactions[i].bookingStatus;
        Analytics.record({
          name: 'CustomPaymentResponse',
          attributes: { status: bookingStatus },
        });
        if (bookingStatus === 'completedSuccess') {
          this.showDetails();
          this.getIndividualDetails();
          this.isLoading = true;
          this.successPay = true;
          this.bookingFail = false;
        }
        if (bookingStatus === 'completedFailed') {
          this.isLoading = true;
          this.bookingFail = true;
        }
        if (bookingStatus === 'paymentSuccess') {
          this.getStatus();
          this.isLoading = true;
          this.paymentSuccess = true;
        }
        if (bookingStatus === 'partialSuccess') {
          this.getStatus();
          this.isLoading = true;
          this.partialSuccess = true;
        }
        if (bookingStatus === 'paymentPending') {
          this.getStatus();
          this.isLoading = true;
          this.paymentSuccess = true;
        }
      }
      //TODO: Filter only recent trasaction and show in confirmaiton page
      //TODO: bookingService.getCurrentTransaction()
    } catch (error) {
      //this.getStatus();
      // this.bookingFail = true;
      // this.isLoading = true;
      console.log(error);
    }
  }
  diff(start, end) {
    var startDate = new Date(start);
    var endDate = new Date(end);
    var diff = endDate.getTime() - startDate.getTime();
    var hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    var minutes = Math.floor(diff / 1000 / 60);
    if (hours < 0) hours = hours + 24;
    return (
      (hours <= 9 ? '0' : '') +
      hours +
      'h ' +
      (minutes <= 9 ? '0' : '') +
      minutes +
      'm'
    );
  }
  getIndividualDetails() {
    let transactionsDetails = [];
    for (let i = 0; i < this.transactions.length; i++) {
      transactionsDetails.push(JSON.parse(this.transactions[i].bookingDetails));
    }
    console.log(transactionsDetails, 'transactions');
    for (let i = 0; i < transactionsDetails.length; i++) {
      this.dayPlannerDetails = transactionsDetails[i].dayPlanner;
    }
    console.log(this.dayPlannerDetails, 'transactions');

    for (let i = 0; i < this.dayPlannerDetails.length; i++) {
      this.flightDetailsDb = this.dayPlannerDetails[i].flightDetails;
      this.hotelDetailsDb = this.dayPlannerDetails[i].hotelDetails;
      console.log(this.flightDetailsDb);
      if (this.flightDetailsDb.bookingStatus === 'completedFailed') {
        this.flightFali = true;
      }
      if (this.flightDetailsDb.bookingStatus === 'completedSuccess') {
        this.flightSuccess = true;
      }

      if (this.hotelDetailsDb.bookingStatus === 'completedFailed') {
        this.hotelFali = true;
      }
      if (this.hotelDetailsDb.bookingStatus === 'completedSuccess') {
        this.hotelSuccess = true;
      }
      let flightsState = this.dayPlannerDetails.map(
        (e) => e.flightDetails.bookingStatus
      );
      let flightBook = flightsState.filter(function (val) {
        return val !== undefined;
      });
      console.log(flightBook);
      this.flightsStatus = this.flightsStatus.every(
        (e) => e == 'completedFailed'
      );
      console.log(this.flightsStatus);

      let hotelState = this.dayPlannerDetails.map(
        (e) => e.hotelDetails.bookingStatus
      );
      let hotelBook = hotelState.filter(function (val) {
        return val !== undefined;
      });
      console.log(hotelBook);
      this.hotelStatus = this.hotelStatus.every((e) => e == 'completedFailed');
      console.log(this.hotelStatus);
    }
  }
  showDetails() {
    this.isLoading = true;
    this.tempMessage = true;
    setTimeout(async () => {
      this.isLoading = false;
    }, 3000);
  }
  getStatus() {
    setTimeout(async () => {
      this.countTime++;
      if (this.countTime < 11) {
        console.log(this.countTime, 'countTime');
        await this.getTransactionsId();
      } else {
        this.isLoading = false
        this.paymentNotCommpleted = true;
      }
    }, 5000);
  }

  Test_close() {
    this.router.navigateByUrl('/preview')
        .then(() => {
          window.location.reload();
        });
  }

  getUserNumber(): void {
    let userDetail = JSON.parse(localStorage.getItem('user'));
    this.userName = userDetail?.username;

    this.userDetails = this.userProfileService.getUserDetails();
    console.log(this.userDetails.mobileNo, 'this.userDetails');

    let booking = this.UserItinerary.userItineraryData();
    console.log(booking, 'Itenary');

    const flightDetails = booking.dayPlanner.map((x) => x.flightDetails);

    let flightsNotNull = flightDetails.filter(function (x) {
      return x !== undefined || null;
    });

    var newArrayFlights = flightsNotNull.filter(
      (value) => JSON.stringify(value) !== '{}'
    );

    console.log(newArrayFlights, 'newArrayFlights');

    let flightdata = [];
    for (let i = 0; i < newArrayFlights.length; i++) {
      this.flightdetail = {
        areaCode: '415',
        countryCode: '01',
        firstName: '',
        lastName: 'adultname',
        title: 'Mr<br>Mr',
        emailId: 'john@gmail.com',
        mobileNumber: '7338557899',
        dob: '',
        gender: 'M<br>F',
        issueCountry: 'India<br>India',
        passportExpiry: '',
        passportNumber: '',
        type: 'Public',
        isPassportMandatory: false,
        adultFlight: 1,
        childFlight: 0,
        infantFlight: 0,
        frequentFlyrNumber: '',
        adultMealPlan: '',
        childDOB: '',
        childGender: '',
        childTitle: '',
        childFirstName: '',
        childLastName: '',
        childPassportExpiryDate: '',
        childPassportNumber: '',
        childFrequestFlyrNumber: '',
        childMealPlan: '',
        infantDOB: '',

        infantGender: '',
        infantFirstName: '',
        infantLastName: '',
        infantTitle: '',
        infantMealPlan: '',
        fareSourceCode: newArrayFlights[i].fareSourceCode,
        postCode: 560061,
      };
      flightdata.push(this.flightdetail);
    }

    const hotelDetails = booking.dayPlanner.map((x) => x.hotelDetails);
    let hotelsRooms = hotelDetails.filter(function (x) {
      return x !== undefined || null;
    });
    var newArrayHotel = hotelsRooms.filter(
      (value) => JSON.stringify(value) !== '{}'
    );
    //let hotelsRooms2 = hotelsRooms.reduce((acc, val) => acc.concat(val), []);
    console.log(newArrayHotel, 'hotelDetailsPost');
    let hoteldata = [];
    for (let i = 0; i < newArrayHotel.length; i++) {
      this.hoteldetail = {
        sessionId: newArrayHotel[i].sessionId,
        productId: newArrayHotel[i].productId,
        tokenId: 'eolfFtHLCIgrDBW1b40K',
        rateBasisId: newArrayHotel[i].rateBasisId,
        clientRef: '12345',
        customerEmail: this.userName,
        customerPhone: this.userDetails.mobileNo,
        bookingNote: 'shivanote',
        paxDetails: [
          {
            roomNo: 1,
            adult: {
              title: ['Mr'],
              firstName: ['first1'],
              lastName: ['last1'],
            },
            child: {
              title: ['Mr'],
              firstName: ['first1'],
              lastName: ['last1'],
            },
          },
        ],
      };
      hoteldata.push(this.hoteldetail);
    }
    // this.subs.sink = this.bookingService
    //   .bookingDetails(flightdata, hoteldata)
    //   .subscribe((res) => {
    //     console.log(res);
    //   });
  }
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnDestroy() {
    // this.subs.unsubscribe();
  }
}
