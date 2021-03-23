// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Itinerary } = initSchema(schema);

export {
  Itinerary
};