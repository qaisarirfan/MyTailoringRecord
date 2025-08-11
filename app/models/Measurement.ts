import Realm, { BSON } from "realm";

import { AdditionalCustomizationOptions } from "./AdditionalCustomizationOptions";
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
  elbow!: string;
  cross_back!: string;
  shoulder_slope!: string;
  collar_size!: string;

  ankle_width!: string;
  crotch_depth!: string;
  flare_width!: string;
  knee!: string;
  salwar_hip!: string;
  salwar_length!: string;
  salwar_waist!: string;
  thigh!: string;
  bottom_opening!: string;
  rise_front!: string;
  rise_back!: string;

  bust!: string;
  shoulder_to_bust_point!: string;
  bust_point_to_bust_point!: string;
  under_bust!: string;
  dart_length_front!: string;
  dart_length_back!: string;
  hip_depth!: string;
  flare_length!: string;

  createdAt: Date = new Date();
  updateAt: Date = new Date();

  customer!: Customer;
  additional_customization_options!: AdditionalCustomizationOptions;

  static primaryKey = "_id";
}
