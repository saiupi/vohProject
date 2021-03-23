import { Component, OnInit } from '@angular/core';
import { UserItineraryService } from './../../service-module/user-itinerary.service';
import { DestinationsApisService } from '../destinations-apis.service';
@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss'],
})
export class FlightsComponent implements OnInit {
  flightStatus: any;
  flightsRecord: string;
  FlightRecod;
  returnFlight: any;
  constructor(private UserItinerary: UserItineraryService) {
    let UserData = this.UserItinerary.userItineraryData();
    this.returnFlight = UserData.returnPlan;
    console.log(this.returnFlight, 'total');

    let UserDataFlights = UserData.dayPlanner;
    console.log(UserDataFlights, 'UserData');
    let newFlightObject = UserDataFlights.map((fli) => {
      let flightData = {
        flightData: fli,
      };
      return flightData;
    });
    this.flightStatus = newFlightObject;
  }
  ngOnInit() {
    console.log(this.flightStatus, 'Flights');
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
}
