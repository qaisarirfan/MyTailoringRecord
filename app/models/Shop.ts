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

  customers = Realm.List<Customer>;

  static primaryKey = "_id";
}
