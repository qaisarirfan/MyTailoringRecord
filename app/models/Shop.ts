import Realm, { BSON } from "realm";

export class Shop extends Realm.Object {
  _id: BSON.ObjectId = new BSON.ObjectId();
  shop_name!: string;
  owner_name!: string;
  mobile!: string;
  shop_type!: string;
  createdAt: Date = new Date();
  updateAt: Date = new Date();

  static primaryKey = "_id";
}

export const ShopSchema: Realm.ObjectSchema = {
  primaryKey: "_id",
  name: "Shop",
  properties: {
    _id: "objectId",
    shop_name: "string",
    owner_name: "string",
    mobile: { type: "string", indexed: true },
    shop_type: {
      type: "string",
      default: "gents",
    },
    createdAt: {
      type: "date",
      default: () => new Date().toDateString(),
    },
    updateAt: {
      type: "date",
      default: () => new Date().toDateString(),
    },
  },
};
