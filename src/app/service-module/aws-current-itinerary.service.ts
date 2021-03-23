/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from "@angular/core";
import API, { graphqlOperation, GraphQLResult } from "@aws-amplify/api-graphql";
import { Observable } from "zen-observable-ts";

export interface SubscriptionResponse<T> {
  value: GraphQLResult<T>;
}

export type CreateVYCurrentItineraryModelInput = {
  id?: string | null;
  username?: string | null;
  itineraryName?: string | null;
  currentItinerary?: VYCurrentItineraryInput | null;
};

export type VYCurrentItineraryInput = {
  itineraryName?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  originCity?: VYCityInput | null;
  destinationCities?: Array<VYCityInput | null> | null;
  travelType?: VYTravelType | null;
  travellers?: VYTravellerCountInput | null;
  packageId?: string | null;
};

export type VYCityInput = {
  id?: number | null;
  airportCode?: Array<string | null> | null;
  airportName?: Array<string | null> | null;
  cityName?: string | null;
  countryCode?: string | null;
  countryName?: string | null;
  vendorName?: string | null;
  latitude?: number | null;
  longitude?: number | null;
};

export enum VYTravelType {
  OneWay = "OneWay",
  TwoWay = "TwoWay",
  MultiCity = "MultiCity"
}

export type VYTravellerCountInput = {
  adultCount?: number | null;
  childCount?: number | null;
  infantCount?: number | null;
};

export type VYCurrentItineraryModel = {
  __typename: "VYCurrentItineraryModel";
  id?: string;
  username?: string | null;
  itineraryName?: string | null;
  currentItinerary?: VYCurrentItinerary;
  createdAt?: string;
  updatedAt?: string;
  owner?: string | null;
};

export type VYCurrentItinerary = {
  __typename: "VYCurrentItinerary";
  itineraryName?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  originCity?: VYCity;
  destinationCities?: Array<VYCity | null> | null;
  travelType?: VYTravelType | null;
  travellers?: VYTravellerCount;
  packageId?: string | null;
};

export type VYCity = {
  __typename: "VYCity";
  id?: number | null;
  airportCode?: Array<string | null> | null;
  airportName?: Array<string | null> | null;
  cityName?: string | null;
  countryCode?: string | null;
  countryName?: string | null;
  vendorName?: string | null;
  latitude?: number | null;
  longitude?: number | null;
};

export type VYTravellerCount = {
  __typename: "VYTravellerCount";
  adultCount?: number | null;
  childCount?: number | null;
  infantCount?: number | null;
};

export type UpdateVYCurrentItineraryModelInput = {
  id: string;
  username?: string | null;
  itineraryName?: string | null;
  currentItinerary?: VYCurrentItineraryInput | null;
};

export type DeleteVYCurrentItineraryModelInput = {
  id?: string | null;
};

export type CreateVYUserProfileModelInput = {
  id?: string | null;
  username?: string | null;
  userProfile?: VYUserProfileInput | null;
  familyProfile?: Array<VYUserProfileInput | null> | null;
};

export type VYUserProfileInput = {
  id?: string | null;
  firstName?: string | null;
  middleName?: string | null;
  lastName?: string | null;
  relationshipToUser?: string | null;
  dateOfBirth?: string | null;
  gender?: string | null;
  maritalStatus?: string | null;
  mobileNo?: string | null;
  isMobileVerified?: boolean | null;
  email?: string | null;
  isEmailVerified?: boolean | null;
  idDetails?: Array<VYIdentificationDetailsInput | null> | null;
  address?: string | null;
  cityName?: string | null;
  countryName?: string | null;
  zipCode?: string | null;
};

export type VYIdentificationDetailsInput = {
  idType?: string | null;
  idNumber?: string | null;
  issuedOn?: string | null;
  expiryDate?: string | null;
  countryName?: string | null;
  cityName?: string | null;
};

export type VYUserProfileModel = {
  __typename: "VYUserProfileModel";
  id?: string;
  username?: string | null;
  userProfile?: VYUserProfile;
  familyProfile?: Array<VYUserProfile | null> | null;
  createdAt?: string;
  updatedAt?: string;
  owner?: string | null;
};

export type VYUserProfile = {
  __typename: "VYUserProfile";
  id?: string | null;
  firstName?: string | null;
  middleName?: string | null;
  lastName?: string | null;
  relationshipToUser?: string | null;
  dateOfBirth?: string | null;
  gender?: string | null;
  maritalStatus?: string | null;
  mobileNo?: string | null;
  isMobileVerified?: boolean | null;
  email?: string | null;
  isEmailVerified?: boolean | null;
  idDetails?: Array<VYIdentificationDetails | null> | null;
  address?: string | null;
  cityName?: string | null;
  countryName?: string | null;
  zipCode?: string | null;
};

export type VYIdentificationDetails = {
  __typename: "VYIdentificationDetails";
  idType?: string | null;
  idNumber?: string | null;
  issuedOn?: string | null;
  expiryDate?: string | null;
  countryName?: string | null;
  cityName?: string | null;
};

export type UpdateVYUserProfileModelInput = {
  id: string;
  username?: string | null;
  userProfile?: VYUserProfileInput | null;
  familyProfile?: Array<VYUserProfileInput | null> | null;
};

export type DeleteVYUserProfileModelInput = {
  id?: string | null;
};

export type CreateVYTravelPackageInput = {
  id?: string | null;
  packagename?: string | null;
  packageStatus?: string | null;
  packageReference: string;
  packageValues?: string | null;
  availableFrom?: string | null;
  availableUpTo?: string | null;
  packageOwners?: Array<string | null> | null;
  groupsCanAccess?: Array<string | null> | null;
};

export type VYTravelPackage = {
  __typename: "VYTravelPackage";
  id?: string;
  packagename?: string | null;
  packageStatus?: string | null;
  packageReference?: string;
  packageValues?: string | null;
  availableFrom?: string | null;
  availableUpTo?: string | null;
  packageOwners?: Array<string | null> | null;
  groupsCanAccess?: Array<string | null> | null;
  createdAt?: string;
  updatedAt?: string;
};

export type UpdateVYTravelPackageInput = {
  id: string;
  packagename?: string | null;
  packageStatus?: string | null;
  packageReference?: string | null;
  packageValues?: string | null;
  availableFrom?: string | null;
  availableUpTo?: string | null;
  packageOwners?: Array<string | null> | null;
  groupsCanAccess?: Array<string | null> | null;
};

export type DeleteVYTravelPackageInput = {
  id?: string | null;
};

export type CreateVYTrawexSettingsModelInput = {
  id?: string | null;
  flights?: VYTrawexFlightSettingsInput | null;
  hotels?: VYTrawexHotelSettingsInput | null;
};

export type VYTrawexFlightSettingsInput = {
  defaultMargin?: VYBookingMarginInput | null;
  byAirline?: Array<VYMarginExclusionsInput | null> | null;
  byDestination?: Array<VYMarginExclusionsInput | null> | null;
  cancelPolicy?: VYCancelPolicyExInput | null;
};

export type VYBookingMarginInput = {
  percentValue?: number | null;
  minimumFee?: number | null;
};

export type VYMarginExclusionsInput = {
  exclusionName?: string | null;
  exclusionCode?: string | null;
  exclusionMargin?: VYBookingMarginInput | null;
};

export type VYCancelPolicyExInput = {
  minimumFee?: number | null;
  adminFee?: number | null;
  cancelRules?: Array<VYCancelRuleExInput | null> | null;
};

export type VYCancelRuleExInput = {
  refundPercent?: number | null;
  graceDays?: number | null;
};

export type VYTrawexHotelSettingsInput = {
  defaultMargin?: VYBookingMarginInput | null;
  byHotelChain?: Array<VYMarginExclusionsInput | null> | null;
  cancelPolicy?: VYCancelPolicyExInput | null;
};

export type VYTrawexSettingsModel = {
  __typename: "VYTrawexSettingsModel";
  id?: string;
  flights?: VYTrawexFlightSettings;
  hotels?: VYTrawexHotelSettings;
  createdAt?: string;
  updatedAt?: string;
};

export type VYTrawexFlightSettings = {
  __typename: "VYTrawexFlightSettings";
  defaultMargin?: VYBookingMargin;
  byAirline?: Array<VYMarginExclusions | null> | null;
  byDestination?: Array<VYMarginExclusions | null> | null;
  cancelPolicy?: VYCancelPolicyEx;
};

export type VYBookingMargin = {
  __typename: "VYBookingMargin";
  percentValue?: number | null;
  minimumFee?: number | null;
};

export type VYMarginExclusions = {
  __typename: "VYMarginExclusions";
  exclusionName?: string | null;
  exclusionCode?: string | null;
  exclusionMargin?: VYBookingMargin;
};

export type VYCancelPolicyEx = {
  __typename: "VYCancelPolicyEx";
  minimumFee?: number | null;
  adminFee?: number | null;
  cancelRules?: Array<VYCancelRuleEx | null> | null;
};

export type VYCancelRuleEx = {
  __typename: "VYCancelRuleEx";
  refundPercent?: number | null;
  graceDays?: number | null;
};

export type VYTrawexHotelSettings = {
  __typename: "VYTrawexHotelSettings";
  defaultMargin?: VYBookingMargin;
  byHotelChain?: Array<VYMarginExclusions | null> | null;
  cancelPolicy?: VYCancelPolicyEx;
};

export type UpdateVYTrawexSettingsModelInput = {
  id: string;
  flights?: VYTrawexFlightSettingsInput | null;
  hotels?: VYTrawexHotelSettingsInput | null;
};

export type DeleteVYTrawexSettingsModelInput = {
  id?: string | null;
};

export type CreateVYMusementSettingsModelInput = {
  id?: string | null;
  activities?: VYMusementActivitySettingsInput | null;
};

export type VYMusementActivitySettingsInput = {
  defaultMargin?: VYBookingMarginInput | null;
  byActivity?: Array<VYMarginExclusionsInput | null> | null;
  cancelPolicy?: VYCancelPolicyExInput | null;
};

export type VYMusementSettingsModel = {
  __typename: "VYMusementSettingsModel";
  id?: string;
  activities?: VYMusementActivitySettings;
  createdAt?: string;
  updatedAt?: string;
};

export type VYMusementActivitySettings = {
  __typename: "VYMusementActivitySettings";
  defaultMargin?: VYBookingMargin;
  byActivity?: Array<VYMarginExclusions | null> | null;
  cancelPolicy?: VYCancelPolicyEx;
};

export type UpdateVYMusementSettingsModelInput = {
  id: string;
  activities?: VYMusementActivitySettingsInput | null;
};

export type DeleteVYMusementSettingsModelInput = {
  id?: string | null;
};

export type CreateVYPackageInventoryModelInput = {
  packageId: string;
  inventoryDate: string;
  roomType: string;
  totalRooms: string;
  availableRooms: string;
  bookedRooms: string;
  inventoryStatus: string;
  fareInfo?: string | null;
  groupsCanAccess?: Array<string | null> | null;
};

export type VYPackageInventoryModel = {
  __typename: "VYPackageInventoryModel";
  packageId?: string;
  inventoryDate?: string;
  roomType?: string;
  totalRooms?: string;
  availableRooms?: string;
  bookedRooms?: string;
  inventoryStatus?: string;
  fareInfo?: string | null;
  groupsCanAccess?: Array<string | null> | null;
  createdAt?: string;
  updatedAt?: string;
  owner?: string | null;
};

export type UpdateVYPackageInventoryModelInput = {
  packageId: string;
  inventoryDate: string;
  roomType: string;
  totalRooms?: string | null;
  availableRooms?: string | null;
  bookedRooms?: string | null;
  inventoryStatus?: string | null;
  fareInfo?: string | null;
  groupsCanAccess?: Array<string | null> | null;
};

export type DeleteVYPackageInventoryModelInput = {
  packageId: string;
  inventoryDate: string;
  roomType: string;
};

export type CreateVYStaycationInventoryModelInput = {
  id?: string | null;
  packageId: string;
  inventoryDate: string;
  roomType: string;
  totalRooms: string;
  availableRooms: string;
  bookedRooms: string;
  inventoryStatus: string;
  roomId?: string | null;
  packageReference?: string | null;
  fareInfo?: string | null;
  extraData?: string | null;
  groupsCanAccess?: Array<string | null> | null;
};

export type VYStaycationInventoryModel = {
  __typename: "VYStaycationInventoryModel";
  id?: string;
  packageId?: string;
  inventoryDate?: string;
  roomType?: string;
  totalRooms?: string;
  availableRooms?: string;
  bookedRooms?: string;
  inventoryStatus?: string;
  roomId?: string | null;
  packageReference?: string | null;
  fareInfo?: string | null;
  extraData?: string | null;
  groupsCanAccess?: Array<string | null> | null;
  createdAt?: string;
  updatedAt?: string;
  owner?: string | null;
};

export type UpdateVYStaycationInventoryModelInput = {
  id: string;
  packageId?: string | null;
  inventoryDate?: string | null;
  roomType?: string | null;
  totalRooms?: string | null;
  availableRooms?: string | null;
  bookedRooms?: string | null;
  inventoryStatus?: string | null;
  roomId?: string | null;
  packageReference?: string | null;
  fareInfo?: string | null;
  extraData?: string | null;
  groupsCanAccess?: Array<string | null> | null;
};

export type DeleteVYStaycationInventoryModelInput = {
  id?: string | null;
};

export type CreateVYCouponBatchesInput = {
  vendorId: string;
  createdAt?: string | null;
  batchId: string;
  batchName: string;
  batchCode: string;
  packageId: string;
  couponCount: number;
  groupsCanAccess?: Array<string | null> | null;
};

export type VYCouponBatches = {
  __typename: "VYCouponBatches";
  vendorId?: string;
  createdAt?: string;
  batchId?: string;
  batchName?: string;
  batchCode?: string;
  packageId?: string;
  couponCount?: number;
  groupsCanAccess?: Array<string | null> | null;
  updatedAt?: string;
  owner?: string | null;
};

export type UpdateVYCouponBatchesInput = {
  vendorId: string;
  createdAt: string;
  batchId?: string | null;
  batchName?: string | null;
  batchCode?: string | null;
  packageId?: string | null;
  couponCount?: number | null;
  groupsCanAccess?: Array<string | null> | null;
};

export type DeleteVYCouponBatchesInput = {
  vendorId: string;
  createdAt: string;
};

export type CreateVYVendorsModelInput = {
  id?: string | null;
  vendorName: string;
  vendorCode: string;
  contactPhone?: string | null;
  email?: string | null;
  vendorStatus?: string | null;
  vendorData?: string | null;
  contactAddress?: string | null;
  conginitoName?: string | null;
  cognitoUserId?: string | null;
  congnitoSecret?: string | null;
  groupsCanAccess?: Array<string | null> | null;
};

export type VYVendorsModel = {
  __typename: "VYVendorsModel";
  id?: string;
  vendorName?: string;
  vendorCode?: string;
  contactPhone?: string | null;
  email?: string | null;
  vendorStatus?: string | null;
  vendorData?: string | null;
  contactAddress?: string | null;
  conginitoName?: string | null;
  cognitoUserId?: string | null;
  congnitoSecret?: string | null;
  groupsCanAccess?: Array<string | null> | null;
  createdAt?: string;
  updatedAt?: string;
  owner?: string | null;
};

export type UpdateVYVendorsModelInput = {
  id: string;
  vendorName?: string | null;
  vendorCode?: string | null;
  contactPhone?: string | null;
  email?: string | null;
  vendorStatus?: string | null;
  vendorData?: string | null;
  contactAddress?: string | null;
  conginitoName?: string | null;
  cognitoUserId?: string | null;
  congnitoSecret?: string | null;
  groupsCanAccess?: Array<string | null> | null;
};

export type DeleteVYVendorsModelInput = {
  id?: string | null;
};

export type CreateVYCouponCodesModelInput = {
  couponCode: string;
  batchCode: string;
  batchId: string;
  packageId: string;
  vendorId: string;
  validFrom?: string | null;
  validUpto?: string | null;
  couponStatus?: string | null;
  discountType?: string | null;
  discountPercent?: string | null;
  discountFixedValue?: string | null;
  groupsCanAccess?: Array<string | null> | null;
};

export type VYCouponCodesModel = {
  __typename: "VYCouponCodesModel";
  couponCode?: string;
  batchCode?: string;
  batchId?: string;
  packageId?: string;
  vendorId?: string;
  validFrom?: string | null;
  validUpto?: string | null;
  couponStatus?: string | null;
  discountType?: string | null;
  discountPercent?: string | null;
  discountFixedValue?: string | null;
  groupsCanAccess?: Array<string | null> | null;
  createdAt?: string;
  updatedAt?: string;
  owner?: string | null;
};

export type UpdateVYCouponCodesModelInput = {
  couponCode: string;
  batchCode: string;
  batchId?: string | null;
  packageId?: string | null;
  vendorId?: string | null;
  validFrom?: string | null;
  validUpto?: string | null;
  couponStatus?: string | null;
  discountType?: string | null;
  discountPercent?: string | null;
  discountFixedValue?: string | null;
  groupsCanAccess?: Array<string | null> | null;
};

export type DeleteVYCouponCodesModelInput = {
  batchCode: string;
  couponCode: string;
};

export type CreateVYCustomBookingModelInput = {
  id?: string | null;
  username: string;
  itineraryName?: string | null;
  bookingType?: string | null;
  bookingStatus?: string | null;
  bookingDetails?: string | null;
  travelStartDate?: string | null;
  travelCity?: string | null;
  email?: string | null;
  mobileNo?: string | null;
  bookingDecription?: string | null;
  bookingReference: string;
  paymentDetails?: string | null;
};

export type VYCustomBookingModel = {
  __typename: "VYCustomBookingModel";
  id?: string;
  username?: string;
  itineraryName?: string | null;
  bookingType?: string | null;
  bookingStatus?: string | null;
  bookingDetails?: string | null;
  travelStartDate?: string | null;
  travelCity?: string | null;
  email?: string | null;
  mobileNo?: string | null;
  bookingDecription?: string | null;
  bookingReference?: string;
  paymentDetails?: string | null;
  createdAt?: string;
  updatedAt?: string;
  owner?: string | null;
};

export type UpdateVYCustomBookingModelInput = {
  id: string;
  username?: string | null;
  itineraryName?: string | null;
  bookingType?: string | null;
  bookingStatus?: string | null;
  bookingDetails?: string | null;
  travelStartDate?: string | null;
  travelCity?: string | null;
  email?: string | null;
  mobileNo?: string | null;
  bookingDecription?: string | null;
  bookingReference?: string | null;
  paymentDetails?: string | null;
};

export type DeleteVYCustomBookingModelInput = {
  id?: string | null;
};

export type CreateVYStaycationBookingModelInput = {
  id?: string | null;
  username: string;
  itineraryName?: string | null;
  bookingType?: string | null;
  bookingStatus?: string | null;
  travelStartDate?: string | null;
  bookingDetails?: string | null;
  vendorId: string;
  packageId: string;
  bookingReference: string;
  email?: string | null;
  mobileNo?: string | null;
  couponCode?: string | null;
  roomType?: string | null;
  basePackagePrice?: string | null;
  discountedPrice?: string | null;
  discountedValue?: string | null;
  paymentDetails?: string | null;
  canceledDate?: string | null;
  refundAmount?: string | null;
};

export type VYStaycationBookingModel = {
  __typename: "VYStaycationBookingModel";
  id?: string;
  username?: string;
  itineraryName?: string | null;
  bookingType?: string | null;
  bookingStatus?: string | null;
  travelStartDate?: string | null;
  bookingDetails?: string | null;
  vendorId?: string;
  packageId?: string;
  bookingReference?: string;
  email?: string | null;
  mobileNo?: string | null;
  couponCode?: string | null;
  roomType?: string | null;
  basePackagePrice?: string | null;
  discountedPrice?: string | null;
  discountedValue?: string | null;
  paymentDetails?: string | null;
  canceledDate?: string | null;
  refundAmount?: string | null;
  createdAt?: string;
  updatedAt?: string;
  owner?: string | null;
};

export type UpdateVYStaycationBookingModelInput = {
  id: string;
  username?: string | null;
  itineraryName?: string | null;
  bookingType?: string | null;
  bookingStatus?: string | null;
  travelStartDate?: string | null;
  bookingDetails?: string | null;
  vendorId?: string | null;
  packageId?: string | null;
  bookingReference?: string | null;
  email?: string | null;
  mobileNo?: string | null;
  couponCode?: string | null;
  roomType?: string | null;
  basePackagePrice?: string | null;
  discountedPrice?: string | null;
  discountedValue?: string | null;
  paymentDetails?: string | null;
  canceledDate?: string | null;
  refundAmount?: string | null;
};

export type DeleteVYStaycationBookingModelInput = {
  id?: string | null;
};

export type ModelVYCurrentItineraryModelFilterInput = {
  id?: ModelIDFilterInput | null;
  username?: ModelStringFilterInput | null;
  itineraryName?: ModelStringFilterInput | null;
  and?: Array<ModelVYCurrentItineraryModelFilterInput | null> | null;
  or?: Array<ModelVYCurrentItineraryModelFilterInput | null> | null;
  not?: ModelVYCurrentItineraryModelFilterInput | null;
};

export type ModelIDFilterInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
};

export type ModelStringFilterInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
};

export type ModelVYCurrentItineraryModelConnection = {
  __typename: "ModelVYCurrentItineraryModelConnection";
  items?: Array<VYCurrentItineraryModel | null> | null;
  nextToken?: string | null;
};

export type ModelVYUserProfileModelFilterInput = {
  id?: ModelIDFilterInput | null;
  username?: ModelStringFilterInput | null;
  and?: Array<ModelVYUserProfileModelFilterInput | null> | null;
  or?: Array<ModelVYUserProfileModelFilterInput | null> | null;
  not?: ModelVYUserProfileModelFilterInput | null;
};

export type ModelVYUserProfileModelConnection = {
  __typename: "ModelVYUserProfileModelConnection";
  items?: Array<VYUserProfileModel | null> | null;
  nextToken?: string | null;
};

export type ModelVYTravelPackageFilterInput = {
  id?: ModelIDFilterInput | null;
  packagename?: ModelStringFilterInput | null;
  packageStatus?: ModelStringFilterInput | null;
  packageReference?: ModelStringFilterInput | null;
  packageValues?: ModelStringFilterInput | null;
  availableFrom?: ModelStringFilterInput | null;
  availableUpTo?: ModelStringFilterInput | null;
  packageOwners?: ModelStringFilterInput | null;
  groupsCanAccess?: ModelStringFilterInput | null;
  and?: Array<ModelVYTravelPackageFilterInput | null> | null;
  or?: Array<ModelVYTravelPackageFilterInput | null> | null;
  not?: ModelVYTravelPackageFilterInput | null;
};

export type ModelVYTravelPackageConnection = {
  __typename: "ModelVYTravelPackageConnection";
  items?: Array<VYTravelPackage | null> | null;
  nextToken?: string | null;
};

export type ModelVYTrawexSettingsModelFilterInput = {
  id?: ModelIDFilterInput | null;
  and?: Array<ModelVYTrawexSettingsModelFilterInput | null> | null;
  or?: Array<ModelVYTrawexSettingsModelFilterInput | null> | null;
  not?: ModelVYTrawexSettingsModelFilterInput | null;
};

export type ModelVYTrawexSettingsModelConnection = {
  __typename: "ModelVYTrawexSettingsModelConnection";
  items?: Array<VYTrawexSettingsModel | null> | null;
  nextToken?: string | null;
};

export type ModelVYMusementSettingsModelFilterInput = {
  id?: ModelIDFilterInput | null;
  and?: Array<ModelVYMusementSettingsModelFilterInput | null> | null;
  or?: Array<ModelVYMusementSettingsModelFilterInput | null> | null;
  not?: ModelVYMusementSettingsModelFilterInput | null;
};

export type ModelVYMusementSettingsModelConnection = {
  __typename: "ModelVYMusementSettingsModelConnection";
  items?: Array<VYMusementSettingsModel | null> | null;
  nextToken?: string | null;
};

export type ModelVYPackageInventoryModelPrimaryCompositeKeyConditionInput = {
  eq?: ModelVYPackageInventoryModelPrimaryCompositeKeyInput | null;
  le?: ModelVYPackageInventoryModelPrimaryCompositeKeyInput | null;
  lt?: ModelVYPackageInventoryModelPrimaryCompositeKeyInput | null;
  ge?: ModelVYPackageInventoryModelPrimaryCompositeKeyInput | null;
  gt?: ModelVYPackageInventoryModelPrimaryCompositeKeyInput | null;
  between?: Array<ModelVYPackageInventoryModelPrimaryCompositeKeyInput | null> | null;
  beginsWith?: ModelVYPackageInventoryModelPrimaryCompositeKeyInput | null;
};

export type ModelVYPackageInventoryModelPrimaryCompositeKeyInput = {
  inventoryDate?: string | null;
  roomType?: string | null;
};

export type ModelVYPackageInventoryModelFilterInput = {
  packageId?: ModelStringFilterInput | null;
  inventoryDate?: ModelStringFilterInput | null;
  roomType?: ModelStringFilterInput | null;
  totalRooms?: ModelStringFilterInput | null;
  availableRooms?: ModelStringFilterInput | null;
  bookedRooms?: ModelStringFilterInput | null;
  inventoryStatus?: ModelStringFilterInput | null;
  fareInfo?: ModelStringFilterInput | null;
  groupsCanAccess?: ModelStringFilterInput | null;
  and?: Array<ModelVYPackageInventoryModelFilterInput | null> | null;
  or?: Array<ModelVYPackageInventoryModelFilterInput | null> | null;
  not?: ModelVYPackageInventoryModelFilterInput | null;
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC"
}

export type ModelVYPackageInventoryModelConnection = {
  __typename: "ModelVYPackageInventoryModelConnection";
  items?: Array<VYPackageInventoryModel | null> | null;
  nextToken?: string | null;
};

export type ModelVYStaycationInventoryModelFilterInput = {
  id?: ModelIDFilterInput | null;
  packageId?: ModelStringFilterInput | null;
  inventoryDate?: ModelStringFilterInput | null;
  roomType?: ModelStringFilterInput | null;
  totalRooms?: ModelStringFilterInput | null;
  availableRooms?: ModelStringFilterInput | null;
  bookedRooms?: ModelStringFilterInput | null;
  inventoryStatus?: ModelStringFilterInput | null;
  roomId?: ModelStringFilterInput | null;
  packageReference?: ModelStringFilterInput | null;
  fareInfo?: ModelStringFilterInput | null;
  extraData?: ModelStringFilterInput | null;
  groupsCanAccess?: ModelStringFilterInput | null;
  and?: Array<ModelVYStaycationInventoryModelFilterInput | null> | null;
  or?: Array<ModelVYStaycationInventoryModelFilterInput | null> | null;
  not?: ModelVYStaycationInventoryModelFilterInput | null;
};

export type ModelVYStaycationInventoryModelConnection = {
  __typename: "ModelVYStaycationInventoryModelConnection";
  items?: Array<VYStaycationInventoryModel | null> | null;
  nextToken?: string | null;
};

export type ModelStringKeyConditionInput = {
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
};

export type ModelVYCouponBatchesFilterInput = {
  vendorId?: ModelIDFilterInput | null;
  createdAt?: ModelStringFilterInput | null;
  batchId?: ModelIDFilterInput | null;
  batchName?: ModelStringFilterInput | null;
  batchCode?: ModelStringFilterInput | null;
  packageId?: ModelIDFilterInput | null;
  couponCount?: ModelIntFilterInput | null;
  groupsCanAccess?: ModelStringFilterInput | null;
  and?: Array<ModelVYCouponBatchesFilterInput | null> | null;
  or?: Array<ModelVYCouponBatchesFilterInput | null> | null;
  not?: ModelVYCouponBatchesFilterInput | null;
};

export type ModelIntFilterInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type ModelVYCouponBatchesConnection = {
  __typename: "ModelVYCouponBatchesConnection";
  items?: Array<VYCouponBatches | null> | null;
  nextToken?: string | null;
};

export type ModelIDKeyConditionInput = {
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
};

export type ModelVYVendorsModelFilterInput = {
  id?: ModelIDFilterInput | null;
  vendorName?: ModelStringFilterInput | null;
  vendorCode?: ModelStringFilterInput | null;
  contactPhone?: ModelStringFilterInput | null;
  email?: ModelStringFilterInput | null;
  vendorStatus?: ModelStringFilterInput | null;
  vendorData?: ModelStringFilterInput | null;
  contactAddress?: ModelStringFilterInput | null;
  conginitoName?: ModelStringFilterInput | null;
  cognitoUserId?: ModelStringFilterInput | null;
  congnitoSecret?: ModelStringFilterInput | null;
  groupsCanAccess?: ModelStringFilterInput | null;
  and?: Array<ModelVYVendorsModelFilterInput | null> | null;
  or?: Array<ModelVYVendorsModelFilterInput | null> | null;
  not?: ModelVYVendorsModelFilterInput | null;
};

export type ModelVYVendorsModelConnection = {
  __typename: "ModelVYVendorsModelConnection";
  items?: Array<VYVendorsModel | null> | null;
  nextToken?: string | null;
};

export type ModelVYCouponCodesModelFilterInput = {
  couponCode?: ModelStringFilterInput | null;
  batchCode?: ModelStringFilterInput | null;
  batchId?: ModelIDFilterInput | null;
  packageId?: ModelIDFilterInput | null;
  vendorId?: ModelIDFilterInput | null;
  validFrom?: ModelStringFilterInput | null;
  validUpto?: ModelStringFilterInput | null;
  couponStatus?: ModelStringFilterInput | null;
  discountType?: ModelStringFilterInput | null;
  discountPercent?: ModelStringFilterInput | null;
  discountFixedValue?: ModelStringFilterInput | null;
  groupsCanAccess?: ModelStringFilterInput | null;
  and?: Array<ModelVYCouponCodesModelFilterInput | null> | null;
  or?: Array<ModelVYCouponCodesModelFilterInput | null> | null;
  not?: ModelVYCouponCodesModelFilterInput | null;
};

export type ModelVYCouponCodesModelConnection = {
  __typename: "ModelVYCouponCodesModelConnection";
  items?: Array<VYCouponCodesModel | null> | null;
  nextToken?: string | null;
};

export type ModelVYCustomBookingModelFilterInput = {
  id?: ModelIDFilterInput | null;
  username?: ModelStringFilterInput | null;
  itineraryName?: ModelStringFilterInput | null;
  bookingType?: ModelStringFilterInput | null;
  bookingStatus?: ModelStringFilterInput | null;
  bookingDetails?: ModelStringFilterInput | null;
  travelStartDate?: ModelStringFilterInput | null;
  travelCity?: ModelStringFilterInput | null;
  email?: ModelStringFilterInput | null;
  mobileNo?: ModelStringFilterInput | null;
  bookingDecription?: ModelStringFilterInput | null;
  bookingReference?: ModelStringFilterInput | null;
  paymentDetails?: ModelStringFilterInput | null;
  and?: Array<ModelVYCustomBookingModelFilterInput | null> | null;
  or?: Array<ModelVYCustomBookingModelFilterInput | null> | null;
  not?: ModelVYCustomBookingModelFilterInput | null;
};

export type ModelVYCustomBookingModelConnection = {
  __typename: "ModelVYCustomBookingModelConnection";
  items?: Array<VYCustomBookingModel | null> | null;
  nextToken?: string | null;
};

export type ModelVYStaycationBookingModelFilterInput = {
  id?: ModelIDFilterInput | null;
  username?: ModelStringFilterInput | null;
  itineraryName?: ModelStringFilterInput | null;
  bookingType?: ModelStringFilterInput | null;
  bookingStatus?: ModelStringFilterInput | null;
  travelStartDate?: ModelStringFilterInput | null;
  bookingDetails?: ModelStringFilterInput | null;
  vendorId?: ModelStringFilterInput | null;
  packageId?: ModelStringFilterInput | null;
  bookingReference?: ModelStringFilterInput | null;
  email?: ModelStringFilterInput | null;
  mobileNo?: ModelStringFilterInput | null;
  couponCode?: ModelStringFilterInput | null;
  roomType?: ModelStringFilterInput | null;
  basePackagePrice?: ModelStringFilterInput | null;
  discountedPrice?: ModelStringFilterInput | null;
  discountedValue?: ModelStringFilterInput | null;
  paymentDetails?: ModelStringFilterInput | null;
  canceledDate?: ModelStringFilterInput | null;
  refundAmount?: ModelStringFilterInput | null;
  and?: Array<ModelVYStaycationBookingModelFilterInput | null> | null;
  or?: Array<ModelVYStaycationBookingModelFilterInput | null> | null;
  not?: ModelVYStaycationBookingModelFilterInput | null;
};

export type ModelVYStaycationBookingModelConnection = {
  __typename: "ModelVYStaycationBookingModelConnection";
  items?: Array<VYStaycationBookingModel | null> | null;
  nextToken?: string | null;
};

export type CreateVyCurrentItineraryModelMutation = {
  __typename: "VYCurrentItineraryModel";
  id: string;
  username?: string | null;
  itineraryName?: string | null;
  currentItinerary?: {
    __typename: "VYCurrentItinerary";
    itineraryName?: string | null;
    startDate?: string | null;
    endDate?: string | null;
    originCity?: {
      __typename: "VYCity";
      id?: number | null;
      airportCode?: Array<string | null> | null;
      airportName?: Array<string | null> | null;
      cityName?: string | null;
      countryCode?: string | null;
      countryName?: string | null;
      vendorName?: string | null;
      latitude?: number | null;
      longitude?: number | null;
    } | null;
    destinationCities?: Array<{
      __typename: "VYCity";
      id?: number | null;
      airportCode?: Array<string | null> | null;
      airportName?: Array<string | null> | null;
      cityName?: string | null;
      countryCode?: string | null;
      countryName?: string | null;
      vendorName?: string | null;
      latitude?: number | null;
      longitude?: number | null;
    } | null> | null;
    travelType?: VYTravelType | null;
    travellers?: {
      __typename: "VYTravellerCount";
      adultCount?: number | null;
      childCount?: number | null;
      infantCount?: number | null;
    } | null;
    packageId?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type UpdateVyCurrentItineraryModelMutation = {
  __typename: "VYCurrentItineraryModel";
  id: string;
  username?: string | null;
  itineraryName?: string | null;
  currentItinerary?: {
    __typename: "VYCurrentItinerary";
    itineraryName?: string | null;
    startDate?: string | null;
    endDate?: string | null;
    originCity?: {
      __typename: "VYCity";
      id?: number | null;
      airportCode?: Array<string | null> | null;
      airportName?: Array<string | null> | null;
      cityName?: string | null;
      countryCode?: string | null;
      countryName?: string | null;
      vendorName?: string | null;
      latitude?: number | null;
      longitude?: number | null;
    } | null;
    destinationCities?: Array<{
      __typename: "VYCity";
      id?: number | null;
      airportCode?: Array<string | null> | null;
      airportName?: Array<string | null> | null;
      cityName?: string | null;
      countryCode?: string | null;
      countryName?: string | null;
      vendorName?: string | null;
      latitude?: number | null;
      longitude?: number | null;
    } | null> | null;
    travelType?: VYTravelType | null;
    travellers?: {
      __typename: "VYTravellerCount";
      adultCount?: number | null;
      childCount?: number | null;
      infantCount?: number | null;
    } | null;
    packageId?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type DeleteVyCurrentItineraryModelMutation = {
  __typename: "VYCurrentItineraryModel";
  id: string;
  username?: string | null;
  itineraryName?: string | null;
  currentItinerary?: {
    __typename: "VYCurrentItinerary";
    itineraryName?: string | null;
    startDate?: string | null;
    endDate?: string | null;
    originCity?: {
      __typename: "VYCity";
      id?: number | null;
      airportCode?: Array<string | null> | null;
      airportName?: Array<string | null> | null;
      cityName?: string | null;
      countryCode?: string | null;
      countryName?: string | null;
      vendorName?: string | null;
      latitude?: number | null;
      longitude?: number | null;
    } | null;
    destinationCities?: Array<{
      __typename: "VYCity";
      id?: number | null;
      airportCode?: Array<string | null> | null;
      airportName?: Array<string | null> | null;
      cityName?: string | null;
      countryCode?: string | null;
      countryName?: string | null;
      vendorName?: string | null;
      latitude?: number | null;
      longitude?: number | null;
    } | null> | null;
    travelType?: VYTravelType | null;
    travellers?: {
      __typename: "VYTravellerCount";
      adultCount?: number | null;
      childCount?: number | null;
      infantCount?: number | null;
    } | null;
    packageId?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type CreateVyUserProfileModelMutation = {
  __typename: "VYUserProfileModel";
  id: string;
  username?: string | null;
  userProfile?: {
    __typename: "VYUserProfile";
    id?: string | null;
    firstName?: string | null;
    middleName?: string | null;
    lastName?: string | null;
    relationshipToUser?: string | null;
    dateOfBirth?: string | null;
    gender?: string | null;
    maritalStatus?: string | null;
    mobileNo?: string | null;
    isMobileVerified?: boolean | null;
    email?: string | null;
    isEmailVerified?: boolean | null;
    idDetails?: Array<{
      __typename: "VYIdentificationDetails";
      idType?: string | null;
      idNumber?: string | null;
      issuedOn?: string | null;
      expiryDate?: string | null;
      countryName?: string | null;
      cityName?: string | null;
    } | null> | null;
    address?: string | null;
    cityName?: string | null;
    countryName?: string | null;
    zipCode?: string | null;
  } | null;
  familyProfile?: Array<{
    __typename: "VYUserProfile";
    id?: string | null;
    firstName?: string | null;
    middleName?: string | null;
    lastName?: string | null;
    relationshipToUser?: string | null;
    dateOfBirth?: string | null;
    gender?: string | null;
    maritalStatus?: string | null;
    mobileNo?: string | null;
    isMobileVerified?: boolean | null;
    email?: string | null;
    isEmailVerified?: boolean | null;
    idDetails?: Array<{
      __typename: "VYIdentificationDetails";
      idType?: string | null;
      idNumber?: string | null;
      issuedOn?: string | null;
      expiryDate?: string | null;
      countryName?: string | null;
      cityName?: string | null;
    } | null> | null;
    address?: string | null;
    cityName?: string | null;
    countryName?: string | null;
    zipCode?: string | null;
  } | null> | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type UpdateVyUserProfileModelMutation = {
  __typename: "VYUserProfileModel";
  id: string;
  username?: string | null;
  userProfile?: {
    __typename: "VYUserProfile";
    id?: string | null;
    firstName?: string | null;
    middleName?: string | null;
    lastName?: string | null;
    relationshipToUser?: string | null;
    dateOfBirth?: string | null;
    gender?: string | null;
    maritalStatus?: string | null;
    mobileNo?: string | null;
    isMobileVerified?: boolean | null;
    email?: string | null;
    isEmailVerified?: boolean | null;
    idDetails?: Array<{
      __typename: "VYIdentificationDetails";
      idType?: string | null;
      idNumber?: string | null;
      issuedOn?: string | null;
      expiryDate?: string | null;
      countryName?: string | null;
      cityName?: string | null;
    } | null> | null;
    address?: string | null;
    cityName?: string | null;
    countryName?: string | null;
    zipCode?: string | null;
  } | null;
  familyProfile?: Array<{
    __typename: "VYUserProfile";
    id?: string | null;
    firstName?: string | null;
    middleName?: string | null;
    lastName?: string | null;
    relationshipToUser?: string | null;
    dateOfBirth?: string | null;
    gender?: string | null;
    maritalStatus?: string | null;
    mobileNo?: string | null;
    isMobileVerified?: boolean | null;
    email?: string | null;
    isEmailVerified?: boolean | null;
    idDetails?: Array<{
      __typename: "VYIdentificationDetails";
      idType?: string | null;
      idNumber?: string | null;
      issuedOn?: string | null;
      expiryDate?: string | null;
      countryName?: string | null;
      cityName?: string | null;
    } | null> | null;
    address?: string | null;
    cityName?: string | null;
    countryName?: string | null;
    zipCode?: string | null;
  } | null> | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type DeleteVyUserProfileModelMutation = {
  __typename: "VYUserProfileModel";
  id: string;
  username?: string | null;
  userProfile?: {
    __typename: "VYUserProfile";
    id?: string | null;
    firstName?: string | null;
    middleName?: string | null;
    lastName?: string | null;
    relationshipToUser?: string | null;
    dateOfBirth?: string | null;
    gender?: string | null;
    maritalStatus?: string | null;
    mobileNo?: string | null;
    isMobileVerified?: boolean | null;
    email?: string | null;
    isEmailVerified?: boolean | null;
    idDetails?: Array<{
      __typename: "VYIdentificationDetails";
      idType?: string | null;
      idNumber?: string | null;
      issuedOn?: string | null;
      expiryDate?: string | null;
      countryName?: string | null;
      cityName?: string | null;
    } | null> | null;
    address?: string | null;
    cityName?: string | null;
    countryName?: string | null;
    zipCode?: string | null;
  } | null;
  familyProfile?: Array<{
    __typename: "VYUserProfile";
    id?: string | null;
    firstName?: string | null;
    middleName?: string | null;
    lastName?: string | null;
    relationshipToUser?: string | null;
    dateOfBirth?: string | null;
    gender?: string | null;
    maritalStatus?: string | null;
    mobileNo?: string | null;
    isMobileVerified?: boolean | null;
    email?: string | null;
    isEmailVerified?: boolean | null;
    idDetails?: Array<{
      __typename: "VYIdentificationDetails";
      idType?: string | null;
      idNumber?: string | null;
      issuedOn?: string | null;
      expiryDate?: string | null;
      countryName?: string | null;
      cityName?: string | null;
    } | null> | null;
    address?: string | null;
    cityName?: string | null;
    countryName?: string | null;
    zipCode?: string | null;
  } | null> | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type CreateVyTravelPackageMutation = {
  __typename: "VYTravelPackage";
  id: string;
  packagename?: string | null;
  packageStatus?: string | null;
  packageReference: string;
  packageValues?: string | null;
  availableFrom?: string | null;
  availableUpTo?: string | null;
  packageOwners?: Array<string | null> | null;
  groupsCanAccess?: Array<string | null> | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateVyTravelPackageMutation = {
  __typename: "VYTravelPackage";
  id: string;
  packagename?: string | null;
  packageStatus?: string | null;
  packageReference: string;
  packageValues?: string | null;
  availableFrom?: string | null;
  availableUpTo?: string | null;
  packageOwners?: Array<string | null> | null;
  groupsCanAccess?: Array<string | null> | null;
  createdAt: string;
  updatedAt: string;
};

export type DeleteVyTravelPackageMutation = {
  __typename: "VYTravelPackage";
  id: string;
  packagename?: string | null;
  packageStatus?: string | null;
  packageReference: string;
  packageValues?: string | null;
  availableFrom?: string | null;
  availableUpTo?: string | null;
  packageOwners?: Array<string | null> | null;
  groupsCanAccess?: Array<string | null> | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateVyTrawexSettingsModelMutation = {
  __typename: "VYTrawexSettingsModel";
  id: string;
  flights?: {
    __typename: "VYTrawexFlightSettings";
    defaultMargin?: {
      __typename: "VYBookingMargin";
      percentValue?: number | null;
      minimumFee?: number | null;
    } | null;
    byAirline?: Array<{
      __typename: "VYMarginExclusions";
      exclusionName?: string | null;
      exclusionCode?: string | null;
      exclusionMargin?: {
        __typename: "VYBookingMargin";
        percentValue?: number | null;
        minimumFee?: number | null;
      } | null;
    } | null> | null;
    byDestination?: Array<{
      __typename: "VYMarginExclusions";
      exclusionName?: string | null;
      exclusionCode?: string | null;
      exclusionMargin?: {
        __typename: "VYBookingMargin";
        percentValue?: number | null;
        minimumFee?: number | null;
      } | null;
    } | null> | null;
    cancelPolicy?: {
      __typename: "VYCancelPolicyEx";
      minimumFee?: number | null;
      adminFee?: number | null;
      cancelRules?: Array<{
        __typename: "VYCancelRuleEx";
        refundPercent?: number | null;
        graceDays?: number | null;
      } | null> | null;
    } | null;
  } | null;
  hotels?: {
    __typename: "VYTrawexHotelSettings";
    defaultMargin?: {
      __typename: "VYBookingMargin";
      percentValue?: number | null;
      minimumFee?: number | null;
    } | null;
    byHotelChain?: Array<{
      __typename: "VYMarginExclusions";
      exclusionName?: string | null;
      exclusionCode?: string | null;
      exclusionMargin?: {
        __typename: "VYBookingMargin";
        percentValue?: number | null;
        minimumFee?: number | null;
      } | null;
    } | null> | null;
    cancelPolicy?: {
      __typename: "VYCancelPolicyEx";
      minimumFee?: number | null;
      adminFee?: number | null;
      cancelRules?: Array<{
        __typename: "VYCancelRuleEx";
        refundPercent?: number | null;
        graceDays?: number | null;
      } | null> | null;
    } | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateVyTrawexSettingsModelMutation = {
  __typename: "VYTrawexSettingsModel";
  id: string;
  flights?: {
    __typename: "VYTrawexFlightSettings";
    defaultMargin?: {
      __typename: "VYBookingMargin";
      percentValue?: number | null;
      minimumFee?: number | null;
    } | null;
    byAirline?: Array<{
      __typename: "VYMarginExclusions";
      exclusionName?: string | null;
      exclusionCode?: string | null;
      exclusionMargin?: {
        __typename: "VYBookingMargin";
        percentValue?: number | null;
        minimumFee?: number | null;
      } | null;
    } | null> | null;
    byDestination?: Array<{
      __typename: "VYMarginExclusions";
      exclusionName?: string | null;
      exclusionCode?: string | null;
      exclusionMargin?: {
        __typename: "VYBookingMargin";
        percentValue?: number | null;
        minimumFee?: number | null;
      } | null;
    } | null> | null;
    cancelPolicy?: {
      __typename: "VYCancelPolicyEx";
      minimumFee?: number | null;
      adminFee?: number | null;
      cancelRules?: Array<{
        __typename: "VYCancelRuleEx";
        refundPercent?: number | null;
        graceDays?: number | null;
      } | null> | null;
    } | null;
  } | null;
  hotels?: {
    __typename: "VYTrawexHotelSettings";
    defaultMargin?: {
      __typename: "VYBookingMargin";
      percentValue?: number | null;
      minimumFee?: number | null;
    } | null;
    byHotelChain?: Array<{
      __typename: "VYMarginExclusions";
      exclusionName?: string | null;
      exclusionCode?: string | null;
      exclusionMargin?: {
        __typename: "VYBookingMargin";
        percentValue?: number | null;
        minimumFee?: number | null;
      } | null;
    } | null> | null;
    cancelPolicy?: {
      __typename: "VYCancelPolicyEx";
      minimumFee?: number | null;
      adminFee?: number | null;
      cancelRules?: Array<{
        __typename: "VYCancelRuleEx";
        refundPercent?: number | null;
        graceDays?: number | null;
      } | null> | null;
    } | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type DeleteVyTrawexSettingsModelMutation = {
  __typename: "VYTrawexSettingsModel";
  id: string;
  flights?: {
    __typename: "VYTrawexFlightSettings";
    defaultMargin?: {
      __typename: "VYBookingMargin";
      percentValue?: number | null;
      minimumFee?: number | null;
    } | null;
    byAirline?: Array<{
      __typename: "VYMarginExclusions";
      exclusionName?: string | null;
      exclusionCode?: string | null;
      exclusionMargin?: {
        __typename: "VYBookingMargin";
        percentValue?: number | null;
        minimumFee?: number | null;
      } | null;
    } | null> | null;
    byDestination?: Array<{
      __typename: "VYMarginExclusions";
      exclusionName?: string | null;
      exclusionCode?: string | null;
      exclusionMargin?: {
        __typename: "VYBookingMargin";
        percentValue?: number | null;
        minimumFee?: number | null;
      } | null;
    } | null> | null;
    cancelPolicy?: {
      __typename: "VYCancelPolicyEx";
      minimumFee?: number | null;
      adminFee?: number | null;
      cancelRules?: Array<{
        __typename: "VYCancelRuleEx";
        refundPercent?: number | null;
        graceDays?: number | null;
      } | null> | null;
    } | null;
  } | null;
  hotels?: {
    __typename: "VYTrawexHotelSettings";
    defaultMargin?: {
      __typename: "VYBookingMargin";
      percentValue?: number | null;
      minimumFee?: number | null;
    } | null;
    byHotelChain?: Array<{
      __typename: "VYMarginExclusions";
      exclusionName?: string | null;
      exclusionCode?: string | null;
      exclusionMargin?: {
        __typename: "VYBookingMargin";
        percentValue?: number | null;
        minimumFee?: number | null;
      } | null;
    } | null> | null;
    cancelPolicy?: {
      __typename: "VYCancelPolicyEx";
      minimumFee?: number | null;
      adminFee?: number | null;
      cancelRules?: Array<{
        __typename: "VYCancelRuleEx";
        refundPercent?: number | null;
        graceDays?: number | null;
      } | null> | null;
    } | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateVyMusementSettingsModelMutation = {
  __typename: "VYMusementSettingsModel";
  id: string;
  activities?: {
    __typename: "VYMusementActivitySettings";
    defaultMargin?: {
      __typename: "VYBookingMargin";
      percentValue?: number | null;
      minimumFee?: number | null;
    } | null;
    byActivity?: Array<{
      __typename: "VYMarginExclusions";
      exclusionName?: string | null;
      exclusionCode?: string | null;
      exclusionMargin?: {
        __typename: "VYBookingMargin";
        percentValue?: number | null;
        minimumFee?: number | null;
      } | null;
    } | null> | null;
    cancelPolicy?: {
      __typename: "VYCancelPolicyEx";
      minimumFee?: number | null;
      adminFee?: number | null;
      cancelRules?: Array<{
        __typename: "VYCancelRuleEx";
        refundPercent?: number | null;
        graceDays?: number | null;
      } | null> | null;
    } | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateVyMusementSettingsModelMutation = {
  __typename: "VYMusementSettingsModel";
  id: string;
  activities?: {
    __typename: "VYMusementActivitySettings";
    defaultMargin?: {
      __typename: "VYBookingMargin";
      percentValue?: number | null;
      minimumFee?: number | null;
    } | null;
    byActivity?: Array<{
      __typename: "VYMarginExclusions";
      exclusionName?: string | null;
      exclusionCode?: string | null;
      exclusionMargin?: {
        __typename: "VYBookingMargin";
        percentValue?: number | null;
        minimumFee?: number | null;
      } | null;
    } | null> | null;
    cancelPolicy?: {
      __typename: "VYCancelPolicyEx";
      minimumFee?: number | null;
      adminFee?: number | null;
      cancelRules?: Array<{
        __typename: "VYCancelRuleEx";
        refundPercent?: number | null;
        graceDays?: number | null;
      } | null> | null;
    } | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type DeleteVyMusementSettingsModelMutation = {
  __typename: "VYMusementSettingsModel";
  id: string;
  activities?: {
    __typename: "VYMusementActivitySettings";
    defaultMargin?: {
      __typename: "VYBookingMargin";
      percentValue?: number | null;
      minimumFee?: number | null;
    } | null;
    byActivity?: Array<{
      __typename: "VYMarginExclusions";
      exclusionName?: string | null;
      exclusionCode?: string | null;
      exclusionMargin?: {
        __typename: "VYBookingMargin";
        percentValue?: number | null;
        minimumFee?: number | null;
      } | null;
    } | null> | null;
    cancelPolicy?: {
      __typename: "VYCancelPolicyEx";
      minimumFee?: number | null;
      adminFee?: number | null;
      cancelRules?: Array<{
        __typename: "VYCancelRuleEx";
        refundPercent?: number | null;
        graceDays?: number | null;
      } | null> | null;
    } | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateVyPackageInventoryModelMutation = {
  __typename: "VYPackageInventoryModel";
  packageId: string;
  inventoryDate: string;
  roomType: string;
  totalRooms: string;
  availableRooms: string;
  bookedRooms: string;
  inventoryStatus: string;
  fareInfo?: string | null;
  groupsCanAccess?: Array<string | null> | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type UpdateVyPackageInventoryModelMutation = {
  __typename: "VYPackageInventoryModel";
  packageId: string;
  inventoryDate: string;
  roomType: string;
  totalRooms: string;
  availableRooms: string;
  bookedRooms: string;
  inventoryStatus: string;
  fareInfo?: string | null;
  groupsCanAccess?: Array<string | null> | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type DeleteVyPackageInventoryModelMutation = {
  __typename: "VYPackageInventoryModel";
  packageId: string;
  inventoryDate: string;
  roomType: string;
  totalRooms: string;
  availableRooms: string;
  bookedRooms: string;
  inventoryStatus: string;
  fareInfo?: string | null;
  groupsCanAccess?: Array<string | null> | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type CreateVyStaycationInventoryModelMutation = {
  __typename: "VYStaycationInventoryModel";
  id: string;
  packageId: string;
  inventoryDate: string;
  roomType: string;
  totalRooms: string;
  availableRooms: string;
  bookedRooms: string;
  inventoryStatus: string;
  roomId?: string | null;
  packageReference?: string | null;
  fareInfo?: string | null;
  extraData?: string | null;
  groupsCanAccess?: Array<string | null> | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type UpdateVyStaycationInventoryModelMutation = {
  __typename: "VYStaycationInventoryModel";
  id: string;
  packageId: string;
  inventoryDate: string;
  roomType: string;
  totalRooms: string;
  availableRooms: string;
  bookedRooms: string;
  inventoryStatus: string;
  roomId?: string | null;
  packageReference?: string | null;
  fareInfo?: string | null;
  extraData?: string | null;
  groupsCanAccess?: Array<string | null> | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type DeleteVyStaycationInventoryModelMutation = {
  __typename: "VYStaycationInventoryModel";
  id: string;
  packageId: string;
  inventoryDate: string;
  roomType: string;
  totalRooms: string;
  availableRooms: string;
  bookedRooms: string;
  inventoryStatus: string;
  roomId?: string | null;
  packageReference?: string | null;
  fareInfo?: string | null;
  extraData?: string | null;
  groupsCanAccess?: Array<string | null> | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type CreateVyCouponBatchesMutation = {
  __typename: "VYCouponBatches";
  vendorId: string;
  createdAt: string;
  batchId: string;
  batchName: string;
  batchCode: string;
  packageId: string;
  couponCount: number;
  groupsCanAccess?: Array<string | null> | null;
  updatedAt: string;
  owner?: string | null;
};

export type UpdateVyCouponBatchesMutation = {
  __typename: "VYCouponBatches";
  vendorId: string;
  createdAt: string;
  batchId: string;
  batchName: string;
  batchCode: string;
  packageId: string;
  couponCount: number;
  groupsCanAccess?: Array<string | null> | null;
  updatedAt: string;
  owner?: string | null;
};

export type DeleteVyCouponBatchesMutation = {
  __typename: "VYCouponBatches";
  vendorId: string;
  createdAt: string;
  batchId: string;
  batchName: string;
  batchCode: string;
  packageId: string;
  couponCount: number;
  groupsCanAccess?: Array<string | null> | null;
  updatedAt: string;
  owner?: string | null;
};

export type CreateVyVendorsModelMutation = {
  __typename: "VYVendorsModel";
  id: string;
  vendorName: string;
  vendorCode: string;
  contactPhone?: string | null;
  email?: string | null;
  vendorStatus?: string | null;
  vendorData?: string | null;
  contactAddress?: string | null;
  conginitoName?: string | null;
  cognitoUserId?: string | null;
  congnitoSecret?: string | null;
  groupsCanAccess?: Array<string | null> | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type UpdateVyVendorsModelMutation = {
  __typename: "VYVendorsModel";
  id: string;
  vendorName: string;
  vendorCode: string;
  contactPhone?: string | null;
  email?: string | null;
  vendorStatus?: string | null;
  vendorData?: string | null;
  contactAddress?: string | null;
  conginitoName?: string | null;
  cognitoUserId?: string | null;
  congnitoSecret?: string | null;
  groupsCanAccess?: Array<string | null> | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type DeleteVyVendorsModelMutation = {
  __typename: "VYVendorsModel";
  id: string;
  vendorName: string;
  vendorCode: string;
  contactPhone?: string | null;
  email?: string | null;
  vendorStatus?: string | null;
  vendorData?: string | null;
  contactAddress?: string | null;
  conginitoName?: string | null;
  cognitoUserId?: string | null;
  congnitoSecret?: string | null;
  groupsCanAccess?: Array<string | null> | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type CreateVyCouponCodesModelMutation = {
  __typename: "VYCouponCodesModel";
  couponCode: string;
  batchCode: string;
  batchId: string;
  packageId: string;
  vendorId: string;
  validFrom?: string | null;
  validUpto?: string | null;
  couponStatus?: string | null;
  discountType?: string | null;
  discountPercent?: string | null;
  discountFixedValue?: string | null;
  groupsCanAccess?: Array<string | null> | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type UpdateVyCouponCodesModelMutation = {
  __typename: "VYCouponCodesModel";
  couponCode: string;
  batchCode: string;
  batchId: string;
  packageId: string;
  vendorId: string;
  validFrom?: string | null;
  validUpto?: string | null;
  couponStatus?: string | null;
  discountType?: string | null;
  discountPercent?: string | null;
  discountFixedValue?: string | null;
  groupsCanAccess?: Array<string | null> | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type DeleteVyCouponCodesModelMutation = {
  __typename: "VYCouponCodesModel";
  couponCode: string;
  batchCode: string;
  batchId: string;
  packageId: string;
  vendorId: string;
  validFrom?: string | null;
  validUpto?: string | null;
  couponStatus?: string | null;
  discountType?: string | null;
  discountPercent?: string | null;
  discountFixedValue?: string | null;
  groupsCanAccess?: Array<string | null> | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type CreateVyCustomBookingModelMutation = {
  __typename: "VYCustomBookingModel";
  id: string;
  username: string;
  itineraryName?: string | null;
  bookingType?: string | null;
  bookingStatus?: string | null;
  bookingDetails?: string | null;
  travelStartDate?: string | null;
  travelCity?: string | null;
  email?: string | null;
  mobileNo?: string | null;
  bookingDecription?: string | null;
  bookingReference: string;
  paymentDetails?: string | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type UpdateVyCustomBookingModelMutation = {
  __typename: "VYCustomBookingModel";
  id: string;
  username: string;
  itineraryName?: string | null;
  bookingType?: string | null;
  bookingStatus?: string | null;
  bookingDetails?: string | null;
  travelStartDate?: string | null;
  travelCity?: string | null;
  email?: string | null;
  mobileNo?: string | null;
  bookingDecription?: string | null;
  bookingReference: string;
  paymentDetails?: string | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type DeleteVyCustomBookingModelMutation = {
  __typename: "VYCustomBookingModel";
  id: string;
  username: string;
  itineraryName?: string | null;
  bookingType?: string | null;
  bookingStatus?: string | null;
  bookingDetails?: string | null;
  travelStartDate?: string | null;
  travelCity?: string | null;
  email?: string | null;
  mobileNo?: string | null;
  bookingDecription?: string | null;
  bookingReference: string;
  paymentDetails?: string | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type CreateVyStaycationBookingModelMutation = {
  __typename: "VYStaycationBookingModel";
  id: string;
  username: string;
  itineraryName?: string | null;
  bookingType?: string | null;
  bookingStatus?: string | null;
  travelStartDate?: string | null;
  bookingDetails?: string | null;
  vendorId: string;
  packageId: string;
  bookingReference: string;
  email?: string | null;
  mobileNo?: string | null;
  couponCode?: string | null;
  roomType?: string | null;
  basePackagePrice?: string | null;
  discountedPrice?: string | null;
  discountedValue?: string | null;
  paymentDetails?: string | null;
  canceledDate?: string | null;
  refundAmount?: string | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type UpdateVyStaycationBookingModelMutation = {
  __typename: "VYStaycationBookingModel";
  id: string;
  username: string;
  itineraryName?: string | null;
  bookingType?: string | null;
  bookingStatus?: string | null;
  travelStartDate?: string | null;
  bookingDetails?: string | null;
  vendorId: string;
  packageId: string;
  bookingReference: string;
  email?: string | null;
  mobileNo?: string | null;
  couponCode?: string | null;
  roomType?: string | null;
  basePackagePrice?: string | null;
  discountedPrice?: string | null;
  discountedValue?: string | null;
  paymentDetails?: string | null;
  canceledDate?: string | null;
  refundAmount?: string | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type DeleteVyStaycationBookingModelMutation = {
  __typename: "VYStaycationBookingModel";
  id: string;
  username: string;
  itineraryName?: string | null;
  bookingType?: string | null;
  bookingStatus?: string | null;
  travelStartDate?: string | null;
  bookingDetails?: string | null;
  vendorId: string;
  packageId: string;
  bookingReference: string;
  email?: string | null;
  mobileNo?: string | null;
  couponCode?: string | null;
  roomType?: string | null;
  basePackagePrice?: string | null;
  discountedPrice?: string | null;
  discountedValue?: string | null;
  paymentDetails?: string | null;
  canceledDate?: string | null;
  refundAmount?: string | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type GetVyCurrentItineraryModelQuery = {
  __typename: "VYCurrentItineraryModel";
  id: string;
  username?: string | null;
  itineraryName?: string | null;
  currentItinerary?: {
    __typename: "VYCurrentItinerary";
    itineraryName?: string | null;
    startDate?: string | null;
    endDate?: string | null;
    originCity?: {
      __typename: "VYCity";
      id?: number | null;
      airportCode?: Array<string | null> | null;
      airportName?: Array<string | null> | null;
      cityName?: string | null;
      countryCode?: string | null;
      countryName?: string | null;
      vendorName?: string | null;
      latitude?: number | null;
      longitude?: number | null;
    } | null;
    destinationCities?: Array<{
      __typename: "VYCity";
      id?: number | null;
      airportCode?: Array<string | null> | null;
      airportName?: Array<string | null> | null;
      cityName?: string | null;
      countryCode?: string | null;
      countryName?: string | null;
      vendorName?: string | null;
      latitude?: number | null;
      longitude?: number | null;
    } | null> | null;
    travelType?: VYTravelType | null;
    travellers?: {
      __typename: "VYTravellerCount";
      adultCount?: number | null;
      childCount?: number | null;
      infantCount?: number | null;
    } | null;
    packageId?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type ListVyCurrentItineraryModelsQuery = {
  __typename: "ModelVYCurrentItineraryModelConnection";
  items?: Array<{
    __typename: "VYCurrentItineraryModel";
    id: string;
    username?: string | null;
    itineraryName?: string | null;
    currentItinerary?: {
      __typename: "VYCurrentItinerary";
      itineraryName?: string | null;
      startDate?: string | null;
      endDate?: string | null;
      originCity?: {
        __typename: "VYCity";
        id?: number | null;
        airportCode?: Array<string | null> | null;
        airportName?: Array<string | null> | null;
        cityName?: string | null;
        countryCode?: string | null;
        countryName?: string | null;
        vendorName?: string | null;
        latitude?: number | null;
        longitude?: number | null;
      } | null;
      destinationCities?: Array<{
        __typename: "VYCity";
        id?: number | null;
        airportCode?: Array<string | null> | null;
        airportName?: Array<string | null> | null;
        cityName?: string | null;
        countryCode?: string | null;
        countryName?: string | null;
        vendorName?: string | null;
        latitude?: number | null;
        longitude?: number | null;
      } | null> | null;
      travelType?: VYTravelType | null;
      travellers?: {
        __typename: "VYTravellerCount";
        adultCount?: number | null;
        childCount?: number | null;
        infantCount?: number | null;
      } | null;
      packageId?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null> | null;
  nextToken?: string | null;
};

export type GetVyUserProfileModelQuery = {
  __typename: "VYUserProfileModel";
  id: string;
  username?: string | null;
  userProfile?: {
    __typename: "VYUserProfile";
    id?: string | null;
    firstName?: string | null;
    middleName?: string | null;
    lastName?: string | null;
    relationshipToUser?: string | null;
    dateOfBirth?: string | null;
    gender?: string | null;
    maritalStatus?: string | null;
    mobileNo?: string | null;
    isMobileVerified?: boolean | null;
    email?: string | null;
    isEmailVerified?: boolean | null;
    idDetails?: Array<{
      __typename: "VYIdentificationDetails";
      idType?: string | null;
      idNumber?: string | null;
      issuedOn?: string | null;
      expiryDate?: string | null;
      countryName?: string | null;
      cityName?: string | null;
    } | null> | null;
    address?: string | null;
    cityName?: string | null;
    countryName?: string | null;
    zipCode?: string | null;
  } | null;
  familyProfile?: Array<{
    __typename: "VYUserProfile";
    id?: string | null;
    firstName?: string | null;
    middleName?: string | null;
    lastName?: string | null;
    relationshipToUser?: string | null;
    dateOfBirth?: string | null;
    gender?: string | null;
    maritalStatus?: string | null;
    mobileNo?: string | null;
    isMobileVerified?: boolean | null;
    email?: string | null;
    isEmailVerified?: boolean | null;
    idDetails?: Array<{
      __typename: "VYIdentificationDetails";
      idType?: string | null;
      idNumber?: string | null;
      issuedOn?: string | null;
      expiryDate?: string | null;
      countryName?: string | null;
      cityName?: string | null;
    } | null> | null;
    address?: string | null;
    cityName?: string | null;
    countryName?: string | null;
    zipCode?: string | null;
  } | null> | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type ListVyUserProfileModelsQuery = {
  __typename: "ModelVYUserProfileModelConnection";
  items?: Array<{
    __typename: "VYUserProfileModel";
    id: string;
    username?: string | null;
    userProfile?: {
      __typename: "VYUserProfile";
      id?: string | null;
      firstName?: string | null;
      middleName?: string | null;
      lastName?: string | null;
      relationshipToUser?: string | null;
      dateOfBirth?: string | null;
      gender?: string | null;
      maritalStatus?: string | null;
      mobileNo?: string | null;
      isMobileVerified?: boolean | null;
      email?: string | null;
      isEmailVerified?: boolean | null;
      idDetails?: Array<{
        __typename: "VYIdentificationDetails";
        idType?: string | null;
        idNumber?: string | null;
        issuedOn?: string | null;
        expiryDate?: string | null;
        countryName?: string | null;
        cityName?: string | null;
      } | null> | null;
      address?: string | null;
      cityName?: string | null;
      countryName?: string | null;
      zipCode?: string | null;
    } | null;
    familyProfile?: Array<{
      __typename: "VYUserProfile";
      id?: string | null;
      firstName?: string | null;
      middleName?: string | null;
      lastName?: string | null;
      relationshipToUser?: string | null;
      dateOfBirth?: string | null;
      gender?: string | null;
      maritalStatus?: string | null;
      mobileNo?: string | null;
      isMobileVerified?: boolean | null;
      email?: string | null;
      isEmailVerified?: boolean | null;
      idDetails?: Array<{
        __typename: "VYIdentificationDetails";
        idType?: string | null;
        idNumber?: string | null;
        issuedOn?: string | null;
        expiryDate?: string | null;
        countryName?: string | null;
        cityName?: string | null;
      } | null> | null;
      address?: string | null;
      cityName?: string | null;
      countryName?: string | null;
      zipCode?: string | null;
    } | null> | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null> | null;
  nextToken?: string | null;
};

export type GetVyTravelPackageQuery = {
  __typename: "VYTravelPackage";
  id: string;
  packagename?: string | null;
  packageStatus?: string | null;
  packageReference: string;
  packageValues?: string | null;
  availableFrom?: string | null;
  availableUpTo?: string | null;
  packageOwners?: Array<string | null> | null;
  groupsCanAccess?: Array<string | null> | null;
  createdAt: string;
  updatedAt: string;
};

export type ListVyTravelPackagesQuery = {
  __typename: "ModelVYTravelPackageConnection";
  items?: Array<{
    __typename: "VYTravelPackage";
    id: string;
    packagename?: string | null;
    packageStatus?: string | null;
    packageReference: string;
    packageValues?: string | null;
    availableFrom?: string | null;
    availableUpTo?: string | null;
    packageOwners?: Array<string | null> | null;
    groupsCanAccess?: Array<string | null> | null;
    createdAt: string;
    updatedAt: string;
  } | null> | null;
  nextToken?: string | null;
};

export type GetVyTrawexSettingsModelQuery = {
  __typename: "VYTrawexSettingsModel";
  id: string;
  flights?: {
    __typename: "VYTrawexFlightSettings";
    defaultMargin?: {
      __typename: "VYBookingMargin";
      percentValue?: number | null;
      minimumFee?: number | null;
    } | null;
    byAirline?: Array<{
      __typename: "VYMarginExclusions";
      exclusionName?: string | null;
      exclusionCode?: string | null;
      exclusionMargin?: {
        __typename: "VYBookingMargin";
        percentValue?: number | null;
        minimumFee?: number | null;
      } | null;
    } | null> | null;
    byDestination?: Array<{
      __typename: "VYMarginExclusions";
      exclusionName?: string | null;
      exclusionCode?: string | null;
      exclusionMargin?: {
        __typename: "VYBookingMargin";
        percentValue?: number | null;
        minimumFee?: number | null;
      } | null;
    } | null> | null;
    cancelPolicy?: {
      __typename: "VYCancelPolicyEx";
      minimumFee?: number | null;
      adminFee?: number | null;
      cancelRules?: Array<{
        __typename: "VYCancelRuleEx";
        refundPercent?: number | null;
        graceDays?: number | null;
      } | null> | null;
    } | null;
  } | null;
  hotels?: {
    __typename: "VYTrawexHotelSettings";
    defaultMargin?: {
      __typename: "VYBookingMargin";
      percentValue?: number | null;
      minimumFee?: number | null;
    } | null;
    byHotelChain?: Array<{
      __typename: "VYMarginExclusions";
      exclusionName?: string | null;
      exclusionCode?: string | null;
      exclusionMargin?: {
        __typename: "VYBookingMargin";
        percentValue?: number | null;
        minimumFee?: number | null;
      } | null;
    } | null> | null;
    cancelPolicy?: {
      __typename: "VYCancelPolicyEx";
      minimumFee?: number | null;
      adminFee?: number | null;
      cancelRules?: Array<{
        __typename: "VYCancelRuleEx";
        refundPercent?: number | null;
        graceDays?: number | null;
      } | null> | null;
    } | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type ListVyTrawexSettingsModelsQuery = {
  __typename: "ModelVYTrawexSettingsModelConnection";
  items?: Array<{
    __typename: "VYTrawexSettingsModel";
    id: string;
    flights?: {
      __typename: "VYTrawexFlightSettings";
      defaultMargin?: {
        __typename: "VYBookingMargin";
        percentValue?: number | null;
        minimumFee?: number | null;
      } | null;
      byAirline?: Array<{
        __typename: "VYMarginExclusions";
        exclusionName?: string | null;
        exclusionCode?: string | null;
      } | null> | null;
      byDestination?: Array<{
        __typename: "VYMarginExclusions";
        exclusionName?: string | null;
        exclusionCode?: string | null;
      } | null> | null;
      cancelPolicy?: {
        __typename: "VYCancelPolicyEx";
        minimumFee?: number | null;
        adminFee?: number | null;
      } | null;
    } | null;
    hotels?: {
      __typename: "VYTrawexHotelSettings";
      defaultMargin?: {
        __typename: "VYBookingMargin";
        percentValue?: number | null;
        minimumFee?: number | null;
      } | null;
      byHotelChain?: Array<{
        __typename: "VYMarginExclusions";
        exclusionName?: string | null;
        exclusionCode?: string | null;
      } | null> | null;
      cancelPolicy?: {
        __typename: "VYCancelPolicyEx";
        minimumFee?: number | null;
        adminFee?: number | null;
      } | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null> | null;
  nextToken?: string | null;
};

export type GetVyMusementSettingsModelQuery = {
  __typename: "VYMusementSettingsModel";
  id: string;
  activities?: {
    __typename: "VYMusementActivitySettings";
    defaultMargin?: {
      __typename: "VYBookingMargin";
      percentValue?: number | null;
      minimumFee?: number | null;
    } | null;
    byActivity?: Array<{
      __typename: "VYMarginExclusions";
      exclusionName?: string | null;
      exclusionCode?: string | null;
      exclusionMargin?: {
        __typename: "VYBookingMargin";
        percentValue?: number | null;
        minimumFee?: number | null;
      } | null;
    } | null> | null;
    cancelPolicy?: {
      __typename: "VYCancelPolicyEx";
      minimumFee?: number | null;
      adminFee?: number | null;
      cancelRules?: Array<{
        __typename: "VYCancelRuleEx";
        refundPercent?: number | null;
        graceDays?: number | null;
      } | null> | null;
    } | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type ListVyMusementSettingsModelsQuery = {
  __typename: "ModelVYMusementSettingsModelConnection";
  items?: Array<{
    __typename: "VYMusementSettingsModel";
    id: string;
    activities?: {
      __typename: "VYMusementActivitySettings";
      defaultMargin?: {
        __typename: "VYBookingMargin";
        percentValue?: number | null;
        minimumFee?: number | null;
      } | null;
      byActivity?: Array<{
        __typename: "VYMarginExclusions";
        exclusionName?: string | null;
        exclusionCode?: string | null;
      } | null> | null;
      cancelPolicy?: {
        __typename: "VYCancelPolicyEx";
        minimumFee?: number | null;
        adminFee?: number | null;
      } | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null> | null;
  nextToken?: string | null;
};

export type GetVyPackageInventoryModelQuery = {
  __typename: "VYPackageInventoryModel";
  packageId: string;
  inventoryDate: string;
  roomType: string;
  totalRooms: string;
  availableRooms: string;
  bookedRooms: string;
  inventoryStatus: string;
  fareInfo?: string | null;
  groupsCanAccess?: Array<string | null> | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type ListVyPackageInventoryModelsQuery = {
  __typename: "ModelVYPackageInventoryModelConnection";
  items?: Array<{
    __typename: "VYPackageInventoryModel";
    packageId: string;
    inventoryDate: string;
    roomType: string;
    totalRooms: string;
    availableRooms: string;
    bookedRooms: string;
    inventoryStatus: string;
    fareInfo?: string | null;
    groupsCanAccess?: Array<string | null> | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null> | null;
  nextToken?: string | null;
};

export type GetVyStaycationInventoryModelQuery = {
  __typename: "VYStaycationInventoryModel";
  id: string;
  packageId: string;
  inventoryDate: string;
  roomType: string;
  totalRooms: string;
  availableRooms: string;
  bookedRooms: string;
  inventoryStatus: string;
  roomId?: string | null;
  packageReference?: string | null;
  fareInfo?: string | null;
  extraData?: string | null;
  groupsCanAccess?: Array<string | null> | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type ListVyStaycationInventoryModelsQuery = {
  __typename: "ModelVYStaycationInventoryModelConnection";
  items?: Array<{
    __typename: "VYStaycationInventoryModel";
    id: string;
    packageId: string;
    inventoryDate: string;
    roomType: string;
    totalRooms: string;
    availableRooms: string;
    bookedRooms: string;
    inventoryStatus: string;
    roomId?: string | null;
    packageReference?: string | null;
    fareInfo?: string | null;
    extraData?: string | null;
    groupsCanAccess?: Array<string | null> | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null> | null;
  nextToken?: string | null;
};

export type GetVyCouponBatchesQuery = {
  __typename: "VYCouponBatches";
  vendorId: string;
  createdAt: string;
  batchId: string;
  batchName: string;
  batchCode: string;
  packageId: string;
  couponCount: number;
  groupsCanAccess?: Array<string | null> | null;
  updatedAt: string;
  owner?: string | null;
};

export type ListVyCouponBatchessQuery = {
  __typename: "ModelVYCouponBatchesConnection";
  items?: Array<{
    __typename: "VYCouponBatches";
    vendorId: string;
    createdAt: string;
    batchId: string;
    batchName: string;
    batchCode: string;
    packageId: string;
    couponCount: number;
    groupsCanAccess?: Array<string | null> | null;
    updatedAt: string;
    owner?: string | null;
  } | null> | null;
  nextToken?: string | null;
};

export type ItemsByPackageIdQuery = {
  __typename: "ModelVYCouponBatchesConnection";
  items?: Array<{
    __typename: "VYCouponBatches";
    vendorId: string;
    createdAt: string;
    batchId: string;
    batchName: string;
    batchCode: string;
    packageId: string;
    couponCount: number;
    groupsCanAccess?: Array<string | null> | null;
    updatedAt: string;
    owner?: string | null;
  } | null> | null;
  nextToken?: string | null;
};

export type GetVyVendorsModelQuery = {
  __typename: "VYVendorsModel";
  id: string;
  vendorName: string;
  vendorCode: string;
  contactPhone?: string | null;
  email?: string | null;
  vendorStatus?: string | null;
  vendorData?: string | null;
  contactAddress?: string | null;
  conginitoName?: string | null;
  cognitoUserId?: string | null;
  congnitoSecret?: string | null;
  groupsCanAccess?: Array<string | null> | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type ListVyVendorsModelsQuery = {
  __typename: "ModelVYVendorsModelConnection";
  items?: Array<{
    __typename: "VYVendorsModel";
    id: string;
    vendorName: string;
    vendorCode: string;
    contactPhone?: string | null;
    email?: string | null;
    vendorStatus?: string | null;
    vendorData?: string | null;
    contactAddress?: string | null;
    conginitoName?: string | null;
    cognitoUserId?: string | null;
    congnitoSecret?: string | null;
    groupsCanAccess?: Array<string | null> | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null> | null;
  nextToken?: string | null;
};

export type GetVyCouponCodesModelQuery = {
  __typename: "VYCouponCodesModel";
  couponCode: string;
  batchCode: string;
  batchId: string;
  packageId: string;
  vendorId: string;
  validFrom?: string | null;
  validUpto?: string | null;
  couponStatus?: string | null;
  discountType?: string | null;
  discountPercent?: string | null;
  discountFixedValue?: string | null;
  groupsCanAccess?: Array<string | null> | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type ListVyCouponCodesModelsQuery = {
  __typename: "ModelVYCouponCodesModelConnection";
  items?: Array<{
    __typename: "VYCouponCodesModel";
    couponCode: string;
    batchCode: string;
    batchId: string;
    packageId: string;
    vendorId: string;
    validFrom?: string | null;
    validUpto?: string | null;
    couponStatus?: string | null;
    discountType?: string | null;
    discountPercent?: string | null;
    discountFixedValue?: string | null;
    groupsCanAccess?: Array<string | null> | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null> | null;
  nextToken?: string | null;
};

export type GetVyCustomBookingModelQuery = {
  __typename: "VYCustomBookingModel";
  id: string;
  username: string;
  itineraryName?: string | null;
  bookingType?: string | null;
  bookingStatus?: string | null;
  bookingDetails?: string | null;
  travelStartDate?: string | null;
  travelCity?: string | null;
  email?: string | null;
  mobileNo?: string | null;
  bookingDecription?: string | null;
  bookingReference: string;
  paymentDetails?: string | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type ListVyCustomBookingModelsQuery = {
  __typename: "ModelVYCustomBookingModelConnection";
  items?: Array<{
    __typename: "VYCustomBookingModel";
    id: string;
    username: string;
    itineraryName?: string | null;
    bookingType?: string | null;
    bookingStatus?: string | null;
    bookingDetails?: string | null;
    travelStartDate?: string | null;
    travelCity?: string | null;
    email?: string | null;
    mobileNo?: string | null;
    bookingDecription?: string | null;
    bookingReference: string;
    paymentDetails?: string | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null> | null;
  nextToken?: string | null;
};

export type GetVyStaycationBookingModelQuery = {
  __typename: "VYStaycationBookingModel";
  id: string;
  username: string;
  itineraryName?: string | null;
  bookingType?: string | null;
  bookingStatus?: string | null;
  travelStartDate?: string | null;
  bookingDetails?: string | null;
  vendorId: string;
  packageId: string;
  bookingReference: string;
  email?: string | null;
  mobileNo?: string | null;
  couponCode?: string | null;
  roomType?: string | null;
  basePackagePrice?: string | null;
  discountedPrice?: string | null;
  discountedValue?: string | null;
  paymentDetails?: string | null;
  canceledDate?: string | null;
  refundAmount?: string | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type ListVyStaycationBookingModelsQuery = {
  __typename: "ModelVYStaycationBookingModelConnection";
  items?: Array<{
    __typename: "VYStaycationBookingModel";
    id: string;
    username: string;
    itineraryName?: string | null;
    bookingType?: string | null;
    bookingStatus?: string | null;
    travelStartDate?: string | null;
    bookingDetails?: string | null;
    vendorId: string;
    packageId: string;
    bookingReference: string;
    email?: string | null;
    mobileNo?: string | null;
    couponCode?: string | null;
    roomType?: string | null;
    basePackagePrice?: string | null;
    discountedPrice?: string | null;
    discountedValue?: string | null;
    paymentDetails?: string | null;
    canceledDate?: string | null;
    refundAmount?: string | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null> | null;
  nextToken?: string | null;
};

export type OnCreateVyCurrentItineraryModelSubscription = {
  __typename: "VYCurrentItineraryModel";
  id: string;
  username?: string | null;
  itineraryName?: string | null;
  currentItinerary?: {
    __typename: "VYCurrentItinerary";
    itineraryName?: string | null;
    startDate?: string | null;
    endDate?: string | null;
    originCity?: {
      __typename: "VYCity";
      id?: number | null;
      airportCode?: Array<string | null> | null;
      airportName?: Array<string | null> | null;
      cityName?: string | null;
      countryCode?: string | null;
      countryName?: string | null;
      vendorName?: string | null;
      latitude?: number | null;
      longitude?: number | null;
    } | null;
    destinationCities?: Array<{
      __typename: "VYCity";
      id?: number | null;
      airportCode?: Array<string | null> | null;
      airportName?: Array<string | null> | null;
      cityName?: string | null;
      countryCode?: string | null;
      countryName?: string | null;
      vendorName?: string | null;
      latitude?: number | null;
      longitude?: number | null;
    } | null> | null;
    travelType?: VYTravelType | null;
    travellers?: {
      __typename: "VYTravellerCount";
      adultCount?: number | null;
      childCount?: number | null;
      infantCount?: number | null;
    } | null;
    packageId?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type OnUpdateVyCurrentItineraryModelSubscription = {
  __typename: "VYCurrentItineraryModel";
  id: string;
  username?: string | null;
  itineraryName?: string | null;
  currentItinerary?: {
    __typename: "VYCurrentItinerary";
    itineraryName?: string | null;
    startDate?: string | null;
    endDate?: string | null;
    originCity?: {
      __typename: "VYCity";
      id?: number | null;
      airportCode?: Array<string | null> | null;
      airportName?: Array<string | null> | null;
      cityName?: string | null;
      countryCode?: string | null;
      countryName?: string | null;
      vendorName?: string | null;
      latitude?: number | null;
      longitude?: number | null;
    } | null;
    destinationCities?: Array<{
      __typename: "VYCity";
      id?: number | null;
      airportCode?: Array<string | null> | null;
      airportName?: Array<string | null> | null;
      cityName?: string | null;
      countryCode?: string | null;
      countryName?: string | null;
      vendorName?: string | null;
      latitude?: number | null;
      longitude?: number | null;
    } | null> | null;
    travelType?: VYTravelType | null;
    travellers?: {
      __typename: "VYTravellerCount";
      adultCount?: number | null;
      childCount?: number | null;
      infantCount?: number | null;
    } | null;
    packageId?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type OnDeleteVyCurrentItineraryModelSubscription = {
  __typename: "VYCurrentItineraryModel";
  id: string;
  username?: string | null;
  itineraryName?: string | null;
  currentItinerary?: {
    __typename: "VYCurrentItinerary";
    itineraryName?: string | null;
    startDate?: string | null;
    endDate?: string | null;
    originCity?: {
      __typename: "VYCity";
      id?: number | null;
      airportCode?: Array<string | null> | null;
      airportName?: Array<string | null> | null;
      cityName?: string | null;
      countryCode?: string | null;
      countryName?: string | null;
      vendorName?: string | null;
      latitude?: number | null;
      longitude?: number | null;
    } | null;
    destinationCities?: Array<{
      __typename: "VYCity";
      id?: number | null;
      airportCode?: Array<string | null> | null;
      airportName?: Array<string | null> | null;
      cityName?: string | null;
      countryCode?: string | null;
      countryName?: string | null;
      vendorName?: string | null;
      latitude?: number | null;
      longitude?: number | null;
    } | null> | null;
    travelType?: VYTravelType | null;
    travellers?: {
      __typename: "VYTravellerCount";
      adultCount?: number | null;
      childCount?: number | null;
      infantCount?: number | null;
    } | null;
    packageId?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type OnCreateVyUserProfileModelSubscription = {
  __typename: "VYUserProfileModel";
  id: string;
  username?: string | null;
  userProfile?: {
    __typename: "VYUserProfile";
    id?: string | null;
    firstName?: string | null;
    middleName?: string | null;
    lastName?: string | null;
    relationshipToUser?: string | null;
    dateOfBirth?: string | null;
    gender?: string | null;
    maritalStatus?: string | null;
    mobileNo?: string | null;
    isMobileVerified?: boolean | null;
    email?: string | null;
    isEmailVerified?: boolean | null;
    idDetails?: Array<{
      __typename: "VYIdentificationDetails";
      idType?: string | null;
      idNumber?: string | null;
      issuedOn?: string | null;
      expiryDate?: string | null;
      countryName?: string | null;
      cityName?: string | null;
    } | null> | null;
    address?: string | null;
    cityName?: string | null;
    countryName?: string | null;
    zipCode?: string | null;
  } | null;
  familyProfile?: Array<{
    __typename: "VYUserProfile";
    id?: string | null;
    firstName?: string | null;
    middleName?: string | null;
    lastName?: string | null;
    relationshipToUser?: string | null;
    dateOfBirth?: string | null;
    gender?: string | null;
    maritalStatus?: string | null;
    mobileNo?: string | null;
    isMobileVerified?: boolean | null;
    email?: string | null;
    isEmailVerified?: boolean | null;
    idDetails?: Array<{
      __typename: "VYIdentificationDetails";
      idType?: string | null;
      idNumber?: string | null;
      issuedOn?: string | null;
      expiryDate?: string | null;
      countryName?: string | null;
      cityName?: string | null;
    } | null> | null;
    address?: string | null;
    cityName?: string | null;
    countryName?: string | null;
    zipCode?: string | null;
  } | null> | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type OnUpdateVyUserProfileModelSubscription = {
  __typename: "VYUserProfileModel";
  id: string;
  username?: string | null;
  userProfile?: {
    __typename: "VYUserProfile";
    id?: string | null;
    firstName?: string | null;
    middleName?: string | null;
    lastName?: string | null;
    relationshipToUser?: string | null;
    dateOfBirth?: string | null;
    gender?: string | null;
    maritalStatus?: string | null;
    mobileNo?: string | null;
    isMobileVerified?: boolean | null;
    email?: string | null;
    isEmailVerified?: boolean | null;
    idDetails?: Array<{
      __typename: "VYIdentificationDetails";
      idType?: string | null;
      idNumber?: string | null;
      issuedOn?: string | null;
      expiryDate?: string | null;
      countryName?: string | null;
      cityName?: string | null;
    } | null> | null;
    address?: string | null;
    cityName?: string | null;
    countryName?: string | null;
    zipCode?: string | null;
  } | null;
  familyProfile?: Array<{
    __typename: "VYUserProfile";
    id?: string | null;
    firstName?: string | null;
    middleName?: string | null;
    lastName?: string | null;
    relationshipToUser?: string | null;
    dateOfBirth?: string | null;
    gender?: string | null;
    maritalStatus?: string | null;
    mobileNo?: string | null;
    isMobileVerified?: boolean | null;
    email?: string | null;
    isEmailVerified?: boolean | null;
    idDetails?: Array<{
      __typename: "VYIdentificationDetails";
      idType?: string | null;
      idNumber?: string | null;
      issuedOn?: string | null;
      expiryDate?: string | null;
      countryName?: string | null;
      cityName?: string | null;
    } | null> | null;
    address?: string | null;
    cityName?: string | null;
    countryName?: string | null;
    zipCode?: string | null;
  } | null> | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type OnDeleteVyUserProfileModelSubscription = {
  __typename: "VYUserProfileModel";
  id: string;
  username?: string | null;
  userProfile?: {
    __typename: "VYUserProfile";
    id?: string | null;
    firstName?: string | null;
    middleName?: string | null;
    lastName?: string | null;
    relationshipToUser?: string | null;
    dateOfBirth?: string | null;
    gender?: string | null;
    maritalStatus?: string | null;
    mobileNo?: string | null;
    isMobileVerified?: boolean | null;
    email?: string | null;
    isEmailVerified?: boolean | null;
    idDetails?: Array<{
      __typename: "VYIdentificationDetails";
      idType?: string | null;
      idNumber?: string | null;
      issuedOn?: string | null;
      expiryDate?: string | null;
      countryName?: string | null;
      cityName?: string | null;
    } | null> | null;
    address?: string | null;
    cityName?: string | null;
    countryName?: string | null;
    zipCode?: string | null;
  } | null;
  familyProfile?: Array<{
    __typename: "VYUserProfile";
    id?: string | null;
    firstName?: string | null;
    middleName?: string | null;
    lastName?: string | null;
    relationshipToUser?: string | null;
    dateOfBirth?: string | null;
    gender?: string | null;
    maritalStatus?: string | null;
    mobileNo?: string | null;
    isMobileVerified?: boolean | null;
    email?: string | null;
    isEmailVerified?: boolean | null;
    idDetails?: Array<{
      __typename: "VYIdentificationDetails";
      idType?: string | null;
      idNumber?: string | null;
      issuedOn?: string | null;
      expiryDate?: string | null;
      countryName?: string | null;
      cityName?: string | null;
    } | null> | null;
    address?: string | null;
    cityName?: string | null;
    countryName?: string | null;
    zipCode?: string | null;
  } | null> | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type OnCreateVyTravelPackageSubscription = {
  __typename: "VYTravelPackage";
  id: string;
  packagename?: string | null;
  packageStatus?: string | null;
  packageReference: string;
  packageValues?: string | null;
  availableFrom?: string | null;
  availableUpTo?: string | null;
  packageOwners?: Array<string | null> | null;
  groupsCanAccess?: Array<string | null> | null;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdateVyTravelPackageSubscription = {
  __typename: "VYTravelPackage";
  id: string;
  packagename?: string | null;
  packageStatus?: string | null;
  packageReference: string;
  packageValues?: string | null;
  availableFrom?: string | null;
  availableUpTo?: string | null;
  packageOwners?: Array<string | null> | null;
  groupsCanAccess?: Array<string | null> | null;
  createdAt: string;
  updatedAt: string;
};

export type OnDeleteVyTravelPackageSubscription = {
  __typename: "VYTravelPackage";
  id: string;
  packagename?: string | null;
  packageStatus?: string | null;
  packageReference: string;
  packageValues?: string | null;
  availableFrom?: string | null;
  availableUpTo?: string | null;
  packageOwners?: Array<string | null> | null;
  groupsCanAccess?: Array<string | null> | null;
  createdAt: string;
  updatedAt: string;
};

export type OnCreateVyTrawexSettingsModelSubscription = {
  __typename: "VYTrawexSettingsModel";
  id: string;
  flights?: {
    __typename: "VYTrawexFlightSettings";
    defaultMargin?: {
      __typename: "VYBookingMargin";
      percentValue?: number | null;
      minimumFee?: number | null;
    } | null;
    byAirline?: Array<{
      __typename: "VYMarginExclusions";
      exclusionName?: string | null;
      exclusionCode?: string | null;
      exclusionMargin?: {
        __typename: "VYBookingMargin";
        percentValue?: number | null;
        minimumFee?: number | null;
      } | null;
    } | null> | null;
    byDestination?: Array<{
      __typename: "VYMarginExclusions";
      exclusionName?: string | null;
      exclusionCode?: string | null;
      exclusionMargin?: {
        __typename: "VYBookingMargin";
        percentValue?: number | null;
        minimumFee?: number | null;
      } | null;
    } | null> | null;
    cancelPolicy?: {
      __typename: "VYCancelPolicyEx";
      minimumFee?: number | null;
      adminFee?: number | null;
      cancelRules?: Array<{
        __typename: "VYCancelRuleEx";
        refundPercent?: number | null;
        graceDays?: number | null;
      } | null> | null;
    } | null;
  } | null;
  hotels?: {
    __typename: "VYTrawexHotelSettings";
    defaultMargin?: {
      __typename: "VYBookingMargin";
      percentValue?: number | null;
      minimumFee?: number | null;
    } | null;
    byHotelChain?: Array<{
      __typename: "VYMarginExclusions";
      exclusionName?: string | null;
      exclusionCode?: string | null;
      exclusionMargin?: {
        __typename: "VYBookingMargin";
        percentValue?: number | null;
        minimumFee?: number | null;
      } | null;
    } | null> | null;
    cancelPolicy?: {
      __typename: "VYCancelPolicyEx";
      minimumFee?: number | null;
      adminFee?: number | null;
      cancelRules?: Array<{
        __typename: "VYCancelRuleEx";
        refundPercent?: number | null;
        graceDays?: number | null;
      } | null> | null;
    } | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdateVyTrawexSettingsModelSubscription = {
  __typename: "VYTrawexSettingsModel";
  id: string;
  flights?: {
    __typename: "VYTrawexFlightSettings";
    defaultMargin?: {
      __typename: "VYBookingMargin";
      percentValue?: number | null;
      minimumFee?: number | null;
    } | null;
    byAirline?: Array<{
      __typename: "VYMarginExclusions";
      exclusionName?: string | null;
      exclusionCode?: string | null;
      exclusionMargin?: {
        __typename: "VYBookingMargin";
        percentValue?: number | null;
        minimumFee?: number | null;
      } | null;
    } | null> | null;
    byDestination?: Array<{
      __typename: "VYMarginExclusions";
      exclusionName?: string | null;
      exclusionCode?: string | null;
      exclusionMargin?: {
        __typename: "VYBookingMargin";
        percentValue?: number | null;
        minimumFee?: number | null;
      } | null;
    } | null> | null;
    cancelPolicy?: {
      __typename: "VYCancelPolicyEx";
      minimumFee?: number | null;
      adminFee?: number | null;
      cancelRules?: Array<{
        __typename: "VYCancelRuleEx";
        refundPercent?: number | null;
        graceDays?: number | null;
      } | null> | null;
    } | null;
  } | null;
  hotels?: {
    __typename: "VYTrawexHotelSettings";
    defaultMargin?: {
      __typename: "VYBookingMargin";
      percentValue?: number | null;
      minimumFee?: number | null;
    } | null;
    byHotelChain?: Array<{
      __typename: "VYMarginExclusions";
      exclusionName?: string | null;
      exclusionCode?: string | null;
      exclusionMargin?: {
        __typename: "VYBookingMargin";
        percentValue?: number | null;
        minimumFee?: number | null;
      } | null;
    } | null> | null;
    cancelPolicy?: {
      __typename: "VYCancelPolicyEx";
      minimumFee?: number | null;
      adminFee?: number | null;
      cancelRules?: Array<{
        __typename: "VYCancelRuleEx";
        refundPercent?: number | null;
        graceDays?: number | null;
      } | null> | null;
    } | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type OnDeleteVyTrawexSettingsModelSubscription = {
  __typename: "VYTrawexSettingsModel";
  id: string;
  flights?: {
    __typename: "VYTrawexFlightSettings";
    defaultMargin?: {
      __typename: "VYBookingMargin";
      percentValue?: number | null;
      minimumFee?: number | null;
    } | null;
    byAirline?: Array<{
      __typename: "VYMarginExclusions";
      exclusionName?: string | null;
      exclusionCode?: string | null;
      exclusionMargin?: {
        __typename: "VYBookingMargin";
        percentValue?: number | null;
        minimumFee?: number | null;
      } | null;
    } | null> | null;
    byDestination?: Array<{
      __typename: "VYMarginExclusions";
      exclusionName?: string | null;
      exclusionCode?: string | null;
      exclusionMargin?: {
        __typename: "VYBookingMargin";
        percentValue?: number | null;
        minimumFee?: number | null;
      } | null;
    } | null> | null;
    cancelPolicy?: {
      __typename: "VYCancelPolicyEx";
      minimumFee?: number | null;
      adminFee?: number | null;
      cancelRules?: Array<{
        __typename: "VYCancelRuleEx";
        refundPercent?: number | null;
        graceDays?: number | null;
      } | null> | null;
    } | null;
  } | null;
  hotels?: {
    __typename: "VYTrawexHotelSettings";
    defaultMargin?: {
      __typename: "VYBookingMargin";
      percentValue?: number | null;
      minimumFee?: number | null;
    } | null;
    byHotelChain?: Array<{
      __typename: "VYMarginExclusions";
      exclusionName?: string | null;
      exclusionCode?: string | null;
      exclusionMargin?: {
        __typename: "VYBookingMargin";
        percentValue?: number | null;
        minimumFee?: number | null;
      } | null;
    } | null> | null;
    cancelPolicy?: {
      __typename: "VYCancelPolicyEx";
      minimumFee?: number | null;
      adminFee?: number | null;
      cancelRules?: Array<{
        __typename: "VYCancelRuleEx";
        refundPercent?: number | null;
        graceDays?: number | null;
      } | null> | null;
    } | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type OnCreateVyMusementSettingsModelSubscription = {
  __typename: "VYMusementSettingsModel";
  id: string;
  activities?: {
    __typename: "VYMusementActivitySettings";
    defaultMargin?: {
      __typename: "VYBookingMargin";
      percentValue?: number | null;
      minimumFee?: number | null;
    } | null;
    byActivity?: Array<{
      __typename: "VYMarginExclusions";
      exclusionName?: string | null;
      exclusionCode?: string | null;
      exclusionMargin?: {
        __typename: "VYBookingMargin";
        percentValue?: number | null;
        minimumFee?: number | null;
      } | null;
    } | null> | null;
    cancelPolicy?: {
      __typename: "VYCancelPolicyEx";
      minimumFee?: number | null;
      adminFee?: number | null;
      cancelRules?: Array<{
        __typename: "VYCancelRuleEx";
        refundPercent?: number | null;
        graceDays?: number | null;
      } | null> | null;
    } | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdateVyMusementSettingsModelSubscription = {
  __typename: "VYMusementSettingsModel";
  id: string;
  activities?: {
    __typename: "VYMusementActivitySettings";
    defaultMargin?: {
      __typename: "VYBookingMargin";
      percentValue?: number | null;
      minimumFee?: number | null;
    } | null;
    byActivity?: Array<{
      __typename: "VYMarginExclusions";
      exclusionName?: string | null;
      exclusionCode?: string | null;
      exclusionMargin?: {
        __typename: "VYBookingMargin";
        percentValue?: number | null;
        minimumFee?: number | null;
      } | null;
    } | null> | null;
    cancelPolicy?: {
      __typename: "VYCancelPolicyEx";
      minimumFee?: number | null;
      adminFee?: number | null;
      cancelRules?: Array<{
        __typename: "VYCancelRuleEx";
        refundPercent?: number | null;
        graceDays?: number | null;
      } | null> | null;
    } | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type OnDeleteVyMusementSettingsModelSubscription = {
  __typename: "VYMusementSettingsModel";
  id: string;
  activities?: {
    __typename: "VYMusementActivitySettings";
    defaultMargin?: {
      __typename: "VYBookingMargin";
      percentValue?: number | null;
      minimumFee?: number | null;
    } | null;
    byActivity?: Array<{
      __typename: "VYMarginExclusions";
      exclusionName?: string | null;
      exclusionCode?: string | null;
      exclusionMargin?: {
        __typename: "VYBookingMargin";
        percentValue?: number | null;
        minimumFee?: number | null;
      } | null;
    } | null> | null;
    cancelPolicy?: {
      __typename: "VYCancelPolicyEx";
      minimumFee?: number | null;
      adminFee?: number | null;
      cancelRules?: Array<{
        __typename: "VYCancelRuleEx";
        refundPercent?: number | null;
        graceDays?: number | null;
      } | null> | null;
    } | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type OnCreateVyPackageInventoryModelSubscription = {
  __typename: "VYPackageInventoryModel";
  packageId: string;
  inventoryDate: string;
  roomType: string;
  totalRooms: string;
  availableRooms: string;
  bookedRooms: string;
  inventoryStatus: string;
  fareInfo?: string | null;
  groupsCanAccess?: Array<string | null> | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type OnUpdateVyPackageInventoryModelSubscription = {
  __typename: "VYPackageInventoryModel";
  packageId: string;
  inventoryDate: string;
  roomType: string;
  totalRooms: string;
  availableRooms: string;
  bookedRooms: string;
  inventoryStatus: string;
  fareInfo?: string | null;
  groupsCanAccess?: Array<string | null> | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type OnDeleteVyPackageInventoryModelSubscription = {
  __typename: "VYPackageInventoryModel";
  packageId: string;
  inventoryDate: string;
  roomType: string;
  totalRooms: string;
  availableRooms: string;
  bookedRooms: string;
  inventoryStatus: string;
  fareInfo?: string | null;
  groupsCanAccess?: Array<string | null> | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type OnCreateVyStaycationInventoryModelSubscription = {
  __typename: "VYStaycationInventoryModel";
  id: string;
  packageId: string;
  inventoryDate: string;
  roomType: string;
  totalRooms: string;
  availableRooms: string;
  bookedRooms: string;
  inventoryStatus: string;
  roomId?: string | null;
  packageReference?: string | null;
  fareInfo?: string | null;
  extraData?: string | null;
  groupsCanAccess?: Array<string | null> | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type OnUpdateVyStaycationInventoryModelSubscription = {
  __typename: "VYStaycationInventoryModel";
  id: string;
  packageId: string;
  inventoryDate: string;
  roomType: string;
  totalRooms: string;
  availableRooms: string;
  bookedRooms: string;
  inventoryStatus: string;
  roomId?: string | null;
  packageReference?: string | null;
  fareInfo?: string | null;
  extraData?: string | null;
  groupsCanAccess?: Array<string | null> | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type OnDeleteVyStaycationInventoryModelSubscription = {
  __typename: "VYStaycationInventoryModel";
  id: string;
  packageId: string;
  inventoryDate: string;
  roomType: string;
  totalRooms: string;
  availableRooms: string;
  bookedRooms: string;
  inventoryStatus: string;
  roomId?: string | null;
  packageReference?: string | null;
  fareInfo?: string | null;
  extraData?: string | null;
  groupsCanAccess?: Array<string | null> | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type OnCreateVyCouponBatchesSubscription = {
  __typename: "VYCouponBatches";
  vendorId: string;
  createdAt: string;
  batchId: string;
  batchName: string;
  batchCode: string;
  packageId: string;
  couponCount: number;
  groupsCanAccess?: Array<string | null> | null;
  updatedAt: string;
  owner?: string | null;
};

export type OnUpdateVyCouponBatchesSubscription = {
  __typename: "VYCouponBatches";
  vendorId: string;
  createdAt: string;
  batchId: string;
  batchName: string;
  batchCode: string;
  packageId: string;
  couponCount: number;
  groupsCanAccess?: Array<string | null> | null;
  updatedAt: string;
  owner?: string | null;
};

export type OnDeleteVyCouponBatchesSubscription = {
  __typename: "VYCouponBatches";
  vendorId: string;
  createdAt: string;
  batchId: string;
  batchName: string;
  batchCode: string;
  packageId: string;
  couponCount: number;
  groupsCanAccess?: Array<string | null> | null;
  updatedAt: string;
  owner?: string | null;
};

export type OnCreateVyVendorsModelSubscription = {
  __typename: "VYVendorsModel";
  id: string;
  vendorName: string;
  vendorCode: string;
  contactPhone?: string | null;
  email?: string | null;
  vendorStatus?: string | null;
  vendorData?: string | null;
  contactAddress?: string | null;
  conginitoName?: string | null;
  cognitoUserId?: string | null;
  congnitoSecret?: string | null;
  groupsCanAccess?: Array<string | null> | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type OnUpdateVyVendorsModelSubscription = {
  __typename: "VYVendorsModel";
  id: string;
  vendorName: string;
  vendorCode: string;
  contactPhone?: string | null;
  email?: string | null;
  vendorStatus?: string | null;
  vendorData?: string | null;
  contactAddress?: string | null;
  conginitoName?: string | null;
  cognitoUserId?: string | null;
  congnitoSecret?: string | null;
  groupsCanAccess?: Array<string | null> | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type OnDeleteVyVendorsModelSubscription = {
  __typename: "VYVendorsModel";
  id: string;
  vendorName: string;
  vendorCode: string;
  contactPhone?: string | null;
  email?: string | null;
  vendorStatus?: string | null;
  vendorData?: string | null;
  contactAddress?: string | null;
  conginitoName?: string | null;
  cognitoUserId?: string | null;
  congnitoSecret?: string | null;
  groupsCanAccess?: Array<string | null> | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type OnCreateVyCouponCodesModelSubscription = {
  __typename: "VYCouponCodesModel";
  couponCode: string;
  batchCode: string;
  batchId: string;
  packageId: string;
  vendorId: string;
  validFrom?: string | null;
  validUpto?: string | null;
  couponStatus?: string | null;
  discountType?: string | null;
  discountPercent?: string | null;
  discountFixedValue?: string | null;
  groupsCanAccess?: Array<string | null> | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type OnUpdateVyCouponCodesModelSubscription = {
  __typename: "VYCouponCodesModel";
  couponCode: string;
  batchCode: string;
  batchId: string;
  packageId: string;
  vendorId: string;
  validFrom?: string | null;
  validUpto?: string | null;
  couponStatus?: string | null;
  discountType?: string | null;
  discountPercent?: string | null;
  discountFixedValue?: string | null;
  groupsCanAccess?: Array<string | null> | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type OnDeleteVyCouponCodesModelSubscription = {
  __typename: "VYCouponCodesModel";
  couponCode: string;
  batchCode: string;
  batchId: string;
  packageId: string;
  vendorId: string;
  validFrom?: string | null;
  validUpto?: string | null;
  couponStatus?: string | null;
  discountType?: string | null;
  discountPercent?: string | null;
  discountFixedValue?: string | null;
  groupsCanAccess?: Array<string | null> | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type OnCreateVyCustomBookingModelSubscription = {
  __typename: "VYCustomBookingModel";
  id: string;
  username: string;
  itineraryName?: string | null;
  bookingType?: string | null;
  bookingStatus?: string | null;
  bookingDetails?: string | null;
  travelStartDate?: string | null;
  travelCity?: string | null;
  email?: string | null;
  mobileNo?: string | null;
  bookingDecription?: string | null;
  bookingReference: string;
  paymentDetails?: string | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type OnUpdateVyCustomBookingModelSubscription = {
  __typename: "VYCustomBookingModel";
  id: string;
  username: string;
  itineraryName?: string | null;
  bookingType?: string | null;
  bookingStatus?: string | null;
  bookingDetails?: string | null;
  travelStartDate?: string | null;
  travelCity?: string | null;
  email?: string | null;
  mobileNo?: string | null;
  bookingDecription?: string | null;
  bookingReference: string;
  paymentDetails?: string | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type OnDeleteVyCustomBookingModelSubscription = {
  __typename: "VYCustomBookingModel";
  id: string;
  username: string;
  itineraryName?: string | null;
  bookingType?: string | null;
  bookingStatus?: string | null;
  bookingDetails?: string | null;
  travelStartDate?: string | null;
  travelCity?: string | null;
  email?: string | null;
  mobileNo?: string | null;
  bookingDecription?: string | null;
  bookingReference: string;
  paymentDetails?: string | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type OnCreateVyStaycationBookingModelSubscription = {
  __typename: "VYStaycationBookingModel";
  id: string;
  username: string;
  itineraryName?: string | null;
  bookingType?: string | null;
  bookingStatus?: string | null;
  travelStartDate?: string | null;
  bookingDetails?: string | null;
  vendorId: string;
  packageId: string;
  bookingReference: string;
  email?: string | null;
  mobileNo?: string | null;
  couponCode?: string | null;
  roomType?: string | null;
  basePackagePrice?: string | null;
  discountedPrice?: string | null;
  discountedValue?: string | null;
  paymentDetails?: string | null;
  canceledDate?: string | null;
  refundAmount?: string | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type OnUpdateVyStaycationBookingModelSubscription = {
  __typename: "VYStaycationBookingModel";
  id: string;
  username: string;
  itineraryName?: string | null;
  bookingType?: string | null;
  bookingStatus?: string | null;
  travelStartDate?: string | null;
  bookingDetails?: string | null;
  vendorId: string;
  packageId: string;
  bookingReference: string;
  email?: string | null;
  mobileNo?: string | null;
  couponCode?: string | null;
  roomType?: string | null;
  basePackagePrice?: string | null;
  discountedPrice?: string | null;
  discountedValue?: string | null;
  paymentDetails?: string | null;
  canceledDate?: string | null;
  refundAmount?: string | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type OnDeleteVyStaycationBookingModelSubscription = {
  __typename: "VYStaycationBookingModel";
  id: string;
  username: string;
  itineraryName?: string | null;
  bookingType?: string | null;
  bookingStatus?: string | null;
  travelStartDate?: string | null;
  bookingDetails?: string | null;
  vendorId: string;
  packageId: string;
  bookingReference: string;
  email?: string | null;
  mobileNo?: string | null;
  couponCode?: string | null;
  roomType?: string | null;
  basePackagePrice?: string | null;
  discountedPrice?: string | null;
  discountedValue?: string | null;
  paymentDetails?: string | null;
  canceledDate?: string | null;
  refundAmount?: string | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

@Injectable({
  providedIn: "root"
})
export class APIService {
  async CreateVyCurrentItineraryModel(
    input: CreateVYCurrentItineraryModelInput
  ): Promise<CreateVyCurrentItineraryModelMutation> {
    const statement = `mutation CreateVyCurrentItineraryModel($input: CreateVYCurrentItineraryModelInput!) {
        createVYCurrentItineraryModel(input: $input) {
          __typename
          id
          username
          itineraryName
          currentItinerary {
            __typename
            itineraryName
            startDate
            endDate
            originCity {
              __typename
              id
              airportCode
              airportName
              cityName
              countryCode
              countryName
              vendorName
              latitude
              longitude
            }
            destinationCities {
              __typename
              id
              airportCode
              airportName
              cityName
              countryCode
              countryName
              vendorName
              latitude
              longitude
            }
            travelType
            travellers {
              __typename
              adultCount
              childCount
              infantCount
            }
            packageId
          }
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateVyCurrentItineraryModelMutation>(
      response.data.createVYCurrentItineraryModel
    );
  }
  async UpdateVyCurrentItineraryModel(
    input: UpdateVYCurrentItineraryModelInput
  ): Promise<UpdateVyCurrentItineraryModelMutation> {
    const statement = `mutation UpdateVyCurrentItineraryModel($input: UpdateVYCurrentItineraryModelInput!) {
        updateVYCurrentItineraryModel(input: $input) {
          __typename
          id
          username
          itineraryName
          currentItinerary {
            __typename
            itineraryName
            startDate
            endDate
            originCity {
              __typename
              id
              airportCode
              airportName
              cityName
              countryCode
              countryName
              vendorName
              latitude
              longitude
            }
            destinationCities {
              __typename
              id
              airportCode
              airportName
              cityName
              countryCode
              countryName
              vendorName
              latitude
              longitude
            }
            travelType
            travellers {
              __typename
              adultCount
              childCount
              infantCount
            }
            packageId
          }
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateVyCurrentItineraryModelMutation>(
      response.data.updateVYCurrentItineraryModel
    );
  }
  async DeleteVyCurrentItineraryModel(
    input: DeleteVYCurrentItineraryModelInput
  ): Promise<DeleteVyCurrentItineraryModelMutation> {
    const statement = `mutation DeleteVyCurrentItineraryModel($input: DeleteVYCurrentItineraryModelInput!) {
        deleteVYCurrentItineraryModel(input: $input) {
          __typename
          id
          username
          itineraryName
          currentItinerary {
            __typename
            itineraryName
            startDate
            endDate
            originCity {
              __typename
              id
              airportCode
              airportName
              cityName
              countryCode
              countryName
              vendorName
              latitude
              longitude
            }
            destinationCities {
              __typename
              id
              airportCode
              airportName
              cityName
              countryCode
              countryName
              vendorName
              latitude
              longitude
            }
            travelType
            travellers {
              __typename
              adultCount
              childCount
              infantCount
            }
            packageId
          }
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteVyCurrentItineraryModelMutation>(
      response.data.deleteVYCurrentItineraryModel
    );
  }
  async CreateVyUserProfileModel(
    input: CreateVYUserProfileModelInput
  ): Promise<CreateVyUserProfileModelMutation> {
    const statement = `mutation CreateVyUserProfileModel($input: CreateVYUserProfileModelInput!) {
        createVYUserProfileModel(input: $input) {
          __typename
          id
          username
          userProfile {
            __typename
            id
            firstName
            middleName
            lastName
            relationshipToUser
            dateOfBirth
            gender
            maritalStatus
            mobileNo
            isMobileVerified
            email
            isEmailVerified
            idDetails {
              __typename
              idType
              idNumber
              issuedOn
              expiryDate
              countryName
              cityName
            }
            address
            cityName
            countryName
            zipCode
          }
          familyProfile {
            __typename
            id
            firstName
            middleName
            lastName
            relationshipToUser
            dateOfBirth
            gender
            maritalStatus
            mobileNo
            isMobileVerified
            email
            isEmailVerified
            idDetails {
              __typename
              idType
              idNumber
              issuedOn
              expiryDate
              countryName
              cityName
            }
            address
            cityName
            countryName
            zipCode
          }
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateVyUserProfileModelMutation>(
      response.data.createVYUserProfileModel
    );
  }
  async UpdateVyUserProfileModel(
    input: UpdateVYUserProfileModelInput
  ): Promise<UpdateVyUserProfileModelMutation> {
    const statement = `mutation UpdateVyUserProfileModel($input: UpdateVYUserProfileModelInput!) {
        updateVYUserProfileModel(input: $input) {
          __typename
          id
          username
          userProfile {
            __typename
            id
            firstName
            middleName
            lastName
            relationshipToUser
            dateOfBirth
            gender
            maritalStatus
            mobileNo
            isMobileVerified
            email
            isEmailVerified
            idDetails {
              __typename
              idType
              idNumber
              issuedOn
              expiryDate
              countryName
              cityName
            }
            address
            cityName
            countryName
            zipCode
          }
          familyProfile {
            __typename
            id
            firstName
            middleName
            lastName
            relationshipToUser
            dateOfBirth
            gender
            maritalStatus
            mobileNo
            isMobileVerified
            email
            isEmailVerified
            idDetails {
              __typename
              idType
              idNumber
              issuedOn
              expiryDate
              countryName
              cityName
            }
            address
            cityName
            countryName
            zipCode
          }
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateVyUserProfileModelMutation>(
      response.data.updateVYUserProfileModel
    );
  }
  async DeleteVyUserProfileModel(
    input: DeleteVYUserProfileModelInput
  ): Promise<DeleteVyUserProfileModelMutation> {
    const statement = `mutation DeleteVyUserProfileModel($input: DeleteVYUserProfileModelInput!) {
        deleteVYUserProfileModel(input: $input) {
          __typename
          id
          username
          userProfile {
            __typename
            id
            firstName
            middleName
            lastName
            relationshipToUser
            dateOfBirth
            gender
            maritalStatus
            mobileNo
            isMobileVerified
            email
            isEmailVerified
            idDetails {
              __typename
              idType
              idNumber
              issuedOn
              expiryDate
              countryName
              cityName
            }
            address
            cityName
            countryName
            zipCode
          }
          familyProfile {
            __typename
            id
            firstName
            middleName
            lastName
            relationshipToUser
            dateOfBirth
            gender
            maritalStatus
            mobileNo
            isMobileVerified
            email
            isEmailVerified
            idDetails {
              __typename
              idType
              idNumber
              issuedOn
              expiryDate
              countryName
              cityName
            }
            address
            cityName
            countryName
            zipCode
          }
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteVyUserProfileModelMutation>(
      response.data.deleteVYUserProfileModel
    );
  }
  async CreateVyTravelPackage(
    input: CreateVYTravelPackageInput
  ): Promise<CreateVyTravelPackageMutation> {
    const statement = `mutation CreateVyTravelPackage($input: CreateVYTravelPackageInput!) {
        createVYTravelPackage(input: $input) {
          __typename
          id
          packagename
          packageStatus
          packageReference
          packageValues
          availableFrom
          availableUpTo
          packageOwners
          groupsCanAccess
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateVyTravelPackageMutation>response.data.createVYTravelPackage;
  }
  async UpdateVyTravelPackage(
    input: UpdateVYTravelPackageInput
  ): Promise<UpdateVyTravelPackageMutation> {
    const statement = `mutation UpdateVyTravelPackage($input: UpdateVYTravelPackageInput!) {
        updateVYTravelPackage(input: $input) {
          __typename
          id
          packagename
          packageStatus
          packageReference
          packageValues
          availableFrom
          availableUpTo
          packageOwners
          groupsCanAccess
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateVyTravelPackageMutation>response.data.updateVYTravelPackage;
  }
  async DeleteVyTravelPackage(
    input: DeleteVYTravelPackageInput
  ): Promise<DeleteVyTravelPackageMutation> {
    const statement = `mutation DeleteVyTravelPackage($input: DeleteVYTravelPackageInput!) {
        deleteVYTravelPackage(input: $input) {
          __typename
          id
          packagename
          packageStatus
          packageReference
          packageValues
          availableFrom
          availableUpTo
          packageOwners
          groupsCanAccess
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteVyTravelPackageMutation>response.data.deleteVYTravelPackage;
  }
  async CreateVyTrawexSettingsModel(
    input: CreateVYTrawexSettingsModelInput
  ): Promise<CreateVyTrawexSettingsModelMutation> {
    const statement = `mutation CreateVyTrawexSettingsModel($input: CreateVYTrawexSettingsModelInput!) {
        createVYTrawexSettingsModel(input: $input) {
          __typename
          id
          flights {
            __typename
            defaultMargin {
              __typename
              percentValue
              minimumFee
            }
            byAirline {
              __typename
              exclusionName
              exclusionCode
              exclusionMargin {
                __typename
                percentValue
                minimumFee
              }
            }
            byDestination {
              __typename
              exclusionName
              exclusionCode
              exclusionMargin {
                __typename
                percentValue
                minimumFee
              }
            }
            cancelPolicy {
              __typename
              minimumFee
              adminFee
              cancelRules {
                __typename
                refundPercent
                graceDays
              }
            }
          }
          hotels {
            __typename
            defaultMargin {
              __typename
              percentValue
              minimumFee
            }
            byHotelChain {
              __typename
              exclusionName
              exclusionCode
              exclusionMargin {
                __typename
                percentValue
                minimumFee
              }
            }
            cancelPolicy {
              __typename
              minimumFee
              adminFee
              cancelRules {
                __typename
                refundPercent
                graceDays
              }
            }
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateVyTrawexSettingsModelMutation>(
      response.data.createVYTrawexSettingsModel
    );
  }
  async UpdateVyTrawexSettingsModel(
    input: UpdateVYTrawexSettingsModelInput
  ): Promise<UpdateVyTrawexSettingsModelMutation> {
    const statement = `mutation UpdateVyTrawexSettingsModel($input: UpdateVYTrawexSettingsModelInput!) {
        updateVYTrawexSettingsModel(input: $input) {
          __typename
          id
          flights {
            __typename
            defaultMargin {
              __typename
              percentValue
              minimumFee
            }
            byAirline {
              __typename
              exclusionName
              exclusionCode
              exclusionMargin {
                __typename
                percentValue
                minimumFee
              }
            }
            byDestination {
              __typename
              exclusionName
              exclusionCode
              exclusionMargin {
                __typename
                percentValue
                minimumFee
              }
            }
            cancelPolicy {
              __typename
              minimumFee
              adminFee
              cancelRules {
                __typename
                refundPercent
                graceDays
              }
            }
          }
          hotels {
            __typename
            defaultMargin {
              __typename
              percentValue
              minimumFee
            }
            byHotelChain {
              __typename
              exclusionName
              exclusionCode
              exclusionMargin {
                __typename
                percentValue
                minimumFee
              }
            }
            cancelPolicy {
              __typename
              minimumFee
              adminFee
              cancelRules {
                __typename
                refundPercent
                graceDays
              }
            }
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateVyTrawexSettingsModelMutation>(
      response.data.updateVYTrawexSettingsModel
    );
  }
  async DeleteVyTrawexSettingsModel(
    input: DeleteVYTrawexSettingsModelInput
  ): Promise<DeleteVyTrawexSettingsModelMutation> {
    const statement = `mutation DeleteVyTrawexSettingsModel($input: DeleteVYTrawexSettingsModelInput!) {
        deleteVYTrawexSettingsModel(input: $input) {
          __typename
          id
          flights {
            __typename
            defaultMargin {
              __typename
              percentValue
              minimumFee
            }
            byAirline {
              __typename
              exclusionName
              exclusionCode
              exclusionMargin {
                __typename
                percentValue
                minimumFee
              }
            }
            byDestination {
              __typename
              exclusionName
              exclusionCode
              exclusionMargin {
                __typename
                percentValue
                minimumFee
              }
            }
            cancelPolicy {
              __typename
              minimumFee
              adminFee
              cancelRules {
                __typename
                refundPercent
                graceDays
              }
            }
          }
          hotels {
            __typename
            defaultMargin {
              __typename
              percentValue
              minimumFee
            }
            byHotelChain {
              __typename
              exclusionName
              exclusionCode
              exclusionMargin {
                __typename
                percentValue
                minimumFee
              }
            }
            cancelPolicy {
              __typename
              minimumFee
              adminFee
              cancelRules {
                __typename
                refundPercent
                graceDays
              }
            }
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteVyTrawexSettingsModelMutation>(
      response.data.deleteVYTrawexSettingsModel
    );
  }
  async CreateVyMusementSettingsModel(
    input: CreateVYMusementSettingsModelInput
  ): Promise<CreateVyMusementSettingsModelMutation> {
    const statement = `mutation CreateVyMusementSettingsModel($input: CreateVYMusementSettingsModelInput!) {
        createVYMusementSettingsModel(input: $input) {
          __typename
          id
          activities {
            __typename
            defaultMargin {
              __typename
              percentValue
              minimumFee
            }
            byActivity {
              __typename
              exclusionName
              exclusionCode
              exclusionMargin {
                __typename
                percentValue
                minimumFee
              }
            }
            cancelPolicy {
              __typename
              minimumFee
              adminFee
              cancelRules {
                __typename
                refundPercent
                graceDays
              }
            }
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateVyMusementSettingsModelMutation>(
      response.data.createVYMusementSettingsModel
    );
  }
  async UpdateVyMusementSettingsModel(
    input: UpdateVYMusementSettingsModelInput
  ): Promise<UpdateVyMusementSettingsModelMutation> {
    const statement = `mutation UpdateVyMusementSettingsModel($input: UpdateVYMusementSettingsModelInput!) {
        updateVYMusementSettingsModel(input: $input) {
          __typename
          id
          activities {
            __typename
            defaultMargin {
              __typename
              percentValue
              minimumFee
            }
            byActivity {
              __typename
              exclusionName
              exclusionCode
              exclusionMargin {
                __typename
                percentValue
                minimumFee
              }
            }
            cancelPolicy {
              __typename
              minimumFee
              adminFee
              cancelRules {
                __typename
                refundPercent
                graceDays
              }
            }
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateVyMusementSettingsModelMutation>(
      response.data.updateVYMusementSettingsModel
    );
  }
  async DeleteVyMusementSettingsModel(
    input: DeleteVYMusementSettingsModelInput
  ): Promise<DeleteVyMusementSettingsModelMutation> {
    const statement = `mutation DeleteVyMusementSettingsModel($input: DeleteVYMusementSettingsModelInput!) {
        deleteVYMusementSettingsModel(input: $input) {
          __typename
          id
          activities {
            __typename
            defaultMargin {
              __typename
              percentValue
              minimumFee
            }
            byActivity {
              __typename
              exclusionName
              exclusionCode
              exclusionMargin {
                __typename
                percentValue
                minimumFee
              }
            }
            cancelPolicy {
              __typename
              minimumFee
              adminFee
              cancelRules {
                __typename
                refundPercent
                graceDays
              }
            }
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteVyMusementSettingsModelMutation>(
      response.data.deleteVYMusementSettingsModel
    );
  }
  async CreateVyPackageInventoryModel(
    input: CreateVYPackageInventoryModelInput
  ): Promise<CreateVyPackageInventoryModelMutation> {
    const statement = `mutation CreateVyPackageInventoryModel($input: CreateVYPackageInventoryModelInput!) {
        createVYPackageInventoryModel(input: $input) {
          __typename
          packageId
          inventoryDate
          roomType
          totalRooms
          availableRooms
          bookedRooms
          inventoryStatus
          fareInfo
          groupsCanAccess
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateVyPackageInventoryModelMutation>(
      response.data.createVYPackageInventoryModel
    );
  }
  async UpdateVyPackageInventoryModel(
    input: UpdateVYPackageInventoryModelInput
  ): Promise<UpdateVyPackageInventoryModelMutation> {
    const statement = `mutation UpdateVyPackageInventoryModel($input: UpdateVYPackageInventoryModelInput!) {
        updateVYPackageInventoryModel(input: $input) {
          __typename
          packageId
          inventoryDate
          roomType
          totalRooms
          availableRooms
          bookedRooms
          inventoryStatus
          fareInfo
          groupsCanAccess
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateVyPackageInventoryModelMutation>(
      response.data.updateVYPackageInventoryModel
    );
  }
  async DeleteVyPackageInventoryModel(
    input: DeleteVYPackageInventoryModelInput
  ): Promise<DeleteVyPackageInventoryModelMutation> {
    const statement = `mutation DeleteVyPackageInventoryModel($input: DeleteVYPackageInventoryModelInput!) {
        deleteVYPackageInventoryModel(input: $input) {
          __typename
          packageId
          inventoryDate
          roomType
          totalRooms
          availableRooms
          bookedRooms
          inventoryStatus
          fareInfo
          groupsCanAccess
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteVyPackageInventoryModelMutation>(
      response.data.deleteVYPackageInventoryModel
    );
  }
  async CreateVyStaycationInventoryModel(
    input: CreateVYStaycationInventoryModelInput
  ): Promise<CreateVyStaycationInventoryModelMutation> {
    const statement = `mutation CreateVyStaycationInventoryModel($input: CreateVYStaycationInventoryModelInput!) {
        createVYStaycationInventoryModel(input: $input) {
          __typename
          id
          packageId
          inventoryDate
          roomType
          totalRooms
          availableRooms
          bookedRooms
          inventoryStatus
          roomId
          packageReference
          fareInfo
          extraData
          groupsCanAccess
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateVyStaycationInventoryModelMutation>(
      response.data.createVYStaycationInventoryModel
    );
  }
  async UpdateVyStaycationInventoryModel(
    input: UpdateVYStaycationInventoryModelInput
  ): Promise<UpdateVyStaycationInventoryModelMutation> {
    const statement = `mutation UpdateVyStaycationInventoryModel($input: UpdateVYStaycationInventoryModelInput!) {
        updateVYStaycationInventoryModel(input: $input) {
          __typename
          id
          packageId
          inventoryDate
          roomType
          totalRooms
          availableRooms
          bookedRooms
          inventoryStatus
          roomId
          packageReference
          fareInfo
          extraData
          groupsCanAccess
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateVyStaycationInventoryModelMutation>(
      response.data.updateVYStaycationInventoryModel
    );
  }
  async DeleteVyStaycationInventoryModel(
    input: DeleteVYStaycationInventoryModelInput
  ): Promise<DeleteVyStaycationInventoryModelMutation> {
    const statement = `mutation DeleteVyStaycationInventoryModel($input: DeleteVYStaycationInventoryModelInput!) {
        deleteVYStaycationInventoryModel(input: $input) {
          __typename
          id
          packageId
          inventoryDate
          roomType
          totalRooms
          availableRooms
          bookedRooms
          inventoryStatus
          roomId
          packageReference
          fareInfo
          extraData
          groupsCanAccess
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteVyStaycationInventoryModelMutation>(
      response.data.deleteVYStaycationInventoryModel
    );
  }
  async CreateVyCouponBatches(
    input: CreateVYCouponBatchesInput
  ): Promise<CreateVyCouponBatchesMutation> {
    const statement = `mutation CreateVyCouponBatches($input: CreateVYCouponBatchesInput!) {
        createVYCouponBatches(input: $input) {
          __typename
          vendorId
          createdAt
          batchId
          batchName
          batchCode
          packageId
          couponCount
          groupsCanAccess
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateVyCouponBatchesMutation>response.data.createVYCouponBatches;
  }
  async UpdateVyCouponBatches(
    input: UpdateVYCouponBatchesInput
  ): Promise<UpdateVyCouponBatchesMutation> {
    const statement = `mutation UpdateVyCouponBatches($input: UpdateVYCouponBatchesInput!) {
        updateVYCouponBatches(input: $input) {
          __typename
          vendorId
          createdAt
          batchId
          batchName
          batchCode
          packageId
          couponCount
          groupsCanAccess
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateVyCouponBatchesMutation>response.data.updateVYCouponBatches;
  }
  async DeleteVyCouponBatches(
    input: DeleteVYCouponBatchesInput
  ): Promise<DeleteVyCouponBatchesMutation> {
    const statement = `mutation DeleteVyCouponBatches($input: DeleteVYCouponBatchesInput!) {
        deleteVYCouponBatches(input: $input) {
          __typename
          vendorId
          createdAt
          batchId
          batchName
          batchCode
          packageId
          couponCount
          groupsCanAccess
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteVyCouponBatchesMutation>response.data.deleteVYCouponBatches;
  }
  async CreateVyVendorsModel(
    input: CreateVYVendorsModelInput
  ): Promise<CreateVyVendorsModelMutation> {
    const statement = `mutation CreateVyVendorsModel($input: CreateVYVendorsModelInput!) {
        createVYVendorsModel(input: $input) {
          __typename
          id
          vendorName
          vendorCode
          contactPhone
          email
          vendorStatus
          vendorData
          contactAddress
          conginitoName
          cognitoUserId
          congnitoSecret
          groupsCanAccess
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateVyVendorsModelMutation>response.data.createVYVendorsModel;
  }
  async UpdateVyVendorsModel(
    input: UpdateVYVendorsModelInput
  ): Promise<UpdateVyVendorsModelMutation> {
    const statement = `mutation UpdateVyVendorsModel($input: UpdateVYVendorsModelInput!) {
        updateVYVendorsModel(input: $input) {
          __typename
          id
          vendorName
          vendorCode
          contactPhone
          email
          vendorStatus
          vendorData
          contactAddress
          conginitoName
          cognitoUserId
          congnitoSecret
          groupsCanAccess
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateVyVendorsModelMutation>response.data.updateVYVendorsModel;
  }
  async DeleteVyVendorsModel(
    input: DeleteVYVendorsModelInput
  ): Promise<DeleteVyVendorsModelMutation> {
    const statement = `mutation DeleteVyVendorsModel($input: DeleteVYVendorsModelInput!) {
        deleteVYVendorsModel(input: $input) {
          __typename
          id
          vendorName
          vendorCode
          contactPhone
          email
          vendorStatus
          vendorData
          contactAddress
          conginitoName
          cognitoUserId
          congnitoSecret
          groupsCanAccess
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteVyVendorsModelMutation>response.data.deleteVYVendorsModel;
  }
  async CreateVyCouponCodesModel(
    input: CreateVYCouponCodesModelInput
  ): Promise<CreateVyCouponCodesModelMutation> {
    const statement = `mutation CreateVyCouponCodesModel($input: CreateVYCouponCodesModelInput!) {
        createVYCouponCodesModel(input: $input) {
          __typename
          couponCode
          batchCode
          batchId
          packageId
          vendorId
          validFrom
          validUpto
          couponStatus
          discountType
          discountPercent
          discountFixedValue
          groupsCanAccess
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateVyCouponCodesModelMutation>(
      response.data.createVYCouponCodesModel
    );
  }
  async UpdateVyCouponCodesModel(
    input: UpdateVYCouponCodesModelInput
  ): Promise<UpdateVyCouponCodesModelMutation> {
    const statement = `mutation UpdateVyCouponCodesModel($input: UpdateVYCouponCodesModelInput!) {
        updateVYCouponCodesModel(input: $input) {
          __typename
          couponCode
          batchCode
          batchId
          packageId
          vendorId
          validFrom
          validUpto
          couponStatus
          discountType
          discountPercent
          discountFixedValue
          groupsCanAccess
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateVyCouponCodesModelMutation>(
      response.data.updateVYCouponCodesModel
    );
  }
  async DeleteVyCouponCodesModel(
    input: DeleteVYCouponCodesModelInput
  ): Promise<DeleteVyCouponCodesModelMutation> {
    const statement = `mutation DeleteVyCouponCodesModel($input: DeleteVYCouponCodesModelInput!) {
        deleteVYCouponCodesModel(input: $input) {
          __typename
          couponCode
          batchCode
          batchId
          packageId
          vendorId
          validFrom
          validUpto
          couponStatus
          discountType
          discountPercent
          discountFixedValue
          groupsCanAccess
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteVyCouponCodesModelMutation>(
      response.data.deleteVYCouponCodesModel
    );
  }
  async CreateVyCustomBookingModel(
    input: CreateVYCustomBookingModelInput
  ): Promise<CreateVyCustomBookingModelMutation> {
    const statement = `mutation CreateVyCustomBookingModel($input: CreateVYCustomBookingModelInput!) {
        createVYCustomBookingModel(input: $input) {
          __typename
          id
          username
          itineraryName
          bookingType
          bookingStatus
          bookingDetails
          travelStartDate
          travelCity
          email
          mobileNo
          bookingDecription
          bookingReference
          paymentDetails
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateVyCustomBookingModelMutation>(
      response.data.createVYCustomBookingModel
    );
  }
  async UpdateVyCustomBookingModel(
    input: UpdateVYCustomBookingModelInput
  ): Promise<UpdateVyCustomBookingModelMutation> {
    const statement = `mutation UpdateVyCustomBookingModel($input: UpdateVYCustomBookingModelInput!) {
        updateVYCustomBookingModel(input: $input) {
          __typename
          id
          username
          itineraryName
          bookingType
          bookingStatus
          bookingDetails
          travelStartDate
          travelCity
          email
          mobileNo
          bookingDecription
          bookingReference
          paymentDetails
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateVyCustomBookingModelMutation>(
      response.data.updateVYCustomBookingModel
    );
  }
  async DeleteVyCustomBookingModel(
    input: DeleteVYCustomBookingModelInput
  ): Promise<DeleteVyCustomBookingModelMutation> {
    const statement = `mutation DeleteVyCustomBookingModel($input: DeleteVYCustomBookingModelInput!) {
        deleteVYCustomBookingModel(input: $input) {
          __typename
          id
          username
          itineraryName
          bookingType
          bookingStatus
          bookingDetails
          travelStartDate
          travelCity
          email
          mobileNo
          bookingDecription
          bookingReference
          paymentDetails
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteVyCustomBookingModelMutation>(
      response.data.deleteVYCustomBookingModel
    );
  }
  async CreateVyStaycationBookingModel(
    input: CreateVYStaycationBookingModelInput
  ): Promise<CreateVyStaycationBookingModelMutation> {
    const statement = `mutation CreateVyStaycationBookingModel($input: CreateVYStaycationBookingModelInput!) {
        createVYStaycationBookingModel(input: $input) {
          __typename
          id
          username
          itineraryName
          bookingType
          bookingStatus
          travelStartDate
          bookingDetails
          vendorId
          packageId
          bookingReference
          email
          mobileNo
          couponCode
          roomType
          basePackagePrice
          discountedPrice
          discountedValue
          paymentDetails
          canceledDate
          refundAmount
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateVyStaycationBookingModelMutation>(
      response.data.createVYStaycationBookingModel
    );
  }
  async UpdateVyStaycationBookingModel(
    input: UpdateVYStaycationBookingModelInput
  ): Promise<UpdateVyStaycationBookingModelMutation> {
    const statement = `mutation UpdateVyStaycationBookingModel($input: UpdateVYStaycationBookingModelInput!) {
        updateVYStaycationBookingModel(input: $input) {
          __typename
          id
          username
          itineraryName
          bookingType
          bookingStatus
          travelStartDate
          bookingDetails
          vendorId
          packageId
          bookingReference
          email
          mobileNo
          couponCode
          roomType
          basePackagePrice
          discountedPrice
          discountedValue
          paymentDetails
          canceledDate
          refundAmount
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateVyStaycationBookingModelMutation>(
      response.data.updateVYStaycationBookingModel
    );
  }
  async DeleteVyStaycationBookingModel(
    input: DeleteVYStaycationBookingModelInput
  ): Promise<DeleteVyStaycationBookingModelMutation> {
    const statement = `mutation DeleteVyStaycationBookingModel($input: DeleteVYStaycationBookingModelInput!) {
        deleteVYStaycationBookingModel(input: $input) {
          __typename
          id
          username
          itineraryName
          bookingType
          bookingStatus
          travelStartDate
          bookingDetails
          vendorId
          packageId
          bookingReference
          email
          mobileNo
          couponCode
          roomType
          basePackagePrice
          discountedPrice
          discountedValue
          paymentDetails
          canceledDate
          refundAmount
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteVyStaycationBookingModelMutation>(
      response.data.deleteVYStaycationBookingModel
    );
  }
  async GetVyCurrentItineraryModel(
    id: string
  ): Promise<GetVyCurrentItineraryModelQuery> {
    const statement = `query GetVyCurrentItineraryModel($id: ID!) {
        getVYCurrentItineraryModel(id: $id) {
          __typename
          id
          username
          itineraryName
          currentItinerary {
            __typename
            itineraryName
            startDate
            endDate
            originCity {
              __typename
              id
              airportCode
              airportName
              cityName
              countryCode
              countryName
              vendorName
              latitude
              longitude
            }
            destinationCities {
              __typename
              id
              airportCode
              airportName
              cityName
              countryCode
              countryName
              vendorName
              latitude
              longitude
            }
            travelType
            travellers {
              __typename
              adultCount
              childCount
              infantCount
            }
            packageId
          }
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetVyCurrentItineraryModelQuery>(
      response.data.getVYCurrentItineraryModel
    );
  }
  async ListVyCurrentItineraryModels(
    filter?: ModelVYCurrentItineraryModelFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListVyCurrentItineraryModelsQuery> {
    const statement = `query ListVyCurrentItineraryModels($filter: ModelVYCurrentItineraryModelFilterInput, $limit: Int, $nextToken: String) {
        listVYCurrentItineraryModels(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            username
            itineraryName
            currentItinerary {
              __typename
              itineraryName
              startDate
              endDate
              originCity {
                __typename
                id
                airportCode
                airportName
                cityName
                countryCode
                countryName
                vendorName
                latitude
                longitude
              }
              destinationCities {
                __typename
                id
                airportCode
                airportName
                cityName
                countryCode
                countryName
                vendorName
                latitude
                longitude
              }
              travelType
              travellers {
                __typename
                adultCount
                childCount
                infantCount
              }
              packageId
            }
            createdAt
            updatedAt
            owner
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListVyCurrentItineraryModelsQuery>(
      response.data.listVYCurrentItineraryModels
    );
  }
  async GetVyUserProfileModel(id: string): Promise<GetVyUserProfileModelQuery> {
    const statement = `query GetVyUserProfileModel($id: ID!) {
        getVYUserProfileModel(id: $id) {
          __typename
          id
          username
          userProfile {
            __typename
            id
            firstName
            middleName
            lastName
            relationshipToUser
            dateOfBirth
            gender
            maritalStatus
            mobileNo
            isMobileVerified
            email
            isEmailVerified
            idDetails {
              __typename
              idType
              idNumber
              issuedOn
              expiryDate
              countryName
              cityName
            }
            address
            cityName
            countryName
            zipCode
          }
          familyProfile {
            __typename
            id
            firstName
            middleName
            lastName
            relationshipToUser
            dateOfBirth
            gender
            maritalStatus
            mobileNo
            isMobileVerified
            email
            isEmailVerified
            idDetails {
              __typename
              idType
              idNumber
              issuedOn
              expiryDate
              countryName
              cityName
            }
            address
            cityName
            countryName
            zipCode
          }
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetVyUserProfileModelQuery>response.data.getVYUserProfileModel;
  }
  async ListVyUserProfileModels(
    filter?: ModelVYUserProfileModelFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListVyUserProfileModelsQuery> {
    const statement = `query ListVyUserProfileModels($filter: ModelVYUserProfileModelFilterInput, $limit: Int, $nextToken: String) {
        listVYUserProfileModels(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            username
            userProfile {
              __typename
              id
              firstName
              middleName
              lastName
              relationshipToUser
              dateOfBirth
              gender
              maritalStatus
              mobileNo
              isMobileVerified
              email
              isEmailVerified
              idDetails {
                __typename
                idType
                idNumber
                issuedOn
                expiryDate
                countryName
                cityName
              }
              address
              cityName
              countryName
              zipCode
            }
            familyProfile {
              __typename
              id
              firstName
              middleName
              lastName
              relationshipToUser
              dateOfBirth
              gender
              maritalStatus
              mobileNo
              isMobileVerified
              email
              isEmailVerified
              idDetails {
                __typename
                idType
                idNumber
                issuedOn
                expiryDate
                countryName
                cityName
              }
              address
              cityName
              countryName
              zipCode
            }
            createdAt
            updatedAt
            owner
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListVyUserProfileModelsQuery>response.data.listVYUserProfileModels;
  }
  async GetVyTravelPackage(id: string): Promise<GetVyTravelPackageQuery> {
    const statement = `query GetVyTravelPackage($id: ID!) {
        getVYTravelPackage(id: $id) {
          __typename
          id
          packagename
          packageStatus
          packageReference
          packageValues
          availableFrom
          availableUpTo
          packageOwners
          groupsCanAccess
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetVyTravelPackageQuery>response.data.getVYTravelPackage;
  }
  async ListVyTravelPackages(
    filter?: ModelVYTravelPackageFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListVyTravelPackagesQuery> {
    const statement = `query ListVyTravelPackages($filter: ModelVYTravelPackageFilterInput, $limit: Int, $nextToken: String) {
        listVYTravelPackages(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            packagename
            packageStatus
            packageReference
            packageValues
            availableFrom
            availableUpTo
            packageOwners
            groupsCanAccess
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListVyTravelPackagesQuery>response.data.listVYTravelPackages;
  }
  async GetVyTrawexSettingsModel(
    id: string
  ): Promise<GetVyTrawexSettingsModelQuery> {
    const statement = `query GetVyTrawexSettingsModel($id: ID!) {
        getVYTrawexSettingsModel(id: $id) {
          __typename
          id
          flights {
            __typename
            defaultMargin {
              __typename
              percentValue
              minimumFee
            }
            byAirline {
              __typename
              exclusionName
              exclusionCode
              exclusionMargin {
                __typename
                percentValue
                minimumFee
              }
            }
            byDestination {
              __typename
              exclusionName
              exclusionCode
              exclusionMargin {
                __typename
                percentValue
                minimumFee
              }
            }
            cancelPolicy {
              __typename
              minimumFee
              adminFee
              cancelRules {
                __typename
                refundPercent
                graceDays
              }
            }
          }
          hotels {
            __typename
            defaultMargin {
              __typename
              percentValue
              minimumFee
            }
            byHotelChain {
              __typename
              exclusionName
              exclusionCode
              exclusionMargin {
                __typename
                percentValue
                minimumFee
              }
            }
            cancelPolicy {
              __typename
              minimumFee
              adminFee
              cancelRules {
                __typename
                refundPercent
                graceDays
              }
            }
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetVyTrawexSettingsModelQuery>(
      response.data.getVYTrawexSettingsModel
    );
  }
  async ListVyTrawexSettingsModels(
    filter?: ModelVYTrawexSettingsModelFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListVyTrawexSettingsModelsQuery> {
    const statement = `query ListVyTrawexSettingsModels($filter: ModelVYTrawexSettingsModelFilterInput, $limit: Int, $nextToken: String) {
        listVYTrawexSettingsModels(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            flights {
              __typename
              defaultMargin {
                __typename
                percentValue
                minimumFee
              }
              byAirline {
                __typename
                exclusionName
                exclusionCode
              }
              byDestination {
                __typename
                exclusionName
                exclusionCode
              }
              cancelPolicy {
                __typename
                minimumFee
                adminFee
              }
            }
            hotels {
              __typename
              defaultMargin {
                __typename
                percentValue
                minimumFee
              }
              byHotelChain {
                __typename
                exclusionName
                exclusionCode
              }
              cancelPolicy {
                __typename
                minimumFee
                adminFee
              }
            }
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListVyTrawexSettingsModelsQuery>(
      response.data.listVYTrawexSettingsModels
    );
  }
  async GetVyMusementSettingsModel(
    id: string
  ): Promise<GetVyMusementSettingsModelQuery> {
    const statement = `query GetVyMusementSettingsModel($id: ID!) {
        getVYMusementSettingsModel(id: $id) {
          __typename
          id
          activities {
            __typename
            defaultMargin {
              __typename
              percentValue
              minimumFee
            }
            byActivity {
              __typename
              exclusionName
              exclusionCode
              exclusionMargin {
                __typename
                percentValue
                minimumFee
              }
            }
            cancelPolicy {
              __typename
              minimumFee
              adminFee
              cancelRules {
                __typename
                refundPercent
                graceDays
              }
            }
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetVyMusementSettingsModelQuery>(
      response.data.getVYMusementSettingsModel
    );
  }
  async ListVyMusementSettingsModels(
    filter?: ModelVYMusementSettingsModelFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListVyMusementSettingsModelsQuery> {
    const statement = `query ListVyMusementSettingsModels($filter: ModelVYMusementSettingsModelFilterInput, $limit: Int, $nextToken: String) {
        listVYMusementSettingsModels(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            activities {
              __typename
              defaultMargin {
                __typename
                percentValue
                minimumFee
              }
              byActivity {
                __typename
                exclusionName
                exclusionCode
              }
              cancelPolicy {
                __typename
                minimumFee
                adminFee
              }
            }
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListVyMusementSettingsModelsQuery>(
      response.data.listVYMusementSettingsModels
    );
  }
  async GetVyPackageInventoryModel(
    packageId: string,
    inventoryDate: string,
    roomType: string
  ): Promise<GetVyPackageInventoryModelQuery> {
    const statement = `query GetVyPackageInventoryModel($packageId: String!, $inventoryDate: AWSDateTime!, $roomType: String!) {
        getVYPackageInventoryModel(packageId: $packageId, inventoryDate: $inventoryDate, roomType: $roomType) {
          __typename
          packageId
          inventoryDate
          roomType
          totalRooms
          availableRooms
          bookedRooms
          inventoryStatus
          fareInfo
          groupsCanAccess
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      packageId,
      inventoryDate,
      roomType
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetVyPackageInventoryModelQuery>(
      response.data.getVYPackageInventoryModel
    );
  }
  async ListVyPackageInventoryModels(
    packageId?: string,
    inventoryDateRoomType?: ModelVYPackageInventoryModelPrimaryCompositeKeyConditionInput,
    filter?: ModelVYPackageInventoryModelFilterInput,
    limit?: number,
    nextToken?: string,
    sortDirection?: ModelSortDirection
  ): Promise<ListVyPackageInventoryModelsQuery> {
    const statement = `query ListVyPackageInventoryModels($packageId: String, $inventoryDateRoomType: ModelVYPackageInventoryModelPrimaryCompositeKeyConditionInput, $filter: ModelVYPackageInventoryModelFilterInput, $limit: Int, $nextToken: String, $sortDirection: ModelSortDirection) {
        listVYPackageInventoryModels(packageId: $packageId, inventoryDateRoomType: $inventoryDateRoomType, filter: $filter, limit: $limit, nextToken: $nextToken, sortDirection: $sortDirection) {
          __typename
          items {
            __typename
            packageId
            inventoryDate
            roomType
            totalRooms
            availableRooms
            bookedRooms
            inventoryStatus
            fareInfo
            groupsCanAccess
            createdAt
            updatedAt
            owner
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (packageId) {
      gqlAPIServiceArguments.packageId = packageId;
    }
    if (inventoryDateRoomType) {
      gqlAPIServiceArguments.inventoryDateRoomType = inventoryDateRoomType;
    }
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    if (sortDirection) {
      gqlAPIServiceArguments.sortDirection = sortDirection;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListVyPackageInventoryModelsQuery>(
      response.data.listVYPackageInventoryModels
    );
  }
  async GetVyStaycationInventoryModel(
    id: string
  ): Promise<GetVyStaycationInventoryModelQuery> {
    const statement = `query GetVyStaycationInventoryModel($id: ID!) {
        getVYStaycationInventoryModel(id: $id) {
          __typename
          id
          packageId
          inventoryDate
          roomType
          totalRooms
          availableRooms
          bookedRooms
          inventoryStatus
          roomId
          packageReference
          fareInfo
          extraData
          groupsCanAccess
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetVyStaycationInventoryModelQuery>(
      response.data.getVYStaycationInventoryModel
    );
  }
  async ListVyStaycationInventoryModels(
    filter?: ModelVYStaycationInventoryModelFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListVyStaycationInventoryModelsQuery> {
    const statement = `query ListVyStaycationInventoryModels($filter: ModelVYStaycationInventoryModelFilterInput, $limit: Int, $nextToken: String) {
        listVYStaycationInventoryModels(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            packageId
            inventoryDate
            roomType
            totalRooms
            availableRooms
            bookedRooms
            inventoryStatus
            roomId
            packageReference
            fareInfo
            extraData
            groupsCanAccess
            createdAt
            updatedAt
            owner
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListVyStaycationInventoryModelsQuery>(
      response.data.listVYStaycationInventoryModels
    );
  }
  async GetVyCouponBatches(
    vendorId: string,
    createdAt: string
  ): Promise<GetVyCouponBatchesQuery> {
    const statement = `query GetVyCouponBatches($vendorId: ID!, $createdAt: AWSDateTime!) {
        getVYCouponBatches(vendorId: $vendorId, createdAt: $createdAt) {
          __typename
          vendorId
          createdAt
          batchId
          batchName
          batchCode
          packageId
          couponCount
          groupsCanAccess
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      vendorId,
      createdAt
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetVyCouponBatchesQuery>response.data.getVYCouponBatches;
  }
  async ListVyCouponBatchess(
    vendorId?: string,
    createdAt?: ModelStringKeyConditionInput,
    filter?: ModelVYCouponBatchesFilterInput,
    limit?: number,
    nextToken?: string,
    sortDirection?: ModelSortDirection
  ): Promise<ListVyCouponBatchessQuery> {
    const statement = `query ListVyCouponBatchess($vendorId: ID, $createdAt: ModelStringKeyConditionInput, $filter: ModelVYCouponBatchesFilterInput, $limit: Int, $nextToken: String, $sortDirection: ModelSortDirection) {
        listVYCouponBatchess(vendorId: $vendorId, createdAt: $createdAt, filter: $filter, limit: $limit, nextToken: $nextToken, sortDirection: $sortDirection) {
          __typename
          items {
            __typename
            vendorId
            createdAt
            batchId
            batchName
            batchCode
            packageId
            couponCount
            groupsCanAccess
            updatedAt
            owner
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (vendorId) {
      gqlAPIServiceArguments.vendorId = vendorId;
    }
    if (createdAt) {
      gqlAPIServiceArguments.createdAt = createdAt;
    }
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    if (sortDirection) {
      gqlAPIServiceArguments.sortDirection = sortDirection;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListVyCouponBatchessQuery>response.data.listVYCouponBatchess;
  }
  async ItemsByPackageId(
    vendorId?: string,
    packageId?: ModelIDKeyConditionInput,
    sortDirection?: ModelSortDirection,
    filter?: ModelVYCouponBatchesFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ItemsByPackageIdQuery> {
    const statement = `query ItemsByPackageId($vendorId: ID, $packageId: ModelIDKeyConditionInput, $sortDirection: ModelSortDirection, $filter: ModelVYCouponBatchesFilterInput, $limit: Int, $nextToken: String) {
        ItemsByPackageId(vendorId: $vendorId, packageId: $packageId, sortDirection: $sortDirection, filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            vendorId
            createdAt
            batchId
            batchName
            batchCode
            packageId
            couponCount
            groupsCanAccess
            updatedAt
            owner
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (vendorId) {
      gqlAPIServiceArguments.vendorId = vendorId;
    }
    if (packageId) {
      gqlAPIServiceArguments.packageId = packageId;
    }
    if (sortDirection) {
      gqlAPIServiceArguments.sortDirection = sortDirection;
    }
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ItemsByPackageIdQuery>response.data.ItemsByPackageId;
  }
  async GetVyVendorsModel(id: string): Promise<GetVyVendorsModelQuery> {
    const statement = `query GetVyVendorsModel($id: ID!) {
        getVYVendorsModel(id: $id) {
          __typename
          id
          vendorName
          vendorCode
          contactPhone
          email
          vendorStatus
          vendorData
          contactAddress
          conginitoName
          cognitoUserId
          congnitoSecret
          groupsCanAccess
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetVyVendorsModelQuery>response.data.getVYVendorsModel;
  }
  async ListVyVendorsModels(
    filter?: ModelVYVendorsModelFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListVyVendorsModelsQuery> {
    const statement = `query ListVyVendorsModels($filter: ModelVYVendorsModelFilterInput, $limit: Int, $nextToken: String) {
        listVYVendorsModels(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            vendorName
            vendorCode
            contactPhone
            email
            vendorStatus
            vendorData
            contactAddress
            conginitoName
            cognitoUserId
            congnitoSecret
            groupsCanAccess
            createdAt
            updatedAt
            owner
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListVyVendorsModelsQuery>response.data.listVYVendorsModels;
  }
  async GetVyCouponCodesModel(
    batchCode: string,
    couponCode: string
  ): Promise<GetVyCouponCodesModelQuery> {
    const statement = `query GetVyCouponCodesModel($batchCode: String!, $couponCode: String!) {
        getVYCouponCodesModel(batchCode: $batchCode, couponCode: $couponCode) {
          __typename
          couponCode
          batchCode
          batchId
          packageId
          vendorId
          validFrom
          validUpto
          couponStatus
          discountType
          discountPercent
          discountFixedValue
          groupsCanAccess
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      batchCode,
      couponCode
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetVyCouponCodesModelQuery>response.data.getVYCouponCodesModel;
  }
  async ListVyCouponCodesModels(
    batchCode?: string,
    couponCode?: ModelStringKeyConditionInput,
    filter?: ModelVYCouponCodesModelFilterInput,
    limit?: number,
    nextToken?: string,
    sortDirection?: ModelSortDirection
  ): Promise<ListVyCouponCodesModelsQuery> {
    const statement = `query ListVyCouponCodesModels($batchCode: String, $couponCode: ModelStringKeyConditionInput, $filter: ModelVYCouponCodesModelFilterInput, $limit: Int, $nextToken: String, $sortDirection: ModelSortDirection) {
        listVYCouponCodesModels(batchCode: $batchCode, couponCode: $couponCode, filter: $filter, limit: $limit, nextToken: $nextToken, sortDirection: $sortDirection) {
          __typename
          items {
            __typename
            couponCode
            batchCode
            batchId
            packageId
            vendorId
            validFrom
            validUpto
            couponStatus
            discountType
            discountPercent
            discountFixedValue
            groupsCanAccess
            createdAt
            updatedAt
            owner
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (batchCode) {
      gqlAPIServiceArguments.batchCode = batchCode;
    }
    if (couponCode) {
      gqlAPIServiceArguments.couponCode = couponCode;
    }
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    if (sortDirection) {
      gqlAPIServiceArguments.sortDirection = sortDirection;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListVyCouponCodesModelsQuery>response.data.listVYCouponCodesModels;
  }
  async GetVyCustomBookingModel(
    id: string
  ): Promise<GetVyCustomBookingModelQuery> {
    const statement = `query GetVyCustomBookingModel($id: ID!) {
        getVYCustomBookingModel(id: $id) {
          __typename
          id
          username
          itineraryName
          bookingType
          bookingStatus
          bookingDetails
          travelStartDate
          travelCity
          email
          mobileNo
          bookingDecription
          bookingReference
          paymentDetails
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetVyCustomBookingModelQuery>response.data.getVYCustomBookingModel;
  }
  async ListVyCustomBookingModels(
    filter?: ModelVYCustomBookingModelFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListVyCustomBookingModelsQuery> {
    const statement = `query ListVyCustomBookingModels($filter: ModelVYCustomBookingModelFilterInput, $limit: Int, $nextToken: String) {
        listVYCustomBookingModels(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            username
            itineraryName
            bookingType
            bookingStatus
            bookingDetails
            travelStartDate
            travelCity
            email
            mobileNo
            bookingDecription
            bookingReference
            paymentDetails
            createdAt
            updatedAt
            owner
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListVyCustomBookingModelsQuery>(
      response.data.listVYCustomBookingModels
    );
  }
  async GetVyStaycationBookingModel(
    id: string
  ): Promise<GetVyStaycationBookingModelQuery> {
    const statement = `query GetVyStaycationBookingModel($id: ID!) {
        getVYStaycationBookingModel(id: $id) {
          __typename
          id
          username
          itineraryName
          bookingType
          bookingStatus
          travelStartDate
          bookingDetails
          vendorId
          packageId
          bookingReference
          email
          mobileNo
          couponCode
          roomType
          basePackagePrice
          discountedPrice
          discountedValue
          paymentDetails
          canceledDate
          refundAmount
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetVyStaycationBookingModelQuery>(
      response.data.getVYStaycationBookingModel
    );
  }
  async ListVyStaycationBookingModels(
    filter?: ModelVYStaycationBookingModelFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListVyStaycationBookingModelsQuery> {
    const statement = `query ListVyStaycationBookingModels($filter: ModelVYStaycationBookingModelFilterInput, $limit: Int, $nextToken: String) {
        listVYStaycationBookingModels(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            username
            itineraryName
            bookingType
            bookingStatus
            travelStartDate
            bookingDetails
            vendorId
            packageId
            bookingReference
            email
            mobileNo
            couponCode
            roomType
            basePackagePrice
            discountedPrice
            discountedValue
            paymentDetails
            canceledDate
            refundAmount
            createdAt
            updatedAt
            owner
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListVyStaycationBookingModelsQuery>(
      response.data.listVYStaycationBookingModels
    );
  }
  OnCreateVyCurrentItineraryModelListener: Observable<
    SubscriptionResponse<OnCreateVyCurrentItineraryModelSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateVyCurrentItineraryModel($owner: String) {
        onCreateVYCurrentItineraryModel(owner: $owner) {
          __typename
          id
          username
          itineraryName
          currentItinerary {
            __typename
            itineraryName
            startDate
            endDate
            originCity {
              __typename
              id
              airportCode
              airportName
              cityName
              countryCode
              countryName
              vendorName
              latitude
              longitude
            }
            destinationCities {
              __typename
              id
              airportCode
              airportName
              cityName
              countryCode
              countryName
              vendorName
              latitude
              longitude
            }
            travelType
            travellers {
              __typename
              adultCount
              childCount
              infantCount
            }
            packageId
          }
          createdAt
          updatedAt
          owner
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<OnCreateVyCurrentItineraryModelSubscription>
  >;

  OnUpdateVyCurrentItineraryModelListener: Observable<
    SubscriptionResponse<OnUpdateVyCurrentItineraryModelSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateVyCurrentItineraryModel($owner: String) {
        onUpdateVYCurrentItineraryModel(owner: $owner) {
          __typename
          id
          username
          itineraryName
          currentItinerary {
            __typename
            itineraryName
            startDate
            endDate
            originCity {
              __typename
              id
              airportCode
              airportName
              cityName
              countryCode
              countryName
              vendorName
              latitude
              longitude
            }
            destinationCities {
              __typename
              id
              airportCode
              airportName
              cityName
              countryCode
              countryName
              vendorName
              latitude
              longitude
            }
            travelType
            travellers {
              __typename
              adultCount
              childCount
              infantCount
            }
            packageId
          }
          createdAt
          updatedAt
          owner
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<OnUpdateVyCurrentItineraryModelSubscription>
  >;

  OnDeleteVyCurrentItineraryModelListener: Observable<
    SubscriptionResponse<OnDeleteVyCurrentItineraryModelSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteVyCurrentItineraryModel($owner: String) {
        onDeleteVYCurrentItineraryModel(owner: $owner) {
          __typename
          id
          username
          itineraryName
          currentItinerary {
            __typename
            itineraryName
            startDate
            endDate
            originCity {
              __typename
              id
              airportCode
              airportName
              cityName
              countryCode
              countryName
              vendorName
              latitude
              longitude
            }
            destinationCities {
              __typename
              id
              airportCode
              airportName
              cityName
              countryCode
              countryName
              vendorName
              latitude
              longitude
            }
            travelType
            travellers {
              __typename
              adultCount
              childCount
              infantCount
            }
            packageId
          }
          createdAt
          updatedAt
          owner
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<OnDeleteVyCurrentItineraryModelSubscription>
  >;

  OnCreateVyUserProfileModelListener: Observable<
    SubscriptionResponse<OnCreateVyUserProfileModelSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateVyUserProfileModel($owner: String) {
        onCreateVYUserProfileModel(owner: $owner) {
          __typename
          id
          username
          userProfile {
            __typename
            id
            firstName
            middleName
            lastName
            relationshipToUser
            dateOfBirth
            gender
            maritalStatus
            mobileNo
            isMobileVerified
            email
            isEmailVerified
            idDetails {
              __typename
              idType
              idNumber
              issuedOn
              expiryDate
              countryName
              cityName
            }
            address
            cityName
            countryName
            zipCode
          }
          familyProfile {
            __typename
            id
            firstName
            middleName
            lastName
            relationshipToUser
            dateOfBirth
            gender
            maritalStatus
            mobileNo
            isMobileVerified
            email
            isEmailVerified
            idDetails {
              __typename
              idType
              idNumber
              issuedOn
              expiryDate
              countryName
              cityName
            }
            address
            cityName
            countryName
            zipCode
          }
          createdAt
          updatedAt
          owner
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnCreateVyUserProfileModelSubscription>>;

  OnUpdateVyUserProfileModelListener: Observable<
    SubscriptionResponse<OnUpdateVyUserProfileModelSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateVyUserProfileModel($owner: String) {
        onUpdateVYUserProfileModel(owner: $owner) {
          __typename
          id
          username
          userProfile {
            __typename
            id
            firstName
            middleName
            lastName
            relationshipToUser
            dateOfBirth
            gender
            maritalStatus
            mobileNo
            isMobileVerified
            email
            isEmailVerified
            idDetails {
              __typename
              idType
              idNumber
              issuedOn
              expiryDate
              countryName
              cityName
            }
            address
            cityName
            countryName
            zipCode
          }
          familyProfile {
            __typename
            id
            firstName
            middleName
            lastName
            relationshipToUser
            dateOfBirth
            gender
            maritalStatus
            mobileNo
            isMobileVerified
            email
            isEmailVerified
            idDetails {
              __typename
              idType
              idNumber
              issuedOn
              expiryDate
              countryName
              cityName
            }
            address
            cityName
            countryName
            zipCode
          }
          createdAt
          updatedAt
          owner
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnUpdateVyUserProfileModelSubscription>>;

  OnDeleteVyUserProfileModelListener: Observable<
    SubscriptionResponse<OnDeleteVyUserProfileModelSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteVyUserProfileModel($owner: String) {
        onDeleteVYUserProfileModel(owner: $owner) {
          __typename
          id
          username
          userProfile {
            __typename
            id
            firstName
            middleName
            lastName
            relationshipToUser
            dateOfBirth
            gender
            maritalStatus
            mobileNo
            isMobileVerified
            email
            isEmailVerified
            idDetails {
              __typename
              idType
              idNumber
              issuedOn
              expiryDate
              countryName
              cityName
            }
            address
            cityName
            countryName
            zipCode
          }
          familyProfile {
            __typename
            id
            firstName
            middleName
            lastName
            relationshipToUser
            dateOfBirth
            gender
            maritalStatus
            mobileNo
            isMobileVerified
            email
            isEmailVerified
            idDetails {
              __typename
              idType
              idNumber
              issuedOn
              expiryDate
              countryName
              cityName
            }
            address
            cityName
            countryName
            zipCode
          }
          createdAt
          updatedAt
          owner
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnDeleteVyUserProfileModelSubscription>>;

  OnCreateVyTravelPackageListener: Observable<
    SubscriptionResponse<OnCreateVyTravelPackageSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateVyTravelPackage {
        onCreateVYTravelPackage {
          __typename
          id
          packagename
          packageStatus
          packageReference
          packageValues
          availableFrom
          availableUpTo
          packageOwners
          groupsCanAccess
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnCreateVyTravelPackageSubscription>>;

  OnUpdateVyTravelPackageListener: Observable<
    SubscriptionResponse<OnUpdateVyTravelPackageSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateVyTravelPackage {
        onUpdateVYTravelPackage {
          __typename
          id
          packagename
          packageStatus
          packageReference
          packageValues
          availableFrom
          availableUpTo
          packageOwners
          groupsCanAccess
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnUpdateVyTravelPackageSubscription>>;

  OnDeleteVyTravelPackageListener: Observable<
    SubscriptionResponse<OnDeleteVyTravelPackageSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteVyTravelPackage {
        onDeleteVYTravelPackage {
          __typename
          id
          packagename
          packageStatus
          packageReference
          packageValues
          availableFrom
          availableUpTo
          packageOwners
          groupsCanAccess
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnDeleteVyTravelPackageSubscription>>;

  OnCreateVyTrawexSettingsModelListener: Observable<
    SubscriptionResponse<OnCreateVyTrawexSettingsModelSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateVyTrawexSettingsModel {
        onCreateVYTrawexSettingsModel {
          __typename
          id
          flights {
            __typename
            defaultMargin {
              __typename
              percentValue
              minimumFee
            }
            byAirline {
              __typename
              exclusionName
              exclusionCode
              exclusionMargin {
                __typename
                percentValue
                minimumFee
              }
            }
            byDestination {
              __typename
              exclusionName
              exclusionCode
              exclusionMargin {
                __typename
                percentValue
                minimumFee
              }
            }
            cancelPolicy {
              __typename
              minimumFee
              adminFee
              cancelRules {
                __typename
                refundPercent
                graceDays
              }
            }
          }
          hotels {
            __typename
            defaultMargin {
              __typename
              percentValue
              minimumFee
            }
            byHotelChain {
              __typename
              exclusionName
              exclusionCode
              exclusionMargin {
                __typename
                percentValue
                minimumFee
              }
            }
            cancelPolicy {
              __typename
              minimumFee
              adminFee
              cancelRules {
                __typename
                refundPercent
                graceDays
              }
            }
          }
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<OnCreateVyTrawexSettingsModelSubscription>
  >;

  OnUpdateVyTrawexSettingsModelListener: Observable<
    SubscriptionResponse<OnUpdateVyTrawexSettingsModelSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateVyTrawexSettingsModel {
        onUpdateVYTrawexSettingsModel {
          __typename
          id
          flights {
            __typename
            defaultMargin {
              __typename
              percentValue
              minimumFee
            }
            byAirline {
              __typename
              exclusionName
              exclusionCode
              exclusionMargin {
                __typename
                percentValue
                minimumFee
              }
            }
            byDestination {
              __typename
              exclusionName
              exclusionCode
              exclusionMargin {
                __typename
                percentValue
                minimumFee
              }
            }
            cancelPolicy {
              __typename
              minimumFee
              adminFee
              cancelRules {
                __typename
                refundPercent
                graceDays
              }
            }
          }
          hotels {
            __typename
            defaultMargin {
              __typename
              percentValue
              minimumFee
            }
            byHotelChain {
              __typename
              exclusionName
              exclusionCode
              exclusionMargin {
                __typename
                percentValue
                minimumFee
              }
            }
            cancelPolicy {
              __typename
              minimumFee
              adminFee
              cancelRules {
                __typename
                refundPercent
                graceDays
              }
            }
          }
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<OnUpdateVyTrawexSettingsModelSubscription>
  >;

  OnDeleteVyTrawexSettingsModelListener: Observable<
    SubscriptionResponse<OnDeleteVyTrawexSettingsModelSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteVyTrawexSettingsModel {
        onDeleteVYTrawexSettingsModel {
          __typename
          id
          flights {
            __typename
            defaultMargin {
              __typename
              percentValue
              minimumFee
            }
            byAirline {
              __typename
              exclusionName
              exclusionCode
              exclusionMargin {
                __typename
                percentValue
                minimumFee
              }
            }
            byDestination {
              __typename
              exclusionName
              exclusionCode
              exclusionMargin {
                __typename
                percentValue
                minimumFee
              }
            }
            cancelPolicy {
              __typename
              minimumFee
              adminFee
              cancelRules {
                __typename
                refundPercent
                graceDays
              }
            }
          }
          hotels {
            __typename
            defaultMargin {
              __typename
              percentValue
              minimumFee
            }
            byHotelChain {
              __typename
              exclusionName
              exclusionCode
              exclusionMargin {
                __typename
                percentValue
                minimumFee
              }
            }
            cancelPolicy {
              __typename
              minimumFee
              adminFee
              cancelRules {
                __typename
                refundPercent
                graceDays
              }
            }
          }
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<OnDeleteVyTrawexSettingsModelSubscription>
  >;

  OnCreateVyMusementSettingsModelListener: Observable<
    SubscriptionResponse<OnCreateVyMusementSettingsModelSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateVyMusementSettingsModel {
        onCreateVYMusementSettingsModel {
          __typename
          id
          activities {
            __typename
            defaultMargin {
              __typename
              percentValue
              minimumFee
            }
            byActivity {
              __typename
              exclusionName
              exclusionCode
              exclusionMargin {
                __typename
                percentValue
                minimumFee
              }
            }
            cancelPolicy {
              __typename
              minimumFee
              adminFee
              cancelRules {
                __typename
                refundPercent
                graceDays
              }
            }
          }
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<OnCreateVyMusementSettingsModelSubscription>
  >;

  OnUpdateVyMusementSettingsModelListener: Observable<
    SubscriptionResponse<OnUpdateVyMusementSettingsModelSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateVyMusementSettingsModel {
        onUpdateVYMusementSettingsModel {
          __typename
          id
          activities {
            __typename
            defaultMargin {
              __typename
              percentValue
              minimumFee
            }
            byActivity {
              __typename
              exclusionName
              exclusionCode
              exclusionMargin {
                __typename
                percentValue
                minimumFee
              }
            }
            cancelPolicy {
              __typename
              minimumFee
              adminFee
              cancelRules {
                __typename
                refundPercent
                graceDays
              }
            }
          }
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<OnUpdateVyMusementSettingsModelSubscription>
  >;

  OnDeleteVyMusementSettingsModelListener: Observable<
    SubscriptionResponse<OnDeleteVyMusementSettingsModelSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteVyMusementSettingsModel {
        onDeleteVYMusementSettingsModel {
          __typename
          id
          activities {
            __typename
            defaultMargin {
              __typename
              percentValue
              minimumFee
            }
            byActivity {
              __typename
              exclusionName
              exclusionCode
              exclusionMargin {
                __typename
                percentValue
                minimumFee
              }
            }
            cancelPolicy {
              __typename
              minimumFee
              adminFee
              cancelRules {
                __typename
                refundPercent
                graceDays
              }
            }
          }
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<OnDeleteVyMusementSettingsModelSubscription>
  >;

  OnCreateVyPackageInventoryModelListener: Observable<
    SubscriptionResponse<OnCreateVyPackageInventoryModelSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateVyPackageInventoryModel($owner: String) {
        onCreateVYPackageInventoryModel(owner: $owner) {
          __typename
          packageId
          inventoryDate
          roomType
          totalRooms
          availableRooms
          bookedRooms
          inventoryStatus
          fareInfo
          groupsCanAccess
          createdAt
          updatedAt
          owner
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<OnCreateVyPackageInventoryModelSubscription>
  >;

  OnUpdateVyPackageInventoryModelListener: Observable<
    SubscriptionResponse<OnUpdateVyPackageInventoryModelSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateVyPackageInventoryModel($owner: String) {
        onUpdateVYPackageInventoryModel(owner: $owner) {
          __typename
          packageId
          inventoryDate
          roomType
          totalRooms
          availableRooms
          bookedRooms
          inventoryStatus
          fareInfo
          groupsCanAccess
          createdAt
          updatedAt
          owner
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<OnUpdateVyPackageInventoryModelSubscription>
  >;

  OnDeleteVyPackageInventoryModelListener: Observable<
    SubscriptionResponse<OnDeleteVyPackageInventoryModelSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteVyPackageInventoryModel($owner: String) {
        onDeleteVYPackageInventoryModel(owner: $owner) {
          __typename
          packageId
          inventoryDate
          roomType
          totalRooms
          availableRooms
          bookedRooms
          inventoryStatus
          fareInfo
          groupsCanAccess
          createdAt
          updatedAt
          owner
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<OnDeleteVyPackageInventoryModelSubscription>
  >;

  OnCreateVyStaycationInventoryModelListener: Observable<
    SubscriptionResponse<OnCreateVyStaycationInventoryModelSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateVyStaycationInventoryModel($owner: String) {
        onCreateVYStaycationInventoryModel(owner: $owner) {
          __typename
          id
          packageId
          inventoryDate
          roomType
          totalRooms
          availableRooms
          bookedRooms
          inventoryStatus
          roomId
          packageReference
          fareInfo
          extraData
          groupsCanAccess
          createdAt
          updatedAt
          owner
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<OnCreateVyStaycationInventoryModelSubscription>
  >;

  OnUpdateVyStaycationInventoryModelListener: Observable<
    SubscriptionResponse<OnUpdateVyStaycationInventoryModelSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateVyStaycationInventoryModel($owner: String) {
        onUpdateVYStaycationInventoryModel(owner: $owner) {
          __typename
          id
          packageId
          inventoryDate
          roomType
          totalRooms
          availableRooms
          bookedRooms
          inventoryStatus
          roomId
          packageReference
          fareInfo
          extraData
          groupsCanAccess
          createdAt
          updatedAt
          owner
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<OnUpdateVyStaycationInventoryModelSubscription>
  >;

  OnDeleteVyStaycationInventoryModelListener: Observable<
    SubscriptionResponse<OnDeleteVyStaycationInventoryModelSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteVyStaycationInventoryModel($owner: String) {
        onDeleteVYStaycationInventoryModel(owner: $owner) {
          __typename
          id
          packageId
          inventoryDate
          roomType
          totalRooms
          availableRooms
          bookedRooms
          inventoryStatus
          roomId
          packageReference
          fareInfo
          extraData
          groupsCanAccess
          createdAt
          updatedAt
          owner
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<OnDeleteVyStaycationInventoryModelSubscription>
  >;

  OnCreateVyCouponBatchesListener: Observable<
    SubscriptionResponse<OnCreateVyCouponBatchesSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateVyCouponBatches($owner: String) {
        onCreateVYCouponBatches(owner: $owner) {
          __typename
          vendorId
          createdAt
          batchId
          batchName
          batchCode
          packageId
          couponCount
          groupsCanAccess
          updatedAt
          owner
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnCreateVyCouponBatchesSubscription>>;

  OnUpdateVyCouponBatchesListener: Observable<
    SubscriptionResponse<OnUpdateVyCouponBatchesSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateVyCouponBatches($owner: String) {
        onUpdateVYCouponBatches(owner: $owner) {
          __typename
          vendorId
          createdAt
          batchId
          batchName
          batchCode
          packageId
          couponCount
          groupsCanAccess
          updatedAt
          owner
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnUpdateVyCouponBatchesSubscription>>;

  OnDeleteVyCouponBatchesListener: Observable<
    SubscriptionResponse<OnDeleteVyCouponBatchesSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteVyCouponBatches($owner: String) {
        onDeleteVYCouponBatches(owner: $owner) {
          __typename
          vendorId
          createdAt
          batchId
          batchName
          batchCode
          packageId
          couponCount
          groupsCanAccess
          updatedAt
          owner
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnDeleteVyCouponBatchesSubscription>>;

  OnCreateVyVendorsModelListener: Observable<
    SubscriptionResponse<OnCreateVyVendorsModelSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateVyVendorsModel($owner: String) {
        onCreateVYVendorsModel(owner: $owner) {
          __typename
          id
          vendorName
          vendorCode
          contactPhone
          email
          vendorStatus
          vendorData
          contactAddress
          conginitoName
          cognitoUserId
          congnitoSecret
          groupsCanAccess
          createdAt
          updatedAt
          owner
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnCreateVyVendorsModelSubscription>>;

  OnUpdateVyVendorsModelListener: Observable<
    SubscriptionResponse<OnUpdateVyVendorsModelSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateVyVendorsModel($owner: String) {
        onUpdateVYVendorsModel(owner: $owner) {
          __typename
          id
          vendorName
          vendorCode
          contactPhone
          email
          vendorStatus
          vendorData
          contactAddress
          conginitoName
          cognitoUserId
          congnitoSecret
          groupsCanAccess
          createdAt
          updatedAt
          owner
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnUpdateVyVendorsModelSubscription>>;

  OnDeleteVyVendorsModelListener: Observable<
    SubscriptionResponse<OnDeleteVyVendorsModelSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteVyVendorsModel($owner: String) {
        onDeleteVYVendorsModel(owner: $owner) {
          __typename
          id
          vendorName
          vendorCode
          contactPhone
          email
          vendorStatus
          vendorData
          contactAddress
          conginitoName
          cognitoUserId
          congnitoSecret
          groupsCanAccess
          createdAt
          updatedAt
          owner
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnDeleteVyVendorsModelSubscription>>;

  OnCreateVyCouponCodesModelListener: Observable<
    SubscriptionResponse<OnCreateVyCouponCodesModelSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateVyCouponCodesModel($owner: String) {
        onCreateVYCouponCodesModel(owner: $owner) {
          __typename
          couponCode
          batchCode
          batchId
          packageId
          vendorId
          validFrom
          validUpto
          couponStatus
          discountType
          discountPercent
          discountFixedValue
          groupsCanAccess
          createdAt
          updatedAt
          owner
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnCreateVyCouponCodesModelSubscription>>;

  OnUpdateVyCouponCodesModelListener: Observable<
    SubscriptionResponse<OnUpdateVyCouponCodesModelSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateVyCouponCodesModel($owner: String) {
        onUpdateVYCouponCodesModel(owner: $owner) {
          __typename
          couponCode
          batchCode
          batchId
          packageId
          vendorId
          validFrom
          validUpto
          couponStatus
          discountType
          discountPercent
          discountFixedValue
          groupsCanAccess
          createdAt
          updatedAt
          owner
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnUpdateVyCouponCodesModelSubscription>>;

  OnDeleteVyCouponCodesModelListener: Observable<
    SubscriptionResponse<OnDeleteVyCouponCodesModelSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteVyCouponCodesModel($owner: String) {
        onDeleteVYCouponCodesModel(owner: $owner) {
          __typename
          couponCode
          batchCode
          batchId
          packageId
          vendorId
          validFrom
          validUpto
          couponStatus
          discountType
          discountPercent
          discountFixedValue
          groupsCanAccess
          createdAt
          updatedAt
          owner
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnDeleteVyCouponCodesModelSubscription>>;

  OnCreateVyCustomBookingModelListener: Observable<
    SubscriptionResponse<OnCreateVyCustomBookingModelSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateVyCustomBookingModel($owner: String) {
        onCreateVYCustomBookingModel(owner: $owner) {
          __typename
          id
          username
          itineraryName
          bookingType
          bookingStatus
          bookingDetails
          travelStartDate
          travelCity
          email
          mobileNo
          bookingDecription
          bookingReference
          paymentDetails
          createdAt
          updatedAt
          owner
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<OnCreateVyCustomBookingModelSubscription>
  >;

  OnUpdateVyCustomBookingModelListener: Observable<
    SubscriptionResponse<OnUpdateVyCustomBookingModelSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateVyCustomBookingModel($owner: String) {
        onUpdateVYCustomBookingModel(owner: $owner) {
          __typename
          id
          username
          itineraryName
          bookingType
          bookingStatus
          bookingDetails
          travelStartDate
          travelCity
          email
          mobileNo
          bookingDecription
          bookingReference
          paymentDetails
          createdAt
          updatedAt
          owner
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<OnUpdateVyCustomBookingModelSubscription>
  >;

  OnDeleteVyCustomBookingModelListener: Observable<
    SubscriptionResponse<OnDeleteVyCustomBookingModelSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteVyCustomBookingModel($owner: String) {
        onDeleteVYCustomBookingModel(owner: $owner) {
          __typename
          id
          username
          itineraryName
          bookingType
          bookingStatus
          bookingDetails
          travelStartDate
          travelCity
          email
          mobileNo
          bookingDecription
          bookingReference
          paymentDetails
          createdAt
          updatedAt
          owner
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<OnDeleteVyCustomBookingModelSubscription>
  >;

  OnCreateVyStaycationBookingModelListener: Observable<
    SubscriptionResponse<OnCreateVyStaycationBookingModelSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateVyStaycationBookingModel($owner: String) {
        onCreateVYStaycationBookingModel(owner: $owner) {
          __typename
          id
          username
          itineraryName
          bookingType
          bookingStatus
          travelStartDate
          bookingDetails
          vendorId
          packageId
          bookingReference
          email
          mobileNo
          couponCode
          roomType
          basePackagePrice
          discountedPrice
          discountedValue
          paymentDetails
          canceledDate
          refundAmount
          createdAt
          updatedAt
          owner
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<OnCreateVyStaycationBookingModelSubscription>
  >;

  OnUpdateVyStaycationBookingModelListener: Observable<
    SubscriptionResponse<OnUpdateVyStaycationBookingModelSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateVyStaycationBookingModel($owner: String) {
        onUpdateVYStaycationBookingModel(owner: $owner) {
          __typename
          id
          username
          itineraryName
          bookingType
          bookingStatus
          travelStartDate
          bookingDetails
          vendorId
          packageId
          bookingReference
          email
          mobileNo
          couponCode
          roomType
          basePackagePrice
          discountedPrice
          discountedValue
          paymentDetails
          canceledDate
          refundAmount
          createdAt
          updatedAt
          owner
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<OnUpdateVyStaycationBookingModelSubscription>
  >;

  OnDeleteVyStaycationBookingModelListener: Observable<
    SubscriptionResponse<OnDeleteVyStaycationBookingModelSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteVyStaycationBookingModel($owner: String) {
        onDeleteVYStaycationBookingModel(owner: $owner) {
          __typename
          id
          username
          itineraryName
          bookingType
          bookingStatus
          travelStartDate
          bookingDetails
          vendorId
          packageId
          bookingReference
          email
          mobileNo
          couponCode
          roomType
          basePackagePrice
          discountedPrice
          discountedValue
          paymentDetails
          canceledDate
          refundAmount
          createdAt
          updatedAt
          owner
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<OnDeleteVyStaycationBookingModelSubscription>
  >;
}
