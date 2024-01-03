// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Destination, Review } = initSchema(schema);

export {
  Destination,
  Review
};