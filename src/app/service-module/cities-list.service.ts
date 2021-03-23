import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '@app/config.service';
import { count } from 'console';
import { City } from '@ojashub/voyaah-common';

@Injectable({
  providedIn: 'root',
})
export class CitiesListService {
  static CityListKey = 'city-list';
  cities: City[];

  constructor(private http: HttpClient, private config: ConfigService) {
    this.cities = [];
    this._readCitiesFromServer(true);
  }

  private _readCitiesFromServer(forceRefresh: boolean = false) {
    this._loadCities();
    if (this.cities.length === 0 || forceRefresh === true) {
      this.http.get(this.config.apiUrl.cities).subscribe(
        (res) => {
          // console.log(res);
          this.cities = this._parseCitiesFromServer(res as City[]);

          this._cleanCitiesData();
          this._storeCities();
        },
        (err) => {
          console.log('failed to get city data ' + err);
        }
      );
    }
  }

  private _parseCitiesFromServer(citiesFromServer: City[]): City[] {
    let parsedCities: City[] = citiesFromServer.map((city) => {
      return {
        ...city,
        latitude: Number(city.latitude),
        longitude: Number(city.longitude),
      };
    });

    return parsedCities;
  }

  private _cleanCitiesData() {
    this.cities = this.cities.filter((city) => {
      if (this._isNull(city)) return false;
      if (this._isNull(city.cityName)) return false;
      if (this._isNull(city.id)) return false;
      return true;
    });
  }

  public readCitiesFromServer() {
    this._readCitiesFromServer(true);
  }

  public getCityList(): City[] {
    //TODO: this would be a blocking call
    if (this.cities.length === 0) {
      this._readCitiesFromServer(true);
    }
    return this.cities;
  }

  public getCityById(id: number): City {
    return this.cities.filter((city) => city.id === id)[0];
  }
  public getCityByName(cityName: string, countryName: string): City {
    const cities = this.cities.filter(
      (city) => city.cityName === cityName && city.countryName === countryName
    );
    if (cities === undefined || cities.length === 0) {
      throw 'no city found';
    }
    return cities[0];
  }

  public filterCitiesByPartialName(
    partialName: string,
    maxResults: number = 5
  ): City[] {
    if (partialName === undefined || partialName === null) {
      throw 'invalid city partial name';
    }

    let cities: City[] = [];
    partialName = partialName.toLowerCase();
    cities = this.cities.filter((city) => {
      return city.cityName.toLowerCase().startsWith(partialName);
    });
    const returnCities: City[] = [];
    if (cities.length !== 0) {
      for (let i = 0; i < maxResults; i++) {
        returnCities[i] = cities[i];
      }
      return returnCities.sort(this.compare);
    } else {
      return (cities = []);
    }
  }

  public compare(a, b) {
    if (a.cityName < b.cityName) {
      return -1;
    }
    if (a.cityName > b.cityName) {
      return 1;
    }
    return 0;
  }

  private _storeCities(): void {
    try {
      localStorage.setItem(
        CitiesListService.CityListKey,
        JSON.stringify(this.cities)
      );
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  private _loadCities() {
    const citiesFromLocalStore = JSON.parse(
      localStorage.getItem(CitiesListService.CityListKey)
    ) as City[];
    if (citiesFromLocalStore) {
      this.cities = citiesFromLocalStore;
    }
  }

  private _isNull(val: any): boolean {
    if (val === null || val === undefined || val === '') {
      return true;
    }
    return false;
  }

  public verificationData(
    originCity: City,
    destinationCity: City,
    startdate: Date,
    enddate: Date
  ) {
    if (!originCity && !destinationCity && !startdate && !enddate) {
      return false;
    }
    if (startdate.getDate() === enddate.getDate()) {
      return false;
    }
    if (originCity === destinationCity) {
      return false;
    }

    let count = 0;
    const hasOriginCity = this.cities.filter((city) => {
      return (
        city.cityName === originCity.cityName &&
        city.countryName === originCity.countryName
      );
    });

    const hasDestinationCity = this.cities.filter((city) => {
      return (
        city.cityName === destinationCity.cityName &&
        city.countryName === destinationCity.countryName
      );
    });

    if (
      hasOriginCity === undefined ||
      hasOriginCity.length <= 0 ||
      hasDestinationCity === undefined ||
      hasDestinationCity.length <= 0
    ) {
      return false;
    }
    return true;
  }
}
