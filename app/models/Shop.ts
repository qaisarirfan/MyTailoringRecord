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

export const ShopSchema: Realm.ObjectSchema = {
  name: "Shop",
  primaryKey: "_id",
  properties: {
    _id: "objectId",
    shop_name: "string",
    owner_name: "string",
    mobile: "string",
    shop_type: "string",
    createdAt: "date",
    updateAt: "date",
    // Define the inverse relationship here using 'linkingObjects'
    customers: {
      type: "linkingObjects",
      objectType: "Customer", // The type of object that links back
      property: "shop", // The property on the Customer object that links to Shop
    },
  },
};
