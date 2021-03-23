import { error } from 'protractor';
import { ChangeNotifyService } from './change-notify.service';
import {
  UserProfileDetails,
  UserProfileWithFamilyDetails,
  IdentificationDetails,
} from '@ojashub/voyaah-common';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { AwsDataSyncService } from './aws-data-sync.service';
import { AccountService } from '@app/account/services/account.service';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  profileResponse;
  static localStorageKey = 'user-profile';
  public userProfileDetails: UserProfileDetails;
  public familyProfile: UserProfileDetails[] = [];
  private userProfile = new BehaviorSubject<boolean>(false);
  currentUserProfileData = this.userProfile.asObservable();

  private userNavigate = new BehaviorSubject<boolean>(false);
  currentUserNavigate = this.userNavigate.asObservable();

  private userNavigatehome = new BehaviorSubject<boolean>(false);
  currentUserNavigatehome = this.userNavigatehome.asObservable();

  private userLogin = new BehaviorSubject<boolean>(false);
  currentUserLogin = this.userLogin.asObservable();

  private paymentFali = new BehaviorSubject<boolean>(false);
  public faildPayment = this.paymentFali.asObservable();

  public navigateToTravellers = new BehaviorSubject<string>('dropdown');
  public routeToTravellers = this.navigateToTravellers.asObservable();

  public travellerSelectionData = new BehaviorSubject<any>(undefined);
  public selectedTravellersData = this.travellerSelectionData.asObservable();

  private saveTimeoutId = 0;
  private saveTimeoutValue = 5000;
  profileUserDetails: any;
  userProfileDetailsArray = [];

  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor(
    private awsDataSyncService: AwsDataSyncService,
    private accountService: AccountService,
    private changeNotifyService: ChangeNotifyService
  ) {
    this.accountService.user.subscribe(() => {
      this._load();
    });
    this.defineUserProfile();
  }
  defineUserProfile() {
    this.userProfileDetails = {
      id: null,
      firstName: '',
      middleName: '',
      lastName: '',
      dateOfBirth: '',
      gender: '',
      maritalStatus: '',
      mobileNo: '',
      isMobileVerified: false,
      email: '',
      isEmailVerified: false,
      relationshipToUser: 'self',
      idDetails: [
        {
          idType: '',
          idNumber: '',
          issuedOn: '',
          expiryDate: '',
          countryName: '',
          cityName: '',
        },
      ],
      address: '',
      cityName: '',
      countryName: '',
      zipCode: '',
    };
  }
  clearOnLogout() {
    this.defineUserProfile();
    this.familyProfile = [];
  }

  getUserDetails(): UserProfileDetails {
    return this.userProfileDetails;
  }
  getFamilyDetails(): UserProfileDetails[] {
    return this.familyProfile;
  }
  editFamilyDetails(familyProfile: UserProfileDetails, index): void {
    this.familyProfile[index] = familyProfile;
    this.familyProfile[index].id = String(index + 1);
    console.log('edit family before save call', this.familyProfile);
    this._save();
  }
  deleteFamilyMember(index): void {
    this.familyProfile.splice(index, 1);
    for (let i = 0; i < this.familyProfile.length; i++) {
      this.familyProfile[i].id = String(i + 1);
    }
    console.log(this.familyProfile, 'delete before save');
    this._save();
  }
  updateFamilyProfile(familyProfile: UserProfileDetails): void {
    const member = this.familyProfile.filter((profile) => {
      return profile.id === familyProfile.id;
    });
    if (member === undefined || member === null || member.length == 0) {
      familyProfile.id = String(this.familyProfile.length + 1);
      this.familyProfile.push(familyProfile);
    }
    console.log(this.familyProfile, 'updatefamily before save');
    this._save();
  }
  async updateUserProfile(profiledetails): Promise<any> {
    try {
      this.userProfileDetails.firstName = profiledetails.firstName;
      this.userProfileDetails.dateOfBirth = profiledetails.dateOfBirth;
      this.userProfileDetails.gender = profiledetails.gender;
      this.userProfileDetails.mobileNo = profiledetails.mobileNo;
      this.userProfileDetails.isMobileVerified =
        profiledetails.isMobileVerified;
      this.userProfileDetails.email = profiledetails.email;
      this.userProfileDetails.isEmailVerified = profiledetails.isEmailVerified;
      this.userProfileDetails.maritalStatus = profiledetails.maritalStatus;
      this.userProfileDetails.idDetails = profiledetails.idDetails;
      this.userProfileDetails.address = profiledetails.address;
      this.userProfileDetails.cityName = profiledetails.cityName;
      this.userProfileDetails.countryName = profiledetails.countryName;
      this.userProfileDetails.zipCode = profiledetails.zipCode;
      let result = await this._save();
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  updateProfileData(data: boolean) {
    this.userProfile.next(data);
  }

  userccNavigate(data: boolean) {
    this.userNavigate.next(data);
  }

  userccNavigatehome(data: boolean) {
    this.userNavigatehome.next(data);
  }

  faildPay(data: boolean) {
    this.paymentFali.next(data);
  }

  userPresent(data: boolean) {
    this.userLogin.next(data);
  }

  private async _save(): Promise<any> {
    try {
      if (
        this.userProfileDetails.email.length == 0 &&
        this.userProfileDetails.mobileNo.length == 0
      ) {
        if (JSON.parse(localStorage.getItem('user')).username.includes('@')) {
          this.userProfileDetails.email = JSON.parse(
            localStorage.getItem('user')
          ).username;
        } else {
          this.userProfileDetails.mobileNo = JSON.parse(
            localStorage.getItem('user')
          ).username;
        }
      }
      await this.awsDataSyncService
        .storeUserProfile(this.userProfileDetails, this.familyProfile)
        .then((res) => {
          this.profileResponse = res;
          console.log('in _save method', res);
          this.updateProfileData(true);
          this.changeNotifyService.profileUpdated(
            this.userProfileDetails.email,
            this.userProfileDetails.mobileNo,
            this.userProfileDetails.firstName,
            this.userProfileDetails.lastName
          );
        });
      return this.profileResponse;
    } catch (error) {
      console.error('Error saving in aws', error);
      throw error;
    }
  }

  private _load() {
    this.awsDataSyncService
      .loadUserProfile()
      .then((userProfileWithFamilyDetails: UserProfileWithFamilyDetails) => {
        if (
          userProfileWithFamilyDetails?.userDetails != null &&
          userProfileWithFamilyDetails?.userDetails != undefined
        ) {
          this.userProfileDetails = userProfileWithFamilyDetails.userDetails;
          this.familyProfile = userProfileWithFamilyDetails.familyDetails;
          this.updateProfileData(true);
          this.userProfileDetailsArray.push(this.userProfileDetails);
          console.log(
            'details in userservice',
            this.userProfileDetails,
            this.familyProfile
          );
        }
      })
      .catch((e) => {
        console.error('Error getting profile data from aws', e);
      });
  }
  public getUserprofileDetails() {
    return this.userProfileDetails;
  }
  updateUserProfileVerificationDetails(verifyFor, sendTo) {
    if (verifyFor == 'email') {
      this.userProfileDetails.isEmailVerified = true;
      this.userProfileDetails.email = sendTo;
    } else {
      this.userProfileDetails.isMobileVerified = true;
      this.userProfileDetails.mobileNo = sendTo;
    }
    this.updateUserProfile(this.userProfileDetails);
  }
}
