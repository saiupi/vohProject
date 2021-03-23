import { stop, Flight } from './time-line/destinations-apis.service';
import { Pipe, PipeTransform } from '@angular/core';
import { DayPlanner } from '@ojashub/voyaah-common';

@Pipe({
  name: 'durationPipe',
})
export class DurationPipePipe implements PipeTransform {
  transform(value: number): string {
    let hours = Math.floor(value / 60);
    let minutes = Math.floor(value % 60);
    return hours + ' h ' + minutes + ' m';
  }
}

@Pipe({
  name: 'toNumber',
})
export class NumberPipe implements PipeTransform {
  transform(value: string): number {
    return Number(value);
  }
}
@Pipe({
  name: 'airlinesImage',
})
export class AirlinesImagePipe implements PipeTransform {
  transform(value: stop[]): string[] {
    let imagesarray: string[] = [];
    if (value.length == 1) {
      imagesarray.push(value[0].airlineInfo.logoURL);
    } else {
      imagesarray = value
        .map((v) => {
          return v.airlineInfo.logoURL;
        })
        .filter((elem, index, self) => {
          return index === self.indexOf(elem);
        });
    }
    return imagesarray;
  }
}
@Pipe({
  name: 'airlinesName',
})
export class AirlinesNamePipe implements PipeTransform {
  transform(value: stop[]): string[] {
    let namesarray: string[] = [];
    if (value.length == 1) {
      namesarray.push(value[0].airlineInfo.name);
    } else {
      namesarray = value
        .map((v) => {
          return v.airlineInfo.name;
        })
        .filter((elem, index, self) => {
          return index === self.indexOf(elem);
        });
    }
    return namesarray;
  }
}
@Pipe({
  name: 'totalDuration',
})
export class TotalDurationPipe implements PipeTransform {
  transform(flight: Flight): number {
    if (flight.flightSegments.length > 1) {
      let layoverminutes = 0;
      for (let i = 0; i < flight.flightSegments.length - 1; i++) {
        let date1 = new Date(flight.flightSegments[i].arrivalDateTime);
        let date2 = new Date(flight.flightSegments[i + 1].departureDateTime);
        layoverminutes =
          layoverminutes +
          Math.round((date2.getTime() - date1.getTime()) / 1000 / 60);
      }
      return layoverminutes + flight.totalDuration;
    } else {
      return flight.totalDuration;
    }
  }
}

@Pipe({
  name: 'flightsPricePipe',
})
export class FlightsPricePipe implements PipeTransform {
  transform(dayplanner: DayPlanner, fareType?: string) {
    let returnValue = 0;
    console.log(fareType, dayplanner);
    if (fareType == 'totalTax') {
      for (let i = 0; i < dayplanner?.length; i++) {
        if (dayplanner[i].flightDetails?.fareDetails?.totalTax != undefined) {
          returnValue =
            returnValue +
            Number(dayplanner[i].flightDetails?.fareDetails?.totalTax.amount);
        }
      }
    } else if (fareType == 'equiFare') {
      for (let i = 0; i < dayplanner?.length; i++) {
        if (dayplanner[i].flightDetails?.fareDetails?.equivFare != undefined) {
          returnValue =
            returnValue +
            Number(dayplanner[i].flightDetails?.fareDetails?.equivFare.amount);
        }
      }
    } else {
      for (let i = 0; i < dayplanner?.length; i++) {
        if (dayplanner[i].flightDetails?.fareDetails?.totalFare != undefined) {
          returnValue =
            returnValue +
            Number(dayplanner[i].flightDetails?.fareDetails?.totalFare.amount);
        }
      }
    }
    return returnValue;
  }
}
@Pipe({
  name: 'hotelsPricePipe',
})
export class HotelsPricePipe implements PipeTransform {
  transform(dayplanner: DayPlanner) {
    let hotelsPrice = 0;
    for (let i = 0; i < dayplanner?.length; i++) {
      if (dayplanner[i].hotelDetails?.selectedRoomPrice != undefined) {
        hotelsPrice =
          hotelsPrice + Number(dayplanner[i].hotelDetails?.selectedRoomPrice);
      }
    }
    return hotelsPrice;
  }
}
@Pipe({
  name: 'totalPricePipe',
})
export class TotalPricePipe implements PipeTransform {
  transform(dayplanner: DayPlanner) {
    let totalPrice = 0;
    for (let i = 0; i < dayplanner.length; i++) {
      if (dayplanner[i].hotelDetails?.selectedRoomPrice != undefined) {
        totalPrice =
          totalPrice + Number(dayplanner[i].hotelDetails?.selectedRoomPrice);
      }
      if (dayplanner[i].flightDetails?.fareDetails != undefined) {
        totalPrice =
          totalPrice +
          Number(dayplanner[i].flightDetails?.fareDetails?.totalFare.amount);
      }
    }
    return totalPrice;
  }
}
