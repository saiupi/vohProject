import { Component, OnInit } from '@angular/core';
import { DestinationsApisService } from '../destinations-apis.service';
import { UserItineraryService } from './../../service-module/user-itinerary.service';
@Component({
  selector: 'app-daily-plan',
  templateUrl: './daily-plan.component.html',
  styleUrls: ['./daily-plan.component.scss'],
})
export class DailyPlanComponent implements OnInit {
  Dailydata: any;
  count = 0;
  dailyPlan;
  Dayrecord: number = null;

  constructor(
    private UserItinerary: UserItineraryService,
    private destinationsApisService: DestinationsApisService
  ) {
    let UserData = this.UserItinerary.userItineraryData();
    let UserDataDaily = UserData.dayPlanner;
    let newDailyData = UserDataDaily.map((h) => {
      let DailyObject = {
        dailyData: h,
      };
      return DailyObject;
    });
    this.Dailydata = newDailyData;
  }
  allres: any;
  ngOnInit() {
    console.log(this.Dailydata, 'DailyPlan');
  }
}
