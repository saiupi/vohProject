import { filter } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { UserItineraryService } from './../../service-module/user-itinerary.service';
import { DestinationsApisService } from '../destinations-apis.service';
@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
})
export class ActivitiesComponent implements OnInit {
  activiesData: any;
  Activity;
  Dayrecord: number = null;
  count = 0;
  ActiveRecod;
  constructor(
    private UserItinerary: UserItineraryService,
    private destinationsApisService: DestinationsApisService
  ) {
    let UserData = this.UserItinerary.userItineraryData();
    let UserDataActive = UserData.dayPlanner;
    console.log(UserDataActive, 'UserData');

    let newActiveData = UserDataActive.map((h) => {
      let HotelObject = {
        ActiveData: h,
      };
      return HotelObject;
    });
    this.activiesData = newActiveData;
  }
  ngOnInit() {
    console.log(this.activiesData, 'Activites');
  }
}
