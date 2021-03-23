import { UserItineraryService } from './../../service-module/user-itinerary.service';
import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { DestinationsApisService } from '../destinations-apis.service';

@Component({
  selector: 'app-stays',
  templateUrl: './stays.component.html',
  styleUrls: ['./stays.component.scss'],
})
export class StaysComponent implements OnInit {
  Hotelstatus: any;
  hotelRecord: string;
  hotelRecods;
  Userdd: any;
  constructor(private UserItinerary: UserItineraryService) {
    let UserData = this.UserItinerary.userItineraryData();
    let UserDataHotels = UserData.dayPlanner;
    console.log(UserDataHotels, UserData, 'UserData');
    let newHotelData = UserDataHotels.map((h) => {
      let HotelObject = {
        hotelData: h,
      };
      return HotelObject;
    });
    this.Hotelstatus = newHotelData;
  }

  ngOnInit() {
    console.log(this.Hotelstatus, 'hotel');
  }
}
