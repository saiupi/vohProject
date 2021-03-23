import { error, promise } from 'protractor';
import { async } from '@angular/core/testing';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '@app/config.service';

import { StaycationBooking } from '@ojashub/voyaah-common';
import { TravelPackage } from '@ojashub/voyaah-common';
import { BehaviorSubject, Observable } from 'rxjs';
import { TravellersDetails } from '@ojashub/voyaah-common';
import { AwsStaycationSyncService } from '@app/service-module/aws-staycation-sync.service';
import {
  CreateVYStaycationBookingModelInput,
  UpdateVYStaycationBookingModelInput,
} from '@app/service-module/aws-current-itinerary.service';
import * as moment from 'moment';
import { User } from '@app/account/models';
import { AccountService } from '@app/account/services';
const { v1: uuidv1 } = require('uuid');
import * as NodeCache from 'node-cache';
import { UserProfileService } from '@app/service-module/user-profile.service';
import { environment } from '@environments/environment';
// type PackagesCache = {
//   featured: NodeCache;
//   // byId: NodeCache,
//   // byDestination: NodeCache,
//   // byCategory: NodeCache,
//   // byCityName: NodeCache,
// };
@Injectable({
  providedIn: 'root',
})
export class StaycationPackagesService {
  static defaultFeaturedPackage = 'featured';
  noOfDays = 1;
  // static StacationsListKey = 'satacations-list';
  public packageReference = new BehaviorSubject<string>('');
  // public packageValues = new BehaviorSubject<string>('');
  public 7: any;

  
  private partnerClose = new BehaviorSubject<boolean>(false);
  currentpartnerClose = this.partnerClose.asObservable();

  private couponClear = new BehaviorSubject<boolean>(false);
  currentCouponClose = this.couponClear.asObservable();
  
  selectedPackageReference = this.packageReference.asObservable();
  public startDate = new BehaviorSubject<any>(undefined);
  selectedStartDate = this.startDate.asObservable();
  
  baseURL: any = environment.apiServer;
  public changeStaycationBookings = new BehaviorSubject<boolean>(false);
  staycationBookingChanges = this.changeStaycationBookings.asObservable();
  public staycationDataChanged = new BehaviorSubject<boolean>(false);
  trackStaycationData = this.staycationDataChanged.asObservable();
  stayCationTravellersDetails: TravellersDetails = {
    adults: [],
    children: [],
    infants: [],
  };
  _travelPackages: TravelPackage[] = [];
  public staycationTravellers = new BehaviorSubject<TravellersDetails>(
    this.stayCationTravellersDetails
  );
  staycationTravellersChanged = this.staycationTravellers.asObservable();
  stacationsData: TravelPackage[];
  user: User;
  // _temp: PackagesCache;
  // _cache: PackagesCache;
  staycationBookingId: string;
  data: any;
  couponData: any;
  previewOption: any;
  packageVendorName: any;
  stacationsDataPreview: any;
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private staycationSyncService: AwsStaycationSyncService,
    private accountService: AccountService,
    private userProfileService: UserProfileService
  ) {
    console.log('Refreshed...', 'service invoked....');
    this.stacationsData = [];
    let nameOfPartner = localStorage.getItem('partnerName');
    if (nameOfPartner?.length > 0) {
      this.getPartnerData();
    }
    else {
      this.getStaycations();
    }

    this._subscribeToUserLogin();
  }
  setNoOfDays(days) {
    this.noOfDays = days;
  }
  private _subscribeToUserLogin(): void {
    this.accountService.user.subscribe((user) => {
      this.user = user;
    });
  }


 
  private _cleanstacationsData() {
    this.stacationsData = this.stacationsData.filter((pacakages) => {
      if (this._isNull(pacakages)) return false;
      if (this._isNull(pacakages.id)) return false;
      if (pacakages.packageValues.status == 'expired') {
        return false;
      }
      let todayDate = new Date();
      let availableUpTo = new Date(pacakages.availableUpTo);
      if (todayDate > availableUpTo) {
        return false;
      }
      // ToDo: Can add More Package details here ....!!!
      return true;
    });
    this.staycationDataChanged.next(true);
  }
  partnerClear(data: boolean) {
    this.partnerClose.next(data);
  }
  couponClose(data: boolean) {
    this.couponClear.next(data);
  }

  private _isNull(val: any): boolean {
    if (val === null || val === undefined || val === '') {
      return true;
    }
    return false;
  }
  public async getStaycations(): Promise<TravelPackage[]> {
    try {
      if (this._travelPackages.length > 0) {
        return this._travelPackages;
      }
      //Packages are not available. Request server
      else {
        await this._fetchPackagesFromServer().then((value: TravelPackage[]) => {
          this._travelPackages = value;
        });
        console.log('publlic', this._travelPackages);
        return this._travelPackages;
      }
    } catch (error) {
      throw error;
    }
  }
  public async getPartnerData(): Promise<any> {
    try {
      let nameOfPartner = localStorage.getItem('partnerName');
      if (nameOfPartner?.length > 0) {
        let partnerReq = {
          cognitoUserId: nameOfPartner
        }
        let partnerResponce: Observable<any> = await this.http.post<any>(this.configService.apiUrl.vendorStaycations, partnerReq)
        const partnerPackages = await partnerResponce.toPromise();

        if (partnerPackages?.travelPackages.length === 0) {
          localStorage.removeItem('partnerName');
          return "Invalid Vendor"
        }
        else {
          this.packageVendorName = partnerPackages
          this.stacationsData = partnerPackages?.travelPackages;
          this._travelPackages = partnerPackages?.travelPackages;
          console.log(partnerPackages, "partnerResponce")
          this._cleanstacationsData();
          return partnerPackages
        }
      }
    }
    catch (error) {
      console.log("Error in the package responce", error)
    }

  }
  public clearPartnerData() {
    this._travelPackages = []
    this.packageVendorName = null
    this.getStaycations();
  }
  public getpackageVenderName() {
    return this.packageVendorName
  }
  public  stacationList() {
    return this.stacationsData;
  }
  public async stacationListpreview() {
    await this._fetchPackagesFromServer().then((value: TravelPackage[]) => {
      this.stacationsDataPreview = value;
    });
    console.log('publlic', this.stacationsDataPreview);
    return this.stacationsDataPreview;
  }

  public async _fetchPackagesFromServer(): Promise<TravelPackage[]> {
    try {
      this.stacationsData = [];
      let apiResponse: Observable<TravelPackage[]> = this.http.get<
        TravelPackage[]
      >(this.configService.apiUrl.staycations);
      const packages: TravelPackage[] = await apiResponse.toPromise();
      console.log('private', packages);
      this.stacationsData = packages;

      await this._cleanstacationsData();
      console.log('after filtering', this.stacationsData);
      return packages;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  public getPackage(id): TravelPackage {
    let selectedPackage: TravelPackage;
    for (let i = 0; i < this._travelPackages.length; i++) {
      if (id === this._travelPackages[i].id) {
        selectedPackage = this._travelPackages[i];
        break;
      }
    }
    return selectedPackage;
  }
  public getCouponCode(couponData) {
    return this.http.post<any>(
      this.configService.apiUrl.getCouponDetails,
      couponData
    );
  }

  public setpreviewOption(result) {
    this.previewOption = result;
    this.getpreviewOption();
  }
  public getpreviewOption() {
    return this.previewOption;
  }

  public setOption(result) {
    this.couponData = result;
    this.getOption();
  }
  public getOption() {
    return this.couponData;
  }
  public getcitylist() {
    return this.http.get<any>(this.baseURL + `/api/citylist`);
  }
  public getDestinationCity(name: any) {
    return this.http.get<any>(
      this.baseURL + `/api/staycations?destinationName` + '=' + name
    );
  }
  public getAdvanceTourCategories(tourCategories: any) {
    return this.http.get<any>(
      this.baseURL + `/api/categorylist?categories` + '=' + tourCategories
    );
  }


  public async bookStaycations(
    staycationPackage: TravelPackage,
    couponCode,
    stayCationTravellers: TravellersDetails,
    travelDate,
    selectedRoomType,
    basePackagePrice,
    discountedPrice,
    discountedValue
  ): Promise<StaycationBooking> {
    console.log('booking package', staycationPackage);
    try {
      let userDetails = this.userProfileService.getUserDetails();
      let bookingDetails = stayCationTravellers;
      bookingDetails.userFirstName = userDetails.firstName;
      const trvDt = new Date(travelDate);
      const dateAsString = trvDt.getFullYear() + '-' + ('0' + (trvDt.getMonth() + 1)).slice(-2) + '-' + ('0' + trvDt.getDate()).slice(-2);
      const dateConversion = new Date(dateAsString);
      console.log('bookingDetails', bookingDetails);
      var AWSStaycationBookingType: CreateVYStaycationBookingModelInput = {
        id: uuidv1(),
        username: this.user.username,
        itineraryName: staycationPackage.name,
        bookingType: 'Staycation Booking',
        bookingStatus: 'paymentPending',
        travelStartDate: dateConversion.toISOString(),
        bookingDetails: JSON.stringify(bookingDetails),
        email: userDetails.email,
        mobileNo: userDetails.mobileNo,
        vendorId: '',
        packageId: staycationPackage.id,
        couponCode: couponCode,
        bookingReference: '',
        roomType: selectedRoomType,
        basePackagePrice: basePackagePrice,
        discountedPrice: discountedPrice,
        discountedValue: discountedValue,
      };
      console.log(AWSStaycationBookingType, 'start date');
      var result = await this.staycationSyncService.AWSCreateStaycationBooking(
        AWSStaycationBookingType
      );
      localStorage.setItem(
        'bookedStaycationPackage',
        JSON.stringify(staycationPackage)
      );
      this.staycationBookingId = AWSStaycationBookingType.id;
      return result;
    } catch (error) {
      console.log('staycationservice', error);
      throw error;
    }
  }
  public async getStaycationWithBookingId(
    id: string
  ): Promise<StaycationBooking> {
    try {
      let response: StaycationBooking = await this.staycationSyncService.getAWSStaycationBooking(
        id
      );
      return response;
    } catch (error) {
      console.log('getStaycation', error);
      throw error;
    }
  }

  public async getUsersStaycationBooking(): Promise<StaycationBooking[]> {
    let bookingHistory: StaycationBooking[] = [];
    try {
      await this.staycationSyncService
        .getStaycationBookingData()
        .then((transactions: StaycationBooking[]) => {
          bookingHistory = transactions;
        });
      console.log('booking history', bookingHistory);
      return bookingHistory;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  public getStaycationBookingId() {
    return this.staycationBookingId;
  }

  public async getFeaturedPackages(
    featuredPackages: TravelPackage[]
  ): Promise<void> {
    try {
      // this._temp = {
      //   featured: new NodeCache(),
      // };
      for (const featured of featuredPackages) {
        await this._featuredPackage(featured);
      }
      // this._temp = undefined;
    } catch (error) {
      console.log('staycationfeatured in service', error);
      throw error;
    }
  }

  public async _featuredPackage(featured: TravelPackage): Promise<void> {
    let featuredData = featured.values.tags;
    if (
      featuredData === undefined ||
      featuredData === null ||
      featuredData.length <= 0
    ) {
      featuredData = [StaycationPackagesService.defaultFeaturedPackage];
    }
    // for (const tags of featuredData) {
    //   await this._getFeaturedData(tags, featured);
    // }
  }

  // private _getFeaturedData(featured: string, travelPackage: TravelPackage) {
  //   let staycations: TravelPackage[] = [];
  //   if (this._temp?.featured.has(featured)) {
  //     staycations = this._temp?.featured.get(featured) as TravelPackage[];
  //   }
  //   staycations.push(travelPackage);
  //   this._temp?.featured.set(featured, staycations);
  // }

  public async validateStaycationBooking(
    packageId,
    roomType,
    startDate
  ): Promise<any> {
    try {
      let payload = {
        packageId: packageId,
        roomType: roomType,
        inventoryDate: startDate,
      };
      console.log('payload', payload);
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      };
      let response = await this.http.post(
        this.configService.apiUrl.validateStaycationBooking,
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
