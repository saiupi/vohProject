import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserProfileDetails } from '@ojashub/voyaah-common';
import { UserProfileService } from '@app/service-module/user-profile.service';
import { NavParams, PopoverController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-add-travellers-slide-menu',
  templateUrl: './add-travellers-slide-menu.component.html',
  styleUrls: ['./add-travellers-slide-menu.component.scss'],
})
export class AddTravellersSlideMenuComponent implements OnInit {
  travellersList: UserProfileDetails[] = [];
  registerForm: FormGroup;
  submitted = false;
  minDate = moment(new Date()).format('YYYY-MM-DD');
  show = false;
  todaysdate;
  age: string;
  profileType: string;
  calculatedMaxAge = new Date();
  calculatedMinAge = new Date();
  userPresent: any;
  userVerify = false;
  adultDate = false;
  childDate = false;
  infantDate = false;
  normalDate = true;
  date = new Date().toISOString().slice(0, 10);
  disableDate() {
    return false;
  }
  emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  maxAge;
  minAge;
  constructor(
    private fb: FormBuilder,
    private userProfileService: UserProfileService,
    private navParams: NavParams,
    private popover: PopoverController
  ) {}
  ngOnInit() {
    console.log('maxAge', this.maxAge);
    console.log('minAge', this.minAge);
    let userDetail = JSON.parse(localStorage.getItem('user'));
    this.userPresent = userDetail;
    if (this.userPresent.username.includes('@')) {
      this.userVerify = true;
    } else {
      this.userVerify = false;
    }

    console.log('calculatedMinAge', this.calculatedMinAge);
    this.age = this.navParams.data.ageGroup;
    if (this.age === 'adult') {
      this.adultDate = true;
      this.normalDate = false;
      this.maxAge =
        this.calculatedMaxAge.getFullYear() -
        12+
        '-' +
        ('0' + (this.calculatedMaxAge.getMonth() + 1)).slice(-2) +
        '-' +
        ('0' + this.calculatedMaxAge.getDate()).slice(-2);
    }
    if (this.age === 'child') {
      this.childDate = true;
      this.normalDate = false;
      this.maxAge =
        this.calculatedMaxAge.getFullYear() -
        3 +
        '-' +
        ('0' + (this.calculatedMaxAge.getMonth() + 1)).slice(-2) +
        '-' +
        ('0' + this.calculatedMaxAge.getDate()).slice(-2);

      this.minAge =
        this.calculatedMaxAge.getFullYear() -
        12 +
        '-' +
        ('0' + (this.calculatedMaxAge.getMonth() + 1)).slice(-2) +
        '-' +
        ('0' + this.calculatedMaxAge.getDate()).slice(-2);
    }
    if (this.age === 'infant') {
      this.infantDate = true;
      this.normalDate = false;
      this.maxAge =
        this.calculatedMaxAge.getFullYear() -
        1 +
        '-' +
        ('0' + (this.calculatedMaxAge.getMonth() + 1)).slice(-2) +
        '-' +
        ('0' + this.calculatedMaxAge.getDate()).slice(-2);

      this.minAge =
        this.calculatedMaxAge.getFullYear() -
        3 +
        '-' +
        ('0' + (this.calculatedMaxAge.getMonth() + 1)).slice(-2) +
        '-' +
        ('0' + this.calculatedMaxAge.getDate()).slice(-2);
    }

    this.profileType = this.navParams.data.profileType;
    console.log('ageGroup', this.age);
    console.log('profileType', this.profileType);
    this.setDate(this.age);
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      countryCode: ['+91', Validators.required],
      mobileNo: ['', [Validators.required, Validators.minLength(10)]],
      dateOfBirth: ['', Validators.required],
      passport: this.fb.group({
        number: [''],
        country: [''],
        expiry: [''],
      }),
    });
    if (this.profileType == 'own') {
      if (this.userVerify === true) {
        this.registerForm.controls.email.setValue(this.userPresent.username);
      } else {
        this.registerForm.controls.mobileNo.setValue(this.userPresent.username);
      }
    }
    this.travellersList = this.userProfileService.getFamilyDetails();
    this.userProfileService.currentUserProfileData.subscribe((res) => {
      this.travellersList = this.userProfileService.getFamilyDetails();
      console.log('travelers list oninit', this.travellersList);
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

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    console.log('form in travellers', this.registerForm.value);
    // this.travellersList.push(this.registerForm.value);
    console.log('save in slide', this.travellersList);
    let emailVerified = false;
    let mobileVerified = false;
    if (this.profileType == 'own') {
      if (this.userPresent.username.includes('@')) {
        emailVerified = true;
      } else {
        mobileVerified = true;
      }
    }
    let traveller: UserProfileDetails = {
      firstName: this.registerForm.value.firstName,
      dateOfBirth: this.registerForm.value.dateOfBirth,
      gender: this.registerForm.value.gender,
      mobileNo:
        this.registerForm.value.countryCode + this.registerForm.value.mobileNo,
      isMobileVerified: mobileVerified,
      email: this.registerForm.value.email,
      isEmailVerified: emailVerified,
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
    if (this.profileType == 'family') {
      this.userProfileService.updateFamilyProfile(traveller);
    }
    if (this.profileType == 'own') {
      this.userProfileService.updateUserProfile(traveller);
    }
    this.popover.dismiss();
  }
  closeModel() {
    this.popover.dismiss();
  }
  onReset() {
    // this.registerForm.resetForm();
    this.registerForm.reset();
  }
  setDate(ageGroup) {
    if (ageGroup == 'adult') {
      this.calculatedMaxAge.setFullYear(
        this.calculatedMaxAge.getFullYear() - 12
      );
      this.calculatedMinAge.setFullYear(new Date('1900').getFullYear());
    } else if (ageGroup == 'child') {
      this.calculatedMaxAge.setFullYear(
        this.calculatedMaxAge.getFullYear() - 2
      );
      this.calculatedMinAge.setFullYear(
        this.calculatedMinAge.getFullYear() - 12
      );
    } else if (ageGroup == 'infant') {
      this.calculatedMaxAge.setFullYear(this.calculatedMaxAge.getFullYear());
      this.calculatedMinAge.setFullYear(
        this.calculatedMinAge.getFullYear() - 2
      );
    } else {
      this.calculatedMaxAge.setFullYear(this.calculatedMaxAge.getFullYear());
      this.calculatedMinAge.setFullYear(new Date('1900').getFullYear());
    }

    console.log(this.calculatedMaxAge);
  }
}
