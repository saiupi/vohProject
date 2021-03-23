import { CurrentItinerary } from '@ojashub/voyaah-common';
import { Component, OnInit } from '@angular/core';
import { DestinationsApisService, Flight } from '../destinations-apis.service';
import { UserItineraryService } from '@app/service-module/user-itinerary.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
@Component({
  selector: 'app-flights-booking',
  templateUrl: './flights-booking.component.html',
  styleUrls: ['./flights-booking.component.scss'],
})
export class FlightsBookingComponent implements OnInit {
  flightsData = [];
  bookedFlightsData = [];
  apiFlightsData: Flight[];
  flightsmodified: Flight[];
  message: any;
  fromLocation: any;
  isPartialRefundChecked = false;
  toLocation: any;
  fromDate: Date;
  isLoading = true;
  // @Output('flightsBookedData') flightsBookedData: EventEmitter<
  //   Array<any>
  // > = new EventEmitter<Array<any>>();
  // @Output('passHideValue') passHideValue: EventEmitter<
  //   string
  // > = new EventEmitter<string>();
  showRightPart: string;
  // apiFlightsData: {};
  fromLocationCode: any;
  toLocationCode: any;
  mediatorVar: any;
  childCount: number;
  adultCount: number;
  infantCount: number;
  fltr_cards_display = false;
  // stops: [boolean, boolean, boolean] = [false, false, false];
  // layover: [boolean, boolean, boolean, boolean] = [false, false, false, false];
  depart: [boolean, boolean, boolean, boolean] = [false, false, false, false];
  farevalue = 5000.0;
  durationvalue = 300;
  isError = false;
  errorMessage: string;
  flightsDataFromApiReceived = false;
  checkApiData: any;
  userInfo: CurrentItinerary;
  airlines: string[];
  selectedAirlines: string[] = [];
  dropdownSettings: IDropdownSettings = {};
  constructor(
    private data: DestinationsApisService,
    private userItineraryService: UserItineraryService
  ) {}

  ngOnInit() {
    this.data.currentMessage.subscribe((mes) => (this.message = mes));
    this.data.currentLatestFlights.subscribe((res) => {
      console.log(res, 'fromtimeline');

      this.fltr_cards_display = false;
      console.log(res);
      this.mediatorVar = res;
      console.log(res);
      this.toLocationCode = res[1]?.airportCode;
      this.fromLocationCode = res[0]?.airportCode;
      this.toLocation = res[1]?.cityName + ',' + res[1]?.countryName;
      this.fromLocation = res[0]?.cityName + ',' + res[0]?.countryName;
      this.fromDate = res[2]?.start;

      this.flightsmodified = [];
      if (Object.keys(res).length) {
        this.flightsDataFromApiReceived = false;
        this.callFlightsApi();
      }
    });
    this.userInfo = this.userItineraryService.userItineraryData();
    // this.fromDate = new Date(this.userInfo.startDate);
    // console.log(this.fromDate, 'frrrrrrrrrrrrrrrrrrrrrrrrrrrrr');
    this.adultCount = this.userInfo.travellers.adultCount;
    this.childCount = this.userInfo.travellers.childCount;
    this.infantCount = this.userInfo.travellers.infantCount;
    console.log(this.userInfo, 'this.userInfo)');
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: false,
    };
  }
  onRefundChanged(ev: MatSlideToggleChange) {
    this.isPartialRefundChecked = ev.checked;
  }
  callFlightsApi() {
    // let fromDate = this.fromDate.getFullYear() + '/' + (this.fromDate.getMonth() + 1) + '/' + this.fromDate.getDate();

    this.apiFlightsData = [];
    this.isLoading = true;
    this.isError = false;
    if (this.checkApiData) {
      this.checkApiData.unsubscribe();
    }
    this.checkApiData = this.data
      .getFlightsLatestData(
        this.fromLocationCode,
        this.toLocationCode,
        this.fromDate,
        this.adultCount,
        this.childCount,
        this.infantCount
      )
      .subscribe(
        (res) => {
          console.log(res);
          if (res) {
            this.isLoading = false;
            this.apiFlightsData = res;
            this.flightsmodified = this.apiFlightsData;
            this.flightsDataFromApiReceived = true;
            this.isError = false;
            this.airlines = this.apiFlightsData
              .map((v) => {
                return v.flightSegments[0].airlineInfo.name;
              })
              .filter((elem, index, self) => {
                return index === self.indexOf(elem);
              });
          }
        },
        (err) => {
          this.isLoading = false;
          this.isError = true;
          console.log(err);
          this.errorMessage = err.error.errors[0];
        }
      );
  }
  addFlights(i) {
    this.bookedFlightsData.push(i);
    this.data.changeMessage(true, i);
    this.showRightPart = '';
    this.data.changeViewStatus(this.showRightPart);
    // this.data.changeVoyaahStatus(true);
    // this.passHideValue.emit(this.showRightPart);
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
  filterclick() {
    if (this.flightsDataFromApiReceived) {
      this.fltr_cards_display = !this.fltr_cards_display;
      this.isLoading = false;
      this.isError = false;
    }
  }
  filterbackclick() {
    this.fltr_cards_display = false;
  }
  // applyclick() {
  //   this.fltr_cards_display = false;
  // }
  backclick() {
    this.showRightPart = '';
    this.data.changeViewStatus(this.showRightPart);
  }
  // stopclick(index: number) {
  //   if (this.stops[index] == false) {
  //     this.stops[index] = true;
  //   } else {
  //     this.stops[index] = false;
  //   }
  // }
  // layoverclick(index: number) {
  //   if (this.layover[index] == false) {
  //     this.layover[index] = true;
  //   } else {
  //     this.layover[index] = false;
  //   }
  // }
  departclick(index: number) {
    if (this.depart[index] == false) {
      this.depart[index] = true;
    } else {
      this.depart[index] = false;
    }
  }

  applyclick() {
    this.flightsmodified = this.apiFlightsData;
    // refundable start--------------------------------------------------------------------
    if (this.isPartialRefundChecked == true) {
      this.flightsmodified = this.flightsmodified.filter((record) => {
        return record.isRefundable.match('Yes');
      });
      // console.log(this.flightsmodified, 'filtered');
    } else {
      this.flightsmodified = this.apiFlightsData;
    }
    // refundable end------------------------------------------------------------------------

    //fare filter start ------------------------------------------------------------------
    if (this.farevalue < 5000) {
      this.flightsmodified = this.flightsmodified.filter((record) => {
        let fareamount = parseFloat(record.fareDetails.totalFare.amount);
        if (fareamount <= this.farevalue) {
          return record;
        }
      });
      console.log(this.flightsmodified, 'fare');
    }
    //fare filter end----------------------------------------------------------------------
    //duration filter start----------------------------------------------------------------
    if (this.durationvalue < 300) {
      this.flightsmodified = this.flightsmodified.filter((record) => {
        const durationInMinues = record.flightSegments.reduce(
          (acc, stop) => acc + parseFloat(stop.journeyDuration),
          0
        );
        // let durationInMinues = parseFloat(record.journeyDuration);
        if (durationInMinues <= this.durationvalue) {
          return record;
        }
      });
      console.log(this.flightsmodified, 'duration');
    }
    //duration filter end------------------------------------------------------------------
    //airlines filter start-----------------------------------------------------------------
    if (this.selectedAirlines.length > 0) {
      let dummyarray: Flight[] = [];
      for (var record of this.flightsmodified) {
        for (var airline of this.selectedAirlines) {
          let found = false;
          for (var segment of record.flightSegments) {
            if (segment.airlineInfo.name == airline) {
              dummyarray.push(record);
              found = true;
              break;
            }
          }
          if (found) {
            break;
          }
        }
      }
      this.flightsmodified = dummyarray;
      // console.log(this.flightsmodified, 'airlines');
    }
    //airlines filter end-----------------------------------------------------------------
    // depart start-------------------------------------------------------------------------
    if (
      (this.depart[0] == false &&
        this.depart[1] == false &&
        this.depart[2] == false &&
        this.depart[3] == false) ||
      (this.depart[0] == true &&
        this.depart[1] == true &&
        this.depart[2] == true &&
        this.depart[3] == true)
    ) {
      this.flightsmodified = this.flightsmodified;
    } else {
      if (
        this.depart[0] == true &&
        this.depart[1] == false &&
        this.depart[2] == false &&
        this.depart[3] == false
      ) {
        this.flightsmodified = this.flightsmodified.filter((record) => {
          let departhour = new Date(
            record.flightSegments[0].departureDateTime
          ).getHours();
          let departminutes = new Date(
            record.flightSegments[0].departureDateTime
          ).getMinutes();
          if (departhour < 6 || (departhour == 6 && departminutes == 0)) {
            return record;
          }
        });
      } else if (
        this.depart[0] == false &&
        this.depart[1] == true &&
        this.depart[2] == false &&
        this.depart[3] == false
      ) {
        this.flightsmodified = this.flightsmodified.filter((record) => {
          let departhour = new Date(
            record.flightSegments[0].departureDateTime
          ).getHours();
          let departminutes = new Date(
            record.flightSegments[0].departureDateTime
          ).getMinutes();
          if (
            (departhour >= 6 && departhour < 12) ||
            (departhour == 12 && departminutes == 0)
          ) {
            return record;
          }
        });
      } else if (
        this.depart[0] == false &&
        this.depart[1] == false &&
        this.depart[2] == true &&
        this.depart[3] == false
      ) {
        this.flightsmodified = this.flightsmodified.filter((record) => {
          let departhour = new Date(
            record.flightSegments[0].departureDateTime
          ).getHours();
          let departminutes = new Date(
            record.flightSegments[0].departureDateTime
          ).getMinutes();
          if (
            (departhour >= 12 && departhour < 18) ||
            (departhour == 18 && departminutes == 0)
          ) {
            return record;
          }
        });
      } else if (
        this.depart[0] == false &&
        this.depart[1] == false &&
        this.depart[2] == false &&
        this.depart[3] == true
      ) {
        this.flightsmodified = this.flightsmodified.filter((record) => {
          let departhour = new Date(
            record.flightSegments[0].departureDateTime
          ).getHours();
          if (departhour >= 18 || departhour == 0) {
            return record;
          }
        });
      } else if (
        this.depart[0] == true &&
        this.depart[1] == true &&
        this.depart[2] == false &&
        this.depart[3] == false
      ) {
        this.flightsmodified = this.flightsmodified.filter((record) => {
          let departhour = new Date(
            record.flightSegments[0].departureDateTime
          ).getHours();
          let departminutes = new Date(
            record.flightSegments[0].departureDateTime
          ).getMinutes();
          if (departhour < 12 || (departhour == 12 && departminutes == 0)) {
            return record;
          }
        });
      } else if (
        this.depart[0] == true &&
        this.depart[1] == false &&
        this.depart[2] == true &&
        this.depart[3] == false
      ) {
        this.flightsmodified = this.flightsmodified.filter((record) => {
          let departhour = new Date(
            record.flightSegments[0].departureDateTime
          ).getHours();
          let departminutes = new Date(
            record.flightSegments[0].departureDateTime
          ).getMinutes();
          if (
            departhour < 6 ||
            (departhour == 6 && departminutes == 0) ||
            (departhour >= 12 &&
              (departhour < 18 || (departhour == 18 && departminutes == 0)))
          ) {
            return record;
          }
        });
      } else if (
        this.depart[0] == true &&
        this.depart[1] == false &&
        this.depart[2] == false &&
        this.depart[3] == true
      ) {
        this.flightsmodified = this.flightsmodified.filter((record) => {
          let departhour = new Date(
            record.flightSegments[0].departureDateTime
          ).getHours();
          let departminutes = new Date(
            record.flightSegments[0].departureDateTime
          ).getMinutes();
          if (
            departhour < 6 ||
            (departhour == 6 && departminutes == 0) ||
            departhour >= 18
          ) {
            return record;
          }
        });
      } else if (
        this.depart[0] == false &&
        this.depart[1] == true &&
        this.depart[2] == true &&
        this.depart[3] == false
      ) {
        this.flightsmodified = this.flightsmodified.filter((record) => {
          let departhour = new Date(
            record.flightSegments[0].departureDateTime
          ).getHours();
          let departminutes = new Date(
            record.flightSegments[0].departureDateTime
          ).getMinutes();
          if (
            departhour >= 6 &&
            (departhour < 18 || (departhour == 18 && departminutes == 0))
          ) {
            return record;
          }
        });
      } else if (
        this.depart[0] == false &&
        this.depart[1] == false &&
        this.depart[2] == true &&
        this.depart[3] == true
      ) {
        this.flightsmodified = this.flightsmodified.filter((record) => {
          let departhour = new Date(
            record.flightSegments[0].departureDateTime
          ).getHours();
          if (departhour >= 12 || departhour == 0) {
            return record;
          }
        });
      } else if (
        this.depart[0] == false &&
        this.depart[1] == true &&
        this.depart[2] == false &&
        this.depart[3] == true
      ) {
        this.flightsmodified = this.flightsmodified.filter((record) => {
          let departhour = new Date(
            record.flightSegments[0].departureDateTime
          ).getHours();
          let departminutes = new Date(
            record.flightSegments[0].departureDateTime
          ).getMinutes();
          if (
            (departhour >= 6 &&
              (departhour < 12 || (departhour == 12 && departminutes == 0))) ||
            departhour >= 18 ||
            departhour == 0
          ) {
            return record;
          }
        });
      } else if (
        this.depart[0] == true &&
        this.depart[1] == true &&
        this.depart[2] == true &&
        this.depart[3] == false
      ) {
        this.flightsmodified = this.flightsmodified.filter((record) => {
          let departhour = new Date(
            record.flightSegments[0].departureDateTime
          ).getHours();
          let departminutes = new Date(
            record.flightSegments[0].departureDateTime
          ).getMinutes();
          if (departhour < 18 || (departhour == 18 && departminutes == 0)) {
            return record;
          }
        });
      } else if (
        this.depart[0] == true &&
        this.depart[1] == true &&
        this.depart[2] == false &&
        this.depart[3] == true
      ) {
        this.flightsmodified = this.flightsmodified.filter((record) => {
          let departhour = new Date(
            record.flightSegments[0].departureDateTime
          ).getHours();
          let departminutes = new Date(
            record.flightSegments[0].departureDateTime
          ).getMinutes();
          if (
            departhour < 12 ||
            (departhour == 12 && departminutes == 0) ||
            departhour >= 18
          ) {
            return record;
          }
        });
      } else if (
        this.depart[0] == true &&
        this.depart[1] == false &&
        this.depart[2] == true &&
        this.depart[3] == true
      ) {
        this.flightsmodified = this.flightsmodified.filter((record) => {
          let departhour = new Date(
            record.flightSegments[0].departureDateTime
          ).getHours();
          let departminutes = new Date(
            record.flightSegments[0].departureDateTime
          ).getMinutes();
          if (
            departhour < 6 ||
            (departhour == 6 && departminutes == 0) ||
            departhour >= 12
          ) {
            return record;
          }
        });
      } else {
        this.flightsmodified = this.flightsmodified.filter((record) => {
          let departhour = new Date(
            record.flightSegments[0].departureDateTime
          ).getHours();
          let departminutes = new Date(
            record.flightSegments[0].departureDateTime
          ).getMinutes();
          if (departhour >= 6 || departhour == 0) {
            return record;
          }
        });
      }
    }
    // depart ends------------------------------------------------------------------------------
    this.fltr_cards_display = false;
  }
  // ngOnDestroy() {
  //   console.log('Service destroy');
  //   this.checkApiData.unsubscribe();
  // }
}
