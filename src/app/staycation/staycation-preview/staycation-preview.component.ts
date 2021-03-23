import { Analytics } from 'aws-amplify';
import { error } from 'protractor';
import { TravelPackage } from '@ojashub/voyaah-common';
import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfileService } from '@app/service-module/user-profile.service';
import { ModalController, Platform } from '@ionic/angular';
import { LoginComponent } from '@app/account/components/login.component';
import { UserItineraryService } from '@app/service-module/user-itinerary.service';
import { TravellersDetails } from '@ojashub/voyaah-common';
import { PaymentService } from '@app/service-module/payment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonSlides } from '@ionic/angular';
import { strict } from 'assert';
import { DestinationsApiService } from '@app/destination/destinations-api.service';
import { DateAdapter } from '@angular/material/core';
import {
  MatDateRangeSelectionStrategy,
  DateRange,
  MAT_DATE_RANGE_SELECTION_STRATEGY,
} from '@angular/material/datepicker';
import { StaycationPackagesService } from '@app/service-module/staycation-packages.service';
import { CanceltripService } from '@app/service-module/canceltrip.service';
import { AccountService } from '@app/account/services';
@Injectable()
export class FiveDayRangeSelectionStrategy<D>
  implements MatDateRangeSelectionStrategy<D> {
  days = 0;
  constructor(
    private _dateAdapter: DateAdapter<D>,
    private staycationService: StaycationPackagesService
  ) {
    this.days = Number(this.staycationService.noOfDays) - 1;
    console.log('noOfDays', this.days);
  }

  selectionFinished(date: D | null): DateRange<D> {
    return this._createFiveDayRange(date);
  }

  createPreview(activeDate: D | null): DateRange<D> {
    return this._createFiveDayRange(activeDate);
  }

  private _createFiveDayRange(date: D | null): DateRange<D> {
    if (date) {
      const start = this._dateAdapter.addCalendarDays(date, 0);
      const end = this._dateAdapter.addCalendarDays(date, this.days);
      return new DateRange<D>(start, end);
    }

    return new DateRange<D>(null, null);
  }
}
@Component({
  selector: 'app-staycation-preview',
  templateUrl: './staycation-preview.component.html',
  styleUrls: ['./staycation-preview.component.scss'],
  providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: FiveDayRangeSelectionStrategy,
    },
  ],
})
export class StaycationCitiesComponent implements OnInit {
  sliderIndex: number;
  days = 6;
  minDate = new Date();
  showTourPlan = true;
  showLocation = false;
  staycationPreviewData: TravelPackage;
  values: any;
  traveler_messages: any = [];
  packages: TravelPackage[];
  packageReference: string;
  vendor = 'voyaah.com';
  item_qty: any;
  userLoggedIn: boolean;
  adultscount = 1;
  childrencount = 0;
  infantscount = 0;
  stayCationTravellersDetails: TravellersDetails;
  isLoading = false;
  onAndroidPLatform = false;
  onIOSPlatform = false;
  dateForm: FormGroup;
  form: FormGroup;
  submitted = false;
  couponCoderes: any;
  couponResponce: any;
  activeTab = 'overView';
  display = 'none';
  displayHotel = 'none';
  displayGalleryImages = 'none';
  // userData: any = [];
  //@ViewChild(IonSlides) slides: IonSlides;
  @ViewChild('slides', { read: IonSlides }) slides: IonSlides;
  roomsData: any = [];
  roomAmenitiesList: any = [];
  copan_code = false;
  couponCodeprice: any;
  couponValid = false;
  actualPrice: any;
  invalidCouponCode = false;
  invalidCouponCodeMessage: any;
  successCouponCode: any;
  discountPrice = false;
  stycationPackagePrice: any;
  totalDeceased: any;
  checkRoomModalDisplay = false;
  checkRoomSelectRoomModal = false;
  checkRoomRoomavilable = false;
  modalDisplay = false;
  validationModal = false;
  selectRoomModal = false;
  errorWhileValidation = false;
  errorWhileBooking = false;
  errorText = 'error';
  roomtype: any;
  loading = false;
  couponData: any;
  couponCodefail: any;
  roomsAmenitiesInformation: any;
  hotelroomtype: any;
  lat: number;
  lng: number;
  zoom = 16;
  allLocations: any[] = [];
  previewData: any;
  show = 'destination';

  stars: number[] = [1, 2, 3, 4, 5];
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

  todayDate =
    new Date().getFullYear() +
    '-' +
    ('0' + (new Date().getMonth() + 1)).slice(-2) +
    '-' +
    ('0' + new Date().getDate()).slice(-2);
  hoteRoomlImages: any;
  dateInvalid = false;
  imageZoomModel: any;
  roomavilable = false;
  dateLength: any;
  discountedPrice: any;
  discountedValue: any;
  worngCoupon = false;
  couponCodeError = false;
  selectedItem: any;
  imagesModalList: any;
  bookingDetails = true;
  partnerData: any;
  selectedValue: any;
  travelDates: any;

  constructor(
    private staycationService: StaycationPackagesService,
    private route: ActivatedRoute,
    private router: Router,
    private userProfileService: UserProfileService,
    public modalController: ModalController,
    private userItineraryService: UserItineraryService,
    private pay: PaymentService,
    private platform: Platform,
    private formBuilder: FormBuilder,
    private destinationService: DestinationsApiService,
    private canceltripService: CanceltripService
  ) {
    this.sliderIndex = 0;
    this.route.params.subscribe((params) => {
      this.packageReference = params.packageReference;
      this.vendor = params.vendor;
      if (this.vendor == undefined) {
        this.vendor = 'voyaah.com';
      }
      if (this.vendor === 'bookedDetails') {
        this.bookingDetails = false;
      }
      console.log(this.packageReference, 'packageReference');
      console.log(this.vendor, 'vendorrrrrrrrrrrrrrr');
      this.staycationService.packageReference.next(this.packageReference);
      this.getPackages();
      this.onAndroidPLatform = this.platform.is('android');
      this.onIOSPlatform = this.platform.is('ios');
      console.log('platform', this.onAndroidPLatform, this.onIOSPlatform);
      this.item_qty = 0;
    });

    this.couponData = this.staycationService.getOption();

    console.log(this.couponData, 'couponData');
    if (this.couponData?.discountedPrice?.length > 0) {
      this.couponCodeprice = this.couponData.discountedPrice;
      this.discountPrice = true;
      this.getPriceDetails();
      this.couponValid = true;
      this.invalidCouponCode = false;
      this.couponCoderes = this.couponData.couponCode;
      this.actualPrice = this.couponData.actualPrice;
      this.totalDeceased =
        this.couponData.actualPrice - this.couponData.discountedPrice;

      this.discountedPrice = this.couponData.discountedPrice;
      this.discountedValue = this.couponData.discountValue;
      console.log(this.discountedPrice, this.discountedValue);
      if (this.discountedPrice > this.actualPrice) {
        this.worngCoupon = true;
      }
    }
  }

  ngOnInit() {
    this.previewData = this.staycationService.getpreviewOption();
    console.log(this.previewData, 'previewData');
    this.dateForm = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });

    // window.onclick = (e) => {
    //   if (e.target) {
    //     this.modalDisplay = false;
    //   }
    // };
    this.form = this.formBuilder.group({
      copancode: ['', Validators.required],
    });
    this.userProfileService.currentUserNavigate.subscribe((res) => {
      console.log(res, 'rsep');
      this.userLoggedIn = res;
    });
    this.staycationService.staycationTravellersChanged.subscribe(
      (travellers: TravellersDetails) => {
        this.stayCationTravellersDetails = travellers;
        console.log('staycationtravelers', this.stayCationTravellersDetails);
      }
    );
    this.staycationService.selectedStartDate.subscribe((res) => {
      if (res != undefined) {
        this.dateForm.controls.startDate.setValue(res.startDate);
        this.dateForm.controls.endDate.setValue(res.endDate);
      }
      console.log(res);
    });

    window.onclick = (e) => {
      if (e.target) {
        this.checkRoomModalDisplay = false;
      }
    };
  }
  get f() {
    return this.form.controls;
  }
  selectedDate() {
    console.log(
      this.dateForm.controls.startDate.value,
      '------------',
      this.dateForm.controls.endDate.value
    );
    this.dateLength = this.dateForm.controls.startDate.value.toString();
    if (this.dateLength.length > 0) {
      this.dateInvalid = false;
    }
    this.staycationService.startDate.next({
      startDate: this.dateForm.value.startDate,
      endDate: this.dateForm.value.endDate,
    });
  }

  Checkroom() {
    this.checkRoomModalDisplay = true;
    if (
      this.dateForm.controls.startDate.value == undefined ||
      this.dateForm.controls.startDate.value == ''
    ) {
      this.dateInvalid = true;
      this.checkRoomModalDisplay = false;
    } else {
      this.dateInvalid = false;
      this.checkRoomModalDisplay = true;
      this.checkRoomRoomavilable = false;
      this.checkRoomSelectRoomModal = false;

      this.staycationService
        .validateStaycationBooking(
          this.staycationPreviewData.id,
          this.staycationPreviewData.packageValues.hotel.rooms[0].roomtype,
          this.dateForm.controls.startDate.value
        )
        .then((res) => {
          this.checkRoomModalDisplay = true;
          this.checkRoomRoomavilable = false;
          this.checkRoomSelectRoomModal = false;
          console.log(res);
          if (res.status == 'success') {
            this.checkRoomModalDisplay = true;
            this.checkRoomRoomavilable = true;
            this.checkRoomSelectRoomModal = false;
          } else {
            this.checkRoomModalDisplay = true;
            this.checkRoomRoomavilable = false;
            this.checkRoomSelectRoomModal = true;
            console.log('failed');
          }
        });
    }
  }
  async onSubmit() {
    this.loading = true;
    this.submitted = true;
    if (this.form.invalid) {
      this.loading = false;
      return;
    }
    let couponDate = {
      couponCode: this.f.copancode.value,
      price: this.staycationPreviewData.packageValues?.fare?.totalFare,
      packageId: this.staycationPreviewData.id,
      vendorName: this.vendor,
    };
    try {
      this.staycationService.getCouponCode(couponDate).subscribe(
        (result) => {
          this.couponResponce = result;
          if (this.couponResponce) {
            this.loading = false;
            this.couponValid = true;
          }
          if (this.couponResponce.status === 'failed') {
            this.invalidCouponCode = true;
            this.invalidCouponCodeMessage = this.couponResponce.message;
            this.discountPrice = false;
            this.couponCodefail = this.f.copancode.value;
            this.getPriceDetails();
          }
          this.couponCoderes = this.couponResponce.couponCode;
          this.actualPrice = this.couponResponce.actualPrice;
          this.couponCodeprice = this.couponResponce.discountedPrice;
          this.successCouponCode = this.couponResponce.status;

          if (this.successCouponCode === 'success') {
            this.discountPrice = true;
            this.getPriceDetails();
            this.invalidCouponCode = false;
            this.totalDeceased = this.actualPrice - this.couponCodeprice;
          }
          console.log(this.couponResponce, 'coupanCodeprice. . .');
          this.staycationService.setOption(this.couponResponce);
          // return result;
        },
        (error) => {
          this.loading = false;
          this.couponCodeError = true;
          console.log(error);
        }
      );
    } catch (error) {
      this.loading = false;
      this.couponCodeError = true;
      console.log('while getting data is err', error);
    }
  }
  getPriceDetails() {
    if (this.discountPrice == false) {
      this.stycationPackagePrice = this.staycationPreviewData.packageValues.fare.totalFare;
      console.log(this.stycationPackagePrice);
    }
    if (this.discountPrice == true) {
      this.stycationPackagePrice = this.couponCodeprice;
      console.log(this.stycationPackagePrice);
    }
  }
  get startDateControl() {
    return this.dateForm.controls;
  }

  async getPackages() {
    try {
      this.packages = await this.staycationService.stacationListpreview();
      console.log('staycations', this.packages);

      this.packages.map((data) => {
        if (data.packageReference === this.packageReference) {
          this.staycationPreviewData = data;
          this.selectedValue = this.staycationPreviewData?.packageValues?.hotel.rating;
          this.staycationService.setNoOfDays(
            this.staycationPreviewData.packageValues.numberOfDays
          );
          this.getLocationDetails();
          this.getPriceDetails();
          console.log(this.staycationPreviewData, 'staycationPreviewData');
          this.assignMinimumCount();
          if (this.staycationPreviewData.packageValues.activities.length === 0)
            this.showTourPlan = false;
        }
      });

      if (this.staycationPreviewData.packageValues?.hotel.rooms.length > 0) {
        this.staycationPreviewData.packageValues?.hotel.rooms.map((ele) => {
          // this.roomsData.push(ele.roomAmenities);
          this.roomsData.push(ele);

          return this.roomsData;
        });
      }

      //------------unused code--------------------
      // console.log('roooooooooooms', this.roomsData);
      // if (this.roomsData.length > 0) {
      //   for (let rooms of this.roomsData) {
      //     for (let el of rooms) {
      //       this.roomAmenitiesList.push(el);
      //     }
      //   }
      // }
      // console.log('amenitiesssssssssssssss', this.roomAmenitiesList);
      //console.log(this.packages[0].values.hotel[]);
      //------------unused code--------------------
    } catch (error) {
      console.log(error);
    }
  }
  assignMinimumCount() {
    this.adultscount = this.staycationPreviewData.packageValues.travellers.minAdults;
    this.childrencount = this.staycationPreviewData.packageValues.travellers.minChildren;
  }
  async processBooking() {
    try {
      this.travelDates = {
        startDate: this.dateForm.value.startDate,
        endDate: this.dateForm.value.endDate,
      };
      localStorage.setItem('travelDates', JSON.stringify(this.travelDates));
      if (
        this.dateForm.controls.startDate.value === undefined ||
        this.dateForm.controls.startDate.value == ''
      ) {
        this.dateInvalid = true;
      }
      if (this.dateForm.invalid) {
        return;
      }
      this.userItineraryService.updateTravellers({
        adultCount: this.adultscount,
        childCount: this.childrencount,
        infantCount: this.infantscount,
      });
      if (this.userLoggedIn === true) {
        if (this.stayCationTravellersDetails.adults.length > 0) {
          this.modalDisplay = true;
          this.validationModal = true;
          this.selectRoomModal = false;
          console.log('travellers selected');
          await this.staycationService
            .validateStaycationBooking(
              this.staycationPreviewData.id,
              this.staycationPreviewData.packageValues.hotel.rooms[0].roomtype,
              this.dateForm.controls.startDate.value
            )
            .then(
              (res) => {
                this.modalDisplay = true;
                this.validationModal = true;
                console.log(res);
                if (res.status == 'success') {
                  this.modalDisplay = false;
                  console.log('success');
                  this.bookStaycation();
                } else {
                  this.validationModal = false;
                  this.selectRoomModal = true;
                  console.log('failed');
                }
              },
              (err) => {
                console.log(err.statusText);
                this.errorText = err.statusText;
                this.modalDisplay = true;
                this.validationModal = false;
                this.errorWhileValidation = true;
              }
            );
        } else {
          this.userProfileService.navigateToTravellers.next('fromstaycations');
          this.userItineraryService.travelersSelect.next(true);
          localStorage.setItem(
            'packageID',
            JSON.stringify(this.packageReference)
          );
          this.router.navigate(['/travellers']);
        }
      } else {
        Analytics.record({ name: 'LoginForBooking' });
        const modal = await this.modalController.create({
          component: LoginComponent,
          cssClass: 'login-modal-css',
          componentProps: { value: 123 },
        });
        return await modal.present();
      }
    } catch (error) {
      this.modalDisplay = false;
      console.log(error);
    }
  }
  openRoomSelection() {
    this.modalDisplay = false;
    this.validationModal = false;
    this.selectRoomModal = false;
    this.errorWhileValidation = false;
    this.errorWhileBooking = false;
  }
  adultCountChange(type) {
    if (type == 'decrease') {
      if (
        this.adultscount >
        this.staycationPreviewData.packageValues.travellers.minAdults
      ) {
        this.adultscount--;
      }
    } else {
      if (
        this.adultscount <
        this.staycationPreviewData.packageValues.travellers.maxAdults
      ) {
        this.adultscount++;
      }
    }
  }
  Copancode() {
    this.copan_code = true;
  }
  Copancodeclose() {
    this.staycationService.couponClose(true);
    this.submitted = false;
    this.form.reset();
    this.staycationService.setOption(null);
    this.copan_code = false;
  }
  CopancodecloseInvalid() {
    this.couponValid = false;
    this.copan_code = false;
    this.submitted = false;
    this.discountPrice = false;
    this.staycationService.setOption(null);
    this.form.reset();
  }
  childCountChange(type) {
    if (type == 'decrease') {
      if (
        this.childrencount >
        this.staycationPreviewData.packageValues.travellers.minChildren
      ) {
        this.childrencount--;
      }
    } else {
      if (
        this.childrencount <
        this.staycationPreviewData.packageValues.travellers.maxChildren
      ) {
        this.childrencount++;
      }
    }
  }
  gototravellers() {
    this.userProfileService.navigateToTravellers.next('fromstaycations');
    this.userItineraryService.travelersSelect.next(true);
    localStorage.setItem('packageID', JSON.stringify(this.packageReference));
    this.router.navigate(['/travellers']);
  }
  setdataOfcoupon() {
    this.couponData = this.staycationService.getOption();
    console.log(this.couponData, 'couponData');
    if (this.couponData?.discountedPrice.length > 0) {
      this.discountedPrice = this.couponData.discountedPrice;
      this.discountedValue = this.couponData.discountValue;
      console.log(this.discountedPrice, this.discountedValue);
    } else {
      this.discountedPrice = 'NA';
      this.discountedValue = 'NA';
    }
  }
  async bookStaycation() {
    await this.setdataOfcoupon();
    this.isLoading = true;
    await this.staycationService
      .bookStaycations(
        this.staycationPreviewData,
        this.couponCoderes,
        this.stayCationTravellersDetails,
        this.dateForm.controls.startDate.value,
        this.staycationPreviewData.packageValues.hotel.rooms[0].roomtype,
        this.staycationPreviewData.packageValues.fare.totalFare,
        this.discountedPrice,
        this.discountedValue
      )
      .then((returnvalue) => {
        console.log('return_in_stay_preview', returnvalue);
        var id = this.staycationService.getStaycationBookingId();

        Analytics.record({
          name: 'StaycationBooking',
          attributes: {
            package: this.staycationPreviewData?.packagename,
            duration:
              this.dateForm.controls?.startDate?.value?.toString() +
              ' to ' +
              this.dateForm.controls?.endDate?.value?.toString(),
            partner: '',
            ticketsize: (
              this.stayCationTravellersDetails?.adults?.length +
              this.stayCationTravellersDetails?.children?.length +
              this.stayCationTravellersDetails?.infants?.length
            ).toString(),
            traveldate: this.dateForm.controls?.startDate?.value?.toString(),
            location: this.staycationPreviewData?.packageValues?.cityName,
            // age: Math.floor(timeDiff / (1000 * 3600 * 24) / 365).toString(),
            // birthday: this.userDetails?.dateOfBirth?.toString(),
            device:
              this.onAndroidPLatform || this.onIOSPlatform
                ? 'mobile or tab'
                : 'web',
            price: this.staycationPreviewData?.packageValues.fare?.totalFare?.toString(),
          },
        });
        if (this.onIOSPlatform == true || this.onAndroidPLatform == true) {
          this.pay.redirectToPayment(
            id,
            this.stycationPackagePrice,
            'INR',
            'EN',
            'staycation',
            'mobile'
          );
          this.pay.staycationPaymentGuard.next(true);
          this.router.navigateByUrl('/staycation-payment');
        } else {
          this.pay.redirectToPayment(
            id,
            this.stycationPackagePrice,
            'INR',
            'EN',
            'staycation',
            'browser',
            window.location.origin
          );
        }
      })
      .catch((error) => {
        console.log(error);
        this.isLoading = false;
        this.modalDisplay = true;
        this.validationModal = false;
        this.selectRoomModal = false;
        this.errorWhileValidation = false;
        this.errorWhileBooking = true;
      });
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  imagesPackages = [
    {
      city: 'Yoga and Wellness ',
      packages: '65+packages',
      imageUrl: '../../assets/images/NoPath - Copy (13).png',
    },
    {
      city: 'Lakes and Rivers',
      packages: '30+packages',
      imageUrl: '../../assets/images/NoPath - Copy (64).png',
    },
    {
      city: 'History and Culture ',
      packages: '18+packages',
      imageUrl: '../../assets/images/NoPath - Copy (13).png',
    },
    {
      city: 'Lakes and River ',
      packages: '40+packages',
      imageUrl: '../../assets/images/NoPath - Copy (64).png',
    },
  ];
  // eslint-disable-next-line @typescript-eslint/member-ordering
  currentRate = 2;

  amenitiesPreview(data) {
    console.log('222', data);
    this.hotelroomtype = data['roomtype'];
    this.hoteRoomlImages = data['images'];
    this.roomsAmenitiesInformation = data['roomAmenities'];
  }
  async getLocationDetails() {
    console.log(
      'staycations0000',
      this.staycationPreviewData.packageValues.hotel.address
    );
    const requestForCooridnates: any = [];
    requestForCooridnates.push(
      this.destinationService.getlatNlondestinationtostacations(
        this.staycationPreviewData.packageValues.hotel.address.city,
        this.staycationPreviewData.packageValues.hotel.address.country,
        this.staycationPreviewData.packageValues.hotel.address.houseNumber,
        this.staycationPreviewData.packageValues.hotel.address.landMark,
        this.staycationPreviewData.packageValues.hotel.address.state,
        this.staycationPreviewData.packageValues.hotel.address.street
      )
    );
    console.log('requestForCooridnates', requestForCooridnates);
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
        console.log('locations', this.allLocations);
      })
      .catch((error) => {
        console.log('Exception in getting geo locations ', error);
      });
  }

  ngOnDestroy() {
    this.couponData = undefined;
    this.staycationService.setOption(null);
  }
  imageZoom(image) {
    this.displayGalleryImages = 'block';
    this.imageZoomModel = image;
    this.selectedItem = this.imageZoomModel[1];
    console.log(this.selectedItem, '11111');
  }

  overView(activeTab) {
    this.activeTab = activeTab;
  }
  accommodation(activeTab) {
    this.activeTab = activeTab;
  }
  location(activeTab) {
    this.activeTab = activeTab;
  }
  gallery(activeTab) {
    this.activeTab = activeTab;
  }
  listClick(event, newValue, imgIndex) {
    this.selectedItem = newValue;
    this.sliderIndex = imgIndex;
  }
  imageList(data) {
    this.displayHotel = 'block';
    this.imagesModalList = data['images'];
    this.selectedItem = this.imagesModalList[1];
    //  this.imagesModalList=imagesList;
    console.log('22222222', this.imagesModalList);
  }

  openModal() {
    this.display = 'block';
  }
  onCloseHandled() {
    this.display = 'none';
  }
  // openModalHotel() {
  //   this.displayHotel = 'block';
  // }
  onCloseHandledHotel() {
    this.displayHotel = 'none';
  }
  cancelTrip() {
    try {
      this.modalDisplay = true;
      this.validationModal = true;
      this.canceltripService.getRefundDetails().then(
        (result) => {
          console.log(result);
          this.modalDisplay = false;
          this.validationModal = false;
          this.canceltripService.setRefundDetailsResponse(result);
          this.router.navigate(['/cancel-trip']);
        },
        (error) => {
          console.log(error);
          this.modalDisplay = false;
          this.validationModal = false;
        }
      );
    } catch (error) {
      console.log(error);
      this.modalDisplay = false;
      this.validationModal = false;
    }
  }
  onCloseGallery() {
    this.displayGalleryImages = 'none';
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  slideOptsOne = {
    initialSlide: 1,
    slidesPerView: 6,
    spaceBetween: 5,
  };

  slidePrev() {
    if (
      this.sliderIndex <= this.imagesModalList.length &&
      this.sliderIndex > 0
    ) {
      this.sliderIndex = this.sliderIndex - 1;
      this.selectedItem = this.imagesModalList[this.sliderIndex];
    }
  }
  slideNex() {
    if (this.sliderIndex < this.imagesModalList.length) {
      this.selectedItem = this.imagesModalList[this.sliderIndex];
      this.sliderIndex = this.sliderIndex + 1;
    }
  }
  slidePrevious() {
    if (
      this.sliderIndex <= this.imageZoomModel.length &&
      this.sliderIndex > 0
    ) {
      this.sliderIndex = this.sliderIndex - 1;
      this.selectedItem = this.imageZoomModel[this.sliderIndex];
    }
  }
  slideNext() {
    if (this.sliderIndex < this.imageZoomModel.length) {
      this.selectedItem = this.imageZoomModel[this.sliderIndex];
      this.sliderIndex = this.sliderIndex + 1;
    }
  }
  goToContact() {
    this.router.navigate([''], { fragment: 'contactDiv' });
  }
}
