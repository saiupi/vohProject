import {
  CurrentItinerary,
  TravelType,
  TravellerCount,
  DayPlanner,
} from '@ojashub/voyaah-common';
import { City } from '@ojashub/voyaah-common';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AwsDataSyncService } from './aws-data-sync.service';

@Injectable({
  providedIn: 'root',
})
export class UserItineraryService {
  static localStorageKey = 'itinerary-storage';
  counter = 0;
  private currentItinerary: CurrentItinerary;
  locationData = [];
  locations: any;
  selectedTravellerCount = 0;
  private CurrentItineraryChanged = new BehaviorSubject<number>(0);
  public itineraryChanged = this.CurrentItineraryChanged.asObservable();
  private navigatedFromHomePage = new BehaviorSubject<boolean>(false);
  private paymentFali = new BehaviorSubject<boolean>(false);
  private timelineDataChanged = new BehaviorSubject<number>(this.counter);
  private _currentDestinationCities = new BehaviorSubject<City[]>([]);
  public currentDestinationCities = this._currentDestinationCities.asObservable();
  public faildPayment = this.paymentFali.asObservable();
  public currentHomePagemessage = this.navigatedFromHomePage.asObservable();
  public timelineDataChange = this.timelineDataChanged.asObservable();
  private saveTimeoutId = 0;
  private saveTimeoutValue = 5000;
  //for guard ----------
  public travelersSelect = new BehaviorSubject<boolean>(false);
  selectTravellerStatus = this.travelersSelect.asObservable();
  // -------------------
  constructor(private awsDataSyncService: AwsDataSyncService) {
    this.currentItinerary = {
      startDate: new Date(),
      endDate: new Date(),
      originCity: {
        id: 0,
        airportCode: [''],
        airportName: [''],
        cityName: '',
        countryName: '',
        countryCode: '',
        vendorName: '',
      },
      destinationCities: [
        {
          id: 0,
          airportCode: [''],
          airportName: [''],
          cityName: '',
          countryName: '',
          countryCode: '',
          vendorName: '',
        },
      ],
      travelType: TravelType.OneWay,
      travellers: {
        adultCount: 1,
        childCount: 0,
        infantCount: 0,
      },
      dayPlanner: [],
      returnType: true,
      returnPlan: [],
      selectedTravellers: {
        adults: [],
        children: [],
        infants: [],
      },
    };
    this.load();
  }

  setBasicInfo(
    startDate: Date,
    endDate: Date,
    originCity: City,
    destinationCities: City[],
    travelType: TravelType = TravelType.OneWay
  ): void {
    this.currentItinerary.startDate = startDate;
    this.currentItinerary.endDate = endDate;
    this.currentItinerary.travelType = travelType;
    this.currentItinerary.originCity = originCity;
    this.currentItinerary.destinationCities = destinationCities;
    this.currentItinerary.returnType = true;
    this.currentItinerary.returnPlan = [];
    this.save();
  }

  addDestinations(newDestnations: City[]): void {
    this.currentItinerary.destinationCities = newDestnations;
    this._currentDestinationCities.next(
      this.currentItinerary.destinationCities
    );
    this.save();
  }
  appendDestination(newDestinationCity: City): void {
    this.currentItinerary.destinationCities.push(newDestinationCity);
    this._currentDestinationCities.next(
      this.currentItinerary.destinationCities
    );
    this.save();
  }

  updateTravellers(travellers: TravellerCount) {
    this.currentItinerary.travellers = travellers;
    this.CurrentItineraryChanged.next(this.selectedTravellerCount + 1);
    this.save();
  }
  updateDates(startDate: Date, endDate: Date): void {
    this.currentItinerary.startDate = startDate;
    this.currentItinerary.endDate = endDate;
    this.save();
  }

  //Saves to local storage and as well as AWS
  private save() {
    if (this.saveTimeoutId != 0) {
      clearTimeout(this.saveTimeoutId);
      this.saveTimeoutId = 0;
    }
    this.saveTimeoutId = <any>setTimeout(() => {
      try {
        localStorage.setItem(
          UserItineraryService.localStorageKey,
          JSON.stringify(this.currentItinerary)
        );
        this.awsDataSyncService.storeCurrentItinerary(this.currentItinerary);
      } catch (e) {
        console.error('Error saving to localStorage', e);
      }
    }, this.saveTimeoutValue);
  }

  //syncs and loads data from AWS
  private load() {
    const itineraryFromLocalStore = JSON.parse(
      localStorage.getItem(UserItineraryService.localStorageKey)
    ) as CurrentItinerary;
    if (itineraryFromLocalStore) {
      this.currentItinerary = itineraryFromLocalStore;
    }

    //Also look in AWS
    this.awsDataSyncService
      .loadCurrenItinerary()
      .then((currentItinerary) => {
        if (currentItinerary) {
          this.currentItinerary = currentItinerary;
        }
      })
      .catch((error) => {
        throw 'Exception in syncing with AWS for current itinerary';
      });
  }

  public userItineraryData() {
    return this.currentItinerary;
  }

  public updateTimelineData(dayPlannerData: DayPlanner) {
    this.currentItinerary.dayPlanner = dayPlannerData;
    this.save();
    this.timelineDataChanged.next(this.counter + 1);
  }

  public getDataTemplateToTheTimeline() {
    this.navigatedFromHomePage.next(false);
    this.locationData = [];
    for (let i = 0; i < this.currentItinerary.destinationCities.length; i++) {
      const setUp = {
        day: i,
        activityDetails: [],
        flightDetails: {},
        hotelDetails: {},
        date: {
          start: null,
          end: null,
        },
      };
      this.locationData.push({
        ...setUp,
        ...this.currentItinerary.destinationCities[i],
      });
    }
    this.currentItinerary.dayPlanner = this.locationData;
    return this.currentItinerary.dayPlanner;
  }

  public getBooleanValue(booleanValue: boolean) {
    this.navigatedFromHomePage.next(booleanValue);
  }

  public setStartDateNEndDate(startDate: Date, endDate: Date) {
    this.currentItinerary.startDate = startDate;
    this.currentItinerary.endDate = endDate;
    this.save();
  }

  public setreturnType(returnVal: Boolean) {
    this.currentItinerary.returnType = returnVal;
    this.save();
  }

  public setreturnPlan(data) {
    this.currentItinerary.returnPlan = data;
    this.save();
  }
  public setTravellers(data) {
    this.currentItinerary.selectedTravellers = data;
    this.CurrentItineraryChanged.next(this.selectedTravellerCount + 1);
    console.log('user-itinerary.service.ts', this.currentItinerary);
    this.save();
  }
}
