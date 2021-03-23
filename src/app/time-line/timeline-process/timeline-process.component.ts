import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DestinationsApisService } from '../destinations-apis.service';
import { FormControl, FormGroup } from '@angular/forms';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import * as _moment from 'moment';
import { UserItineraryService } from '@app/service-module/user-itinerary.service';
import { CurrentItinerary } from '@ojashub/voyaah-common';
import { City } from '@ojashub/voyaah-common';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'MMM DD',
    monthYearLabel: 'MMM DD',
    dateA11yLabel: 'MMM DD',
    monthYearA11yLabel: 'MMM DD',
  },
};
@Component({
  selector: 'app-timeline-process',
  templateUrl: './timeline-process.component.html',
  styleUrls: ['./timeline-process.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    DatePipe,
  ],
})
export class TimelineProcessComponent implements OnInit {
  dateverificationString = '';
  dateverificationStringenddate = '';
  dateverficationId: number;
  originDateToShiftDateInTimeline: Date;
  showRoundTrip: Boolean;
  showRoundTripsFlights = false;
  getFlightValue: Boolean;
  locationData: any[] = [];
  returnTypeData: any[] = [];
  returnPlandata: any[] = [];
  item: any;
  locations: any;
  previouscard: string = null;
  dragflag = false;
  screenWidth: number;
  hideOptions = true;
  textH: any;
  hideItem = false;
  showitems: any;
  count: number;
  hideActivities = false;
  hotelData: any;
  showRightPart = '';
  flightData: any;
  selected_activity_data: any;
  cityFrom: any;
  Tocity: any;
  originCityEndDate: Date;
  currentCityFlights: any[] = [];
  latestFlightsData: any;
  onlyCountry: any;
  citiesData: any;
  isShown1 = false;
  prevCity: any;
  daywise: any;
  cityId: any;
  dataStatus = false;
  hideHotels = false;
  minDatelimit: Date;
  maxDatelimit: Date;
  individualTimeRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  userItineraryData: CurrentItinerary;
  startDate: Date;
  endDate: Date;
  originCity: City;
  destinationCity: any;
  destinationCountry: string;
  currentCardData: any;
  originFromData: any;
  selected: any;
  aBooleanValuefromHomePage = false;
  dateform: FormGroup;

  constructor(
    private destinationsApisService: DestinationsApisService,
    private userItineraryService: UserItineraryService,
    private datepipe: DatePipe
  ) {
    this.locationData = [];
    this.userItineraryData = this.userItineraryService.userItineraryData();
    this.showRoundTrip = this.userItineraryData.returnType;
    if (this.userItineraryData) {
      this.returnPlandata = this.userItineraryData.returnPlan;
      this.startDate = this.userItineraryData.startDate;
      this.endDate = this.userItineraryData.endDate;
      this.originCity = this.userItineraryData.originCity;
      this.userItineraryService.currentHomePagemessage.subscribe(
        (res: boolean) => {
          this.aBooleanValuefromHomePage = res;
        }
      );
      if (this.aBooleanValuefromHomePage === true) {
        this.aBooleanValuefromHomePage = false;
        this.locationData = this.userItineraryService.getDataTemplateToTheTimeline();
        this.userItineraryService.updateTimelineData(this.locationData);
      } else {
        this.aBooleanValuefromHomePage = false;
        this.locationData = this.userItineraryData?.dayPlanner;
      }
      this.originFromData = this.userItineraryData.originCity;
    }
    this.destinationsApisService.currentMessage.subscribe((mes) => {});
    this.destinationsApisService.currentFlightsData.subscribe((x) => {
      this.flightData = x;
      if (this.getFlightValue === true) {
        this.addFlightlstToReturnType(x);
      } else {
        this.checkData(x, 'flightDetails');
      }
    });
    this.destinationsApisService.currentactivitydata.subscribe((x) => {
      this.selected_activity_data = x;
      if (Object.keys(x).length > 0) {
        this.hideActivities = true;
      }
      this.checkData(x, 'ActivityDetails');
    });

    this.destinationsApisService.currentHotelData.subscribe((x) => {
      this.hotelData = x;
      if (Object.keys(x).length > 0) {
        this.hideHotels = true;
      }
      this.checkData(x, 'HotelDetails');
    });

    if (this.locationData?.length === 1) {
      console.log('startdate', this.userItineraryData.startDate);
      this.locationData[0].date.start = new Date(
        this.userItineraryData.startDate
      );
      this.originDateToShiftDateInTimeline = new Date(
        this.userItineraryData.startDate
      );
      this.originCityEndDate = this.userItineraryData.endDate;
      this.locationData[this.locationData.length - 1].date.end = new Date(
        this.userItineraryData.endDate
      );
      this.userItineraryService.updateTimelineData(this.locationData);
    }
    if (this.locationData.length > 1) {
      this.locationData[0].date.start = new Date(
        this.userItineraryData.startDate
      );
      this.originDateToShiftDateInTimeline = new Date(
        this.userItineraryData.startDate
      );
      this.locationData[this.locationData.length - 1].date.end = new Date(
        this.userItineraryData.endDate
      );
      this.originCityEndDate = new Date(this.userItineraryData.endDate);
      this.userItineraryService.updateTimelineData(this.locationData);
    }
  }

  ngOnInit() {
    let currentDate = new Date();
    this.minDatelimit = new Date(currentDate);
    this.maxDatelimit = new Date(currentDate.getFullYear() + 1, 11, 31);
    this.destinationsApisService.changeTimeLineData(this.locationData);
    this.destinationsApisService.showPreviewItenary(true);
  }
  deleteRecord(id: any) {
    let data = this.locationData;
    let f = [];
    this.locationData = data.filter((x) => {
      if (x.id != id) {
        return x.id != id;
      }
    });
    this.locationData.forEach((data, index) => {
      data.day = index;
    });
    this.userItineraryService.updateTimelineData(this.locationData);
  }
  toggleShowFeb() {
    this.isShown1 = !this.isShown1;
  }

  active() {
    setTimeout(() => {
      this.dragflag = true;
    }, 400);
  }
  mseup() {
    this.dragflag = false;
  }

  drop(event: CdkDragDrop<string[]>) {
    this.dragflag = false;
    const temp = this.locationData[event.previousIndex].date;
    this.locationData[event.previousIndex].date = this.locationData[
      event.currentIndex
    ].date;
    this.locationData[event.currentIndex].date = temp;
    moveItemInArray(this.locationData, event.previousIndex, event.currentIndex);
    this.userItineraryService.updateTimelineData(this.locationData);
  }

  cardclick(id, city, country, cityid, currentData, start, end) {
    this.showRoundTripsFlights = false;
    this.currentCardData = currentData;
    let startEndDate = { startDate: new Date(start), endDate: new Date(end) };
    let completeCardData = { ...this.currentCardData, ...startEndDate };
    this.cityId = cityid;
    if (id != 0) {
      this.prevCity = this.locationData[id - 1];
      this.locationData.forEach((x) => {
        if (
          x.cityName === this.prevCity.cityName &&
          x.countryName === this.prevCity.countryName
        ) {
          this.prevCity = x;
        }
      });
    } else {
      this.prevCity = this.originFromData;
    }
    this.destinationCity = city;
    this.destinationCountry = country;
    this.destinationsApisService.changeCardClickData(completeCardData);
    setTimeout(() => {
      this.dragflag = false;
    }, 390);
    if (this.showitems === id && this.count >= 1) {
      this.showitems = 'xyz';
      this.count = this.count + 1;
    } else {
      this.count = 1;
      this.showitems = id;
    }
    sessionStorage.setItem('hotelSessionId', '');
    this.destinationsApisService.changeVoyaahStatus(true);
    this.destinationsApisService.changeViewStatus('');
  }
  addActivity(cityName?: string, dates?: any) {
    if (!dates?.start || !dates?.end) {
      return;
    }
    this.showRightPart = 'Activities';
    this.destinationsApisService.changeViewStatus(this.showRightPart);
    this.destinationsApisService.changeNavigationViewStatus(this.showRightPart);
    this.destinationsApisService.changeCardClickData(this.currentCardData);
    // madhu code
    this.destinationsApisService.getBooleanToShowActivityPreferense(false);
    const dataObject = {
      id: cityName,
      date: dates,
    };
    this.destinationsApisService.gettingcitynamefromtimeline(dataObject);
    this.destinationsApisService.changeTimeLineData(this.locationData);
  }

  addModeOfJourney(index, id, city, country, cityid, currentData, start, end) {
    this.cardclick(id, city, country, cityid, currentData, start, end);
    if (!start || !end) {
      return;
    } else {
      let flightDataObj = [];
      if (index === 0) {
        let dateObj = {
          start: new Date(start),
        };
        flightDataObj.push(this.originCity);
        flightDataObj.push(this.locationData[index]);
        flightDataObj.push(dateObj);
      } else {
        let dateObj = {
          start: new Date(start),
        };
        flightDataObj.push(this.locationData[index - 1]);
        flightDataObj.push(this.locationData[index]);
        flightDataObj.push(dateObj);
      }
      this.showRightPart = 'Journey';
      this.destinationsApisService.changeViewStatus(this.showRightPart);
      this.destinationsApisService.changeTimeLineData(this.locationData);
      this.destinationsApisService.changeLatestFlights(flightDataObj);
    }
  }

  checkData(data, setValue: string) {
    if (setValue === 'flightDetails') {
      let destinationCitiesData = this.locationData?.map((citiesData) => {
        if (citiesData.id === this.cityId) {
          citiesData.flightDetails = data;
          return citiesData;
        } else {
          return citiesData;
        }
      });
      this.locationData = destinationCitiesData;
    }
    if (setValue === 'HotelDetails') {
      let destinationCitiesData = this.locationData?.map((citiesData) => {
        if (citiesData.id === this.cityId) {
          citiesData.hotelDetails = data;
          return citiesData;
        } else {
          return citiesData;
        }
      });
      this.locationData = destinationCitiesData;
    }

    if (setValue === 'ActivityDetails') {
      let destinationCitiesData = this.locationData?.map((citiesData) => {
        if (citiesData.id === this.cityId) {
          if (citiesData.activityDetails.length === 0) {
            citiesData.activityDetails.push(data);
          } else {
            let count = 0;
            let destinationCitiesData = this.locationData.filter(
              (destinationsData) => {
                let activityDetailsData = destinationsData?.activityDetails.filter(
                  (x, id) => {
                    if (
                      x?.activityData?.activityName ===
                      data?.activityData?.activityName
                    ) {
                      count = 1;
                    }
                  }
                );
              }
            );
            if (count === 1) {
            } else {
              citiesData.activityDetails.push(data);
            }
          }
          return citiesData;
        } else {
          return citiesData;
        }
      });
      this.locationData = destinationCitiesData;
    }
    this.userItineraryService.updateTimelineData(this.locationData);
  }

  hotelView(id, city, country, cityid, currentData, start, end) {
    this.cardclick(id, city, country, cityid, currentData, start, end);
    if (!start || !end) {
      return;
    } else {
      this.showRightPart = 'hotelTab';
      this.destinationsApisService.changeViewStatus(this.showRightPart);
      this.destinationsApisService.changeHotelListStatus(true);
      this.destinationsApisService.changeTimeLineData(this.locationData);
    }
  }

  getstartDate(event: MatDatepickerInputEvent<Date>, id, p) {
    //TODO:Date Verification Function
    const startDate = event.value;
    console.log('dude', new Date(startDate));
    if (p === 0) {
      this.originDateToShiftDateInTimeline = new Date(startDate);
      this.userItineraryService.setStartDateNEndDate(
        this.originDateToShiftDateInTimeline,
        this.originCityEndDate
      );
    }
    if (!startDate) {
      return;
    }
    this.locationData.map((citiesData, i) => {
      if (citiesData.id === id) {
        citiesData.date.start = new Date(startDate);
        citiesData.activityDetails = [];
        citiesData.flightDetails = {};
        citiesData.hotelDetails = {};
        return citiesData;
      } else {
        return citiesData;
      }
    });
    if (p - 1 >= 0) {
      console.log(startDate);
      this.locationData[p - 1].date.end = new Date(startDate);
      this.locationData[p - 1].activityDetails = [];
      this.locationData[p - 1].flightDetails = {};
      this.locationData[p - 1].hotelDetails = {};
    }

    this.userItineraryService.updateTimelineData(this.locationData);
    // this.verificatonofDate(new Date(startDate), p);
  }
  getendDate(event: MatDatepickerInputEvent<Date>, id, p) {
    //TODO:Date Verification Function
    const endDate = event.value;
    if (this.showRoundTrip === false) {
      if (p === this.locationData.length - 1) {
        this.originCityEndDate = new Date(endDate);
        this.userItineraryService.setStartDateNEndDate(
          this.originDateToShiftDateInTimeline,
          this.originCityEndDate
        );
      }
    }
    if (!endDate) {
      return;
    }

    this.locationData.map((citiesData) => {
      if (citiesData.id === id) {
        citiesData.date.end = new Date(endDate);
        citiesData.activityDetails = [];
        citiesData.flightDetails = {};
        citiesData.hotelDetails = {};
        return citiesData;
      } else {
        return citiesData;
      }
    });
    if (p + 1 <= this.locationData.length - 1) {
      this.locationData[p + 1].date.start = new Date(endDate);
      this.locationData[p + 1].activityDetails = [];
      this.locationData[p + 1].flightDetails = {};
      this.locationData[p + 1].hotelDetails = {};
    }

    if (p + 1 > this.locationData.length - 1) {
      this.originCityEndDate = new Date(endDate);
      this.userItineraryService.setStartDateNEndDate(
        this.originDateToShiftDateInTimeline,
        this.originCityEndDate
      );
    }

    // this.locationData = destinationCitiesData;
    this.userItineraryService.updateTimelineData(this.locationData);
    // this.verificatonofDate(new Date(endDate), p);
  }

  getoriginendDate(event: MatDatepickerInputEvent<Date>) {
    //TODO:Date Verification Function
    const originendDate = event.value;
    this.originCityEndDate = new Date(originendDate);
    let p = null;
    this.verificatonofDate(this.originCityEndDate, p);
    this.userItineraryService.setStartDateNEndDate(
      this.originDateToShiftDateInTimeline,
      this.originCityEndDate
    );
  }

  removeActivity(activityName) {
    let destinationCitiesData = this.locationData.filter((destinationsData) => {
      let activityDetailsData = destinationsData?.activityDetails.filter(
        (x, id) => {
          if (x?.activityData?.activityName === activityName) {
            destinationsData?.activityDetails?.splice(id, 1);
          }
        }
      );
    });
    this.userItineraryService.updateTimelineData(this.locationData);
  }

  trimString(text, range) {
    return text?.length > range ? text.substr(0, range - 1) + '...' : text;
  }

  removeFlight(id) {
    this.locationData[id].flightDetails = {};
    this.userItineraryService.updateTimelineData(this.locationData);
  }

  removeHotel(id) {
    this.locationData[id].hotelDetails = {};
    this.userItineraryService.updateTimelineData(this.locationData);
  }

  removeReturnTrip() {
    this.showRoundTrip = false;
    if (this.locationData.length === 1) {
      this.locationData[0].date.start = this.originDateToShiftDateInTimeline;
      this.locationData[0].date.end = this.originCityEndDate;
    }
    if (this.locationData.length > 1) {
      this.locationData[0].date.start = this.originDateToShiftDateInTimeline;
      this.locationData[
        this.locationData.length - 1
      ].date.end = this.originCityEndDate;
    }
    this.returnTypeData = [];
    this.returnPlandata = [];
    this.userItineraryService.setreturnPlan(this.returnTypeData);
    this.userItineraryService.setreturnType(false);
    this.userItineraryService.updateTimelineData(this.locationData);
  }

  clickOnReturnCard() {
    this.showRoundTripsFlights = !this.showRoundTripsFlights;
    this.getFlightValue === false;
  }

  retrunModeOfJourney() {
    let flightDataObj = [];
    let dateObj = {
      start: new Date(this.originCityEndDate),
    };
    flightDataObj.push(this.locationData[this.locationData.length - 1]);
    flightDataObj.push(this.originCity);
    flightDataObj.push(dateObj);
    this.showRightPart = 'Journey';
    this.destinationsApisService.changeViewStatus(this.showRightPart);
    this.destinationsApisService.changeTimeLineData(this.locationData);
    this.destinationsApisService.changeLatestFlights(flightDataObj);
    this.getFlightValue = true;
  }

  addFlightlstToReturnType(data) {
    this.showRoundTripsFlights = false;
    this.returnPlandata = [];
    this.returnTypeData = [];
    this.getFlightValue = false;
    this.returnTypeData.push(this.originCity);
    this.returnTypeData.map((x) => {
      let obj = x;
      obj.flightDetails = data;
      this.returnTypeData.splice(0, 1);
      this.returnTypeData.push(obj);
    });
    this.returnPlandata = this.returnTypeData;
    this.userItineraryService.setreturnPlan(this.returnTypeData);
  }
  removeReturnFlight() {
    this.returnTypeData = [];
    this.returnPlandata = [];
    this.userItineraryService.setreturnPlan(this.returnTypeData);
  }

  verificatonofDate(date, id) {
    //TODO : date Verification...!!
    const currentDate = this.datepipe.transform(date, 'yyyy/MM/dd');
    let loopDatestart = this.datepipe.transform(
      this.locationData[0].date.start._d,
      'yyyy/MM/dd'
    );
    let loopDateend = this.datepipe.transform(
      this.originCityEndDate,
      'yyyy/MM/dd'
    );

    if (id != null) {
      this.dateverificationString = '';
      this.dateverificationStringenddate = '';
      if (currentDate === loopDatestart || currentDate < loopDatestart) {
        this.dateverificationString = 'Please Check  Date';
        this.dateverficationId = id;
      }

      if (currentDate === loopDateend || currentDate > loopDateend) {
        this.dateverificationString = 'Please Check  Date';
        this.dateverificationStringenddate = 'Please Check the end Date';
        this.dateverficationId = id;
      }
    }
  }
}
