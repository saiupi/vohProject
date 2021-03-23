import { Component, OnInit } from '@angular/core';
import { TravellerCount, TravellersDetails } from '@ojashub/voyaah-common';
import { UserItineraryService } from '@app/service-module/user-itinerary.service';
import { UserProfileDetails } from '@ojashub/voyaah-common';
import { UserProfileService } from '@app/service-module/user-profile.service';
import { PopoverController } from '@ionic/angular';
import * as moment from 'moment';
import { ModalController, Platform } from '@ionic/angular';
import { AddTravellersSlideMenuComponent } from '../myaccount/add-travellers-slide-menu/add-travellers-slide-menu.component';
import {
  FormGroup,
  FormArray,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StaycationPackagesService } from '@app/service-module/staycation-packages.service';
import { TravelPackage } from '@app/staycation/staycation.types';
import { LoginComponent } from '@app/account/components';
import { Analytics } from 'aws-amplify';
import { PaymentService } from '@app/service-module/payment.service';
import { AccountService } from '@app/account/services';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '@app/config.service';
import { CustomBooking } from '@ojashub/voyaah-common';
import { AwsTranscationSyncService } from '@app/service-module/aws-transcation-sync.service';
declare var $;
const { v1: uuidv1 } = require('uuid');
@Component({
  selector: 'app-traveller-selection',
  templateUrl: './traveller-selection.component.html',
  styleUrls: ['./traveller-selection.component.scss'],
})
export class TravellerSelectionComponent implements OnInit {
  submitted = false;
  travellersList: UserProfileDetails[] = [];
  adults: UserProfileDetails[] = [];
  children: UserProfileDetails[] = [];
  infants: UserProfileDetails[] = [];
  adultSelectedIndexes: number[] = [];
  childSelectedIndexes: number[] = [];
  infantSelectedIndexes: number[] = [];
  userDetails: UserProfileDetails;
  homeSelectedCount: TravellerCount = {
    adultCount: 1,
    childCount: 0,
    infantCount: 0,
  };
  stayCationTravellersDetails: TravellersDetails;
  dynamicForm: FormGroup;
  adultDisplay: boolean[] = [];
  childDisplay: boolean[] = [];
  infantDisplay: boolean[] = [];
  navFrom: string;
  packageReference: any;
  selectedTravellersData: any;
  staycationPreviewData: any;
  packages: any[];
  userLoggedIn: boolean;
  modalDisplay = false;
  selectRoomModal = false;
  validationModal = false;
  errorText: any;
  errorWhileValidation = false;
  errorWhileBooking = false;
  stayCationTravellersDate: any;
  isLoading = false;
  isLoadingcustom= false
  onAndroidPLatform = false;
  onIOSPlatform = false;
  couponCoderes: any;
  discountedPrice: any;
  discountedValue: any;
  couponData: any;
  couponCodeprice: any;
  discountPrice = false;
  stycationPackagePrice: any;
  errorChange = false;
  noTravellers = false;
  totalDeceased: any;
  PreviewItenary : any;
  customBook = false;
  payFali:any;
  returnFlight: any;
  returnFlightFare: any;
  returnFlightFareSourceCode: any;
  uuidReturn: any;
  totalReturnFlightfare: any;
  previewItenaryDetails:any;
  flightCountLength:any;
  flightfareamout:any;
  amounttypeflight:any;
  flightamounttype:any;
  flighttaxamount:any;
  EquivFareTax:any;
  show = false;
  buttonName = 'chevron-down-outline';
  taxTypeFilter:any
  taxTypeNames:any;
  totalTax:any;
  equivFare:any;

  hotelAmount:any;
  hotelamountfill:any;
  roomprice:any;
  hotelamountType:any;
  roomindprice:any;
  hotelmoneytype:any;
  hotelCountLength:any;
  totalhotelprice:any;

  GrandTotalAmount:any;
  GrandTotal:any;

  httpOptions: any;
  totalData:any;
  sourceCode:any;
  invalidFlights:any;
  flightValid:any;
  hotelValid:any;
  totalFlights:any;
  flights_valid = true;
  newInvalidFlightarray:any;
  flightpricechange = true;
  hotelpricechange = true;
  bothItems_price: boolean;
  hotel_valid = true;
  newInvalidHotelsarray:any;
  noItemSelect = false;
  travelCity:any;
  travelStartDate:any;
  selectedTravellers:any;
  apiError = true;
  bothItems: boolean;
  constructor(
    private itineraryService: UserItineraryService,
    private userProfileService: UserProfileService,
    public popoverController: PopoverController,
    private formBuilder: FormBuilder,
    private router: Router,
    private pay: PaymentService,
    public modalController: ModalController,
    private staycationService: StaycationPackagesService,
    private userItineraryService: UserItineraryService,
    private accountService: AccountService,
    private http: HttpClient,
    private APIservice: ConfigService,
    private awsTranscationSyncService: AwsTranscationSyncService,
  ) {
    this.staycationService.selectedPackageReference.subscribe(
      (packageReference) => {
        this.packageReference = packageReference;
        let packageID = JSON.parse(localStorage.getItem('packageID'))
        this.packageReference = packageID;
        if(this.packageReference == "custom")
        {
          this.customBook = true
        }
        else{
          this.customBook = false
        }
        console.log(packageID);
      }
    );
    this.userProfileService.routeToTravellers.subscribe((from) => {
      this.navFrom = from;
    });
    this.userProfileService.faildPayment.subscribe((res) => {
      console.log(res, 'this.payFali ');
      this.payFali = res;
    });
    this.getPackages();

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
    this.staycationService.selectedStartDate.subscribe((Date) => {
      this.stayCationTravellersDate = JSON.parse(
        localStorage.getItem('travelDates')
      );
      console.log('staycationtravelers', this.stayCationTravellersDate);
    });

    this.couponData = this.staycationService.getOption();

    console.log(this.couponData, 'couponData');
    if (this.couponData?.discountedPrice?.length > 0) {
      this.couponCodeprice = this.couponData.discountedPrice;
      this.discountPrice = true;
      this.couponCoderes = this.couponData.couponCode;
      this.discountedPrice = this.couponData.discountedPrice;
      this.discountedValue = this.couponData.discountValue;
      this.getPriceDetails();
      this.totalDeceased =
        this.couponData.actualPrice - this.couponData.discountedPrice;
    }
    this.staycationService.currentCouponClose?.subscribe((res) => {
      console.log(res, 'rsep');
      if (res === true) {
        this.discountPrice = false;
        this.couponData = null;
      }
    });
    
    this.PreviewItenary = JSON.parse(localStorage.getItem('itinerary-storage'));
    console.log(this.PreviewItenary, 'Peview');
  }
  close_pay() {
    this.payFali = false;
  }
  Test_close() {
    this.router.navigate(['/time-line']);
  }
  Network_close() {
    this.apiError = true;
  }
  ngOnInit() {
    window.onclick = (e) => {
      if (e.target) {
        this.payFali = false;
        this.flightValid = true;
        this.hotelValid = true;
        this.apiError = true;
        this.flightpricechange = true;
        this.hotelpricechange = true;
        this.noItemSelect = false;
      }
    };

    this.userItineraryService.travelersSelect.next(false);
    this.dynamicForm = this.formBuilder.group({
      adultsInput: new FormArray([]),
      childrenInput: new FormArray([]),
      infantsInput: new FormArray([]),
    });

    console.log('navfrom', this.navFrom);
    this.userProfileService.currentUserProfileData.subscribe((res) => {
      this.userDetails = this.userProfileService.getUserDetails();
      this.travellersList = this.userProfileService.getFamilyDetails();
      this.devideIntoCatogories();
      // this.popoverController.dismiss();
    });
    this.itineraryService.itineraryChanged.subscribe((r) => {
      this.homeSelectedCount = this.itineraryService.userItineraryData().travellers;
      this.devideIntoCatogories();
      this.createFormFields();
    });
    this.homeSelectedCount = this.itineraryService.userItineraryData().travellers;
    this.userDetails = this.userProfileService.getUserDetails();
    this.travellersList = this.userProfileService.getFamilyDetails();
    this.devideIntoCatogories();
    this.createFormFields();
    this.userProfileService.selectedTravellersData.subscribe((result) => {
      console.log(
        'resultttttttttttttttttttttttttttttttttttttttttttttttt',
        result
      );
      if (result) {
        this.assignPreviouslySelectedTravellers(result);
      }
    });
    this.previewDetails();
  }
  get f() {
    return this.dynamicForm.controls;
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

  get adultsInput(): FormArray {
    return this.dynamicForm.get('adultsInput') as FormArray;
  }
  get childrenInput(): FormArray {
    return this.dynamicForm.get('childrenInput') as FormArray;
  }
  get infantsInput(): FormArray {
    return this.dynamicForm.get('infantsInput') as FormArray;
  }
  getValidity(i, age) {
    if (age == 'adult') {
      return (<FormArray>this.dynamicForm.get('adultsInput')).controls[i]
        .invalid;
    }
    if (age == 'child') {
      return (<FormArray>this.dynamicForm.get('childrenInput')).controls[i]
        .invalid;
    }
    if (age == 'infant') {
      return (<FormArray>this.dynamicForm.get('infantsInput')).controls[i]
        .invalid;
    }
  }
  createFormFields() {
    this.adultSelectedIndexes = [];
    this.childSelectedIndexes = [];
    this.infantSelectedIndexes = [];
    const adultControl = <FormArray>this.dynamicForm.controls.adultsInput;
    adultControl.controls = [];
    const childControl = <FormArray>this.dynamicForm.controls.childrenInput;
    childControl.controls = [];
    const infantControl = <FormArray>this.dynamicForm.controls.infantsInput;
    infantControl.controls = [];
    for (let i = 0; i < this.homeSelectedCount.adultCount; i++) {
      this.adultsInput.push(new FormControl('', Validators.required));
      this.adultSelectedIndexes.push(undefined);
    }
    for (let i = 0; i < this.homeSelectedCount.childCount; i++) {
      this.childrenInput.push(new FormControl('', Validators.required));
      this.childSelectedIndexes.push(undefined);
    }
    for (let i = 0; i < this.homeSelectedCount.infantCount; i++) {
      this.infantsInput.push(new FormControl('', Validators.required));
      this.infantSelectedIndexes.push(undefined);
    }
  }

  devideIntoCatogories() {
    this.adults = [];
    this.children = [];
    this.infants = [];
    // logged in user category
    let loggedInUserAge = this.age(this.userDetails.dateOfBirth);
    if (loggedInUserAge >= 12) {
      this.adults.push(this.userDetails);
      this.adultDisplay.push(true);
    } else if (loggedInUserAge >= 2 && loggedInUserAge < 12) {
      this.children.push(this.userDetails);
      this.childDisplay.push(true);
    } else {
      this.infants.push(this.userDetails);
      this.infantDisplay.push(true);
    }
    //family category
    for (let i = 0; i < this.travellersList.length; i++) {
      let age = this.age(this.travellersList[i].dateOfBirth);
      if (age >= 12) {
        this.adults.push(this.travellersList[i]);
        this.adultDisplay.push(true);
      }
      if (age >= 2 && age < 12) {
        this.children.push(this.travellersList[i]);
        this.childDisplay.push(true);
      }
      if (age < 2) {
        this.infants.push(this.travellersList[i]);
        this.infantDisplay.push(true);
      }
    }
  }
  age(dob) {
    const age = moment().diff(dob, 'years');
    return age;
  }
  async getPackages() {
    try {
      this.packages = await this.staycationService.stacationList();
      console.log('staycations', this.packages);

      this.packages.map((data) => {
        if (data.packageReference === this.packageReference) {
          this.staycationPreviewData = data;
          this.getPriceDetails();
          console.log(this.staycationPreviewData, 'staycationPreviewData');
        }
      });
    } catch (error) {
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
      console.log(error);
    }
  }
  assignPreviouslySelectedTravellers(selectedTravellers) {
    this.adultSelectedIndexes =
      selectedTravellers.selectedIndexes.adultSelectedIndexes;
    this.childSelectedIndexes =
      selectedTravellers.selectedIndexes.childSelectedIndexes;
    this.infantSelectedIndexes =
      selectedTravellers.selectedIndexes.infantSelectedIndexes;
    this.addRemoveFromDropDown('adult');
    this.addRemoveFromDropDown('child');
    this.addRemoveFromDropDown('infant');
    this.adultSelectedIndexes.map((selectedIndex, index) => {
      this.adultsInput.at(index).setValue(this.adults[selectedIndex].firstName);
    });
    this.childSelectedIndexes.map((selectedIndex, index) => {
      this.childrenInput
        .at(index)
        .setValue(this.children[selectedIndex].firstName);
    });
    this.infantSelectedIndexes.map((selectedIndex, index) => {
      this.infantsInput
        .at(index)
        .setValue(this.infants[selectedIndex].firstName);
    });
  }
  adultSelect(value, formIndex, adultIndex) {
    $('#adultCollapse-' + formIndex).collapse('hide');
    console.log(value, formIndex, adultIndex);
    this.adultsInput.at(formIndex).setValue(value.firstName);
    if (this.adultSelectedIndexes.includes(adultIndex)) {
      console.log('already present');
    } else {
      this.adultSelectedIndexes[formIndex] = adultIndex;
      this.addRemoveFromDropDown('adult');
    }
    console.log(
      'adultSelect',
      this.homeSelectedCount.adultCount,
      this.adultSelectedIndexes
    );
    if (
      this.adultSelectedIndexes?.length == this.homeSelectedCount.adultCount
    ) {
      this.noTravellers = false;
    }
  }
  childSelect(value, formIndex, childIndex) {
    $('#childrenCollapse-' + formIndex).collapse('hide');
    console.log(value, formIndex, childIndex);
    this.childrenInput.at(formIndex).setValue(value.firstName);
    if (this.childSelectedIndexes.includes(childIndex)) {
      console.log('already present');
    } else {
      this.childSelectedIndexes[formIndex] = childIndex;
      this.addRemoveFromDropDown('child');
    }
    console.log('childSelect', this.childSelectedIndexes);
    if (
      this.childSelectedIndexes?.length == this.homeSelectedCount.childCount
    ) {
      this.noTravellers = false;
    }
  }
  infantSelect(value, formIndex, infantIndex) {
    $('#infantCollapse-' + formIndex).collapse('hide');
    console.log(value, formIndex, infantIndex);
    this.infantsInput.at(formIndex).setValue(value.firstName);
    if (this.infantSelectedIndexes.includes(infantIndex)) {
      console.log('already present');
    } else {
      this.infantSelectedIndexes[formIndex] = infantIndex;
      this.addRemoveFromDropDown('infant');
    }
    console.log('infantSelect', this.infantSelectedIndexes);
    if (
      this.infantSelectedIndexes?.length == this.homeSelectedCount.infantCount
    ) {
      this.noTravellers = false;
    }
  }
  addRemoveFromDropDown(ageGroup) {
    if (ageGroup == 'adult') {
      this.adultDisplay = [];
      this.adults.map((r) => {
        this.adultDisplay.push(true);
      });
      for (let i = 0; i < this.adultSelectedIndexes.length; i++) {
        if (this.adultSelectedIndexes[i] != undefined) {
          this.adultDisplay[this.adultSelectedIndexes[i]] = false;
        }
      }
    } else if (ageGroup == 'child') {
      this.childDisplay = [];
      this.children.map((r) => {
        this.childDisplay.push(true);
      });
      for (let i = 0; i < this.childSelectedIndexes.length; i++) {
        if (this.childSelectedIndexes[i] != undefined) {
          this.childDisplay[this.childSelectedIndexes[i]] = false;
        }
      }
    } else {
      this.infantDisplay = [];
      this.infants.map((r) => {
        this.infantDisplay.push(true);
      });
      for (let i = 0; i < this.infantSelectedIndexes.length; i++) {
        if (this.infantSelectedIndexes[i] != undefined) {
          this.infantDisplay[this.infantSelectedIndexes[i]] = false;
        }
      }
    }
  }
  async openModel(ageGroup) {
    console.log('user details', this.userDetails);
    if (
      this.userDetails.email.length == 0 &&
      this.userDetails.mobileNo.length == 0
    ) {
      this.presentPopover('common', 'own');
    } else {
      this.presentPopover(ageGroup, 'family');
    }
  }
  async presentPopover(selectedAgeGroup, profileType) {
    const popover = await this.popoverController.create({
      component: AddTravellersSlideMenuComponent,
      cssClass: 'addTravellerPopover',
      componentProps: {
        ageGroup: selectedAgeGroup,
        profileType: profileType,
      },
      backdropDismiss: false,
      translucent: true,
      showBackdrop: false,
    });
    return await popover.present();
  }
  saveSelectedData() {
    let travellersData = {
      selectedIndexes: {
        adultSelectedIndexes: this.adultSelectedIndexes,
        childSelectedIndexes: this.childSelectedIndexes,
        infantSelectedIndexes: this.infantSelectedIndexes,
      },
    };
    this.userProfileService.travellerSelectionData.next(travellersData);
  }

  async paymentProceed() {
    this.submitted = true;
    if (this.dynamicForm.invalid) {
      this.noTravellers = true;
      return;
    }
    try {
      if (this.userLoggedIn === true) {
        if (this.adultSelectedIndexes.length > 0) {
          this.modalDisplay = true;
          this.validationModal = true;
          this.selectRoomModal = false;
          console.log('travellers selected');
          await this.staycationService
            .validateStaycationBooking(
              this.staycationPreviewData.id,
              this.staycationPreviewData?.packageValues.hotel.rooms[0].roomtype,
              this.stayCationTravellersDate.startDate
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
  

  onSubmit() {
    this.submitted = true;
    
    if (this.dynamicForm.invalid) {
      if(this.customBook === false)
      {
        this.router.navigate(['/staycation/', this.packageReference]);
      }
      if(this.customBook === true){
        this.router.navigate(['/preview']);
      }
      console.log('invaid'); 
      // else{
      //   this.router.navigate(['/preview']);
      // }
      return;
    }
    this.saveSelectedData();
    let travellers: TravellersDetails = {
      adults: [],
      children: [],
      infants: [],
    };
    this.adultSelectedIndexes.sort();
    this.childSelectedIndexes.sort();
    this.infantSelectedIndexes.sort();
    for (let i = 0; i < this.adultSelectedIndexes.length; i++) {
      travellers.adults.push(this.adults[this.adultSelectedIndexes[i]]);
    }
    for (let i = 0; i < this.childSelectedIndexes.length; i++) {
      travellers.children.push(this.children[this.childSelectedIndexes[i]]);
    }
    for (let i = 0; i < this.infantSelectedIndexes.length; i++) {
      travellers.infants.push(this.infants[this.infantSelectedIndexes[i]]);
    }
    if (this.navFrom != 'fromstaycations') {
      this.itineraryService.setTravellers(travellers);
      this.router.navigate(['/preview']);
    } else {
      this.staycationService.staycationTravellers.next(travellers);
      this.router.navigate(['/staycation/', this.packageReference]);
    }
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
        this.stayCationTravellersDate.startDate,
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
              this.stayCationTravellersDate.startDate?.value?.toString() +
              ' to ' +
              this.stayCationTravellersDate.endDate?.value?.toString(),
            partner: '',
            ticketsize: (
              this.stayCationTravellersDetails?.adults?.length +
              this.stayCationTravellersDetails?.children?.length +
              this.stayCationTravellersDetails?.infants?.length
            ).toString(),
            traveldate: this.stayCationTravellersDate?.startDate?.value?.toString(),
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
        setTimeout(() => {
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
        }, 3000);
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
  firstDate:any;
  endDate:any;
  totalDate:any;
  TotalPersons:any;
  toggle() {
    this.show = !this.show;

    // CHANGE THE NAME OF THE BUTTON.
    if (this.show) this.buttonName = 'chevron-up-outline';
    else this.buttonName = 'chevron-down-outline';
  }
  previewDetails()
  {
    function sum(a) {
      return (a?.length && parseFloat(a[0]) + sum(a.slice(1))) || 0;
    }
    this.previewItenaryDetails = this.PreviewItenary.dayPlanner;
    console.log(this.returnFlight, 'll');
    if(this.previewItenaryDetails?.length>0)
    {    
      this.selectedTravellers = this.PreviewItenary.selectedTravellers;
      console.log(this.selectedTravellers, 'selected travellers');
  
      for(let i =0;i<this.previewItenaryDetails?.length;i++)
      {
        this.firstDate = moment(this.previewItenaryDetails[i]?.date?.start);
      }
      this.endDate = moment(
        this.previewItenaryDetails[this.previewItenaryDetails?.length - 1]?.date
          ?.end
      );
      var EndDate = new Date(this.endDate);
      var startDate = new Date(this.firstDate);
      this.totalDate =
        (Date.UTC(EndDate.getFullYear(), EndDate.getMonth(), EndDate.getDate()) -
          Date.UTC(
            startDate.getFullYear(),
            startDate.getMonth(),
            startDate.getDate()
          )) /
        86400000;
      console.log(this.totalDate, this.endDate, 'totalDuration');
      //Total Travelers
      this.TotalPersons =
        this.PreviewItenary.travellers.adultCount +
        this.PreviewItenary.travellers.childCount +
        this.PreviewItenary.travellers.infantCount;
      console.log(this.TotalPersons, 'TotalPersons');

    for (let i = 0; i < this.returnFlight?.length; i++) {
      this.returnFlightFare = this.returnFlight[i].flightDetails.fareDetails;
      this.returnFlightFareSourceCode = this.returnFlight[
        i
      ]?.flightDetails?.fareSourceCode;
      this.uuidReturn = this.returnFlight[i]?.flightDetails?.uuid;
      this.totalReturnFlightfare = this.returnFlight[
        i
      ]?.flightDetails?.fareDetails?.totalFare?.amount;
    }
    console.log(this.returnFlightFare, 'returnFlightFare');

    let flightCount = this.previewItenaryDetails?.map(
      (h) => h.flightDetails?.sequenceNumber
    );

    var filteredFlights = flightCount?.filter(function (x) {
      return x !== undefined || null;
    });
    this.flightCountLength = filteredFlights;

    let flightamout = this.previewItenaryDetails?.map(
      (h) => h.flightDetails?.fareDetails?.totalFare?.amount
    );

    flightamout?.push(this.returnFlightFare?.totalFare?.amount);

    let flightfareamoutarr = flightamout?.filter(function (x) {
      return x !== undefined || null;
    });
    console.log(flightfareamoutarr, 'flightfareamoutarr');
    if (flightfareamoutarr?.length === 1) {
      this.flightfareamout = flightfareamoutarr[0];
    } else {
      this.flightfareamout = sum(flightfareamoutarr).toFixed(1);
    }

    //total amount
    this.amounttypeflight = this.previewItenaryDetails?.map(
      (h) => h.flightDetails?.fareDetails?.totalTax?.currencyCode
    );
    this.amounttypeflight?.push(this.returnFlightFare?.totalFare?.currencyCode);
    let flighttaxamounttype = this.amounttypeflight?.filter(function (x) {
      return x !== undefined || null;
    });

    this.flightamounttype = flighttaxamounttype[0];

    //total tax
    let flighttaxamout0 = this.previewItenaryDetails?.map(
      (h) => h.flightDetails?.fareDetails?.totalTax?.amount
    );
    flighttaxamout0?.push(this.returnFlightFare?.totalTax?.amount);
    let flighttaxamountarr = flighttaxamout0.filter(function (x) {
      return x !== undefined || null;
    });

    if (flighttaxamountarr.length === 1) {
      this.flighttaxamount = flighttaxamountarr[0];
    } else {
      this.flighttaxamount = sum(flighttaxamountarr).toFixed(1);
    }
    //equal tax
    let EquivFare = this.previewItenaryDetails?.map(
      (h) => h.flightDetails?.fareDetails?.equivFare?.amount
    );
    EquivFare.push(this.returnFlightFare?.equivFare?.amount);
    let EquivFareTaxarr = EquivFare.filter(function (x) {
      return x !== undefined || null;
    });

    if (EquivFareTaxarr.length === 1) {
      this.EquivFareTax = EquivFareTaxarr[0];
    } else {
      this.EquivFareTax = sum(EquivFareTaxarr).toFixed(1);
    }
    //return flights
    ///////////Fare source code check////////////////
    var flightsFare = [];
    var flightprice = [];
    let returnfareSourceCode;
    let totalReturnflightPrice;
    if (this.returnFlight?.length > 0) {
      returnfareSourceCode = {
        fareSourceCode: this.returnFlightFareSourceCode,
        uuid: this.uuidReturn,
      };
      totalReturnflightPrice = {
        totalFare: this.totalReturnFlightfare,
      };
      flightprice?.push(totalReturnflightPrice);
      flightsFare?.push(returnfareSourceCode);
    }
    for (let i = 0; i < this.PreviewItenary.dayPlanner.length; i++) {
      let fareSourceCode = {
        fareSourceCode: this.PreviewItenary.dayPlanner[i]?.flightDetails
          ?.fareSourceCode,
        uuid: this.PreviewItenary.dayPlanner[i]?.flightDetails?.uuid,
      };
      let priceDetails = {
        totalFare: this.PreviewItenary.dayPlanner[i]?.flightDetails?.fareDetails
          ?.totalFare?.amount,
      };
      let flightPriceFare = Object.entries(priceDetails).reduce(
        (a, [k, v]) => (v == null ? a : ((a[k] = v), a)),
        {}
      );
      let flightFliterdFare = Object.entries(fareSourceCode).reduce(
        (a, [k, v]) => (v == null ? a : ((a[k] = v), a)),
        {}
      );
      flightprice?.push(flightPriceFare);
      flightsFare?.push(flightFliterdFare);
      flightprice = flightprice?.filter(
        (value) => JSON.stringify(value) !== '{}'
      );
      flightsFare = flightsFare?.filter(
        (value) => JSON.stringify(value) !== '{}'
      );
    }
    console.log(flightsFare, flightprice, 'flightsFare');
    let hotelFare = [];
    for (let i = 0; i < this.PreviewItenary.dayPlanner.length; i++) {
      let hotelcode = {
        sessionId: this.PreviewItenary.dayPlanner[i]?.hotelDetails?.sessionId,
        productId: this.PreviewItenary.dayPlanner[i]?.hotelDetails?.productId,
        tokenId: this.PreviewItenary.dayPlanner[i]?.hotelDetails?.tokenId,
        rateBasisId: this.PreviewItenary.dayPlanner[i]?.hotelDetails
          ?.rateBasisId,
        hotelId: this.PreviewItenary.dayPlanner[i]?.hotelDetails?.hotelContent
          ?.hotelId,
        uuid: this.PreviewItenary.dayPlanner[i]?.hotelDetails?.uuid,
      };
      hotelFare.push(hotelcode);
      hotelFare = hotelFare.filter((value) => JSON.stringify(value) !== '{}');
    }
    console.log(hotelFare, 'hotelFare');
    this.totalData = {
      flights: flightsFare,
      hotels: hotelFare,
    };

    let taxType = this.previewItenaryDetails?.map(
      (h) => h.flightDetails?.fareDetails
    );
    this.taxTypeFilter = taxType?.filter(function (x) {
      return x !== undefined || null;
    });
    if (this.taxTypeFilter[0]) {
      this.taxTypeNames = Object.keys(this.taxTypeFilter[0]);
    }
    console.log(this.taxTypeNames, 'taxTypeNames');
  
    let Tax = this.taxTypeNames?.includes('totalTax');
    let Fare = this.taxTypeNames?.includes('equivFare');
    if (Tax === true || this.returnFlightFare?.totalTax) {
      this.totalTax = 'Tax';
    }
    if (Fare === true || this.returnFlightFare?.equivFare) {
      this.equivFare = 'Fare';
    }


    //Hotels
    let hotelCount = this.previewItenaryDetails.map(
      (h) => h.hotelDetails?.hotelContent?.hotelId
    );

    var filteredhotel = hotelCount.filter(function (x) {
      return x !== undefined || null;
    });

    this.hotelAmount = this.previewItenaryDetails.map((h) =>
      h.hotelDetails?.rooms?.map((r) => r)
    );

    var hotelamountfiltered = this.hotelAmount.filter(function (x) {
      return x !== undefined || null;
    });

    this.hotelamountfill = hotelamountfiltered;

    this.roomprice = this.previewItenaryDetails.map(
      (r) => r.hotelDetails?.selectedRoomPrice
    );
    this.hotelamountType = this.hotelamountfill.map((r) => r[0].currency);
    var hotelamountintype = this.hotelamountType.filter(function (x) {
      return x !== undefined || null;
    });

    this.roomindprice = this.roomprice.filter(function (x) {
      return x !== undefined || null;
    });

    this.hotelmoneytype = hotelamountintype[0];
    this.hotelCountLength = filteredhotel;

    if (this.hotelamountfill.length === 1) {
      this.totalhotelprice = this.roomindprice[0];
    } else {
      this.totalhotelprice = sum(this.roomindprice).toFixed(1);
    }
        ////GrandTotal
        this.GrandTotalAmount = [
          this.flightfareamout,
          this.totalhotelprice,
        ];
        var grandtotalfilter = this.GrandTotalAmount.filter(function (x) {
          return x !== undefined || null;
        });
    
        if (grandtotalfilter.length === 1) {
          this.GrandTotal = grandtotalfilter[0];
        } else {
          this.GrandTotal = sum(grandtotalfilter).toFixed(1);
        }
        this.userDetails = this.userProfileService.getUserDetails();
        console.log(this.userDetails, 'userDetails');
        this.travelCity = this.PreviewItenary.dayPlanner[0].cityName;
        this.travelStartDate = this.PreviewItenary.dayPlanner[0].date.start;
  }

    
  }

  getCommonFlights(array1, array2) {
    var common = []; // Initialize array to contain common items

    for (var i = 0; i < array1.length; i++) {
      for (var j = 0; j < array2.length; j++) {
        if (array1[i].uuid == array2[j].uuid) {
          // If item is present in both arrays
          common.push(array1[i]); // Push to common array
        }
      }
    }

    return common; // Return the common items
  }



  async revalidatingApi() {
    this.submitted = true;
    if (this.dynamicForm.invalid) {
      this.noTravellers = true;
      return;
    }
    const authToken = await this.accountService.getAccessToken();

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: authToken,
      }),
    };

    console.log(this.httpOptions, ' this.httpOptions');
    this.isLoadingcustom = true;

    this.http
      .post<any>(
        this.APIservice.apiUrl.revalidate,
        this.totalData,
        this.httpOptions
      )
      .subscribe({
        next: async (data) => {
          this.isLoadingcustom = false;
          this.sourceCode = data;
          console.log(this.sourceCode, 'sourceCode');
          let flightValidArray = this.sourceCode?.flights?.map(
            (x) => x.isValid
          );
          let hotelValidArray = this.sourceCode?.hotels?.map((x) => x.isValid);
          this.invalidFlights = this.sourceCode?.flights?.filter(
            (x) => x.isValid == 'false'
          );

          console.log(this.invalidFlights, 'invalidFlights');

          console.log(flightValidArray, 'this.flightValid');
          this.flightValid = flightValidArray.every(
            (currentval) => currentval.length === 4
          );
          this.hotelValid = hotelValidArray.every(
            (currentval) => currentval.length === 4
          );
          console.log(this.flightValid, this.hotelValid, 'this.flightValid2');

          let flights = this.previewItenaryDetails.map((x) => x.flightDetails);

          let returnFlights = this.PreviewItenary.returnPlan.map(
            (x) => x.flightDetails
          );
          this.totalFlights = flights.concat(returnFlights);
          this.totalFlights = this.totalFlights.filter(
            (value) => JSON.stringify(value) !== '{}'
          );

          ///Flights_Validate/////
          // if (this.flightValid === false && this.hotelValid === false) {
          //   this.bothItems = true;
          // }
          if (this.flightValid === false) {
            this.flights_valid = false;
            let invalidFlightList = [];
            for (var i = 0; i < this.sourceCode?.flights.length; i++) {
              if (this.sourceCode?.flights[i].isValid === 'false') {
                invalidFlightList.push(this.sourceCode?.flights[i]);
              }
            }

            this.newInvalidFlightarray = this.getCommonFlights(
              this.totalFlights,
              invalidFlightList
            );
            console.log(this.totalFlights, 'flights');
          } else if (this.flightValid === true) {
            for (let i = 0; i < this.totalFlights.length; i++) {
              for (let j = 0; j < this.sourceCode.flights.length; j++) {
                if (this.sourceCode.flights.length >= 1) {
                  if (
                    this.totalFlights[i].fareDetails.totalFare.amount !==
                    this.sourceCode.flights[j].fareDetails.totalFare.amount
                  ) {
                    this.flights_valid = false;
                    this.flightpricechange = false;
                  } else {
                    this.flightpricechange = true;
                    this.flights_valid = true;
                  }
                }
              }
            }
          }
          if (
            this.flightpricechange === false &&
            this.hotelpricechange === false
          ) {
            this.bothItems_price = true;
          }
          ///Hotels_Validate/////
          let hotelsTotal = this.previewItenaryDetails.map(
            (x) => x.hotelDetails
          );
          let hotelsTotalFilter = hotelsTotal.filter(
            (value) => JSON.stringify(value) !== '{}'
          );

          let responceHotelRoom;
          for (let i = 0; i < this.sourceCode.hotels.length; i++) {
            responceHotelRoom = this.sourceCode.hotels[i].rooms;
          }
          if (this.hotelValid === false) {
            this.hotel_valid = false;
            let invalidhotelList = [];
            for (var i = 0; i < this.sourceCode?.hotels.length; i++) {
              if (this.sourceCode?.hotels[i].isValid === 'false') {
                invalidhotelList.push(this.sourceCode?.hotels[i]);
              }
            }
            this.newInvalidHotelsarray = this.getCommonFlights(
              hotelsTotalFilter,
              invalidhotelList
            );
            console.log(
              invalidhotelList,
              this.newInvalidHotelsarray,
              'newInvalidHotelsarray'
            );
          } else if (this.hotelValid === true) {
            for (let i = 0; i < hotelsTotalFilter.length; i++) {
              for (let j = 0; j < responceHotelRoom?.length; j++) {
                if (this.sourceCode.hotels.length >= 1) {
                  if (
                    hotelsTotalFilter[i].selectedRoomPrice !==
                    responceHotelRoom[j].netPrice
                  ) {
                    this.hotel_valid = false;
                    this.hotelpricechange = false;
                  } else {
                    this.hotelpricechange = true;
                    this.hotel_valid = true;
                  }
                }
              }
            }
          }
          if (
            this.sourceCode?.flights.length === 0 &&
            this.sourceCode?.hotels.length === 0
          ) {
            this.flights_valid = false;
            this.hotel_valid = false;
            this.noItemSelect = true;
          }
          if (this.flights_valid === true && this.hotel_valid === true) {
            console.log(this.hotel_valid, this.flights_valid);
            const id = uuidv1();
            let currentTransction: CustomBooking = {
              id: id,
              username: '', //updated at aws-transaction-sync.service
              itineraryName: '',
              bookingType: 'Booking',
              bookingStatus: 'paymentPending',
              travelStartDate: this.travelStartDate,
              bookingDetails: this.previewItenaryDetails,
              email: this.userDetails.email,
              mobileNo: this.userDetails.mobileNo,
              travelCity: this.travelCity,
            };
            let custdobdate: Date = this.userDetails?.dateOfBirth;

            var timeDiff = Math.abs(Date.now() - custdobdate.getTime());
            Analytics.record({
              name: 'Booking',
              attributes: {
                package: '',
                duration:
                  this.PreviewItenary.dayPlanner[0].date.start.toString() +
                  ' to ' +
                  this.PreviewItenary.dayPlanner[0].date?.end.toString(),
                partner: '',
                ticketsize: (
                  this.selectedTravellers?.adults?.length +
                  this.selectedTravellers?.children?.length +
                  this.selectedTravellers?.infants?.length
                ).toString(),
                traveldate: this.travelStartDate?.toString(),
                location: this.travelCity,
                age: Math.floor(timeDiff / (1000 * 3600 * 24) / 365).toString(),
                birthday: this.userDetails?.dateOfBirth?.toString(),
                device:
                  this.onAndroidPLatform || this.onIOSPlatform
                    ? 'mobile or tab'
                    : 'web',
              },
            });
            this.awsTranscationSyncService
              .saveTranscationData(currentTransction)
              .then((data) => {
                if (
                  this.onIOSPlatform == true ||
                  this.onAndroidPLatform == true
                ) {
                  this.pay.redirectToPayment(
                    currentTransction.id,
                    this.GrandTotal,
                    'INR',
                    'EN',
                    'custom-travel',
                    'mobile'
                  );
                  console.log(
                    'PaymentResponseComponent: saveTransactionData ',
                    data
                  );
                } else {
                  this.pay.redirectToPayment(
                    currentTransction.id,
                    this.GrandTotal,
                    'INR',
                    'EN',
                    'custom-travel',
                    'browser',
                    window.location.origin
                  );
                }
              })
              .catch((err) => {
                console.log('Exception in saving Trasaction: ', err);
              });
          }
        },
        error: (error) => {
          console.error('PreviewIntinerary: Revalidation API: Failed!', error);
          this.isLoadingcustom = false;
          this.apiError = false;
        },
      });
  }
  
  openRoomSelection() {
    this.modalDisplay = false;
    this.validationModal = false;
    this.selectRoomModal = false;
    this.errorWhileValidation = false;
    this.errorWhileBooking = false;
  }
}
