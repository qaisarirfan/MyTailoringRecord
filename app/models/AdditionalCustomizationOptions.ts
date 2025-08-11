import Realm, { BSON } from "realm";

import { Measurement } from "./Measurement";

export class AdditionalCustomizationOptions extends Realm.Object {
  _id: BSON.ObjectId = new BSON.ObjectId();
  double: boolean = false;
  design: boolean = false;
  front_pocket: boolean = false;
  zip_hip: boolean = false;
  qaf: boolean = false;
  round_arm: boolean = false;
  stud: boolean = false;
  chak_strip: boolean = false;
  trouser_pocket: boolean = false;
  silk_thread: boolean = false;
  contrast_piping: boolean = false;
  shoulder_epaulette: boolean = false;
  net_insert: boolean = false;
  lace_trim: boolean = false;
  tassel_detail: boolean = false;
  neckline_type!: string;
  salwar_type!: string;
  buttons_type!: string;
  kameez_pocket_options!: string;
  salwar_pocket_options!: string;

  createdAt: Date = new Date();
  updateAt: Date = new Date();

  measurement!: Measurement;

  static primaryKey = "_id";
}
