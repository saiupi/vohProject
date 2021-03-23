import { Analytics } from 'aws-amplify';
import { filter } from 'rxjs/operators';
import { async } from '@angular/core/testing';
import { UserProfileDetails } from '@ojashub/voyaah-common';
import { PaymentService } from './../../service-module/payment.service';
import { Component, OnInit } from '@angular/core';
import { UserItineraryService } from './../../service-module/user-itinerary.service';
import { ModalController, Platform } from '@ionic/angular';
import * as moment from 'moment';
import { LoginComponent } from '../../account/components/login.component';
import { UserProfileService } from '@app/service-module/user-profile.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { v4 as uuid } from 'uuid';
import * as $ from 'jquery';
import { TravellersDetails } from '@ojashub/voyaah-common';
import { NgxSpinnerService } from 'ngx-spinner';
import { AwsTranscationSyncService } from '@app/service-module/aws-transcation-sync.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '@app/config.service';
import { CustomBooking } from '@ojashub/voyaah-common';
import { AccountService } from '@app/account/services/account.service';
const { v1: uuidv1 } = require('uuid');
// import {AwsTranscationSyncService} from ''
@Component({
  selector: 'app-previewitenerary',
  templateUrl: './previewitenerary.component.html',
  styleUrls: ['./previewitenerary.component.scss'],
})
export class PreviewiteneraryComponent implements OnInit {
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
  flighttotalamount: any;
  flighttotalfare: any;
  amounttypeflight: any;
  flightfareamout: any;
  flighttaxamount: any;
  hotelAmount: any;
  hotelamountfill: any;
  roomprice: any;
  totalhotelprice: any;
  hotelamountType: any;
  hotelmoneytype: any;
  flightamounttype: any;
  GrandTotal: number;
  userNavigate: boolean;
  GrandTotalAmount: any;
  show = false;
  showa = false;
  EquivFareTax: any;
  buttonName = 'chevron-down-outline';
  buttonNamea = 'chevron-down-outline';
  taxTypeNames: any;
  taxTypeFilter: any;
  activityFare: any;
  activityTax: any;
  activityObjectCollectionarr: any;
  activityService: string;
  activityCurrencyType: string;
  totalTax: string;
  equivFare: string;
  days = 'days';
  ActivityImageList: any;
  roomindprice: any;
  params: Params;
  payFali: any;
  failedStatus = false;
  returnFlight: any;
  returnFlightFare: any;
  isLoading = false;
  selectedTravellers: TravellersDetails = {
    adults: [],
    children: [],
    infants: [],
  };
  returnFlightFareSourceCode: any;
  sourceCode: any;
  flightValid = true;
  totalData: any;
  uuidReturn: any;
  hotelValid = true;
  bothItems: boolean;
  totalReturnFlightfare: any;
  invalidFlights: any;
  PreviewItenary: any;
  newInvalidFlightarray: any;
  totalFlights: any;
  flights_valid = true;
  apiError = true;
  newInvalidHotelsarray: any;
  flightpricechange = true;
  bothItems_price: boolean;
  hotel_valid = true;
  hotelpricechange = true;
  noItemSelect = false;
  httpOptions: any;
  travelCity: any;
  travelStartDate: any;
  userDetails: any;
  onAndroidPLatform = false;
  onIOSPlatform = false;
  packageReference: any;
 
 // customDetails:any

  constructor(
    private UserItinerary: UserItineraryService,
    private userProfileService: UserProfileService,
    private router: Router,
    private pay: PaymentService,
    private route: ActivatedRoute,
    public modalController: ModalController,
    public AwsTranscationSyncService: AwsTranscationSyncService,
    private http: HttpClient,
    private APIservice: ConfigService,
    private awsTranscationSyncService: AwsTranscationSyncService,
    private accountService: AccountService,
    private platform: Platform,
    private userItineraryService: UserItineraryService
  ) {
    this.onAndroidPLatform = this.platform.is('android');
    this.onIOSPlatform = this.platform.is('ios');
    this.userProfileService.currentUserNavigate.subscribe((res) => {
      console.log(res, 'rsep');
      this.userNavigate = res;
    });
    this.userProfileService.faildPayment.subscribe((res) => {
      console.log(res, 'this.payFali ');
      this.payFali = res;
    });
    this.UserItinerary.itineraryChanged.subscribe((r) => {
      this.selectedTravellers = this.UserItinerary.userItineraryData().selectedTravellers;
      console.log(this.selectedTravellers, 'selected travellers');
    });
    this.PreviewItenary = this.UserItinerary.userItineraryData();
    console.log(this.PreviewItenary, 'Peview');
  }
  toggle() {
    this.show = !this.show;

    // CHANGE THE NAME OF THE BUTTON.
    if (this.show) this.buttonName = 'chevron-up-outline';
    else this.buttonName = 'chevron-down-outline';
  }

  toggleActivity() {
    this.showa = !this.showa;

    // CHANGE THE NAME OF THE BUTTON.
    if (this.showa) this.buttonNamea = 'chevron-up-outline';
    else this.buttonNamea = 'chevron-down-outline';
  }
  close_pay() {
    this.payFali = false;
  }
  async ngOnInit() {
    
    window.onclick = (e) => {
      if (e.target) {
        this.payFali = false;
        this.flightValid = true;
        this.hotelValid = true;
        this.apiError = true;
        this.flightpricechange = true;
        this.hotelpricechange = true;
        this.noItemSelect = false;
        this.bothItems_price = true 
      }
    };

    function sum(a) {
      return (a.length && parseFloat(a[0]) + sum(a.slice(1))) || 0;
    }
    

    this.params = this.route.snapshot.queryParams;
    console.log(this.params);
    this.failedStatus = this.params.status === 'failed';

    this.selectedTravellers = this.PreviewItenary.selectedTravellers;
    console.log(this.selectedTravellers, 'selected travellers');

    this.returnFlight = this.PreviewItenary.returnPlan;
    console.log(this.returnFlight, 'returnFlight');


    this.fromCity = this.PreviewItenary.originCity.cityName;
    //Total Days
      this.firstDate = moment(this.PreviewItenary.startDate);
      this.endDate = moment(this.PreviewItenary.endDate);

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
      this.PreviewItenary.travellers.adultCount +
      this.PreviewItenary.travellers.childCount +
      this.PreviewItenary.travellers.infantCount;
    console.log(this.TotalPersons, this.flighttotalfare, 'TotalPersons');

    this.previewItenaryDetails = this.PreviewItenary.dayPlanner;

    // let flightTaxPrice = [];
    // let flightFarePrice = [];
    // for(let i=0;i<this.previewItenaryDetails?.length;i++)
    // {
    //   flightTaxPrice.push(this.previewItenaryDetails[i]?.flightDetails?.fareDetails?.totalTax.amount);
    //   flightFarePrice.push(this.previewItenaryDetails[i]?.flightDetails?.fareDetails?.equivFare.amount);
    //   let flightTaxPriceFilter = flightTaxPrice.filter(function (x) {
    //     return x !== undefined || null;
    //   });
    //   let flightFarePriceFilter = flightFarePrice.filter(function (x) {
    //     return x !== undefined || null;
    //   });
    //   console.log(flightTaxPriceFilter);
    //   console.log(flightFarePriceFilter);

    //   let flightTaxPriceForAllFlights;
    //   let flightFarePriceeForAllFlights;
    //      if (flightTaxPriceFilter.length === 1) {
    //       flightTaxPriceForAllFlights = flightTaxPriceFilter[0];
    //     } else {
    //       flightTaxPriceForAllFlights = sum(flightTaxPriceFilter).toFixed(1);
    //     }   

    //     if (flightFarePriceFilter.length === 1) {
    //       flightFarePriceeForAllFlights = flightFarePriceFilter[0];
    //     } else {
    //       flightFarePriceeForAllFlights = sum(flightFarePriceFilter).toFixed(1);
    //     }  

    //     console.log(flightTaxPriceForAllFlights);
    //     console.log(flightFarePriceeForAllFlights);
    // }





    //Flights
    
    console.log(this.returnFlight, 'll');
    for (let i = 0; i < this.returnFlight?.length; i++) {
      this.returnFlightFare = this.returnFlight[i].flightDetails.fareDetails;
      this.returnFlightFareSourceCode = this.returnFlight[
        i
      ]?.flightDetails?.fareSourceCode;
      this.uuidReturn = this.returnFlight[i]?.flightDetails?.uuid;
      this.totalReturnFlightfare = this.returnFlight[
        i
      ]?.flightDetails?.fareDetails?.totalFare?.amount;
    }
    console.log(this.returnFlightFare, 'returnFlightFare');

    let flightCount = this.previewItenaryDetails?.map(
      (h) => h.flightDetails?.sequenceNumber
    );

    var filteredFlights = flightCount.filter(function (x) {
      return x !== undefined || null;
    });
    this.flightCountLength = filteredFlights;

    let flightamout = this.previewItenaryDetails.map(
      (h) => h.flightDetails?.fareDetails?.totalFare?.amount
    );

    flightamout?.push(this.returnFlightFare?.totalFare?.amount);

    let flightfareamoutarr = flightamout.filter(function (x) {
      return x !== undefined || null;
    });
    console.log(flightfareamoutarr, 'flightfareamoutarr');
    if (flightfareamoutarr.length === 1) {
      this.flightfareamout = flightfareamoutarr[0];
    } else {
      this.flightfareamout = sum(flightfareamoutarr).toFixed(1);
    }

    //total amount
    this.amounttypeflight = this.previewItenaryDetails.map(
      (h) => h.flightDetails?.fareDetails?.totalTax?.currencyCode
    );
    this.amounttypeflight.push(this.returnFlightFare?.totalFare?.currencyCode);
    let flighttaxamounttype = this.amounttypeflight.filter(function (x) {
      return x !== undefined || null;
    });

    this.flightamounttype = flighttaxamounttype[0];

    //total tax
    let flighttaxamout0 = this.previewItenaryDetails.map(
      (h) => h.flightDetails?.fareDetails?.totalTax?.amount
    );
    flighttaxamout0.push(this.returnFlightFare?.totalTax?.amount);
    let flighttaxamountarr = flighttaxamout0.filter(function (x) {
      return x !== undefined || null;
    });

    if (flighttaxamountarr.length === 1) {
      this.flighttaxamount = flighttaxamountarr[0];
    } else {
      this.flighttaxamount = sum(flighttaxamountarr).toFixed(1);
    }
    //equal tax
    let EquivFare = this.previewItenaryDetails.map(
      (h) => h.flightDetails?.fareDetails?.equivFare?.amount
    );
    EquivFare.push(this.returnFlightFare?.equivFare?.amount);
    let EquivFareTaxarr = EquivFare.filter(function (x) {
      return x !== undefined || null;
    });

    if (EquivFareTaxarr.length === 1) {
      this.EquivFareTax = EquivFareTaxarr[0];
    } else {
      this.EquivFareTax = sum(EquivFareTaxarr).toFixed(1);
    }
    //return flights
    ///////////Fare source code check////////////////
    var flightsFare = [];
    var flightprice = [];
    let returnfareSourceCode;
    let totalReturnflightPrice;
    if (this.returnFlight?.length > 0) {
      returnfareSourceCode = {
        fareSourceCode: this.returnFlightFareSourceCode,
        uuid: this.uuidReturn,
      };
      totalReturnflightPrice = {
        totalFare: this.totalReturnFlightfare,
      };
      flightprice.push(totalReturnflightPrice);
      flightsFare.push(returnfareSourceCode);
    }
    for (let i = 0; i < this.PreviewItenary.dayPlanner.length; i++) {
      let fareSourceCode = {
        fareSourceCode: this.PreviewItenary.dayPlanner[i]?.flightDetails
          ?.fareSourceCode,
        uuid: this.PreviewItenary.dayPlanner[i]?.flightDetails?.uuid,
      };
      let priceDetails = {
        totalFare: this.PreviewItenary.dayPlanner[i]?.flightDetails?.fareDetails
          ?.totalFare?.amount,
      };
      let flightPriceFare = Object.entries(priceDetails).reduce(
        (a, [k, v]) => (v == null ? a : ((a[k] = v), a)),
        {}
      );
      let flightFliterdFare = Object.entries(fareSourceCode).reduce(
        (a, [k, v]) => (v == null ? a : ((a[k] = v), a)),
        {}
      );
      flightprice.push(flightPriceFare);
      flightsFare.push(flightFliterdFare);
      flightprice = flightprice.filter(
        (value) => JSON.stringify(value) !== '{}'
      );
      flightsFare = flightsFare.filter(
        (value) => JSON.stringify(value) !== '{}'
      );
    }
    console.log(flightsFare, flightprice, 'flightsFare');

    let hotelFare = [];
    for (let i = 0; i < this.PreviewItenary.dayPlanner.length; i++) {
      let hotelcode = {
        sessionId: this.PreviewItenary.dayPlanner[i]?.hotelDetails?.sessionId,
        productId: this.PreviewItenary.dayPlanner[i]?.hotelDetails?.productId,
        tokenId: this.PreviewItenary.dayPlanner[i]?.hotelDetails?.tokenId,
        rateBasisId: this.PreviewItenary.dayPlanner[i]?.hotelDetails
          ?.rateBasisId,
        hotelId: this.PreviewItenary.dayPlanner[i]?.hotelDetails?.hotelContent
          ?.hotelId,
        uuid: this.PreviewItenary.dayPlanner[i]?.hotelDetails?.uuid,
      };
      hotelFare.push(hotelcode);
      hotelFare = hotelFare.filter((value) => JSON.stringify(value) !== '{}');
    }
    console.log(hotelFare, 'hotelFare');
    this.totalData = {
      flights: flightsFare,
      hotels: hotelFare,
    };

    ///////////Fare source code check////////////////

    ///Object collect

    let taxType = this.previewItenaryDetails.map(
      (h) => h.flightDetails?.fareDetails
    );
    this.taxTypeFilter = taxType.filter(function (x) {
      return x !== undefined || null;
    });
    if (this.taxTypeFilter[0]) {
      this.taxTypeNames = Object.keys(this.taxTypeFilter[0]);
    }
    console.log(this.taxTypeNames, 'taxTypeNames');

    let Tax = this.taxTypeNames?.includes('totalTax');
    let Fare = this.taxTypeNames?.includes('equivFare');
    if (Tax === true || this.returnFlightFare?.totalTax) {
      this.totalTax = 'Tax';
    }
    if (Fare === true || this.returnFlightFare?.equivFare) {
      this.equivFare = 'Fare';
    }

    // this.flighttotalamount = this.flightfareamout.concat(this.flighttaxamount);
  
    // if (this.flighttotalamount.length > 0) {
    //   this.flighttotalfare = sum(this.flighttotalamount).toFixed(1);
    // }
    //this.flighttotalfare = this.flighttotalamount.reduce((a, b) => a + b)

    //Hotels
    let hotelCount = this.previewItenaryDetails.map(
      (h) => h.hotelDetails?.hotelContent?.hotelId
    );

    var filteredhotel = hotelCount.filter(function (x) {
      return x !== undefined || null;
    });

    this.hotelAmount = this.previewItenaryDetails.map((h) =>
      h.hotelDetails?.rooms?.map((r) => r)
    );

    var hotelamountfiltered = this.hotelAmount.filter(function (x) {
      return x !== undefined || null;
    });

    this.hotelamountfill = hotelamountfiltered;

    this.roomprice = this.previewItenaryDetails.map(
      (r) => r.hotelDetails?.selectedRoomPrice
    );
    this.hotelamountType = this.hotelamountfill.map((r) => r[0].currency);
    var hotelamountintype = this.hotelamountType.filter(function (x) {
      return x !== undefined || null;
    });

    this.roomindprice = this.roomprice.filter(function (x) {
      return x !== undefined || null;
    });

    this.hotelmoneytype = hotelamountintype[0];
    this.hotelCountLength = filteredhotel;

    if (this.hotelamountfill.length === 1) {
      this.totalhotelprice = this.roomindprice[0];
    } else {
      this.totalhotelprice = sum(this.roomindprice).toFixed(1);
    }

    //  Activity

    let ActivityCount = this.previewItenaryDetails.map((h) =>
      h.activityDetails.map((y) => y.activityData.activityName)
    );
    let activeCount = ActivityCount.flat();
    this.ActivityCountLength = activeCount;

    let ActivePreff = this.previewItenaryDetails.map((h) =>
      h.activityDetails.map((y) => y.activitiesPreferences)
    );
    var filtered = ActivePreff.filter(function (x) {
      return x !== undefined || null;
    });
    let Activeprefe1 = ActivePreff.flat();

    this.ActivePreferance = Activeprefe1.flat();
    // function duplicateOf(data) {
    //   return [...new Set(data)];
    // }

    //Activity Price

    //Fare
    let ActivePrice = this.previewItenaryDetails.map((h) =>
      h.activityDetails.map((y) => y.activityData?.retailPrice?.value)
    );
    var activityPriceFlat = ActivePrice.flat();
    var activityfiltered = activityPriceFlat.filter(function (x) {
      return x !== undefined || null;
    });
    console.log(activityfiltered, 'activityfiltered');
    if (activityfiltered.length === 1) {
      this.activityFare = activityfiltered[0];
    } else {
      this.activityFare = sum(activityfiltered).toFixed(1);
    }
    //Tax
    let activePriceService = this.previewItenaryDetails.map((h) =>
      h.activityDetails.map((y) => y.activityData?.serviceFee?.value)
    );
    var activityPriceServiceFlat = activePriceService.flat();
    var activityServicefiltered = activityPriceServiceFlat.filter(function (x) {
      return x !== undefined || null;
    });
    console.log(activityServicefiltered, 'activityServicefiltered');
    if (activityServicefiltered.length === 1) {
      this.activityTax = activityServicefiltered[0];
    } else {
      this.activityTax = sum(activityServicefiltered).toFixed(1);
    }
    ///activityObject
    let activityObjectCollection = this.previewItenaryDetails.map((h) =>
      h.activityDetails.map((y) => y.activityData)
    );
    let activityObjectCollectionarray = activityObjectCollection.filter(
      function (x) {
        return x !== undefined || null;
      }
    );
    let activityObjectCollectionarrayflat = activityObjectCollectionarray.flat();
    for (let i = 0; i < activityObjectCollectionarrayflat.length; i++) {
      let flatedactivearray = activityObjectCollectionarrayflat[i];
      let activityCurrency = activityObjectCollectionarrayflat[i]?.serviceFee;
      this.activityObjectCollectionarr = Object.keys(flatedactivearray);
      console.log(
        flatedactivearray,
        this.activityObjectCollectionarr,
        ' this.activityObjectCollectionarr'
      );
      let activityCurrencyarr = Object.keys(activityCurrency);
      console.log(activityCurrencyarr, ' activityCurrencyarr');

      let findingName = this.activityObjectCollectionarr.includes('serviceFee');
      let findActiveCurrency = activityCurrencyarr.includes('currency');
      if (findingName === true) {
        this.activityService = 'Tax';
      }
      if (findActiveCurrency === true) {
        this.activityCurrencyType = 'USD';
      }
    }

   // this.AcivityPreferanceNew = duplicateOf(this.ActivePreferance);
    //ActiveImage
    let ActivityImage = this.previewItenaryDetails.map((h) =>
      h.activityDetails.map((y) => y.activityData.coverImageUrl)
    );
    this.ActivityImageList = ActivityImage.flat();
    this.randomActiveImage = [
      'https://voyaah-package-images-dev.s3.ap-south-1.amazonaws.com/public/about/sea.png',
      'https://voyaah-package-images-dev.s3.ap-south-1.amazonaws.com/public/about/Traveler2.png',
      'https://voyaah-package-images-dev.s3.ap-south-1.amazonaws.com/public/about/huts.png',
      'https://voyaah-package-images-dev.s3.ap-south-1.amazonaws.com/public/about/mountain.png',
    ];
    // this.randomActiveImage = this.ActivityImageList.sort(
    //   () => Math.random() - Math.random()
    // ).slice(0, 4);
    console.log(
      this.AcivityPreferanceNew,
      this.ActivePreferance,
      this.randomActiveImage,
      this.ActivityImageList,
      'ActivePreff'
    );
    // var n = d.toString();

    ////GrandTotal
    this.GrandTotalAmount = [
      this.flightfareamout,
      this.totalhotelprice,
      this.activityFare,
    ];
    var grandtotalfilter = this.GrandTotalAmount.filter(function (x) {
      return x !== undefined || null;
    });

    if (grandtotalfilter.length === 1) {
      this.GrandTotal = grandtotalfilter[0];
    } else {
      this.GrandTotal = sum(grandtotalfilter).toFixed(1);
    }
    this.userDetails = this.userProfileService.getUserDetails();
    console.log(this.userDetails, 'userDetails');
    this.travelCity = this.PreviewItenary.dayPlanner[0].cityName;
    this.travelStartDate = this.PreviewItenary.dayPlanner[0].date.start;

    console.log(
      this.travelCity,
      this.travelStartDate,
      this.previewItenaryDetails,
      this.flighttotalamount,
      this.roomprice,
      this.flightamounttype,
      this.hotelmoneytype,
      this.GrandTotal,

      this.EquivFareTax,
      this.flighttaxamount,
      this.flightfareamout,
      this.roomindprice,
      this.userDetails,
      'Previewtt'
    );
  }

  getCommonFlights(array1, array2) {
    var common = []; // Initialize array to contain common items

    for (var i = 0; i < array1.length; i++) {
      for (var j = 0; j < array2.length; j++) {
        if (array1[i].uuid == array2[j].uuid) {
          // If item is present in both arrays
          common.push(array1[i]); // Push to common array
        }
      }
    }

    return common; // Return the common items
  }

 
  Test_close() {
    this.router.navigate(['/time-line']);
  }

  trimString(text, range) {
    return text.length > range ? text.substr(0, range - 1) + '...' : text;
  }
  Network_close() {
    this.apiError = true;
  }

  async revalidatingApi() {
    const authToken = await this.accountService.getAccessToken();

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: authToken,
      }),
    };

    console.log(this.httpOptions, ' this.httpOptions');
    this.isLoading = true;

    this.http
      .post<any>(
        this.APIservice.apiUrl.revalidate,
        this.totalData,
        this.httpOptions
      )
      .subscribe({
        next: async (data) => {
          this.isLoading = false;
          this.sourceCode = data;
          console.log(this.sourceCode, 'sourceCode');
          let flightValidArray = this.sourceCode?.flights?.map(
            (x) => x.isValid
          );
          let hotelValidArray = this.sourceCode?.hotels?.map((x) => x.isValid);
          this.invalidFlights = this.sourceCode?.flights?.filter(
            (x) => x.isValid == 'false'
          );

          console.log(this.invalidFlights, 'invalidFlights');

          console.log(flightValidArray, 'this.flightValid');
          this.flightValid = flightValidArray.every(
            (currentval) => currentval.length === 4
          );
          this.hotelValid = hotelValidArray.every(
            (currentval) => currentval.length === 4
          );
          console.log(this.flightValid, this.hotelValid, 'this.flightValid2');

          let flights = this.previewItenaryDetails.map((x) => x.flightDetails);

          let returnFlights = this.PreviewItenary.returnPlan.map(
            (x) => x.flightDetails
          );
          this.totalFlights = flights.concat(returnFlights);
          this.totalFlights = this.totalFlights.filter(
            (value) => JSON.stringify(value) !== '{}'
          );

          ///Flights_Validate/////
          // if (this.flightValid === false && this.hotelValid === false) {
          //   this.bothItems = true;
          // }
          if (this.flightValid === false) {
            this.flights_valid = false;
            let invalidFlightList = [];
            for (var i = 0; i < this.sourceCode?.flights.length; i++) {
              if (this.sourceCode?.flights[i].isValid === 'false') {
                invalidFlightList.push(this.sourceCode?.flights[i]);
              }
            }

            this.newInvalidFlightarray = this.getCommonFlights(
              this.totalFlights,
              invalidFlightList
            );
            console.log(this.totalFlights, 'flights');
          } else if (this.flightValid === true) {
            for (let i = 0; i < this.totalFlights.length; i++) {
              for (let j = 0; j < this.sourceCode.flights.length; j++) {
                if (this.sourceCode.flights.length >= 1) {
                  if (
                    this.totalFlights[i].fareDetails.totalFare.amount !==
                    this.sourceCode.flights[j].fareDetails.totalFare.amount
                  ) {
                    this.flights_valid = false;
                    this.flightpricechange = false;
                  } else {
                    this.flightpricechange = true;
                    this.flights_valid = true;
                  }
                }
              }
            }
          }
          if (
            this.flightpricechange === false &&
            this.hotelpricechange === false
          ) {
            this.bothItems_price = true;
          }
          ///Hotels_Validate/////
          let hotelsTotal = this.previewItenaryDetails.map(
            (x) => x.hotelDetails
          );
          let hotelsTotalFilter = hotelsTotal.filter(
            (value) => JSON.stringify(value) !== '{}'
          );

          let responceHotelRoom;
          for (let i = 0; i < this.sourceCode.hotels.length; i++) {
            responceHotelRoom = this.sourceCode.hotels[i].rooms;
          }
          if (this.hotelValid === false) {
            this.hotel_valid = false;
            let invalidhotelList = [];
            for (var i = 0; i < this.sourceCode?.hotels.length; i++) {
              if (this.sourceCode?.hotels[i].isValid === 'false') {
                invalidhotelList.push(this.sourceCode?.hotels[i]);
              }
            }
            this.newInvalidHotelsarray = this.getCommonFlights(
              hotelsTotalFilter,
              invalidhotelList
            );
            console.log(
              invalidhotelList,
              this.newInvalidHotelsarray,
              'newInvalidHotelsarray'
            );
          } else if (this.hotelValid === true) {
            for (let i = 0; i < hotelsTotalFilter.length; i++) {
              for (let j = 0; j < responceHotelRoom?.length; j++) {
                if (this.sourceCode.hotels.length >= 1) {
                  if (
                    hotelsTotalFilter[i].selectedRoomPrice !==
                    responceHotelRoom[j].netPrice
                  ) {
                    this.hotel_valid = false;
                    this.hotelpricechange = false;
                  } else {
                    this.hotelpricechange = true;
                    this.hotel_valid = true;
                  }
                }
              }
            }
          }
          if (
            this.sourceCode?.flights.length === 0 &&
            this.sourceCode?.hotels.length === 0
          ) {
            this.flights_valid = false;
            this.hotel_valid = false;
            this.noItemSelect = true;
          }
          if (this.flights_valid === true && this.hotel_valid === true) {
            console.log(this.hotel_valid, this.flights_valid);
            const id = uuidv1();
            let currentTransction: CustomBooking = {
              id: id,
              username: '', //updated at aws-transaction-sync.service
              itineraryName: '',
              bookingType: 'Booking',
              bookingStatus: 'paymentPending',
              travelStartDate: this.travelStartDate,
              bookingDetails: this.PreviewItenary,
              email: this.userDetails.email,
              mobileNo: this.userDetails.mobileNo,
              travelCity: this.travelCity,
            };
            let custdobdate: Date = this.userDetails?.dateOfBirth;

            var timeDiff = Math.abs(Date.now() - custdobdate.getTime());
            Analytics.record({
              name: 'Booking',
              attributes: {
                package: '',
                duration:
                  this.PreviewItenary.dayPlanner[0].date.start.toString() +
                  ' to ' +
                  this.PreviewItenary.dayPlanner[0].date?.end.toString(),
                partner: '',
                ticketsize: (
                  this.selectedTravellers?.adults?.length +
                  this.selectedTravellers?.children?.length +
                  this.selectedTravellers?.infants?.length
                ).toString(),
                traveldate: this.travelStartDate?.toString(),
                location: this.travelCity,
                age: Math.floor(timeDiff / (1000 * 3600 * 24) / 365).toString(),
                birthday: this.userDetails?.dateOfBirth?.toString(),
                device:
                  this.onAndroidPLatform || this.onIOSPlatform
                    ? 'mobile or tab'
                    : 'web',
              },
            });
            this.awsTranscationSyncService
              .saveTranscationData(currentTransction)
              .then((data) => {
                if (
                  this.onIOSPlatform == true ||
                  this.onAndroidPLatform == true
                ) {
                  this.pay.redirectToPayment(
                    currentTransction.id,
                    this.GrandTotal,
                    'INR',
                    'EN',
                    'custom-travel',
                    'mobile'
                  );
                  console.log(
                    'PaymentResponseComponent: saveTransactionData ',
                    data
                  );
                } else {
                  this.pay.redirectToPayment(
                    currentTransction.id,
                    this.GrandTotal,
                    'INR',
                    'EN',
                    'custom-travel',
                    'browser',
                    window.location.origin
                  );
                }
              })
              .catch((err) => {
                console.log('Exception in saving Trasaction: ', err);
              });
          }
        },
        error: (error) => {
          console.error('PreviewIntinerary: Revalidation API: Failed!', error);
          this.isLoading = false;
          this.apiError = false;
        },
      });
  }
  async presentLogin() {
      if (this.userNavigate === true) {
        if (
          this.selectedTravellers?.adults.length +
            this.selectedTravellers?.children.length +
            this.selectedTravellers?.infants.length >
          0
        ) {
          this.revalidatingApi();
        } else {
          this.gototravellers();
        }
      } else if (this.userNavigate === false) {
        const modal = await this.modalController.create({
          component: LoginComponent,
          cssClass: 'login-modal-css',
          componentProps: { value: 123 },
        });
        return await modal.present();
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

  gototravellers() {
    this.packageReference = "custom";

    this.userProfileService.navigateToTravellers.next('itinerary');
    this.userItineraryService.travelersSelect.next(true);
    localStorage.setItem('packageID', JSON.stringify(this.packageReference));
    this.router.navigate(['/travellers']);
  }
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnDestroy(): void {
    this.PreviewItenary = null;
    this.flightfareamout = null;
    this.flightamounttype = null;
  }
}
