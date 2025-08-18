import { useCallback, useMemo } from "react";
import Realm, { BSON } from "realm";
import { useRealm, useQuery } from "@realm/react";
import { DeliverySchedule } from "../models/DeliverySchedule";
import { Customer } from "../models/Customer";

export function useDeliverySchedule() {
  const realm = useRealm();

  // Sorted query: earliest deliveries first
  const schedules = useQuery(DeliverySchedule, (coll) =>
    coll.sorted("deliveryDate", false)
  );

  // ➕ Add delivery schedule
  const addSchedule = useCallback(
    (customer: Customer, deliveryDate: Date) => {
      if (!customer) throw new Error("Customer is required");

      let created: DeliverySchedule | null = null;
      realm.write(() => {
        created = realm.create(DeliverySchedule, {
          _id: new BSON.ObjectId(),
          deliveryDate,
          delivered: false,
          createdAt: new Date(),
          customer,
        });
        customer.delivery_schedule.push(created);
      });
      return created;
    },
    [realm]
  );

  // ✅ Toggle delivered
  const toggleDelivered = useCallback(
    (id: BSON.ObjectId) => {
      realm.write(() => {
        const item = realm.objectForPrimaryKey<DeliverySchedule>(
          DeliverySchedule,
          id
        );
        if (item) {
          item.delivered = !item.delivered;
        }
      });
    },
    [realm]
  );

  return useMemo(
    () => ({
      schedules,
      addSchedule,
      toggleDelivered,
    }),
    [schedules, addSchedule, toggleDelivered]
  );
}
