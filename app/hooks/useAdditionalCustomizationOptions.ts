// hooks/useAdditionalCustomizationOptions.ts
import { useRealm, useQuery } from "@realm/react";
import { useCallback, useMemo } from "react";
import Realm, { BSON } from "realm";

import { useMeasurementManager } from "./useMeasurementManager";
import { AdditionalCustomizationOptions } from "../models/AdditionalCustomizationOptions";
import { Measurement } from "../models/Measurement";

export interface AdditionalCustomizationOptionsInput {
  double?: boolean;
  design?: boolean;
  front_pocket?: boolean;
  zip_hip?: boolean;
  qaf?: boolean;
  round_arm?: boolean;
  stud?: boolean;
  chak_strip?: boolean;
  trouser_pocket?: boolean;
  silk_thread?: boolean;
  contrast_piping?: boolean;
  shoulder_epaulette?: boolean;
  net_insert?: boolean;
  lace_trim?: boolean;
  tassel_detail?: boolean;
  neckline_type: string;
  salwar_type: string;
  buttons_type: string;
  kameez_pocket_options: string;
  salwar_pocket_options: string;
}

export function useAdditionalCustomizationOptions(
  measurementId: BSON.ObjectId
) {
  const realm = useRealm();
  const { getMeasurementById } = useMeasurementManager();

  // 🔍 Query filtered by measurement ID if provided
  const options = useQuery(AdditionalCustomizationOptions, (coll) =>
    measurementId ? coll.filtered("measurement._id == $0", measurementId) : coll
  ).sorted("createdAt", true);
  // ➕ Create
  const createOption = useCallback(
    (data: AdditionalCustomizationOptionsInput) => {
      const measurement = getMeasurementById(measurementId);

      if (!measurement)
        throw new Error("Measurement is required for customization options.");

      let created: AdditionalCustomizationOptions | null = null;
      realm.write(() => {
        created = realm.create<AdditionalCustomizationOptions>(
          AdditionalCustomizationOptions,
          {
            ...data,
            measurement,
          }
        );
        measurement.additional_customization_options = created;
      });

      return created;
    },
    [realm]
  );

  // ✏️ Update by ID
  const updateOption = useCallback(
    (
      id: BSON.ObjectId,
      updates: Partial<AdditionalCustomizationOptionsInput>
    ) => {
      realm.write(() => {
        const existing =
          realm.objectForPrimaryKey<AdditionalCustomizationOptions>(
            AdditionalCustomizationOptions,
            id
          );
        if (!existing) throw new Error("Customization option not found.");

        Object.assign(existing, updates, { updateAt: new Date() });
      });
    },
    [realm]
  );

  // ❌ Delete by ID
  const deleteOption = useCallback(
    (id: BSON.ObjectId) => {
      realm.write(() => {
        const existing =
          realm.objectForPrimaryKey<AdditionalCustomizationOptions>(
            AdditionalCustomizationOptions,
            id
          );
        if (existing) {
          realm.delete(existing);
        }
      });
    },
    [realm]
  );

  return useMemo(
    () => ({
      options,
      createOption,
      updateOption,
      deleteOption,
    }),
    [options, createOption, updateOption, deleteOption]
  );
}
