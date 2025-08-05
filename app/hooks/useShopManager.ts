import { useQuery, useRealm } from "@realm/react";
import { useCallback } from "react";
import Realm from "realm";

import { Shop } from "../models/Shop";
import { formatMobileNumber } from "../utils/utility";

/**
 * Provides functions for managing a single shop entry in Realm,
 * enforcing a "one device, one shop" strategy.
 */
export function useShopManager() {
  const realm = useRealm();
  const shops = useQuery(Shop); // Query all shops. Since we enforce one, this will usually be 0 or 1.

  const shopExists = shops.length > 0;
  const currentShop = shopExists ? shops[0] : null;

  /**
   * Attempts to add a new shop.
   * Only succeeds if no shop currently exists.
   *
   * @returns A boolean indicating whether the shop was successfully added.
   */
  const addShop = useCallback(
    (shopData: {
      shop_name: string;
      owner_name: string;
      mobile: string;
      shop_type: string;
    }) => {
      if (shopExists) {
        throw new Error(
          "Cannot add more shops. One shop per device is allowed."
        );
      }

      try {
        realm.write(() => {
          realm.create(Shop, {
            shop_name: shopData.shop_name,
            owner_name: shopData.owner_name,
            mobile: formatMobileNumber(shopData.mobile),
            shop_type: shopData.shop_type,
          });
        });
      } catch (error) {
        if (error instanceof Realm.AssertionError) {
          throw new Error(`Failed to add shop to database: ${error.message}`);
        } else if (error instanceof Error) {
          // If it's a generic JavaScript Error
          throw new Error(
            `An unexpected error occurred while adding shop: ${error.message}`
          );
        } else {
          // Fallback for unknown error types
          throw new Error(
            `An unknown error occurred while adding shop: ${String(error)}`
          );
        }
      }
    },
    [realm, shopExists]
  );

  /**
   * Edits an existing shop's details.
   * Mobile number cannot be edited through this function.
   *
   * @param updatedData The partial shop data to update.
   * @returns A boolean indicating whether the shop was successfully updated.
   */
  const editShop = useCallback(
    (
      updatedData: Partial<
        Omit<Shop, "_id" | "mobile" | "createdAt" | "updateAt"> // Mobile cannot be updated
      >
    ): boolean => {
      if (!currentShop) {
        console.warn("No shop found to edit.");
        return false;
      }

      try {
        realm.write(() => {
          // Update the current shop object
          currentShop.shop_name =
            updatedData.shop_name ?? currentShop.shop_name;
          currentShop.owner_name =
            updatedData.owner_name ?? currentShop.owner_name;
          currentShop.shop_type =
            updatedData.shop_type ?? currentShop.shop_type;
          currentShop.updateAt = new Date(); // Update the timestamp
        });
        return true; // Shop updated successfully
      } catch (error) {
        console.error("Error editing shop:", error);
        return false; // Failed to edit shop
      }
    },
    [realm, currentShop]
  );

  // No delete function as per requirements

  return {
    shopExists,
    currentShop, // The actual shop object (or null)
    addShop,
    editShop,
    // No deleteShop provided
  };
}
