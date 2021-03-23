import { UserProfileDetails } from '@ojashub/voyaah-common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, PopoverController } from '@ionic/angular';
import { AddTravellersSlideMenuComponent } from '../add-travellers-slide-menu/add-travellers-slide-menu.component';
import { UserProfileService } from '@app/service-module/user-profile.service';
import { UserItineraryService } from '@app/service-module/user-itinerary.service';
import { Router } from '@angular/router';
import { Agent } from 'http';
import * as moment from 'moment';
import { TravellerCount, TravellersDetails } from '@ojashub/voyaah-common';
import { StaycationPackagesService } from '@app/service-module/staycation-packages.service';
import { BookingServiceService } from '@app/service-module/booking-service.service';
declare var $;
@Component({
  selector: 'app-addtravellers',
  templateUrl: './addtravellers.component.html',
  styleUrls: ['./addtravellers.component.scss'],
})
export class AddtravellersComponent implements OnInit {
  travellersList: UserProfileDetails[] = [];
  adults: UserProfileDetails[] = [];
  children: UserProfileDetails[] = [];
  infants: UserProfileDetails[] = [];
  registerForm: FormGroup;
  date = new Date().toISOString().slice(0, 10);
  selectedtraveller;
  submitted = false;
  show = false;
  userDetails: any;
  nameChange = true;
  userName: string;
  iconName: string;
  userNameShow: string;
  progressbarValue: any;
  progressBarPersentage: any;
  progressbarCompleted = false;
  userNavigate: any;
  totalgendraldetails = [];
  totallogindetails: any;
  totalpassportdetails: any;
  totaladddressdetails: any;
  staycationTransactions: any[];
  stycationTravelUpcoming: any = [];
  stycationTravelHistory: any = [];
  today: Date = new Date();
  closeError = false
  customTravelUpcoming: any[];
  customTravelHistory: any[];
  transactions: any;
  staycationTravelCancelled: any;
  cancelledCount = 0;
  disableDate() {
    return false;
  }
  minDate = moment(new Date()).format('YYYY-MM-DD');
  maxDate;
  constructor(
    public popoverController: PopoverController,
    public modalController: ModalController,
    private fb: FormBuilder,
    private bookingService: BookingServiceService,
    private userProfileService: UserProfileService,
    private staycationService: StaycationPackagesService
  ) {
    this.categorizeCustomBookings();
    this.getStaycationTransactions();
  }

  ngOnInit() {
    window.onclick = (e) => {
      if (e.target) {
        this.closeError = false;
      }
    };
    this.userProfileService.currentUserNavigate.subscribe((res) => {
      console.log(res, 'rsep');
      this.userNavigate = res;
      if (this.userNavigate === false) {
        this.progressbarValue = 0;
        this.nameChange = true;
        this.progressbarCompleted = false;
        this.travellersList = null;
        this.adults = null;
        this.children = null;
        this.infants = null;
        this.customTravelUpcoming = [];
        this.customTravelHistory = [];
        this.stycationTravelHistory = [];
        this.stycationTravelUpcoming = [];
        this.staycationTravelCancelled = [];
      }
    });

    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNo: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      passport: this.fb.group({
        number: [''],
        country: [''],
        expiry: [''],
      }),
    });

    this.userDetails = this.userProfileService.getUserDetails();
    console.log('userDetails', this.userDetails);
    this.travellersList = this.userProfileService.getFamilyDetails();
    this.UserName();
    this.devideIntoCatogories();

    this.userProfileService.currentUserProfileData.subscribe((res) => {
      this.userDetails = this.userProfileService.getUserDetails();
      this.travellersList = this.userProfileService.getFamilyDetails();
      console.log(
        res,
        'travelers list constructor add traveller component',
        this.travellersList
      );
      //this.popoverController.dismiss();
      this.UserName();
      this.devideIntoCatogories();
    });
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }
  modelChangeFn(value) {
    if (value) {
      this.show = true;
    } else if (value == '') {
      this.show = false;
    }
  }
  devideIntoCatogories() {
    this.adults = [];
    this.children = [];
    this.infants = [];
    for (let i = 0; i < this.travellersList.length; i++) {
      let age = this.age(this.travellersList[i].dateOfBirth);
      if (age >= 12) {
        this.adults.push(this.travellersList[i]);
      }
      if (age >= 2 && age < 12) {
        this.children.push(this.travellersList[i]);
      }
      if (age < 2) {
        this.infants.push(this.travellersList[i]);
      }
    }
    console.log(
      this.adults,
      'adults',
      this.children,
      'child',
      this.infants,
      'infants'
    );
  }
  age(dob) {
    const age = moment().diff(dob, 'years');
    console.log(age, 'ageeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
    return age;
  }
  async getStaycationTransactions() {
    try {
      await this.staycationService
        .getUsersStaycationBooking()
        .then((transactions) => {
          this.staycationTransactions = transactions;
          console.log(this.staycationTransactions);
        });

      for (let i = 0; i < this.staycationTransactions?.length; i++) {
        if (
          this.staycationTransactions[i].bookingStatus === 'completedSuccess'
        ) {
          if (
            new Date(this.staycationTransactions[i].travelStartDate) >
              this.today ||
            new Date(
              this.staycationTransactions[i].travelStartDate
            ).getDate() == this.today.getDate()
          ) {
            this.stycationTravelUpcoming.push(this.staycationTransactions[i]);
            console.log(
              this.stycationTravelUpcoming,
              this.stycationTravelUpcoming.length,
              this.stycationTravelHistory,
              'this.stycationTravelUpcoming'
            );
          } else {
            this.stycationTravelHistory.push(this.staycationTransactions[i]);
            console.log(
              this.stycationTravelHistory,
              this.stycationTravelHistory.length,
              'this.stycationTravelHistory'
            );
          }
        } else if (
          this.staycationTransactions[i].bookingStatus ===
            'initiatedCancelProcess' ||
          this.staycationTransactions[i].bookingStatus === 'refundInitiated' ||
          this.staycationTransactions[i].bookingStatus === 'amountRefunded'
        ) {
          this.staycationTravelCancelled.push(this.staycationTransactions[i]);
        }
      }
      if(this.staycationTravelCancelled?.length>0)
      {
        this.cancelledCount = this.staycationTravelCancelled.length;
      }
      else{
        this.cancelledCount = 0
      }
      
    } catch (err) {
      console.log('staycation transaction error in booking component.ts', err);
    }
  }
  async categorizeCustomBookings() {
    this.customTravelUpcoming = [];
    this.customTravelHistory = [];
    try{
      await this.bookingService.getBookingHistory().then((transactions) => {
        this.transactions = transactions;
      });
      for (let i = 0; i < this.transactions?.length; i++) {
        console.log(this.transactions[i])
        if (new Date(this.transactions[i].endDate) > this.today || new Date(this.transactions[i].endDate).getDate() == this.today.getDate()) {
          this.customTravelUpcoming.push(this.transactions[i]);
        } else {
          this.customTravelHistory.push(this.transactions[i]);
        }
      }
      console.log('customTravelHistory', this.customTravelHistory?.length);
      console.log('upcoming', this.customTravelUpcoming);
    }
    catch(err)
    {
      console.log(err)
    }
  }
  UserName() {
    console.log(this.totalgendraldetails, 'totalgendraldetails');
    this.userName = this.userDetails.firstName;
    if (this.userName.length > 0) {
      let nameOfUser = this.userName;
      nameOfUser = nameOfUser.substring(1);
      this.nameChange = false;
      this.iconName =
        this.userName[0].toUpperCase() + this.userName[1].toLowerCase();
      this.userNameShow = this.userName;
    }

    try {
      let userarray = [];
      let issueOn;
      let useresponcepassportexpairDate;
      console.log(this.userDetails);
      this.progressbarValue = 0;

      const useresponceDate = this.userDetails.dateOfBirth.toString();
      let getPassportDetails = this.userDetails.idDetails?.filter(
        (e) => e.idType == 'passport'
      );
      if (getPassportDetails[0]?.expiryDate) {
        useresponcepassportexpairDate = getPassportDetails[0].expiryDate.toString();
      }
      if (getPassportDetails[0]?.issuedOn) {
        issueOn = getPassportDetails[0].issuedOn.toString();
      }
      if (this.userDetails.firstName?.length > 0) {
        userarray.push(this.userDetails.firstName);
      }
      if (useresponceDate?.length > 0) {
        userarray.push(useresponceDate);
      }
      if (this.userDetails.gender?.length > 0) {
        userarray.push(this.userDetails.gender);
      }
      if (this.userDetails.maritalStatus?.length > 0) {
        userarray.push(this.userDetails.maritalStatus);
      }
      if (
        this.userDetails.mobileNo?.length > 0
      ) {
        userarray.push(this.userDetails.mobileNo);
      }
      if (this.userDetails.isMobileVerified == true) {
        userarray.push("mobileVerified");
      }
      if (this.userDetails.email?.length > 0) {
        userarray.push(this.userDetails.email);
      }
      if (this.userDetails.isEmailVerified == true) {
        userarray.push("emailVerified");
      }
      if (this.userDetails.address?.length > 0) {
        userarray.push(this.userDetails.address);
      }
      if (this.userDetails.cityName?.length > 0) {
        userarray.push(this.userDetails.cityName);
      }
      if (this.userDetails.countryName?.length > 0) {
        userarray.push(this.userDetails.countryName);
      }
      if (this.userDetails.zipCode?.length > 0) {
        userarray.push(this.userDetails.zipCode);
      }
      if (this.userDetails.idDetails[0].idNumber?.length > 0) {
        userarray.push(this.userDetails.idDetails[0].idNumber);
      }
      if (this.userDetails.idDetails[0].countryName?.length > 0) {
        userarray.push(this.userDetails.idDetails[0].countryName);
      }
      if (useresponcepassportexpairDate?.length > 0) {
        userarray.push(useresponcepassportexpairDate);
      }
      if (issueOn?.length > 0) {
        userarray.push(issueOn);
      }

      console.log(userarray);
      if(userarray?.length >= 12 && this.userDetails.idDetails[1].idNumber>0)
      {
        userarray.length = 17
      }
      switch (userarray?.length) {
        case 1:
          this.progressbarValue = 5;
          break;
        case 2:
          this.progressbarValue = 10;
          break;
        case 2:
          this.progressbarValue = 20;
          break;
        case 4:
          this.progressbarValue = 30;
          break;
        case 5:
          this.progressbarValue = 40;
          break;
        case 6:
          this.progressbarValue = 50;
          break;
        case 7:
          this.progressbarValue = 55;
          break;
        case 8:
          this.progressbarValue = 60;
          break;
        case 9:
          this.progressbarValue = 65;
          break;
        case 10:
          this.progressbarValue = 70;
          break;
        case 11:
          this.progressbarValue = 75;
          break;
        case 12:
          this.progressbarValue = 80;
          break;
        case 13:
          this.progressbarValue = 85;
          break;
        case 14:
          this.progressbarValue = 90;
          break;
        case 15:
          this.progressbarValue = 95;
          break;
        case 16:
          this.progressbarValue = 100;
          break;
        case 17:
          this.progressbarValue = 100;
          break;
      }
    } catch (err) {
      console.log(err);
    }
  }

  editTraveller(member, id) {

    console.log(member);
    this.registerForm.controls.firstName.setValue(member.firstName);
    this.registerForm.controls.gender.setValue(member.gender);
    this.registerForm.controls.email.setValue(member.email);
    this.registerForm.controls.mobileNo.setValue(member.mobileNo);
    this.registerForm.controls.dateOfBirth.setValue(
      member.dateOfBirth.split('T')[0]
    );
    if (member.idDetails[0]?.idNumber.length > 0) {
      this.registerForm
        .get('passport.number')
        .setValue(member.idDetails[0].idNumber);
      this.registerForm
        .get('passport.country')
        .setValue(member.idDetails[0].countryName);
      this.registerForm
        .get('passport.expiry')
        .setValue(member.idDetails[0].expiryDate.split('T')[0]);
    }

    console.log(member);
    $('#myModal').modal('show');
    for (let i = 0; i < this.travellersList.length; i++) {
      if (id == this.travellersList[i].id) {
        this.selectedtraveller = i;
        break;
      }
    }
  }
  delete(id) {
    let ind;
    for (let i = 0; i < this.travellersList.length; i++) {
      if (id == this.travellersList[i].id) {
        ind = i;
        break;
      }
    }
    this.userProfileService.deleteFamilyMember(ind);
  }
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      let traveller: UserProfileDetails = {
        firstName: this.registerForm.value.firstName,
        dateOfBirth: this.registerForm.value.dateOfBirth,
        gender: this.registerForm.value.gender,
        mobileNo: this.registerForm.value.mobileNo,
        email: this.registerForm.value.email,
        idDetails: [
          {
            idType: 'passport',
            idNumber: this.registerForm.controls['passport'].value.number,
            expiryDate: moment(
              this.registerForm.controls['passport'].value.expiry
            ).toISOString(),
            countryName: this.registerForm.controls['passport'].value.country,
            cityName: '',
          },
        ],
      };
      this.userProfileService.editFamilyDetails(
        traveller,
        this.selectedtraveller
      );
      $('#myModal').modal('hide');
    }
  }
  onReset() {
    // this.registerForm.resetForm();
    this.registerForm.reset();
  }

  async presentPopover(selectedAgeGroup, profileType, ev) {
    const popover = await this.popoverController.create({
      component: AddTravellersSlideMenuComponent,
      cssClass: 'addTravellerPopover',
      //cssClass: 'fullscreen',
      componentProps: {
        ageGroup: selectedAgeGroup,
        profileType: profileType,
      },
      event: ev,
      backdropDismiss: false,
      translucent: true,
      showBackdrop: false,
    });
    return await popover.present();
  }

  onDelete() {}
}
