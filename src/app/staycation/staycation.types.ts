import { TravellersDetails } from '@ojashub/voyaah-common';

export interface TravellersInfo {
  minAdults: number;
  maxAdults: number;
  maxChildren?: number;
  minChildren?: number;
}

export interface ChildPolicy {
  age: string;
  fare: number;
  policy: string;
}
export interface PackageFareInfo {
  additionalAdultFare?: number;
  additionalChildrenFare?: ChildPolicy[];
  baseFare?: number;
  serviceTax?: number;
  totalTax?: number;
  totalFare: number;
  currency?: number;
  alternateCurrency?: string;
  alternateCurrencyMultiplier?: number;
}

export interface AddressInfo {
  houseNumber?: string;
  street: string;
  landMark?: string;
  suite?: string;
  area?: string;
  city: string;
  country: string;
  zipCode?: string;
  phone?: string[];
}
export interface HotelInfo {
  name: string;
  title?: string;
  description: string;
  images?: string[];
  facilities?: string[];
  address: AddressInfo;
  rating?: string;
}

export interface DiningInfo {
  type: string[];
  title: string;
  description: string;
  images?: string[];
}

export interface ActivityInfo {
  title: string;
  description: string;
  images?: string[];
  duration?: string;
}

export interface ReschedulePolicy {
  maxAmendments: number;
  graceDays: string;
  specialNote: string;
}
export interface CancellationPolicy {
  graceDays: string;
  refundPercent: number;
  specialNote: string;
  childPolicyNote: string;
}

export interface TransportationInfo {
  title: string;
  description: string;
  images?: string[];
}
export interface PackageItinerary {
  dayIndex: number;
  title: string;
  description: string;
  images?: string[];
  activity?: ActivityInfo[];
}

export interface TravelPackageDetails {
  id: string;
  name: string;
  availableFrom: Date;
  availableUpTo: Date;
  packageOwners: string[];
  alias?: string[];
  title: string;
  description: string;
  subTitle: string;
  subDescription: string;
  category: string[];
  mainImage: string;
  additionalImages?: string[];
  numberOfNights: number;
  numberOfDays: number;
  tags: [string];
  status: string;
  travellers: TravellersInfo;
  cityName: string;
  stateName: string;
  countryName: string;
  fare: PackageFareInfo;
  hotel: HotelInfo[];
  activities?: ActivityInfo[];
  transportation?: TransportationInfo[];
  dining?: DiningInfo[];
  itinerary?: PackageItinerary[];
  blackoutDates: [
    {
      start: Date;
      end: Date;
      note: string;
    }
  ];
  reschedulePolicy: ReschedulePolicy;
  cancellation: CancellationPolicy;
  bookingValidity: string;
  inclusions: [string];
}
export interface TravelPackage {
  id: string;
  name: string;
  availableFrom: Date;
  availableUpTo: Date;
  packageOwners: string[];
  values: TravelPackageDetails;
}
