import { error, element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserProfileDetails } from '@ojashub/voyaah-common';
import { UserProfileService } from '@app/service-module/user-profile.service';
import * as moment from 'moment';
import { AccountService } from '@app/account/services';
import { ModalController } from '@ionic/angular';
import { getMaxListeners } from 'process';
import { EntercodeComponent } from '../entercode/entercode.component';
import { StaycationPackagesService } from '@app/service-module/staycation-packages.service';
import { BookingServiceService } from '@app/service-module/booking-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userDetails: UserProfileDetails;
  nameChange = true;
  userNameShow: string;

  registerForm: FormGroup;
  registerFormEdit: FormGroup;
  submitted = false;
  submittedEdit = false;
  userData: any;
  userName: string;
  updateDetails = false;
  alreadyRecord = true;
  iconName: string;
  profileNull: boolean;
  dateShow = false;
  regform: any;
  selectedDevice: any;
  minDate = moment(new Date()).format('YYYY-MM-DD');
  editProfile: any;
  userPresent: any;
  maxDate;

  userVerify: boolean;
  invalidformName = false;
  invalidformdateOfBirth = false;
  invalidformmaritalStatus = false;
  invalidformmobileNo = false;
  invalidformgender = false;
  invalidformemail = false;
  invalidformNamelength = false;
  invalidformmobileNopatten = false;
  invalidformemailNopatten = false;
  userNavigate: boolean;
  emailVerified = false;
  mobileNoVerified = false;
  userAttributes;
  code;
  verifyMobileErrorMessage;
  verifyEmailErrorMessage;
  selectedOption: any;
  aadherDetails = false;
  idata = [
    { id: 0, name: 'Passport Details' },
    { id: 1, name: 'AAdher Details' },
  ];
  containsAlphabet: boolean;
  staycationTransactions: any[];
  stycationTravelUpcoming: any = [];
  stycationTravelHistory: any = [];
  staycationTravelCancelled = [];
  cancelledCount = 0;
  today: Date = new Date();
  idsDetails: any = [];
  date = new Date().toISOString().slice(0, 10);
  editidsDetails: any = [];
  loginMobile: any;

  disableDate() {
    return false;
  }
  maxAge;
  aadhaarDetails = false;

  passportObj;
  aadhaarObj;

  editpassportObj;
  editaadhaarObj;
  emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  customTravelUpcoming: any[];
  customTravelHistory: any[];
  transactions: any;

  constructor(
    private formBuilder: FormBuilder,
    private userProfileService: UserProfileService,
    private accountService: AccountService,
    public modalController: ModalController,
    private bookingService: BookingServiceService,
    private staycationService: StaycationPackagesService
  ) {
    this.getStaycationTransactions();
    this.categorizeCustomBookings();
  }

  ngOnInit() {
    this.maxAge =
      this.today.getFullYear() -
      15 +
      '-' +
      ('0' + (this.today.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + this.today.getDate()).slice(-2);
    console.log('minAge', this.maxAge);

    let userDetail = JSON.parse(localStorage.getItem('user'));
    this.userPresent = userDetail;
    if (this.userPresent.username.includes('@')) {
      this.userVerify = true;
    } else {
      this.userVerify = false;
    }
    this.userProfileService.currentUserNavigate.subscribe((res) => {
      console.log(res, 'rsep');
      this.userNavigate = res;
      if (this.userNavigate === false) {
        this.updateDetails = false;
        this.nameChange = true;
        this.userPresent = null;
        this.customTravelUpcoming = [];
        this.customTravelHistory = [];
        this.stycationTravelHistory = [];
        this.stycationTravelUpcoming = [];
        this.staycationTravelCancelled = [];
      }
    });
    this.staycationService.staycationBookingChanges.subscribe((res) => {
      if (res) {
        console.log('bookings changed', res);
        this.getStaycationTransactions();
      }
    });

    console.log(this.userPresent, 'this.userPresent');
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      countryCode: ['+91', Validators.required],
      mobileNo: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      cityName: [''],
      idType: [''],
      countryName: [''],
      address: [''],
      addressCountry: [''],
      zipCode: [''],
      passportexpiry: [''],
      passportissuedOn: [''],
      passportcountry: [''],
      passportnumber: [''],
      aadhaarissuedOn: [''],
      aadhaarcity: [''],
      aadhaarnumber: [''],
      // passport: this.formBuilder.group({
      // [
      //   '',
      //   [Validators.required, Validators.pattern('[a-zA-Z]{2}[0-9]{7}')],
      // ],
      //   number: [''],
      //   country: [''],
      //   expiry: [''],
      // }),
      // password: ['', [Validators.required, Validators.minLength(6)]],
    });
    if (this.userVerify === true) {
      this.registerForm.controls.email.setValue(this.userPresent.username);
    } else {
      this.registerForm.controls.mobileNo.setValue(
        this.userPresent.username.slice(-10)
      );
      if (this.userPresent.username.includes('+91')) {
        this.registerForm.controls.countryCode.setValue('+91');
      }
      if (this.userPresent.username.includes('+1')) {
        this.registerForm.controls.countryCode.setValue('+1');
      }
    }
    this.registerFormEdit = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      countryCode: ['+91', Validators.required],
      mobileNo: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      idType: [''],
      countryName: [''],
      address: [''],
      addressCountry: [''],
      zipCode: [''],
      cityName: [''],
      passportexpiry: [''],
      passportissuedOn: [''],
      passportcountry: [''],
      passportnumber: [''],
      aadhaarissuedOn: [''],
      aadhaarcity: [''],
      aadhaarnumber: [''],

      // passport: this.formBuilder.group({
      //   number: ['', Validators.required],
      //   country: ['', Validators.required],
      //   expiry: ['', Validators.required],
      // }),
      // password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.userDetails = this.userProfileService.getUserDetails();
    this.UserName();
    this.updateDetailsValue();

    console.log('UserDetails', this.userDetails.firstName, this.userDetails);
    this.userProfileService.currentUserProfileData.subscribe((res) => {
      this.userDetails = this.userProfileService.getUserDetails();
      this.UserName();
      this.updateDetailsValue();
      // this.accountService.isLoggedIn();
    });
    this.verificationStatus();
  }
  trackType(event) {
    let value: string = event.target.value;
    this.containsAlphabet = /[a-zA-Z]/.test(value) || /@/.test(value);
  }
  selectChangeHandler(event: any) {
    this.selectedOption = event.target.value;
    console.log(this.selectedOption);
    if (this.selectedOption === 'aadhaar') {
      this.aadhaarDetails = true;
    } else {
      this.aadhaarDetails = false;
    }
  }
  async presentModal(attributeName, value) {
    const modal = await this.modalController.create({
      component: EntercodeComponent,
      cssClass: 'entercode-modal-css',
      backdropDismiss: false,
      componentProps: {
        verifyFor: attributeName,
        sendTo: value,
      },
    });
    return await modal.present();
  }
  verificationStatus() {
    if (
      this.userDetails.isEmailVerified == true &&
      this.userDetails.email == this.registerFormEdit.controls.email.value
    ) {
      this.emailVerified = true;
    } else {
      this.emailVerified = false;
    }
    if (
      this.userDetails.isMobileVerified == true &&
      this.userDetails.mobileNo.slice(-10) ==
        this.registerFormEdit.controls.mobileNo.value
    ) {
      this.mobileNoVerified = true;
    } else {
      this.mobileNoVerified = false;
    }
  }
  async sendCodeForMobile() {
    try {
      console.log(
        this.registerFormEdit.controls.email.value,
        this.registerFormEdit.controls.mobileNo.value
      );
      let result = await this.accountService.updateUserMobile(
        this.registerFormEdit.controls.countryCode.value +
          this.registerFormEdit.controls.mobileNo.value
      );
      console.log(result);
      if (result == 'SUCCESS') {
        this.verifyMobileErrorMessage = null;
        this.presentModal(
          'phone_number',
          this.registerFormEdit.controls.countryCode.value +
            this.registerFormEdit.controls.mobileNo.value
        );
      }
    } catch (error) {
      console.log(error);
      this.verifyMobileErrorMessage = error.message;
    }
  }
  async sendCodeForEmail() {
    try {
      console.log(
        this.registerFormEdit.controls.email.value,
        this.registerFormEdit.controls.mobileNo.value
      );
      let result = await this.accountService.updateUserEmail(
        this.registerFormEdit.controls.email.value
      );
      console.log(result);
      if (result == 'SUCCESS') {
        this.verifyEmailErrorMessage = null;
        this.presentModal('email', this.registerFormEdit.controls.email.value);
      }
    } catch (error) {
      console.log(error);
      this.verifyEmailErrorMessage = error.message;
    }
  }
  UserName() {
    this.userName = this.userDetails.firstName;
    console.log(this.userName, 'oppp');
    if (this.userName.length > 0) {
      let nameOfUser = this.userName;
      nameOfUser = nameOfUser.substring(1);
      this.nameChange = false;
      this.iconName =
        this.userName[0].toUpperCase() + this.userName[1].toLowerCase();
      this.userNameShow = this.userName;
    }
  }
  async getStaycationTransactions() {
    try {
      await this.staycationService
        .getUsersStaycationBooking()
        .then((transactions) => {
          this.stycationTravelHistory = [];
          this.stycationTravelUpcoming = [];
          this.staycationTravelCancelled = [];
          this.staycationTransactions = [];
          this.staycationTransactions = transactions;
          this.categorizeStaycationBookings();
          console.log(this.staycationTransactions);
        });
    } catch (err) {
      console.log('staycation transaction error in booking component.ts', err);
    }
  }
  categorizeStaycationBookings() {
    for (let i = 0; i < this.staycationTransactions?.length; i++) {
      if (this.staycationTransactions[i].bookingStatus === 'completedSuccess') {
        if (
          new Date(this.staycationTransactions[i].travelStartDate) >
            this.today ||
          new Date(this.staycationTransactions[i].travelStartDate).getDate() ==
            this.today.getDate()
        ) {
          this.stycationTravelUpcoming.push(this.staycationTransactions[i]);
        } else {
          this.stycationTravelHistory.push(this.staycationTransactions[i]);
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
    this.cancelledCount = this.staycationTravelCancelled.length;
  }
  async categorizeCustomBookings() {
    this.customTravelUpcoming = [];
    this.customTravelHistory = [];
    try {
      await this.bookingService.getBookingHistory().then((transactions) => {
        this.transactions = transactions;
      });
      for (let i = 0; i < this.transactions?.length; i++) {
        console.log(this.transactions[i]);
        if (
          new Date(this.transactions[i].endDate) > this.today ||
          new Date(this.transactions[i].endDate).getDate() ==
            this.today.getDate()
        ) {
          this.customTravelUpcoming.push(this.transactions[i]);
        } else {
          this.customTravelHistory.push(this.transactions[i]);
        }
      }
      console.log('customTravelHistory', this.customTravelHistory?.length);
      console.log('upcoming', this.customTravelUpcoming);
    } catch (err) {
      console.log(err);
    }
  }
  get f() {
    return this.registerForm.controls;
  }
  get e() {
    return this.registerFormEdit.controls;
  }
  async onSubmit() {
    try {
      this.submitted = true;
      if (this.registerForm.invalid) {
        return;
      }
      // if(this.registerFormEdit.value.passportissuedOn == null)
      // {
      //   this.registerFormEdit.value.passportissuedOn = this.today
      // }
      // if(this.registerFormEdit.value.passportexpiry == null)
      // {
      //   this.registerFormEdit.value.passportexpiry = this.today
      // }
      this.passportObj = {
        idType: 'passport',
        idNumber: this.registerForm.value.passportnumber,
        // issuedOn: this.registerFormEdit.value.passportissuedOn,
        // expiryDate: this.registerFormEdit.value.passportexpiry,
        countryName: this.registerForm.value.passportcountry,
        cityName: '',
      };
      if (
        this.registerForm.value.passportissuedOn.length > 0 &&
        this.registerForm.value.passportissuedOn != null &&
        this.registerForm.value.passportissuedOn != undefined
      ) {
        this.passportObj.issuedOn = moment(
          this.registerForm.value.passportissuedOn
        ).toISOString();
      }
      if (
        this.registerForm.value.passportexpiry.length > 0 &&
        this.registerForm.value.passportexpiry != null &&
        this.registerForm.value.passportexpiry != undefined
      ) {
        this.passportObj.expiryDate = moment(
          this.registerForm.value.passportexpiry
        ).toISOString();
      }
      this.idsDetails?.push(this.passportObj);
      console.log(this.idsDetails);
      // if (this.registerFormEdit.value.aadhaarissuedOn == null) {
      //   this.registerFormEdit.value.aadhaarissuedOn = this.today;
      // }
      this.aadhaarObj = {
        idType: 'aadhaar',
        idNumber: this.registerForm.value.aadhaarnumber,
        // issuedOn: this.registerForm.value.aadhaarissuedOn,
        // expiryDate: '',
        // countryName: '',
        cityName: this.registerForm.value.aadhaarcity,
      };
      if (
        this.registerForm.value.aadhaarissuedOn.length > 0 &&
        this.registerForm.value.aadhaarissuedOn != null &&
        this.registerForm.value.aadhaarissuedOn != undefined
      ) {
        this.aadhaarObj.issuedOn = moment(
          this.registerForm.value.aadhaarissuedOn
        ).toISOString();
      }
      this.idsDetails?.push(this.aadhaarObj);
      console.log(this.idsDetails);
      this.sendFormDetails();
      // this.updateDetails = true;
      // this.updateDetailsValue();
    } catch (error) {
      console.log(error);
    }
  }

  async sendFormDetails() {
    let emailVerified = false;
    let mobileVerified = false;
    if (this.userPresent.username.includes('@')) {
      emailVerified = true;
    } else {
      mobileVerified = true;
    }
    this.regform = {
      firstName: this.registerForm.value.firstName,
      dateOfBirth: moment(this.registerForm.value.dateOfBirth).toISOString(),
      gender: this.registerForm.value.gender,
      maritalStatus: this.registerForm.value.maritalStatus,
      mobileNo:
        this.registerForm.value.countryCode + this.registerForm.value.mobileNo,
      isMobileVerified: mobileVerified,
      email: this.registerForm.value.email,
      isEmailVerified: emailVerified,
      idDetails: this.idsDetails,
      address: this.registerForm.value.address,
      cityName: this.registerForm.value.cityName,
      countryName: this.registerForm.value.countryName,
      zipCode: this.registerForm.value.zipCode,
    };
    console.log(this.registerForm.value, this.regform);
    try {
      let response = await this.userProfileService.updateUserProfile(
        this.regform
      );
      console.log('in profile component', response);
    } catch (error) {
      console.log(error);
    }
    // this.userProfileService.updateProfileData(true);
  }
  updateDetailsValue() {
    if (this.userDetails.firstName) {
      this.updateDetails = true;
    } else {
      return;
    }
    this.registerFormEdit.controls.firstName.setValue(
      this.userDetails.firstName
    );
    let dateOfBirth = new Date(this.userDetails.dateOfBirth);
    this.registerFormEdit.controls.dateOfBirth.setValue(
      dateOfBirth?.getFullYear() +
        '-' +
        ('0' + (dateOfBirth?.getMonth() + 1)).slice(-2) +
        '-' +
        ('0' + dateOfBirth?.getDate()).slice(-2)
    );
    this.registerFormEdit.controls.email.setValue(this.userDetails.email);
    this.registerFormEdit.controls.gender.setValue(this.userDetails.gender);
    this.registerFormEdit.controls.maritalStatus.setValue(
      this.userDetails.maritalStatus
    );
    this.registerFormEdit.controls.mobileNo.setValue(
      this.userDetails.mobileNo.slice(-10)
    );
    if (this.userPresent.username.includes('+91')) {
      this.registerFormEdit.controls.countryCode.setValue('+91');
    }
    if (this.userPresent.username.includes('+1')) {
      this.registerFormEdit.controls.countryCode.setValue('+1');
    }
    this.verificationStatus();
    this.registerFormEdit.controls.address.setValue(this.userDetails.address);
    this.registerFormEdit.controls.cityName.setValue(this.userDetails.cityName);
    this.registerFormEdit.controls.countryName.setValue(
      this.userDetails.countryName
    );
    this.registerFormEdit.controls.zipCode.setValue(this.userDetails.zipCode);

    console.log(this.userDetails.idDetails);
    let getAadhaarDetails = this.userDetails.idDetails?.filter(
      (e) => e.idType == 'aadhaar'
    );
    let getPassportDetails = this.userDetails.idDetails?.filter(
      (e) => e.idType == 'passport'
    );

    if(this.userDetails.idDetails[0].idNumber?.length>0)
    {
      this.aadhaarDetails = false;
      this.registerFormEdit.controls.idType.setValue('passport')
    }
    if(this.userDetails.idDetails[1].idNumber?.length>0){
      this.aadhaarDetails = true;
      this.registerFormEdit.controls.idType.setValue('aadhaar')
    }
    if(this.userDetails.idDetails[0].idNumber?.length>0 && this.userDetails.idDetails[1].idNumber?.length>0)
    {
      this.aadhaarDetails = false;
      this.registerFormEdit.controls.idType.setValue('passport')
    }
    
    console.log('aadhaar', getAadhaarDetails, 'passport', getPassportDetails);
    
    if (getPassportDetails.length > 0) {
      this.registerFormEdit.controls.passportnumber.setValue(
        getPassportDetails[0].idNumber
      );
      this.registerFormEdit.controls.passportcountry.setValue(
        getPassportDetails[0].countryName
      );
      if (getPassportDetails[0]?.expiryDate) {
        let indianPassportexpiryDate = new Date(
          getPassportDetails[0]?.expiryDate
        );
        this.registerFormEdit.controls.passportexpiry.setValue(
          indianPassportexpiryDate?.getFullYear() +
            '-' +
            ('0' + (indianPassportexpiryDate?.getMonth() + 1)).slice(-2) +
            '-' +
            ('0' + indianPassportexpiryDate?.getDate()).slice(-2)
        );
      }
      if (getPassportDetails[0].issuedOn) {
        let indianPassportIssueDate = new Date(getPassportDetails[0]?.issuedOn);
        this.registerFormEdit.controls.passportissuedOn.setValue(
          indianPassportIssueDate?.getFullYear() +
            '-' +
            ('0' + (indianPassportIssueDate?.getMonth() + 1)).slice(-2) +
            '-' +
            ('0' + indianPassportIssueDate?.getDate()).slice(-2)
        );
      }
    }
    if (getAadhaarDetails.length > 0) {
      this.registerFormEdit.controls.aadhaarnumber.setValue(
        getAadhaarDetails[0].idNumber
      );
      this.registerFormEdit.controls.aadhaarcity.setValue(
        getAadhaarDetails[0].cityName
      );
      if (getAadhaarDetails[0].issuedOn) {
        let indianAadherIssuedate = new Date(getAadhaarDetails[0].issuedOn);
        this.registerFormEdit.controls.aadhaarissuedOn.setValue(
          indianAadherIssuedate?.getFullYear() +
            '-' +
            ('0' + (indianAadherIssuedate?.getMonth() + 1)).slice(-2) +
            '-' +
            ('0' + indianAadherIssuedate?.getDate()).slice(-2)
        );
      }
    }
    // let idArray = this.userDetails.idDetails?.filter(
    //   (f) => f !== undefined && f !== null
    // ) as any;
    // let getAadhaarDetails = idArray?.filter((e) => e.idType == 'aadhaar');
    // let getPassportDetails = idArray?.filter((e) => e.idType == 'passport');

    // let setPassportDetails = last(getPassportDetails);

    // let setAadhaarDetails = last(getAadhaarDetails);

    // let setidType = last(idArray);
    // console.log(setidType);
    // if (setidType.idNumber.length > 0) {
    //   this.registerFormEdit.controls.idType.setValue(setidType.idType);
    //   this.aadhaarDetails = true;
    // } else {
    //   this.registerFormEdit.controls.idType.setValue('passport');
    //   this.aadhaarDetails = false;
    // }
    // this.registerFormEdit.controls.aadhaarnumber.setValue(
    //   setAadhaarDetails?.idNumber
    // );
    // this.registerFormEdit.controls.aadhaarcity.setValue(
    //   setAadhaarDetails?.cityName
    // );
    // console.log();
    // let indianAadherIssuedate = new Date(setAadhaarDetails.issuedOn);
    // indianAadherIssuedate?.getFullYear() +
    //   '-' +
    //   (indianAadherIssuedate?.getMonth() + 1) +
    //   '-' +
    //   indianAadherIssuedate?.getDate();
    // this.registerFormEdit.controls.aadhaarissuedOn.setValue(
    //   indianAadherIssuedate?.getFullYear() +
    //     '-' +
    //     ('0' + (indianAadherIssuedate?.getMonth() + 1)).slice(-2) +
    //     '-' +
    //     ('0' + indianAadherIssuedate?.getDate()).slice(-2)
    // );

    // this.registerFormEdit.controls.passportnumber.setValue(
    //   setPassportDetails.idNumber
    // );
    // this.registerFormEdit.controls.passportcountry.setValue(
    //   setPassportDetails.countryName
    // );

    // let indianPassportIssuedate = new Date(setPassportDetails?.issuedOn);
    // indianPassportIssuedate?.getFullYear() +
    //   '-' +
    //   (indianPassportIssuedate?.getMonth() + 1) +
    //   '-' +
    //   indianPassportIssuedate?.getDate();

    // this.registerFormEdit.controls.passportissuedOn.setValue(
    //   indianPassportIssuedate?.getFullYear() +
    //     '-' +
    //     ('0' + (indianPassportIssuedate?.getMonth() + 1)).slice(-2) +
    //     '-' +
    //     ('0' + indianPassportIssuedate?.getDate()).slice(-2)
    // );

    // let indianPassportexpiryDate = new Date(setPassportDetails?.expiryDate);
    // indianPassportexpiryDate?.getFullYear() +
    //   '-' +
    //   (indianPassportexpiryDate?.getMonth() + 1) +
    //   '-' +
    //   indianPassportexpiryDate?.getDate();

    // this.registerFormEdit.controls.passportexpiry.setValue(
    //   indianPassportexpiryDate?.getFullYear() +
    //     '-' +
    //     ('0' + (indianPassportexpiryDate?.getMonth() + 1)).slice(-2) +
    //     '-' +
    //     ('0' + indianPassportexpiryDate?.getDate()).slice(-2)
    // );
  }

  async onSubmitEdit() {
    if (this.registerFormEdit.controls.firstName.value === '') {
      this.invalidformName = true;
    } else if (this.registerFormEdit.controls.firstName.value.length < 2) {
      this.invalidformNamelength = true;
    } else if (this.registerFormEdit.controls.dateOfBirth.value === '') {
      this.invalidformdateOfBirth = true;
    } else if (
      this.registerFormEdit.controls.gender.value === '' ||
      this.registerFormEdit.controls.gender.value === 'null'
    ) {
      this.invalidformgender = true;
    } else if (
      this.registerFormEdit.controls.maritalStatus.value === '' ||
      this.registerFormEdit.controls.gender.value === 'null'
    ) {
      this.invalidformmaritalStatus = true;
    } else if (this.registerFormEdit.controls.mobileNo.value === '') {
      this.invalidformmobileNo = true;
    } else if (
      !this.registerFormEdit.controls.mobileNo.value.match(/^\d{10}$/)
    ) {
      this.invalidformmobileNopatten = true;
    } else if (this.registerFormEdit.controls.email.value === '') {
      this.invalidformemail = true;
    } else if (
      !this.registerFormEdit.controls.email.value.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      this.invalidformemailNopatten = true;
    } else {
      // let passportissuedOnsend = this.registerFormEdit.value.passportissuedOn;
      // let passportexpirysend = this.registerFormEdit.value.passportexpiry;
      // if (passportissuedOnsend == null) {
      //   passportissuedOnsend = new Date();
      // }
      // if (passportexpirysend == null) {
      //   passportexpirysend = new Date();
      // }
      // this.userProfileService.updateProfileData(true);
      // this.UserName();
      this.editidsDetails = [];
      this.editpassportObj = {
        idType: 'passport',
        idNumber: this.registerFormEdit.value.passportnumber,
        // issuedOn: moment(passportissuedOnsend).toISOString(),
        // expiryDate: moment(passportexpirysend).toISOString(),
        countryName: this.registerFormEdit.value.passportcountry,
        cityName: '',
      };
      if (
        this.registerFormEdit.value.passportissuedOn.length > 0 &&
        this.registerFormEdit.value.passportissuedOn != null &&
        this.registerFormEdit.value.passportissuedOn != undefined
      ) {
        this.editpassportObj.issuedOn = moment(
          this.registerFormEdit.value.passportissuedOn
        ).toISOString();
      }
      if (
        this.registerFormEdit.value.passportexpiry.length > 0 &&
        this.registerFormEdit.value.passportexpiry != null &&
        this.registerFormEdit.value.passportexpiry != undefined
      ) {
        this.editpassportObj.expiryDate = moment(
          this.registerFormEdit.value.passportexpiry
        ).toISOString();
      }
      this.editidsDetails?.push(this.editpassportObj);

      // if (this.registerFormEdit.value.aadhaarissuedOn == null) {
      //   this.registerFormEdit.value.aadhaarissuedOn = new Date();
      // }

      this.editaadhaarObj = {
        idType: 'aadhaar',
        idNumber: this.registerFormEdit.value.aadhaarnumber,
        // issuedOn: moment(
        //   this.registerFormEdit.value.aadhaarissuedOn
        // ).toISOString(),
        // expiryDate: new Date(),
        // countryName: '',
        cityName: this.registerFormEdit.value.aadhaarcity,
      };
      if (
        this.registerFormEdit.value.aadhaarissuedOn.length > 0 &&
        this.registerFormEdit.value.aadhaarissuedOn != null &&
        this.registerFormEdit.value.aadhaarissuedOn != undefined
      ) {
        this.editaadhaarObj.issuedOn = moment(
          this.registerFormEdit.value.aadhaarissuedOn
        ).toISOString();
      }
      console.log(this.idsDetails);
      this.editidsDetails?.push(this.editaadhaarObj);
      this.Updateformdetails();
    }
  }

  async Updateformdetails() {
    let mobileVerified = this.userDetails.isMobileVerified;
    let emailVerified = this.userDetails.isEmailVerified;
    if (this.userPresent.username.includes('@')) {
      if (
        this.userDetails.isMobileVerified == true &&
        this.registerFormEdit.value.countryCode +
          this.registerFormEdit.value.mobileNo !=
          this.userDetails.mobileNo
      ) {
        mobileVerified = false;
      }
    } else {
      if (
        this.userDetails.isEmailVerified == true &&
        this.registerFormEdit.value.email != this.userDetails.email
      ) {
        emailVerified = false;
      }
    }
    this.editProfile = {
      firstName: this.registerFormEdit.value.firstName,
      dateOfBirth: moment(
        this.registerFormEdit.value.dateOfBirth
      ).toISOString(),
      gender: this.registerFormEdit.value.gender,
      maritalStatus: this.registerFormEdit.value.maritalStatus,
      mobileNo:
        this.registerFormEdit.value.countryCode +
        this.registerFormEdit.value.mobileNo,
      isMobileVerified: mobileVerified,
      email: this.registerFormEdit.value.email,
      isEmailVerified: emailVerified,
      idDetails: this.editidsDetails,
      address: this.registerFormEdit.value.address,
      cityName: this.registerFormEdit.value.cityName,
      countryName: this.registerFormEdit.value.countryName,
      zipCode: this.registerFormEdit.value.zipCode,
    };
    // stop here if form is invalid
    await this.userProfileService.updateUserProfile(this.editProfile);
    console.log(
      this.editProfile,
      this.registerFormEdit.controls.mobileNo.value
    );
  }
  onKeyName(event: any) {
    if (event.target.value.length > 0) {
      this.invalidformName = false;
      this.invalidformNamelength = false;
    }
  }
  onKeydateOfBirth(event: any) {
    if (event.target.value.length > 0) {
      this.invalidformdateOfBirth = false;
    }
  }
  onChangegender(event) {
    console.log(event.target.value);
    if (event.target.value === 'null') {
      this.invalidformgender = true;
    } else {
      this.invalidformgender = false;
    }
  }
  onChangemarriage(event) {
    console.log(event.target.value);
    if (event.target.value === 'null') {
      this.invalidformmaritalStatus = true;
    } else {
      this.invalidformmaritalStatus = false;
    }
  }
  onKeymobileNo(event: any) {
    this.verifyMobileErrorMessage = null;
    if (event.target.value.length > 0) {
      this.invalidformmobileNo = false;
    }
    if (event.target.value.match(/^\d{10}$/)) {
      this.invalidformmobileNopatten = false;
    }
  }
  onKeyemail(event: any) {
    this.verifyEmailErrorMessage = null;
    if (event.target.value.length > 0) {
      this.invalidformemail = false;
    }
    if (
      event.target.value.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      this.invalidformemailNopatten = false;
    }
  }
}
