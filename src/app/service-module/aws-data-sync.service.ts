import { CitiesListService } from './cities-list.service';
import {
  UserProfileDetails,
  UserProfileWithFamilyDetails,
} from '@ojashub/voyaah-common';
import {
  CurrentItinerary,
  TravelType,
  TravellerCount,
} from '@ojashub/voyaah-common';
import { Injectable } from '@angular/core';
import { AccountService } from '@app/account/services';
import { User } from '@app/account/models';
import {
  APIService as APIServiceCurrentItinerary,
  VYTravelType,
  VYUserProfileInput,
  CreateVYCurrentItineraryModelInput,
  CreateVYUserProfileModelInput,
  UpdateVYCurrentItineraryModelInput,
  UpdateVYUserProfileModelInput,
  CreateVyUserProfileModelMutation,
} from './aws-current-itinerary.service';
import { City } from '@ojashub/voyaah-common';
import { FocusTrap } from '@angular/cdk/a11y';
import * as moment from 'moment';
import { error } from 'protractor';

@Injectable({
  providedIn: 'root',
})
export class AwsDataSyncService {
  user: User;
  loggedIn = false;
  constructor(
    private apiServiceCurrentItinerary: APIServiceCurrentItinerary,
    private accountService: AccountService
  ) {
    this._subscribeToUserLogin();
  }
  private _subscribeToUserLogin(): void {
    this.accountService.user.subscribe((user) => {
      this.user = user;
    });
  }

  private async _storeCurrentItinerary(
    currentItinerary: CurrentItinerary
  ): Promise<void> {
    try {
      let input: UpdateVYCurrentItineraryModelInput = { id: '' };
      input.id = this.user.username;
      input.username = this.user.username;
      input.itineraryName = 'currentItinerary';
      input.currentItinerary = {};
      input.currentItinerary.startDate = currentItinerary.startDate.toISOString();
      input.currentItinerary.endDate = currentItinerary.endDate.toISOString();
      input.currentItinerary.originCity = currentItinerary.originCity;
      input.currentItinerary.destinationCities =
        currentItinerary.destinationCities;
      switch (currentItinerary.travelType) {
        case TravelType.OneWay:
          input.currentItinerary.travelType = VYTravelType.OneWay;
          break;
        case TravelType.TwoWay:
          input.currentItinerary.travelType = VYTravelType.TwoWay;
          break;
        default:
          input.currentItinerary.travelType = VYTravelType.MultiCity;
          break;
      }
      input.currentItinerary.travellers = currentItinerary.travellers;

      try {
        const awsCurrentItinerary = await this.apiServiceCurrentItinerary.GetVyCurrentItineraryModel(
          this.user.username
        );
        await this.apiServiceCurrentItinerary.UpdateVyCurrentItineraryModel(
          input
        );
        return;
      } catch (error) {}

      const createInput: CreateVYCurrentItineraryModelInput = {};
      createInput.id = this.user.username;
      createInput.currentItinerary = input.currentItinerary;
      createInput.itineraryName = input.itineraryName;
      createInput.username = input.username;
      const response = await this.apiServiceCurrentItinerary.CreateVyCurrentItineraryModel(
        createInput
      );
      console.log('Response from store : ', response);
    } catch (error) {
      console.log('Exception in storing itinerary to aws ', error);
    }
  }

  private async _loadCurrentItinerary(): Promise<CurrentItinerary> {
    try {
      const awsCurrentItinerary = await this.apiServiceCurrentItinerary.GetVyCurrentItineraryModel(
        this.user.username
      );
      let currentItinerary: any = {};

      currentItinerary.startDate = new Date(
        awsCurrentItinerary.currentItinerary.startDate
      );
      currentItinerary.endDate = new Date(
        awsCurrentItinerary.currentItinerary.endDate
      );
      currentItinerary.originCity = awsCurrentItinerary.currentItinerary
        .originCity as City;
      currentItinerary.destinationCities = awsCurrentItinerary.currentItinerary
        .destinationCities as City[];
      switch (awsCurrentItinerary.currentItinerary.travelType) {
        case VYTravelType.OneWay:
          currentItinerary.travelType = TravelType.OneWay;
          break;
        case VYTravelType.TwoWay:
          currentItinerary.travelType = TravelType.TwoWay;
          break;
        default:
          currentItinerary.travelType = TravelType.MultiCity;
          break;
      }
      currentItinerary.travelType = (awsCurrentItinerary.currentItinerary
        .travelType as unknown) as TravelType;
      currentItinerary.travellers = awsCurrentItinerary.currentItinerary
        .travellers as TravellerCount;
      return currentItinerary as CurrentItinerary;
    } catch (error) {
      console.log('Exception in loading AWS Current Itinerary: ' + error);
      return null;
    }
  }

  public storeCurrentItinerary(currentItinerary: CurrentItinerary): void {
    if (currentItinerary === null || currentItinerary === undefined) {
      return;
    }
    this.accountService.isLoggedIn().then((loggedIn) => {
      if (loggedIn) {
        this._storeCurrentItinerary(currentItinerary);
      }
    });
  }

  public async loadCurrenItinerary(): Promise<CurrentItinerary> {
    try {
      const loggedIn = await this.accountService.isLoggedIn();
      if (loggedIn) {
        let currentItinerary = await this._loadCurrentItinerary();
        return currentItinerary;
      }
    } catch (error) {
      console.log('Exception in loading AWS Current Itinerary ', error);
      return null;
    }
  }
  private _toAWSFamilytype(
    familyarray: UserProfileDetails[]
  ): VYUserProfileInput[] {
    let familyProfiles: VYUserProfileInput[] = [];
    for (let i = 0; i < familyarray.length; i++) {
      familyProfiles.push(this._copyProfile(familyarray[i]));
      familyProfiles[i].relationshipToUser = 'family';
    }
    return familyProfiles;
  }
  private _copyProfile(source: UserProfileDetails): VYUserProfileInput {
    let dest: VYUserProfileInput;
    let dateOfBirth: string;
    try {
      dateOfBirth = moment(source.dateOfBirth).toISOString();
    } catch (err) {
      console.log('conversion exception ', err);
    }
    try {
      dest = {
        ...source,
        idDetails: source.idDetails,
        dateOfBirth: dateOfBirth,
      };
    } catch (err) {
      console.log('copy exception: ', err);
      console.log('destination copied so far, ', dest);
    }
    return dest;
  }
  private async _storeUserProfile(
    userProfile: UserProfileDetails,
    familyProfile: UserProfileDetails[]
  ): Promise<CreateVyUserProfileModelMutation> {
    try {
      let updateInput: any = {};
      let createInput: any = {};
      let createRecord = true;
      try {
        const awsUserProfile = await this.apiServiceCurrentItinerary.GetVyUserProfileModel(
          this.user.username
        );
        if (awsUserProfile != null && awsUserProfile != undefined) {
          createRecord = false;
        }
      } catch (err) {
        throw err;
      }
      console.log('storeUSerProfile, ', createRecord);
      createInput.id = this.user.username;
      createInput.username = this.user.username;
      createInput.userProfile = this._copyProfile(userProfile);
      // createInput.familyProfile = undefined; //TODO
      if (familyProfile.length > 0) {
        createInput.familyProfile = this._toAWSFamilytype(familyProfile);
        console.log(createInput, 'createinput');
      } else {
        createInput.familyProfile = undefined;
      }

      if (createRecord) {
        console.log('_storeUSerProfile, before Create ');
        let res: CreateVyUserProfileModelMutation = await this.apiServiceCurrentItinerary.CreateVyUserProfileModel(
          createInput as CreateVYUserProfileModelInput
        );

        console.log('create result', res);
        return res;
      } else {
        console.log('_storeUSerProfile, before Update ');
        updateInput.username = this.user.username;
        updateInput.id = this.user.username;
        updateInput.userProfile = createInput.userProfile;
        // updateInput.familyProfile = undefined; //TODO
        if (familyProfile.length > 0) {
          updateInput.familyProfile = this._toAWSFamilytype(familyProfile);
          console.log(updateInput, 'updateInput');
        } else {
          createInput.familyProfile = undefined;
        }
        let res: CreateVyUserProfileModelMutation = await this.apiServiceCurrentItinerary.UpdateVyUserProfileModel(
          updateInput as UpdateVYUserProfileModelInput
        );
        console.log('update result', res);
        return res;
      }
    } catch (err) {
      console.log('Exception in storing profile ', err);
      throw err;
    }
  }
  public async storeUserProfile(
    userProfile: UserProfileDetails,
    familyProfile: UserProfileDetails[]
  ): Promise<CreateVyUserProfileModelMutation> {
    try {
      console.log(familyProfile, userProfile, 'aws-data-sync');
      if (
        userProfile === null ||
        userProfile === undefined ||
        (userProfile.email.length == 0 && userProfile.mobileNo.length == 0)
      ) {
        return;
      }
      await this.accountService.isLoggedIn().then((loggedIn) => {
        console.log(loggedIn, 'loggedin');
        this.loggedIn = loggedIn;
      });
      if (this.loggedIn) {
        let res: CreateVyUserProfileModelMutation = await this._storeUserProfile(
          userProfile,
          familyProfile
        );
        return res;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  private async _loadUserProfile(): Promise<UserProfileWithFamilyDetails> {
    try {
      const awsUserProfile = await this.apiServiceCurrentItinerary.GetVyUserProfileModel(
        this.user.username
      );
      if (awsUserProfile == null || awsUserProfile == undefined) {
        return;
      }
      console.log(awsUserProfile, 'aws response');

      let userProfile: UserProfileDetails = {
        id: awsUserProfile.userProfile.id,
        firstName: awsUserProfile.userProfile.firstName,
        middleName: awsUserProfile.userProfile.middleName,
        lastName: awsUserProfile.userProfile.lastName,
        gender: awsUserProfile.userProfile.gender,
        maritalStatus: awsUserProfile.userProfile.maritalStatus,
        mobileNo: awsUserProfile.userProfile.mobileNo,
        isMobileVerified: awsUserProfile.userProfile.isMobileVerified,
        email: awsUserProfile.userProfile.email,
        isEmailVerified: awsUserProfile.userProfile.isEmailVerified,
        relationshipToUser: awsUserProfile.userProfile.relationshipToUser,
        address: awsUserProfile.userProfile.address,
        cityName: awsUserProfile.userProfile.cityName,
        countryName: awsUserProfile.userProfile.countryName,
        zipCode: awsUserProfile.userProfile.zipCode,
        dateOfBirth: new Date(awsUserProfile.userProfile.dateOfBirth),
        idDetails: awsUserProfile.userProfile.idDetails,
      };
      let profileIdDetails = Object.assign([], userProfile.idDetails).map(
        function (item) {
          delete item.__typename;
          return item;
        }
      );
      userProfile.idDetails = profileIdDetails;
      let familyDetails: UserProfileDetails[] = Object.assign(
        [],
        awsUserProfile.familyProfile
      ).map(function (item) {
        delete item.__typename;
        delete item.idDetails[0]?.__typename;
        delete item.idDetails[1]?.__typename;
        return item;
      });
      console.log(familyDetails, 'familyDetails');
      let userDetailsWithFamily: UserProfileWithFamilyDetails = {
        userDetails: userProfile,
        familyDetails: familyDetails,
      };
      console.log(userDetailsWithFamily, 'detailsofall');
      return userDetailsWithFamily;
    } catch (err) {
      console.log('Exception in loading user profile from aws', err);
      return null;
    }
  }
  public async loadUserProfile(): Promise<UserProfileWithFamilyDetails> {
    try {
      const loggedIn = await this.accountService.isLoggedIn();
      if (loggedIn) {
        console.log('loggedInnnnnnnnnnnnnnnnnnnnnnnnnnnnn');
        let userProfile = await this._loadUserProfile();
        console.log('userProfile data sync', userProfile);
        return userProfile;
      }
    } catch (error) {
      console.log('Exception in loading AWS User Profile ', error);
      return null;
    }
  }
}
