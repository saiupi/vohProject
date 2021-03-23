import { ModelInit, MutableModel, PersistentModelConstructor } from '@aws-amplify/datastore';





export declare class Itinerary {
  readonly id: string;
  readonly name: string;
  readonly originCity: string;
  readonly startDate: string;
  readonly endDate: string;
  readonly AdultCount: number;
  readonly ChildCount?: number;
  readonly infantCount?: number;
  constructor(init: ModelInit<Itinerary>);
  static copyOf(source: Itinerary, mutator: (draft: MutableModel<Itinerary>) => MutableModel<Itinerary> | void): Itinerary;
}