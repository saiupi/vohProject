import { DatePipe } from '@angular/common';
import { CitiesListService } from './../../service-module/cities-list.service';
import { City } from '@ojashub/voyaah-common';
import { UserItineraryService } from './../../service-module/user-itinerary.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';
import { TravelPackage } from '@ojashub/voyaah-common';
import { environment } from '@environments/environment';
import { StaycationPackagesService } from '@app/service-module/staycation-packages.service';
import { AccountService } from '@app/account/services';
import { ChangeNotifyService } from '../../service-module/change-notify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  providers: [DatePipe],
})
export class HomePage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  @ViewChild('slideWithNav1', { static: false }) slideWithNav1: IonSlides;
  @ViewChild('slideWithNav2', { static: false }) slideWithNav2: IonSlides;
  @ViewChild('slideWithNav3', { static: false }) slideWithNav3: IonSlides;

  packages: TravelPackage[];
  packageData: TravelPackage[];

  adultplus = '';
  adultminus = '';
  childplus = '';
  childminus = '';
  inftplus = '';
  inftminus = '';
  date: Date;
  minDate: Date;
  maxDate: Date;
  adultscount = 1;
  childrencount = 0;
  infantscount = 0;
  tocitylist = [];
  tocityitarate = [];
  showconformcard = false;
  showhomecard = true;
  stars = [1, 2, 3, 4, 5];
  setcount = 0;
  citiesdata: any;
  datafromlocals: any;
  fromcitysearchTerm: FormControl = new FormControl();
  tocitysearchTerm: FormControl = new FormControl();
  filterfromdata = [];
  filtertodata = [];
  setorigincityname: string;
  setdestinationcityname: string;
  showtocity = false;
  showfromcity = false;
  fromCity: string;
  toCity: string;
  timerange = new FormGroup({
    start: new FormControl('', Validators.required),
    end: new FormControl('', Validators.required),
  });
  confirmdestinationDates = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  setFromcard;
  timelinearray = [];
  todestinationsarray = [];
  currentDate: Date;
  currentOriginCity: City;
  currentdestinationCity: City;
  confirmOrigincity: City;
  confirmDestinationcities: City[];
  getFromCityId: number;
  getToCityId: number;
  featuredPackeges: any = [];
  bestValuePackeges: any = [];
  categoryPackages: any = [];
  fromCityDisp = false;
  toCityDisp = false;
  dateReq = false;
  registerForm: FormGroup;
  toastMsg = false;
  submitted = false;
  exploreDestinationsCategory: any = [];
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 3,
  };
  slideOptsTwo = {
    initialSlide: 0,
    slidesPerView: 5,
  };
  slideOptsThree = {
    initialSlide: 0,
    slidesPerView: 3,
  };

  // <!-- package for mobile starts here-->

  slideOptsOnemobile = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: {
      delay: 3100,
    },
  };
  slideOptsTwomobile = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: {
      delay: 3600,
    },
  };
  slideOptsThreemobile = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: {
      delay: 3900,
    },
  };
  slideOpts = {
    initialSlide: 0,
    slidesPerView: 3,
    autoplay: {
      delay: 2000,
    },
    loop: true,
  };
  slideOptsMobileView = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: {
      delay: 1500,
    },
    loop: true,
  };
  // <!-- package for mobile ends here -->

  beachdata = [];
  Hillsdata = [];
  forestdata = [];
  islanddata = [];
  desertdata = [];
  lakesdata = [];
  metrodata = [];
  yogadata = [];
  historydata = [];
  adventuredata = [];
  explorePackage: any;
  production = false;
  partnetName = false;

  patnerName: any;
  partnerNameResp: any;
  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private citiesListService: CitiesListService,
    private userItineraryService: UserItineraryService,
    private datePipe: DatePipe,
    private menuCtrl: MenuController,
    private accountService: AccountService,
    private staycationService: StaycationPackagesService,
    private formBuilder: FormBuilder,
    private ChangeNotifyService: ChangeNotifyService
  ) {
    this.staycationService.currentpartnerClose.subscribe((status) => {
      let partnerNamecatch = localStorage.getItem('partnerName');
      console.log(partnerNamecatch);
      if (status === true) {
        this.partnetName = false;
      }
    });

    this.production = environment.production;
    this.currentOriginCity = this.userItineraryService.userItineraryData().originCity;
    this.activatedRoute.params.subscribe((res) => {
      this.setFromcard = res.setcard;
      if (this.setFromcard === 'confirmDesitinations') {
        this.showconformcard = true;
        this.showhomecard = false;
        this.confirmDesitinations();
      }
    });
    this.staycationService.trackStaycationData.subscribe((status) => {
      if (status == true) {
        this.getFeaturedList();
        this.partnerNameResp = this.staycationService.getpackageVenderName();
        if (
          this.partnerNameResp?.vendorName?.length > 0 &&
          this.partnerNameResp?.travelPackages?.length > 0
        ) {
          this.partnetName = true;
        } else {
          this.partnetName = false;
        }
      }
    });
  }
  omit_special_char(event) {
    var k;
    k = event.charCode;
    return (
      (k > 64 && k < 91) ||
      (k > 96 && k < 123) ||
      k == 8 ||
      k == 32 ||
      (k >= 48 && k <= 57)
    );
  }
  ngOnInit(): void {
    let currentDate = new Date();
    this.minDate = new Date(currentDate);
    this.maxDate = new Date(currentDate.getFullYear() + 1, 11, 31);
    const userItineraryData = this.userItineraryService.userItineraryData();
    if (userItineraryData.originCity?.cityName) {
      this.setorigincityname =
        userItineraryData.originCity.cityName +
        ' , ' +
        userItineraryData.originCity.countryName +
        ' , ' +
        userItineraryData.originCity.airportCode;
      this.setdestinationcityname =
        userItineraryData?.destinationCities[0]?.cityName +
        ' , ' +
        userItineraryData.destinationCities[0]?.countryName +
        ' , ' +
        userItineraryData.destinationCities[0]?.airportCode;
      this.adultscount = userItineraryData.travellers.adultCount;
      this.childrencount = userItineraryData.travellers.childCount;
      this.infantscount = userItineraryData.travellers.infantCount;
      this.getFromCityId = userItineraryData.originCity.id;
      this.getToCityId = userItineraryData?.destinationCities[0]?.id;
      const dateCurrent = this.datePipe.transform(currentDate, 'yyyy/MM/dd');
      const dateStart = this.datePipe.transform(
        new Date(userItineraryData.startDate),
        'yyyy/MM/dd'
      );
      const dateEnd = this.datePipe.transform(
        new Date(userItineraryData.endDate),
        'yyyy/MM/dd'
      );
      if (dateStart < dateCurrent || dateEnd < dateCurrent) {
        this.timerange.controls.start.setValue(null);
        this.timerange.controls.end.setValue(null);
      } else {
        this.timerange.controls.start.setValue(userItineraryData.startDate);
        this.timerange.controls.end.setValue(userItineraryData.endDate);
      }
    }

    this.subscribeToCityChanges();
    if (this.adultscount + this.childrencount == 9) {
      this.adultplus = 'desabled_display';
      this.childplus = 'desabled_display';
    } else {
      this.adultplus = '';
      this.childplus = '';
    }

    if (this.adultscount == 1) {
      this.adultminus = 'desabled_display';
    } else {
      this.adultminus = '';
    }
    if (this.childrencount == 0) {
      this.childminus = 'desabled_display';
    } else {
      this.childminus = '';
    }
    if (this.infantscount == this.adultscount) {
      this.inftplus = 'desabled_display';
      this.inftminus = '';
    } else {
      this.inftplus = '';
    }
    if (this.infantscount == 0) {
      this.inftminus = 'desabled_display';
    }
    this.menuCtrl.enable(false);
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      number: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  confirmDesitinations(): void {
    const userItineraryData = this.userItineraryService.userItineraryData();
    this.confirmOrigincity = userItineraryData.originCity;
    this.confirmDestinationcities = userItineraryData.destinationCities;
    this.confirmdestinationDates.controls.start.setValue(
      userItineraryData.startDate
    );
    this.confirmdestinationDates.controls.end.setValue(
      userItineraryData.endDate
    );
    this.adultscount = userItineraryData.travellers.adultCount;
    this.childrencount = userItineraryData.travellers.childCount;
    this.infantscount = userItineraryData.travellers.infantCount;
  }

  stp_prp(event: any): void {
    event.stopPropagation();
  }

  // Form City start
  subscribeToCityChanges(): void {
    this.fromcitysearchTerm.valueChanges.subscribe((partialName: string) => {
      if (partialName === undefined || partialName === '') {
        this.showfromcity = false;
        return;
      }
      this.showfromcity = true;
      this.fromCity = partialName;
      this.filterfromdata = this.citiesListService.filterCitiesByPartialName(
        partialName
      );
    });

    this.tocitysearchTerm.valueChanges.subscribe((partialName) => {
      if (partialName === undefined || partialName === '') {
        this.showtocity = false;
        return;
      }
      this.showtocity = true;
      this.toCity = partialName;
      this.filtertodata = this.citiesListService.filterCitiesByPartialName(
        partialName
      );
    });
  }

  getOriginCity(
    cityName: string,
    countryName: string,
    id: number,
    airportCode: string
  ): void {
    this.getFromCityId = null;
    this.setorigincityname =
      cityName + ' , ' + countryName + ' (' + airportCode + ')';
    this.showfromcity = false;
    this.currentOriginCity = this.citiesListService.getCityById(id);
  }

  getDestinationCity(
    cityName: string,
    countryName: string,
    id: number,
    airportCode: string
  ): void {
    this.getToCityId = null;
    this.setdestinationcityname =
      cityName + ' , ' + countryName + ' (' + airportCode + ')';
    this.showtocity = false;
    this.currentdestinationCity = this.citiesListService.getCityById(id);
  }

  async navigationToAddDestination(): Promise<void> {
    // remove below line after custom booking confromed
    if (this.production != true) {
      let verification: boolean;
      if (
        this.datePipe.transform(this.timerange.value.end, 'yyyy/MM/dd') !==
        this.datePipe.transform(this.timerange.value.start, 'yyyy/MM/dd')
      ) {
        if (this.getFromCityId !== null) {
          this.fromCityDisp = true;
          this.currentOriginCity = this.citiesListService.getCityById(
            this.getFromCityId
          );
        }

        if (this.getToCityId !== null) {
          this.toCityDisp = true;
          this.currentdestinationCity = this.citiesListService.getCityById(
            this.getToCityId
          );
        }

        if (
          (this.currentOriginCity,
          this.currentdestinationCity,
          this.timerange.value.start,
          this.timerange.value.end)
        ) {
          verification = this.citiesListService.verificationData(
            this.currentOriginCity,
            this.currentdestinationCity,
            this.timerange.value.start,
            this.timerange.value.end
          );
        }
        if (verification != true) {
          return;
        } else {
          this.dateReq = false;
          this.userItineraryService.setBasicInfo(
            this.timerange.value.start,
            this.timerange.value.end,
            this.currentOriginCity,
            [this.currentdestinationCity]
          );
          this.userItineraryService.updateTravellers({
            adultCount: this.adultscount,
            childCount: this.childrencount,
            infantCount: this.infantscount,
          });
          this.route.navigateByUrl('/destination');
        }
      } else {
        this.dateReq = true;
        this.fromCityDisp = true;
        this.toCityDisp = true;
      }
    }
  }

  navigationConfirmDestinationToAddDestination(): void {
    this.userItineraryService.setBasicInfo(
      this.confirmdestinationDates.value.start,
      this.confirmdestinationDates.value.end,
      this.confirmOrigincity,
      this.confirmDestinationcities
    );
    this.userItineraryService.updateTravellers({
      adultCount: this.adultscount,
      childCount: this.childrencount,
      infantCount: this.infantscount,
    });
    this.route.navigateByUrl('/destination');
  }
  onChangeEvent(event) {
    console.log(event.value);
    if (event.value != null) {
      this.dateReq = false;
    } else {
      this.dateReq = true;
    }
  }

  navigationConfirmDestinationToTimelinepage(): void {
    // TODO Date validation
    if (
      this.datePipe.transform(
        this.confirmdestinationDates.value.end,
        'yyyy/MM/dd'
      ) !==
      this.datePipe.transform(
        this.confirmdestinationDates.value.start,
        'yyyy/MM/dd'
      )
    ) {
      this.userItineraryService.getBooleanValue(true);
      this.userItineraryService.setBasicInfo(
        this.confirmdestinationDates.value.start,
        this.confirmdestinationDates.value.end,
        this.confirmOrigincity,
        this.confirmDestinationcities
      );
      this.userItineraryService.updateTravellers({
        adultCount: this.adultscount,
        childCount: this.childrencount,
        infantCount: this.infantscount,
      });
      this.route.navigateByUrl('/time-line');
    }
  }

  clickCity(e, cityDet) {
    console.log(e);
    if (cityDet == 'fromCity') {
      if (e.target.value != '') {
        this.fromCityDisp = false;
      }
    }
    if (cityDet == 'toCity') {
      if (e.target.value != '') {
        this.toCityDisp = false;
      }
    }
  }

  navigatetotimeline(): void {
    // remove below line after custom booking confromed
    if (this.production != true) {
      this.userItineraryService.getBooleanValue(true);
      if (this.getFromCityId !== null) {
        this.fromCityDisp = true;
        this.currentOriginCity = this.citiesListService.getCityById(
          this.getFromCityId
        );
      }

      if (this.getToCityId !== null) {
        this.toCityDisp = true;
        this.currentdestinationCity = this.citiesListService.getCityById(
          this.getToCityId
        );
      }
      // this.fromCityDisp = false;
      let verification: boolean;
      if (
        (this.currentOriginCity,
        this.currentdestinationCity,
        this.timerange.value.start,
        this.timerange.value.end)
      ) {
        verification = this.citiesListService.verificationData(
          this.currentOriginCity,
          this.currentdestinationCity,
          this.timerange.value.start,
          this.timerange.value.end
        );
        if (this.currentOriginCity != undefined) {
          this.fromCityDisp = false;
        }
      }
      if (verification != true) {
        if (this.timerange.status == 'INVALID') {
          this.dateReq = true;
        }
        return;
      } else {
        this.dateReq = false;
        this.userItineraryService.setBasicInfo(
          this.timerange.value.start,
          this.timerange.value.end,
          this.currentOriginCity,
          [this.currentdestinationCity]
        );
        this.userItineraryService.updateTravellers({
          adultCount: this.adultscount,
          childCount: this.childrencount,
          infantCount: this.infantscount,
        });
        this.route.navigateByUrl('/time-line');
      }
    }
  }

  getadultsplus() {
    if (this.adultscount + this.childrencount < 9) {
      this.adultscount++;
      if (this.adultscount + this.childrencount == 9) {
        this.adultplus = 'desabled_display';
        this.childplus = 'desabled_display';
      } else {
        this.adultplus = '';
        this.childplus = '';
      }
    }

    if (this.adultscount == 1) {
      this.adultminus = 'desabled_display';
    } else {
      this.adultminus = '';
    }
    if (this.adultscount == this.infantscount || this.infantscount == 4) {
      this.inftplus = 'desabled_display';
    } else {
      this.inftplus = '';
    }
  }

  getadultsminus() {
    if (this.adultscount > 1) {
      this.adultscount--;
    }
    if (this.adultscount < this.infantscount) {
      this.infantscount--;
    }
    if (this.adultscount == 1) {
      this.adultminus = 'desabled_display';
    } else {
      this.adultminus = '';
    }
    if (this.adultscount != 9) {
      this.adultplus = '';
      this.childplus = '';
    }
    if (this.adultscount == this.infantscount) {
      this.inftplus = 'desabled_display';
    }
  }

  getchildrenplus() {
    if (this.adultscount + this.childrencount < 9) {
      this.childrencount++;
      if (this.adultscount + this.childrencount == 9) {
        this.childplus = 'desabled_display';
        this.adultplus = 'desabled_display';
      } else {
        this.childplus = '';
        this.adultplus = '';
      }
    }
    if (this.childrencount == 0) {
      this.childminus = 'desabled_display';
    } else {
      this.childminus = '';
    }
  }

  getchildrenminus() {
    if (this.childrencount > 0) {
      this.childrencount--;
      if (this.childrencount == 0) {
        this.childminus = 'desabled_display';
      } else {
        this.childminus = '';
      }
      if (this.adultscount + this.childrencount != 9) {
        this.childplus = '';
        this.adultplus = '';
      }
    }
  }

  getinfantsplus() {
    if (this.infantscount < this.adultscount) {
      if (this.infantscount < 4) {
        this.infantscount++;
      }
      if (this.infantscount == this.adultscount || this.infantscount == 4) {
        this.inftplus = 'desabled_display';
      } else {
        this.inftplus = '';
      }
    }
    if (this.infantscount == 0) {
      this.inftminus = 'desabled_display';
    } else {
      this.inftminus = '';
    }
  }

  getinfantsminus() {
    if (this.infantscount > 0) {
      this.infantscount--;
      this.inftplus = '';
    }
    if (this.infantscount == 0) {
      this.inftminus = 'desabled_display';
    }
  }
  resetclick() {
    this.adultscount = 1;
    this.childrencount = 0;
    this.infantscount = 0;
    this.adultplus = '';
    this.adultminus = 'desabled_display';
    this.childplus = '';
    this.childminus = 'desabled_display';
    this.inftplus = '';
    this.inftminus = 'desabled_display';
  }

  deletedestination(id) {
    let filterd_toCity;
    let searchavail = this.confirmDestinationcities.filter((x) => {
      if (x === id) {
        filterd_toCity = id;
      }
    });
    if (searchavail.length == 0) {
      let index_value = this.confirmDestinationcities.indexOf(filterd_toCity);
      this.confirmDestinationcities.splice(index_value, 1);
    }
  }

  slidePre() {
    this.slides.slidePrev();
  }
  slideNex() {
    this.slides.slideNext();
  }

  async getFeaturedList() {
    try {
      this.packages = await this.staycationService.stacationList();
      this.packageData = this.packages;
      this.featuredPackeges = [];
      this.bestValuePackeges = [];
      this.packageData?.map((res) => {
        if (res.packageValues?.tags?.length > 0) {
          if (res.packageValues.tags[0] === 'BestValue') {
            this.bestValuePackeges.push(res);
          } else {
            if (res.packageValues.tags[0] === 'featured') {
              this.featuredPackeges.push(res);
            }
          }
        }
      });
      this.beachdata = [];
      this.Hillsdata = [];
      this.forestdata = [];
      this.islanddata = [];
      this.desertdata = [];
      this.lakesdata = [];
      this.metrodata = [];
      this.yogadata = [];
      this.historydata = [];
      this.adventuredata = [];
      this.packageData?.map((res) => {
        if (res.packageValues?.category?.length > 0) {
          for (let i = 0; i < res.packageValues?.category?.length; i++) {
            if (res.packageValues.category[i] === 'Beach') {
              this.beachdata.push(res);
            }
            if (res.packageValues.category[i] === 'Hills and Mountains') {
              this.Hillsdata.push(res);
            }
            if (res.packageValues.category[i] === 'Forest and Wildlife') {
              this.forestdata.push(res);
            }
            if (res.packageValues.category[i] === 'Island') {
              this.islanddata.push(res);
            }
            if (res.packageValues.category[i] === 'Desert') {
              this.desertdata.push(res);
            }
            if (res.packageValues.category[i] === 'Lakes and Rivers') {
              this.lakesdata.push(res);
            }
            if (res.packageValues.category[i] === 'Metro life') {
              this.metrodata.push(res);
            }
            if (res.packageValues.category[i] === 'Yoga and Wellness') {
              this.yogadata.push(res);
            }
            if (res.packageValues.category[i] === 'History and Culture') {
              this.historydata.push(res);
            }
            if (res.packageValues.category[i] === 'Adventure') {
              this.adventuredata.push(res);
            }
          }
        }
      });

      // Todo: - on click to packages in the staycation page use  arrays below
      // console.log('dude', this.beachdata);
      // console.log('dude6', this.historydata);
      // console.log('dude1', this.Hillsdata);
      // console.log('dude7', this.yogadata);
      // console.log('dude8', this.metrodata);
      // console.log('dude2', this.forestdata);
      // console.log('dude3', this.islanddata);
      // console.log('dude4', this.desertdata);
      // console.log('dude9', this.adventuredata);
      // console.log('dude5', this.lakesdata);
    } catch (e) {
      console.log(e);
    }
  }

  slideNext(object, slideView) {
    slideView.slideNext(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });
  }

  slidePrev(object, slideView) {
    slideView.slidePrev(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });
  }
  checkIfNavDisabled(object, slideView) {
    this.checkisBeginning(object, slideView);
    this.checkisEnd(object, slideView);
  }
  checkisBeginning(object, slideView) {
    slideView.isBeginning().then((istrue) => {
      object.isBeginningSlide = istrue;
    });
  }
  checkisEnd(object, slideView) {
    slideView.isEnd().then((istrue) => {
      object.isEndSlide = istrue;
    });
  }
  SlideDidChange(object, slideView) {
    this.checkIfNavDisabled(object, slideView);
  }

  travellerPackagePreview(value) {
    // this.route.navigate(['/staycation-preview/' + value]);
    this.staycationService.packageReference.next(value);
    this.route.navigate(['/staycation/', value]);
  }
  destinationsByTheme(data: string) {
    // this.staycationService.packageValues.next(data);
    this.route.navigate(['category/staycation/', data]);
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    const data: any = this.registerForm.value;

    if (data) {
      this.toastMsg = true;
      // this.interval = setInterval(() => {
      //   if (this.timeLeft > 0) {
      //     this.timeLeft--;
      //   } else {
      //     clearInterval(this.interval);
      //     this.toastMsg = false;
      //     this.timeLeft = null;
      //     return;
      //   }
      // }, 2500);
      setTimeout(() => {
        //<<<---using ()=> syntax
        this.toastMsg = false;
      }, 3000);
      // Email Notify call change-notify service.
      this.ChangeNotifyService.userQueryNotify(
        data.name,
        data.email,
        data.number,
        data.message
      );

      this.registerForm.reset();
      this.submitted = false;
    }
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  floatCardImages = [
    {
      image: '../assets/images/best-deal.png',
      name: 'TOP RATED AGENTS AND ADVISORS',
    },
    {
      image: '../assets/images/Authentic-and-Exclusive.png',
      name: 'AUTHENTIC AND EXCLUSIVE',
    },
    {
      image: '../assets/images/happy-travellers.png',
      name: 'OVER 10K HAPPY TRAVELLERS',
    },
    {
      image: '../assets/images/Holliday.png',
      name: 'OFFBEAT LUXE STAYS',
    },
    {
      image: '../assets/images/Offbeat-Luxe-Stays.png',
      name: 'MORE THAN 350 DESTINATIONS',
    },
  ];
  // PERFECT TRIP
  // eslint-disable-next-line @typescript-eslint/member-ordering
  perfectTripImages = [
    {
      tripImages: '../assets/images/Exclusive-Getaways.png',
      tripName: 'Exclusive Getaways',
    },
    {
      tripImages: '../assets/images/Travel-Solutions.png',
      tripName: 'Complete Travel solutions',
    },
    {
      tripImages: '../assets/images/Highest-Customization.png',
      tripName: 'Highest Customization',
    },
  ];
  // RAVEL PARTNERS
  // eslint-disable-next-line @typescript-eslint/member-ordering
  travelImages = [
    {
      image: '../assets/images/loyaltyrewardz-logo-dark.png',
    },
    {
      image: '../assets/images/trawex.png',
    },
    {
      image: '../assets/images/fk.png',
    },
    {
      image: '../assets/images/cred.png',
    },
  ];

  // RAVEL NEWS
  // eslint-disable-next-line @typescript-eslint/member-ordering
  travelNewsImages = [
    {
      travelImage: '../assets/images/NoPath - Copy (23).png',
      title: 'New Covid rules for international passengers from today',
      subTitle:
        'New Covid rules for international passengers from todayNew Covid rules for international passengers from today',
    },
    {
      travelImage: '../assets/images/NoPath - Copy (23).png',
      title: 'New Covid rules for international passengers from today',
      subTitle:
        'New Covid rules for international passengers from todayNew Covid rules for international passengers from today',
    },
  ];

  goToContact() {
    this.route.navigate([''], { fragment: 'contactDiv' });
  }
}
