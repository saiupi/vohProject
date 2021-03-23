import { error } from 'protractor';
import { async } from '@angular/core/testing';
import { StaycationBooking, TravelPackage } from '@ojashub/voyaah-common';
import { Injectable } from '@angular/core';
import {
  APIService as APIServiceCurrentItinerary,
  CreateVYStaycationBookingModelInput,
  CreateVyStaycationBookingModelMutation,
  ListVyStaycationBookingModelsQuery,
  ModelVYStaycationBookingModelFilterInput,
  ModelStringFilterInput,
  UpdateVYStaycationBookingModelInput,
} from './aws-current-itinerary.service';
import * as moment from 'moment';
import { AccountService } from '@app/account/services';
import { User } from '@app/account/models';
import { v4 as uuid } from 'uuid';
import { TravellersDetails } from '@ojashub/voyaah-common';
const { v1: uuidv1 } = require('uuid');
@Injectable({
  providedIn: 'root',
})
export class AwsStaycationSyncService {
  user: User;
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
  public async AWSCreateStaycationBooking(
    AWSStaycationBookingType: CreateVYStaycationBookingModelInput
  ): Promise<StaycationBooking> {
    try {
      var result = await this._AWSCreateStaycationBooking(
        AWSStaycationBookingType
      );
      console.log(result)
      delete result.__typename;
      result.bookingDetails = JSON.parse(result.bookingDetails);
      return result;
    } catch (error) {
      console.log('staycationsyncpublic', error);
      throw error;
    }
  }
  private async _AWSCreateStaycationBooking(
    AWSStaycationBookingType: CreateVYStaycationBookingModelInput
  ): Promise<any> {
    try {
      var result = await this.apiServiceCurrentItinerary.CreateVyStaycationBookingModel(
        AWSStaycationBookingType
      );
      localStorage.setItem(
        'staycationTransaction',
        JSON.stringify(AWSStaycationBookingType)
      );
      console.log('staycationTransCreate', result);
      return result;
    } catch (error) {
      console.log('staycationsyncprivate', error);
      throw error;
    }
  }

  public async getAWSStaycationBooking(id: string): Promise<StaycationBooking> {
    try {
      let result = await this._getAWSStaycationBooking(id);
      result.bookingDetails = JSON.parse(result.bookingDetails);
      return result;
    } catch (error) {
      console.log('getAWSStaycationBooking', error);
      throw error;
    }
  }
  private async _getAWSStaycationBooking(id: string): Promise<any> {
    try {
      let userFilter: ModelStringFilterInput = {
        eq: id,
      };
      let filterInput: ModelVYStaycationBookingModelFilterInput = {
        id: userFilter,
      };
      let response: ListVyStaycationBookingModelsQuery = await this.apiServiceCurrentItinerary.ListVyStaycationBookingModels(
        filterInput
      );
      delete response.items[0].__typename;
      return response.items[0];
    } catch (error) {
      throw error;
    }
  }
  public async getStaycationBookingData() {
    try {
      if (this.accountService.isLoggedIn()) {
        let userFilter: ModelStringFilterInput = {
          eq: this.user.username,
        };
        let filterInput: ModelVYStaycationBookingModelFilterInput = {
          username: userFilter,
        };
        const data: ListVyStaycationBookingModelsQuery = await this.apiServiceCurrentItinerary.ListVyStaycationBookingModels(
          filterInput
        );
        let userStaycationTransactions: StaycationBooking[] = data.items;
        console.log('staycation result in sync', data);
        console.log(
          'userStaycationTransactions in sync',
          userStaycationTransactions
        );
        return userStaycationTransactions;
      }
    } catch (error) {
      console.log('getBookingTransactio in sync', error);
      throw error;
    }
  }
}
