import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DestinationsApiService {
  private selectedDestinationData = new BehaviorSubject<any[]>([]);
  private savedDestinationData = new BehaviorSubject<any[]>([]);

  currentDestinationData = this.selectedDestinationData.asObservable();
  currentSavedDestinationData = this.savedDestinationData.asObservable();

  constructor(private http: HttpClient) {}

  changeDestinationData(data: any[]) {
    this.selectedDestinationData.next(data);
  }
  changeSavedDestinationData(data: any[]) {
    console.log('SAd');
    let d = sessionStorage.getItem('saveDestinations');
    this.savedDestinationData.next(JSON.parse(d));
  }
  getMapData(a, b) {
    return this.http.get(
      'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=' +
        a.lat +
        ',' +
        a.lng +
        '&destinations=' +
        b.lat +
        '%2C' +
        b.lng +
        '&key=AIzaSyCz0FQatyreasOI76Z0F5aR8QsL3qPJ8Jc'
    );
  }

  async getlatNlondestination(city, country) {
    const result = await this.http
      .get(
        'https://maps.googleapis.com/maps/api/geocode/json?address=' +
          city +
          country +
          '&key=AIzaSyCz0FQatyreasOI76Z0F5aR8QsL3qPJ8Jc'
      )
      .toPromise();
    return result;
  }
  async getlatNlondestinationtostacations(
    city,
    country,
    houseNumber,
    landMark,
    state,
    street
  ) {
    const result = await this.http
      .get(
        'https://maps.googleapis.com/maps/api/geocode/json?address=' +
          city +
          country +
          houseNumber +
          landMark +
          state +
          street +
          '&key=AIzaSyCz0FQatyreasOI76Z0F5aR8QsL3qPJ8Jc'
      )
      .toPromise();
    return result;
  }
}
