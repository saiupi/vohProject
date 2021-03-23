import { Component, OnInit } from '@angular/core';
import {
  DestinationsApisService,
  Activities,
} from '../destinations-apis.service';

@Component({
  selector: 'app-add-activities',
  templateUrl: './add-activities.component.html',
  styleUrls: ['./add-activities.component.scss'],
})
export class AddActivitiesComponent implements OnInit {
  cityid: number;
  activitiesData: Activities[];
  activitiesDatares: Activities[];
  cityname: string;
  errorMessage: string;
  selectedactivitiesString = '';
  isErroractivity = false;
  isLoadingactivity = false;
  showdata = false;
  selectedActivity = [];
  activitylist_data = [];
  selectedActivityNames = [];

  // should change them
  showRightPart: string;
  aBooleanValueforActivityPreference = false;
  constructor(private destinationsApisService: DestinationsApisService) {}

  ngOnInit() {
    this.getcityfromtimeline();
  }

  getcityfromtimeline() {
    this.destinationsApisService.getthedatafromtimeline.subscribe((res: {}) => {
      if (res) {
        this.getCtyIdFromCityData(res);
      }
    });
  }

  getCtyIdFromCityData(timelinedata: {}) {
    const timelinedataObject: any = timelinedata;
    try {
      if (timelinedataObject?.id === undefined) {
        throw 'undefined city object from time line';
      }
      if (!timelinedataObject?.id) {
        throw 'incorrect city object from time line';
      }
      this.getdatafromapi(
        timelinedataObject?.id,
        timelinedataObject?.date?.start,
        timelinedataObject?.date?.end
      );
    } catch (error) {
      console.error('NO ID Found To the CITY');
      this.isErroractivity = true;
      this.errorMessage = 'No activity found';
      this.showdata = false;
    }
  }

  getdatafromapi(cityName: string, startDate: Date, endDate: Date) {
    this.activitiesData = [];
    this.isLoadingactivity = true;
    this.isErroractivity = false;
    if (cityName) {
      this.destinationsApisService.showShowActivityPreferenseBooleanValue.subscribe(
        (res) => {
          this.aBooleanValueforActivityPreference = res;
        }
      );
      if (this.aBooleanValueforActivityPreference === true) {
        this.destinationsApisService.latestActivityPreference.subscribe(
          (res) => {
            this.selectedActivity = res;
            for (let i = 0; i < this.selectedActivity.length; i++) {
              this.selectedActivityNames.push(this.selectedActivity[i]?.name);
            }
            for (let i = 0; i < this.selectedActivity.length; i++) {
              this.selectedactivitiesString =
                this.selectedactivitiesString +
                this.selectedActivity[i]?.categoryCode +
                ',';
            }
          }
        );
      } else {
        this.selectedactivitiesString = '';
      }
      this.destinationsApisService
        .getactivitiesbasedonselectedcity(
          cityName,
          this.selectedactivitiesString.slice(0, -1),
          startDate,
          endDate
        )
        .subscribe(
          (res): any => {
            if (res) {
              this.isLoadingactivity = false;
              if (res.length === 0) {
                this.errorMessage = 'No Data Found';
                this.isErroractivity = true;
              } else {
                this.isErroractivity = false;
                this.showdata = true;
              }
              this.activitiesData = res;
              this.activitylist_data = this.activitiesData;
            }
          },
          (err) => {
            this.isErroractivity = true;
            this.isLoadingactivity = false;
            this.showdata = false;
            if (err.statusText) {
              this.errorMessage = 'No activity found in ' + cityName;
            } else {
              this.errorMessage = 'No Data Found';
            }
          }
        );
    }
  }

  addactivites(activitiesData) {
    const activityObject = {
      activitiesPreferences: this.selectedActivityNames,
      activityData: activitiesData,
    };
    this.destinationsApisService.selected_activities(true, activityObject);
    this.destinationsApisService.changeViewStatus('');
  }
  act_back() {
    this.destinationsApisService.changeViewStatus('');
  }
  Searchactivities(e: any) {
    if (e.target.value.length > 0) {
      this.activitiesData = this.activitylist_data.filter((res) => {
        return res.activityName
          .toLocaleLowerCase()
          .startsWith(e.target.value.toLocaleLowerCase());
      });
    } else {
      this.activitiesData = this.activitylist_data;
    }
  }
}
