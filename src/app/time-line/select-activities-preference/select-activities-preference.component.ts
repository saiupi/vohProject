import { Component, OnInit } from '@angular/core';
import { DestinationsApisService } from '../destinations-apis.service';
@Component({
  selector: 'app-select-activities-preference',
  templateUrl: './select-activities-preference.component.html',
  styleUrls: ['./select-activities-preference.component.scss'],
})
export class SelectActivitiesPreferenceComponent implements OnInit {
  activitiesPreferences: any;
  track = '';
  selectedActivities: any[] = [];
  activityData: any;
  activityarray_data = [];
  activityPreferncesMapping = [
    {
      name: 'History & Culture',
      musementType: [],
      categoryName: [
        'Castle & palace Tours',
        'Museums',
        'Walking tours',
        'Food  & winery tours',
        'Walking and bike tours',
        'National park tours',
        'Day trips & excursions',
        'City passes',
        'Transportation',
        'Attractions & monuments',
        'City tours',
      ],
      categoryCode: [
        'castle-palace-tours',
        'museums',
        'walking-tours',
        'food-winery-tours',
        'Walking-and-bike-tours',
        'national-park-tours',
        'day-trips-excursions',
        'city-passes',
        'transportation',
        'attractions-and-monuments',
        'city-tours',
      ],
      coverImageUrl: '../../assets/images/Group 55967.svg',
      verticalType: ['Tours and Attractions'],
    },
    {
      name: 'Adventure',
      musementType: [],
      categoryName: ['Snorkeling', 'Aerial tramway tours'],
      categoryCode: ['snorkeling', 'aerial-tramway-tours'],
      coverImageUrl: '../../assets/images/Group 55965.svg',
      verticalType: ['Active & adventure'],
    },
    {
      name: 'Wellness',
      musementType: [],
      categoryName: [],
      categoryCode: ['walking-tours', 'bike-tours', 'snorkeling'],
      coverImageUrl: '../../assets/images/Group 56041.svg',
      verticalType: [],
    },
    {
      name: 'Wildlife',
      musementType: [],
      categoryName: ['Snorkeling', 'Aerial tramway tours'],
      categoryCode: ['snorkeling', 'aerial-tramway-tours'],
      coverImageUrl: '../../assets/images/Group 56054.svg',
      verticalType: ['Active & adventure'],
    },
    {
      name: 'Culinary',
      musementType: [],
      categoryName: ['Food  & winery tours'],
      categoryCode: ['food-winery-tours'],
      coverImageUrl: '../../assets/images/Group 56056.svg',
      verticalType: ['Food & wine'],
    },
    {
      name: 'Romance',
      musementType: [],
      categoryName: ['Nightclubs', 'Ballet'],
      categoryCode: ['nightclubs', 'ballet'],
      coverImageUrl: '../../assets/images/Group 56060.svg',
      verticalType: ['Nightlife'],
    },
    {
      name: 'Kids Activities',
      musementType: [],
      categoryName: ['Ballet', 'Walking tours', 'Bike Tours'],
      categoryCode: ['ballet', 'walking-tours', 'bike-tours'],
      coverImageUrl: '../../assets/images/Group 56077.svg',
      verticalType: [],
    },
    {
      name: 'Glamping',
      musementType: [],
      categoryName: ['Snorkeling', 'Aerial tramway tours'],
      categoryCode: ['snorkeling', 'aerial-tramway-tours'],
      coverImageUrl: '../../assets/images/Group 56037.svg',
      verticalType: ['Active & adventure'],
    },
  ];

  activityPreferenceObject = [];

  constructor(private destinationsApisService: DestinationsApisService) {
    this.activitiesPreferences = [];
    this.activityData = this.activityPreferncesMapping;
    this.activityarray_data = this.activityData;
    let new_activity_Data = this.activityarray_data.map((h) => {
      let activityObject = h;
      activityObject.selecttrack = false;
      return activityObject;
    });
    this.activitiesPreferences = new_activity_Data;
  }

  ngOnInit() {}

  selectActivity(e, i, t) {
    this.activitiesPreferences[i].selecttrack = !this.activitiesPreferences[i]
      .selecttrack;
    if (!t) {
      if (this.selectedActivities.length === 0) {
        this.selectedActivities.push(e);
      } else {
        let searchavail = this.selectedActivities.filter((x) => x == e);
        if (searchavail.length == 0) {
          this.selectedActivities.push(e);
        }
      }
    } else {
      let filterd_name_activity;
      let searchavail = this.selectedActivities.filter((x) => {
        if (x === e) {
          filterd_name_activity = e;
        }
      });
      if (searchavail.length == 0) {
        let index_value = this.selectedActivities.indexOf(
          filterd_name_activity
        );
        this.selectedActivities.splice(index_value, 1);
      }
    }
  }
  act_back() {
    this.destinationsApisService.changeViewStatus('Activities');
  }
  SaveSelectedActivity() {
    if (this.selectedActivities.length !== 0) {
      this.activityPreferenceObject = [];
      for (let j = 0; j < this.activityPreferncesMapping.length; j++) {
        for (let i = 0; i < this.selectedActivities.length; i++) {
          if (
            this.activityPreferncesMapping[j].name ===
            this.selectedActivities[i]
          ) {
            let addActivityPreferenceObject = {
              categoryCode: this.activityPreferncesMapping[j].categoryCode,
              name: this.activityPreferncesMapping[j].name,
            };
            this.activityPreferenceObject.push(addActivityPreferenceObject);
          }
        }
      }
      this.destinationsApisService.getBooleanToShowActivityPreferense(true);
      this.destinationsApisService.getSelectedactivity(
        this.activityPreferenceObject
      );
      this.destinationsApisService.changeViewStatus('Activities');
    }
  }
}
