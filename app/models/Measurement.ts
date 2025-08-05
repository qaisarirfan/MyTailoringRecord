import Realm, { BSON } from "realm";

import { Customer } from "./Customer";

export class Measurement extends Realm.Object {
  _id: BSON.ObjectId = new BSON.ObjectId();
  gender: string = "male";
  armhole!: string;
  bicep!: string;
  chest!: string;
  cuff_width!: string;
  hip!: string;
  kameez_back_length!: string;
  kameez_front_length!: string;
  kameez_length!: string;
  neck_circumference!: string;
  neck_depth_back!: string;
  neck_depth_front!: string;
  shoulder_width!: string;
  side_slit_length!: string;
  sleeve_length!: string;
  waist!: string;
  ankle_width!: string;
  crotch_depth!: string;
  flare_width!: string;
  knee!: string;
  salwar_hip!: string;
  salwar_length!: string;
  salwar_waist!: string;
  thigh!: string;
  bust!: string;
  shoulder_to_bust_point!: string;
  bust_point_to_bust_point!: string;
  createdAt: Date = new Date();
  updateAt: Date = new Date();

  customer!: Customer;

  static primaryKey = "_id";
}
