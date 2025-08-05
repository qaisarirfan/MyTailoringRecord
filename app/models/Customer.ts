import Realm, { BSON } from "realm";

import { Shop } from "./Shop";

export class Customer extends Realm.Object {
  _id: BSON.ObjectId = new BSON.ObjectId();
  customer_name!: string;
  mobile!: string;
  address?: string;
  // This defines the one-to-one relationship to the Shop model.
  // The 'linkingObjects' property on the 'Shop' model is the inverse relationship.
  shop!: Shop;
  createdAt: Date = new Date();
  updateAt: Date = new Date();

  static primaryKey = "_id";
  static indexedProperties = ["mobile"];
}
