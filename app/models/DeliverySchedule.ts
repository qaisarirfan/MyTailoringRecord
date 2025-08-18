import Realm, { BSON } from "realm";
import { Customer } from "./Customer";

export class DeliverySchedule extends Realm.Object {
  _id: BSON.ObjectId = new BSON.ObjectId();
  deliveryDate!: Date;
  delivered: boolean = false;
  createdAt: Date = new Date();

  customer!: Customer;

  static primaryKey = "_id";
}
