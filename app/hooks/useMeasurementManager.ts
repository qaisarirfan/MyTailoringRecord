import { useQuery, useRealm } from "@realm/react";
import { useCallback } from "react";
import Realm, { BSON } from "realm";

import { useCustomerManager } from "./useCustomerManager";
import { MeasurementFields } from "../components/MeasurementForm/types";
import { Measurement } from "../models/Measurement";

// This is a new helper function that performs the data transformation.
// It is designed to be reusable and not tied to the React hook lifecycle.
// const getAggregatedHistoryFromMeasurements = (
//   measurements: Realm.Results<Measurement> | Measurement[]
// ) => {
//   if (!measurements || measurements.length === 0) {
//     return null;
//   }

//   // Convert to plain objects and sort by createdAt descending to ensure latest is first.
//   const sortedMeasurements = Array.from(measurements).sort(
//     (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
//   );

//   const latest = sortedMeasurements[0];
//   const aggregatedHistory: Record<
//     keyof MeasurementFields,
//     { new: string; old: { createdAt: string; id: string; value: string }[] }
//   > = {};

//   // Keys to ignore for aggregation, as they are not measurement values.
//   const ignoredKeys = new Set([
//     "_id",
//     "createdAt",
//     "updateAt",
//     "customer",
//     "gender",
//   ]);

//   // Use a single loop to build the aggregated history object.
//   for (const key in latest) {
//     if (
//       !ignoredKeys.has(key) &&
//       Object.prototype.hasOwnProperty.call(latest, key)
//     ) {
//       const allValues = sortedMeasurements
//         .map((m) => ({
//           id: m._id.toString(),
//           createdAt: m.createdAt.toISOString(),
//           value: m[key],
//         }))

//         .filter((entry) => entry.value !== undefined);

//       const latestEntry = allValues[0];
//       const oldEntries = allValues.slice(1);

//       // Create a set to track unique old values and avoid duplicates.
//       const uniqueOldValues = new Set();
//       const oldValuesWithContext: {
//         createdAt: string;
//         id: string;
//         value: string;
//       }[] = [];

//       oldEntries.forEach((entry) => {
//         // If the value is different from the latest and hasn't been added yet...
//         if (
//           entry.value !== latestEntry.value &&
//           !uniqueOldValues.has(entry.value)
//         ) {
//           uniqueOldValues.add(entry.value);
//           oldValuesWithContext.push({
//             id: entry.id,
//             createdAt: entry.createdAt,
//             value: entry.value,
//           });
//         }
//       });

//       if (latestEntry.value !== undefined) {
//         aggregatedHistory[key] = {
//           new: latestEntry.value,
//           old: oldValuesWithContext,
//         };
//       }
//     }
//   }

//   return {
//     ...aggregatedHistory,
//     gender: latest.gender,
//   };
// };

/**
 * Provides functions for managing Measurement records,
 * including CRUD operations and linking to a Customer.
 */
export function useMeasurementManager() {
  const realm = useRealm();

  const { getCustomerById } = useCustomerManager();

  /**
   * Retrieves a single Measurement record by its ObjectId.
   *
   * @param measurementId The ObjectId of the measurement to retrieve.
   * @returns The Measurement object if found, otherwise undefined.
   */
  const getMeasurementById = useCallback(
    (measurementId: BSON.ObjectId): Measurement | null => {
      return realm.objectForPrimaryKey(Measurement, measurementId);
    },
    [realm]
  );

  /**
   * Retrieves all Measurement records associated with a specific customer.
   * This is a reactive query that updates automatically.
   *
   * @param customerId The ObjectId of the customer whose measurements to retrieve.
   * @returns A Realm.Results collection of Measurement objects.
   */
  const getMeasurementsForCustomer = useCallback(
    (customerId: BSON.ObjectId) => {
      const measurements = useQuery(
        Measurement,
        (collection) =>
          collection
            .filtered("customer._id == $0", customerId)
            .sorted("createdAt", true),
        [customerId]
      );

      return measurements[0];

      // Use useMemo to ensure the aggregated history is only recalculated
      // when the underlying Realm data changes.
      // return useMemo(() => {
      //   return getAggregatedHistoryFromMeasurements(measurements);
      // }, [measurements]);
    },
    []
  );

  /**
   * Adds a new Measurement record, linking it to a specific customer.
   *
   * @param customerId The ObjectId of the customer to associate this measurement with.
   * @param measurementData An object containing the measurement details.
   * @throws {Error} If the customer is not found or if an error occurs during creation.
   */
  const addMeasurement = useCallback(
    (customerId: BSON.ObjectId, measurementData: MeasurementFields) => {
      const customer = getCustomerById(customerId);

      if (!customer) {
        throw new Error(
          `Customer with ID ${customerId} not found. Cannot add measurement.`
        );
      }

      try {
        realm.write(() => {
          const result = realm.create(Measurement, {
            ankle_width: measurementData.ankle_width?.toString() ?? "",
            armhole: measurementData.armhole?.toString() ?? "",
            bicep: measurementData.bicep?.toString() ?? "",
            bust: measurementData.bust?.toString() ?? "",
            bust_point_to_bust_point:
              measurementData.bust_point_to_bust_point?.toString() ?? "",
            chest: measurementData.chest?.toString() ?? "",
            crotch_depth: measurementData.crotch_depth?.toString() ?? "",
            cuff_width: measurementData.cuff_width?.toString() ?? "",
            flare_width: measurementData.flare_width?.toString() ?? "",
            gender: measurementData.gender?.toString() ?? "",
            hip: measurementData.hip?.toString() ?? "",
            kameez_back_length:
              measurementData.kameez_back_length?.toString() ?? "",
            kameez_front_length:
              measurementData.kameez_front_length?.toString() ?? "",
            kameez_length: measurementData.kameez_length?.toString() ?? "",
            knee: measurementData.knee?.toString() ?? "",
            neck_circumference:
              measurementData.neck_circumference?.toString() ?? "",
            neck_depth_back: measurementData.neck_depth_back?.toString() ?? "",
            neck_depth_front:
              measurementData.neck_depth_front?.toString() ?? "",
            salwar_hip: measurementData.salwar_hip?.toString() ?? "",
            sleeve_length: measurementData.sleeve_length?.toString() ?? "",
            salwar_length: measurementData.salwar_length?.toString() ?? "",
            salwar_waist: measurementData.salwar_waist?.toString() ?? "",
            shoulder_to_bust_point:
              measurementData.shoulder_to_bust_point?.toString() ?? "",
            shoulder_width: measurementData.shoulder_width?.toString() ?? "",
            side_slit_length:
              measurementData.side_slit_length?.toString() ?? "",
            thigh: measurementData.thigh?.toString() ?? "",
            waist: measurementData.waist?.toString() ?? "",
            customer: customer, // Link the measurement to the customer object
          });
          customer.measurements.push(result);
        });
      } catch (error) {
        if (error instanceof Realm.AssertionError) {
          throw new Error(`Failed to add measurement: ${error.message}`);
        } else if (error instanceof Error) {
          throw new Error(
            `An unexpected error occurred while adding measurement: ${error.message}`
          );
        } else {
          throw new Error(
            `An unexpected error occurred while adding measurement: ${String(
              error
            )}`
          );
        }
      }
    },
    [realm]
  );

  /**
   * Edits an existing Measurement record.
   *
   * @param measurementId The ObjectId of the measurement to edit.
   * @param updatedData The partial measurement data to update.
   * @throws {Error} If the measurement is not found or an error occurs during update.
   */
  const editMeasurement = useCallback(
    (
      measurementId: BSON.ObjectId,
      updatedData: Partial<
        Omit<Measurement, "_id" | "customer" | "createdAt" | "updateAt">
      >
    ) => {
      const measurementToEdit = realm.objectForPrimaryKey(
        Measurement,
        measurementId
      );

      if (!measurementToEdit) {
        throw new Error(`Measurement with ID ${measurementId} not found.`);
      }

      try {
        realm.write(() => {
          // Iterate over updatedData and apply changes
          for (const key in updatedData) {
            if (Object.prototype.hasOwnProperty.call(updatedData, key)) {
              // Ensure we don't try to update read-only properties like _id or customer
              if (key !== "_id" && key !== "customer" && key !== "createdAt") {
                // @ts-ignore - TypeScript might complain about string index signature
                measurementToEdit[key] = updatedData[key];
              }
            }
          }
          measurementToEdit.updateAt = new Date();
        });
      } catch (error) {
        if (error instanceof Realm.AssertionError) {
          throw new Error(`Failed to edit measurement: ${error.message}`);
        } else if (error instanceof Error) {
          throw new Error(
            `An unexpected error occurred while editing measurement: ${error.message}`
          );
        } else {
          throw new Error(
            `An unexpected error occurred while editing measurement: ${String(
              error
            )}`
          );
        }
      }
    },
    [realm]
  );

  /**
   * Deletes an existing Measurement record.
   *
   * @param measurementId The ObjectId of the measurement to delete.
   * @throws {Error} If the measurement is not found or an error occurs during deletion.
   */
  const deleteMeasurement = useCallback(
    (measurementId: BSON.ObjectId) => {
      const measurementToDelete = realm.objectForPrimaryKey(
        Measurement,
        measurementId
      );

      if (!measurementToDelete) {
        throw new Error(`Measurement with ID ${measurementId} not found.`);
      }

      try {
        realm.write(() => {
          realm.delete(measurementToDelete);
        });
      } catch (error) {
        if (error instanceof Realm.AssertionError) {
          throw new Error(`Failed to delete measurement: ${error.message}`);
        } else if (error instanceof Error) {
          throw new Error(
            `An unexpected error occurred while deleting measurement: ${error.message}`
          );
        } else {
          throw new Error(
            `An unexpected error occurred while deleting measurement: ${String(
              error
            )}`
          );
        }
      }
    },
    [realm]
  );

  return {
    getMeasurementById,
    getMeasurementsForCustomer,
    addMeasurement,
    editMeasurement,
    deleteMeasurement,
  };
}
