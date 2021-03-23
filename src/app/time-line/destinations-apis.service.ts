import { ConfigService } from '@app/config.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, from } from 'rxjs';

export interface Flight {
  journeyType: string;
  sequenceNumber: string;
  ticketType: string;
  validatingAirlineCode: string;
  isRefundable: string;
  flightSegments: stop[];
  fareDetails: flightFares;
  totalDuration: number;
  fareSourceCode: string;
  uuid: string;
  isPassportMandatory: string;
}
export interface stop {
  journeyDuration: string;
  arrivalAirportLocationCode: string;
  arrivalDateTime: string;
  departureAirportLocationCode: string;
  departureDateTime: string;
  eticket: string;
  flightNumber: string;
  airlineInfo: AirlineInfo;
}
export interface AirlineInfo {
  name: string;
  code: string;
  logoURL: string;
  departureCity: string;
  arrivalCity: string;
}
export interface Activities {
  activityName: string;
  duration: string;
  coverImageUrl: string;
  description: string;
  uuid: string;
}

export interface flightFares {
  totalFare: Totalfare;
  totalTax: Totaltax;
  serviceTax: ServiceTax;
  equivFare: EquivFare;
}
export interface Totalfare {
  amount: string;
  currencyCode: string;
  decimalPlaces: string;
}
export interface Totaltax {
  amount: string;
  currencyCode: string;
  decimalPlaces: string;
}
export interface EquivFare {
  amount: string;
  currencyCode: string;
  decimalPlaces: string;
}
export interface ServiceTax {
  amount: string;
  currencyCode: string;
  decimalPlaces: string;
}
export interface FilterHotel {
  maxPrice: number;
  maxResult: number;
  minPrice: number;
  rating: number;
  locality: string;
}

export interface Hotel {
  hotelName: string;
  address: string;
  hotelId: string;
  sessionId: string;
  productId: string;
  tokenId: string;
  uuid: string;
}
export interface HotelRoom {
  hotelContent: Hotelcontent;
  rooms: RoomTypes[];
}
export interface Hotelcontent {
  address: string;
  city: string;
  content: string;
  country: string;
  email: string;
  facilities: string[];
  hotelId: string;
  hotelRating: string;
  images: ContentImage[];
  latitude: string;
  longitude: string;
  name: string;
  phoneNumbers: string;
  postalCode: string;
}
export interface ContentImage {
  caption: string;
  url: string;
}
export interface RoomTypes {
  boardType: string;
  cancellationPolicy: string;
  currency: string;
  description: string;
  extrabeds: string;
  facilities: string[];
  fareType: string;
  inventoryType: string;
  maxOccupancyPerRoom: string;
  netPrice: string;
  productId: string;
  rateBasisId: string;
  roomCode: string;
  roomImages: RoomImage[];
  roomType: string;
}
export interface RoomImage {}
export interface RoomCache {
  [hotelId: string]: HotelRoom;
}
@Injectable({
  providedIn: 'root',
})
export class DestinationsApisService {
  private userInformation = new BehaviorSubject<{}>({});
  private allCities = new BehaviorSubject<Array<string>>([]);
  private messageSourse = new BehaviorSubject<boolean>(false);
  private ShowActivityPreferense = new BehaviorSubject<boolean>(false);
  private showPrivewItenary = new BehaviorSubject<boolean>(false);
  private flightsData = new BehaviorSubject<{}>({});
  private messagefromactivity = new BehaviorSubject<boolean>(false);
  private selctedactivityData = new BehaviorSubject<{}>({});
  private visableStatus = new BehaviorSubject<string>('');
  // private clickedRecord = new BehaviorSubject<number>(0);
  private hotelsData = new BehaviorSubject<{}>({});
  private visableVoyaah = new BehaviorSubject<boolean>(true);
  private navigationViewStatus = new BehaviorSubject<string>('');
  private latestFlightsData = new BehaviorSubject<any[]>([]);
  private latestHotelsData = new BehaviorSubject<[]>([]);
  private hotelListStatus = new BehaviorSubject<boolean>(true);
  private getActivityPreference = new BehaviorSubject<string[]>([]);
  private overallTimeLineData = new BehaviorSubject<any[]>([]);
  private cardClickData = new BehaviorSubject<{}>({});
  private errorMessageHotels = new BehaviorSubject<string>('');
  private getcitydatafromtimeline = new BehaviorSubject<{}>({});
  private hotelFilterData = new BehaviorSubject<{}>({});
  private hotelPrefData = new BehaviorSubject<any[]>([]);

  currentMessage = this.messageSourse.asObservable();
  currentUserInfo = this.userInformation.asObservable();
  currentAllCities = this.allCities.asObservable();
  currentFlightsData = this.flightsData.asObservable();
  currentVisableStatus = this.visableStatus.asObservable();
  //TODO
  currentPrivewItenary = this.showPrivewItenary.asObservable();
  // add activity content
  currentactivitymassage = this.messagefromactivity.asObservable();
  currentactivitydata = this.selctedactivityData.asObservable();
  // currentId = this.clickedRecord.asObservable();
  currentHotelData = this.hotelsData.asObservable();
  currentVoyaahStatus = this.visableVoyaah.asObservable();
  currentNavigationViewStatus = this.navigationViewStatus.asObservable();
  currentLatestFlights = this.latestFlightsData.asObservable();
  currentLatestHotels = this.latestHotelsData.asObservable();
  currentHoteListStatus = this.hotelListStatus.asObservable();
  currentTimeLineData = this.overallTimeLineData.asObservable();
  currentCardClickData = this.cardClickData.asObservable();
  currentErrorMessageHotels = this.errorMessageHotels.asObservable();
  currenthotelPrefData = this.hotelPrefData.asObservable();
  currentHotelFilterData = this.hotelFilterData.asObservable();
  // use it in the add activity
  getthedatafromtimeline = this.getcitydatafromtimeline.asObservable();
  latestActivityPreference = this.getActivityPreference.asObservable();
  showShowActivityPreferenseBooleanValue = this.ShowActivityPreferense.asObservable();

  private activity_City_Data_subject = new BehaviorSubject<Activities[]>([]);
  activity_City_Data: Activities[];
  selected_activity_id: number;
  activitypreference_City_Data: any;
  selected_activitypreference_id: number;
  activityPreference_data: any;
  hotelRoomCache: RoomCache = {};
  constructor(private http: HttpClient, private config: ConfigService) {
    let userInfo: object;
    let cities: Array<string>;
    userInfo = JSON.parse(sessionStorage.getItem('timeline-list'));
    cities = JSON.parse(localStorage.getItem('cities'));
    this.callUserInfo(userInfo);
    this.callCitiesInfo(cities);
  }

  // getApiHotel() {
  //   return this.http.get('http://localhost:3030/api/hotels
  // ?cityName=Bangalore&countryName=India&checkoutDate=2020-10-15&checkinDate=2020-10-10');
  // }
  getLatestFilghts() {
    return this.http.get(this.config.apiUrl.airports);
  }
  changeMessage(message: boolean, flights: any) {
    //console.log(flights, 'dude');
    this.messageSourse.next(message);
    this.flightsData.next(flights);
    // console.log(this.currentMessage);
  }

  selected_activities(message: boolean, activityData: any) {
    //console.log('yolla', message, activityData);
    this.selctedactivityData.next(activityData);
    this.messagefromactivity.next(message);
  }

  //use it in the time line
  gettingcitynamefromtimeline(dataObject: {}) {
    this.getcitydatafromtimeline.next(dataObject);
  }

  changeViewStatus(activity: string) {
    this.visableStatus.next(activity);
  }
  // changeId(id: number) {
  //   this.clickedRecord.next(id);
  // }

  addHotelsList(
    list,
    roomindex,
    roomprice,
    sessionId,
    productId,
    rateBasisId,
    tokenId,
    uuid
  ) {
    list.selectedRoomIndex = roomindex;
    list.selectedRoomPrice = roomprice;
    list.sessionId = sessionId;
    list.productId = productId;
    list.rateBasisId = rateBasisId;
    list.tokenId = tokenId;
    list.uuid = uuid;
    console.log(list);
    this.hotelsData.next(list);
  }

  changeVoyaahStatus(status: boolean) {
    this.visableVoyaah.next(status);
  }
  getFlightsLatestData(
    from: string,
    to: string,
    fromDate: Date,
    adultCount: number,
    childCount: number,
    infantCount: number
  ): Observable<Flight[]> {
    // let fromDate1 = fromDate.getFullYear() + '-' + (fromDate.getMonth() + 1) + '-' + fromDate.getDate();
    return this.http.get<Flight[]>(
      this.config.apiUrl.flights +
        '?journeyType=OneWay&airportFromCode=' +
        from +
        '&airportToCode=' +
        to +
        '&departureDate=' +
        fromDate +
        '&returnDate=&adultCount=' +
        adultCount +
        '&childCount=' +
        childCount +
        '&infantCount=' +
        infantCount +
        ''
    );
  }
  // getFlightsData() {
  //   return this.http.get('http://localhost:3030/api/flights
  // ?journeyType=OneWay&airportFromCode=BLR&airportToCode=DEL&departureDate=2020-09-12&returnDate=
  // &adultCount=2&childCount=1&infantCount=1');
  // }

  getLatestApiHotels(
    citname: string,
    countryName: string,
    start: Date,
    end: Date
  ) {
    return this.http.get(
      this.config.apiUrl.hotels +
        '?cityName=' +
        citname +
        '&countryName=' +
        countryName +
        '&checkoutDate=' +
        end +
        '&checkinDate=' +
        start
    );
  }

  async getHotelRoom(
    hotelId: string,
    sessionId: string,
    productId: string,
    tokenId: string
  ): Promise<HotelRoom> {
    console.log(this.hotelRoomCache, 'cache');
    if (this.hotelRoomCache[hotelId]) {
      return this.hotelRoomCache[hotelId];
    } else {
      let apiResponse: Observable<HotelRoom> = this.http.get<HotelRoom>(
        this.config.apiUrl.hotels +
          '/' +
          hotelId +
          '?sessionId=' +
          sessionId +
          '&productId=' +
          productId +
          '&tokenId=' +
          tokenId
      );
      const hotelroom = await apiResponse.toPromise();
      this.hotelRoomCache[hotelroom.hotelContent.hotelId] = hotelroom;
      return hotelroom;
    }
  }
  changeNavigationViewStatus(view: string): void {
    this.navigationViewStatus.next(view);
  }
  // eslint-disable-next-line @typescript-eslint/ban-types
  changeLatestFlights(y: any[]): void {
    // console.log(y);
    this.latestFlightsData.next(y);
  }

  changeLatestHotels(y: any): void {
    sessionStorage.setItem('hotelsList', JSON.stringify(y));
    this.latestHotelsData.next(y);
  }
  changeHotelListStatus(dataStatus: boolean) {
    this.hotelListStatus.next(dataStatus);
  }

  changeTimeLineData(activityData: any[]): void {
    sessionStorage.setItem('timeline-Data', JSON.stringify(activityData));
    this.overallTimeLineData.next(activityData);
  }
  callUserInfo(info: object) {
    this.userInformation.next(info);
  }
  callCitiesInfo(cityInfo: Array<string>) {
    this.allCities.next(cityInfo);
  }
  changeCardClickData(data: {}) {
    this.cardClickData.next(data);
  }
  getErrorMessageHotelsRes(str: string) {
    this.errorMessageHotels.next(str);
  }

  // getactivitiesbasedonselectedcity(
  //   id: number,
  //   activityData: string
  // ): Observable<Activities[]> {
  //   if (this.selected_activity_id !== id) {
  //     this.selected_activity_id = id;
  //     if (!this.activity_City_Data) {
  //       this.http
  //         .get<Activities[]>(
  //           this.config.apiUrl.activities +
  //             '?cityId=' +
  //             id +
  //             '&categoryIn=' +
  //             activityData
  //         )
  //         .subscribe((res) => {
  //           this.activity_City_Data = res;
  //           this.activity_City_Data_subject.next(this.activity_City_Data);
  //         });
  //       return this.activity_City_Data_subject;
  //     } else {
  //       return from([this.activity_City_Data]);
  //     }
  //   } else {
  //     if (this.activityPreference_data !== activityData) {
  //       this.activityPreference_data = activityData;
  //       this.http
  //         .get<Activities[]>(
  //           this.config.apiUrl.activities +
  //             '?cityId=' +
  //             id +
  //             '&categoryIn=' +
  //             activityData
  //         )
  //         .subscribe((res) => {
  //           this.activity_City_Data = res;
  //           this.activity_City_Data_subject.next(this.activity_City_Data);
  //         });
  //       return this.activity_City_Data_subject;
  //     } else {
  //       return from([this.activity_City_Data]);
  //     }
  //   }
  // }

  getactivitiesbasedonselectedcity(
    cityName: string,
    activityData: string,
    startDate: Date,
    endDate: Date
  ) {
    if (
      (!startDate && endDate != null) ||
      (startDate != null && !endDate) ||
      (!startDate && !endDate)
    ) {
      return this.http.get<Activities[]>(
        this.config.apiUrl.activities +
          '?cityName=' +
          cityName +
          '&categoryIn=' +
          activityData
      );
    } else {
      return this.http.get<Activities[]>(
        this.config.apiUrl.activities +
          '?cityName=' +
          cityName +
          '&categoryIn=' +
          activityData +
          '&availableFrom=' +
          new Date(startDate) +
          '&availableTo=' +
          new Date(endDate)
      );
    }
  }

  getHotelPrefData(
    filterParams: FilterHotel,
    citname: string,
    countryName: string,
    start: Date,
    end: Date,
    sessionId: string
  ) {
    return this.http.get(
      this.config.apiUrl.hotels +
        '?cityName=' +
        citname +
        '&countryName=' +
        countryName +
        '&checkoutDate=' +
        end +
        '&checkinDate=' +
        start +
        '&sessionId=' +
        sessionId +
        '&maxResult=' +
        filterParams.maxResult +
        '&minPrice=' +
        filterParams.minPrice +
        '&maxPrice=' +
        filterParams.maxPrice +
        '&hotelRating=' +
        filterParams.rating +
        '&locality=' +
        filterParams.locality
    );
  }
  changehotelFilteredData(data: {}) {
    this.hotelFilterData.next(data);
  }
  changeHotelPrefData(hotelPref: []) {
    this.hotelPrefData.next(hotelPref);
  }
  getSelectedactivity(a: string[]) {
    this.getActivityPreference.next(a);
  }

  getBooleanToShowActivityPreferense(x: boolean) {
    this.ShowActivityPreferense.next(x);
  }

  showPreviewItenary(value: boolean) {
    //TODO
    this.showPrivewItenary.next(value);
  }
}
