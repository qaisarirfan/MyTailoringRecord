import Realm, { BSON } from "realm";

import { Customer } from "./Customer";

export class Shop extends Realm.Object {
  _id: BSON.ObjectId = new BSON.ObjectId();

  shop_name!: string;
  owner_name!: string;
  mobile!: string;
  shop_type!: string;

  createdAt: Date = new Date();
  updateAt: Date = new Date();

  // This property will be automatically managed by Realm due to linkingObjects
  // You don't assign to it directly.
  customers!: Realm.List<Customer>;

  static primaryKey = "_id";
}
