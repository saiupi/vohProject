import { UserItineraryService } from './../../service-module/user-itinerary.service';
import { CurrentItinerary } from '@ojashub/voyaah-common';
import { Component, OnInit } from '@angular/core';
import { DestinationsApiService } from '../destinations-api.service';

export interface Direction {
  origin: Location;
  destination: Location;
  waypoints: WayPoint[];
}

export interface WayPoint {
  location: Location;
  stopover: boolean;
}

export interface Location {
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
})
export class MapsComponent implements OnInit {
  lat: number;
  lng: number;
  zoom = 2;
  waypoints: {};
  latNlong: any;
  latNlongofacity = [];
  show = 'destination';
  label: string;
  destinationData: any[] = [];
  allLocations: any[] = [];
  fromandtodata: any = [];
  wayPtData: any[];
  img = {
    icon:
      'https://www.iconfinder.com/data/icons/curious-shop-1/80/curiosshop-02-512.png',
  };

  public renderOptions = {
    suppressMarkers: true,
    suppressPolylines: false,
    geodesic: true,
    polylineOptions: { strokeColor: '#4C97FF' },
  };
  public markerOptions = {
    origin: {
      icon: '../../../assets/images/Mapdot.PNG',
    },
    destination: {
      //icon: '../../../assets/images/mapMarker.png',
    },
    waypoints: [],
  };
  fromcity: any;
  fromCityLat: any;
  fromCityLng: any;
  savedDestinationData: {};
  routeParam = '';
  destinationData2: any[];
  currentItinerary: CurrentItinerary;
  destinationslocationresponce: any;
  locationresponcedata = [];
  currentdestinationdata;
  constructor(
    private ser: DestinationsApiService,
    private userItineraryService: UserItineraryService
  ) {
    this.currentItinerary = this.userItineraryService.userItineraryData();
    this._subscribeToDestinationsChange();
  }

  ngOnInit() {}

  private _subscribeToDestinationsChange() {
    this.userItineraryService.currentDestinationCities.subscribe(() => {
      this.currentItinerary = this.userItineraryService.userItineraryData();
      this.currentdestinationdata = this.currentItinerary.destinationCities;
      this.callMaps();
    });
  }

  async callMaps() {
    this.getLocationDetails();
  }

  getLocationDetails() {
    this.allLocations = [];
    const requestForCooridnates: any = [];
    requestForCooridnates.push(
      this.ser.getlatNlondestination(
        this.currentItinerary.originCity.cityName,
        this.currentItinerary.originCity.countryName
      )
    );
    for (let i = 0; i < this.currentdestinationdata.length; i++) {
      requestForCooridnates.push(
        this.ser.getlatNlondestination(
          this.currentdestinationdata[i].cityName,
          this.currentdestinationdata[i].countryName
        )
      );
    }

    Promise.all(requestForCooridnates)
      .then((responses) => {
        //console.log('Promise all', responses);
        let geoResponse: any = {};
        for (let i = 0; i < responses.length; i++) {
          geoResponse = responses[i];
          const data: any = geoResponse.results[0];
          //console.log('data', data);
          this.allLocations.push(data.geometry.location);
        }
        //console.log('locations', this.allLocations);
      })
      .catch((error) => {
        console.log('Exception in getting geo locations ', error);
      });
  }
}
