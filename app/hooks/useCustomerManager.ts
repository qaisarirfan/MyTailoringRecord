import { useQuery, useRealm } from "@realm/react";
import { useCallback, useState } from "react";
import Realm, { BSON } from "realm";

import { Customer } from "../models/Customer";
import { Shop } from "../models/Shop";
import { formatMobileNumber } from "../utils/utility";

/**
 * Provides functions for managing customers and automatically
 * associating them with the single existing shop.
 *
 * This version includes functionality for searching and filtering customers.
 */
export function useCustomerManager() {
  const realm = useRealm();

  // Fetch the single shop for this device. We assume one exists.
  const shops = useQuery(Shop);
  const shopExists = shops.length > 0;
  const currentShop = shops[0] || null;

  // State to manage search and filter criteria
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Fetch all customers, sorted by creation date, with dynamic filters
  const customers = useQuery(
    Customer,
    (collection) => {
      let filteredCollection = collection.sorted("createdAt", true);

      // Apply search term filter (case-insensitive search on name and mobile)
      if (searchTerm) {
        filteredCollection = filteredCollection.filtered(
          "customer_name CONTAINS[c] $0 OR mobile CONTAINS[c] $0",
          searchTerm
        );
      }

      return filteredCollection;
    },
    [searchTerm] // Dependencies for the query
  );

  /**
   * Updates the search term for filtering customers by name or mobile.
   */
  const searchCustomers = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  /**
   * Clears search terms.
   */
  const clearFilters = useCallback(() => {
    setSearchTerm("");
  }, []);

  /**
   * Adds a new customer, automatically linking them to the current shop.
   *
   * @param customerData An object containing the customer's name, mobile, and optional address.
   * @throws {Error} If no shop exists on the device, or if input is invalid.
   */
  const addCustomer = useCallback(
    (customerData: {
      customer_name: string;
      mobile: string;
      address?: string;
    }) => {
      // Validate that a shop exists before creating a customer
      if (!shopExists || !currentShop) {
        throw new Error(
          "Cannot add a customer: No shop exists on this device."
        );
      }

      // Basic input validation
      if (
        !customerData.customer_name ||
        customerData.customer_name.trim() === ""
      ) {
        throw new Error("Customer name cannot be empty.");
      }
      if (!customerData.mobile || customerData.mobile.trim() === "") {
        throw new Error("Customer mobile number cannot be empty.");
      }

      // Check for uniqueness manually for a clearer error message
      const existingCustomer = customers.find(
        (v) => v.mobile === formatMobileNumber(customerData.mobile)
      );
      if (existingCustomer) {
        throw new Error(
          `A customer with the mobile number '${customerData.mobile}' already exists.`
        );
      }

      try {
        realm.write(() => {
          realm.create(Customer, {
            customer_name: customerData.customer_name,
            mobile: formatMobileNumber(customerData.mobile),
            address: customerData.address,
            shop: currentShop, // Automatically link the customer to the existing shop
          });
        });
      } catch (error) {
        if (error instanceof Realm.AssertionError) {
          throw new Error(`Failed to add customer: ${error.message}`);
        } else if (error instanceof Error) {
          // If it's a generic JavaScript Error
          throw new Error(
            `An unexpected error occurred while adding customer: ${error.message}`
          );
        } else {
          throw new Error(
            `An unexpected error occurred while adding customer: ${String(
              error
            )}`
          );
        }
      }
    },
    [realm, shopExists, currentShop, customers]
  );

  /**
   * Edits an existing customer's details.
   *
   * @param customerId The ObjectId of the customer to edit.
   * @param updatedData The partial customer data to update.
   * @throws {Error} If the customer is not found or an error occurs during update.
   */
  const editCustomer = useCallback(
    (
      customerId: BSON.ObjectId,
      updatedData: Partial<
        Omit<Customer, "_id" | "shop" | "createdAt" | "updateAt">
      >
    ) => {
      const customerToEdit = realm.objectForPrimaryKey(Customer, customerId);

      if (!customerToEdit) {
        throw new Error(`Customer with ID ${customerId} not found.`);
      }

      try {
        realm.write(() => {
          customerToEdit.customer_name =
            updatedData.customer_name ?? customerToEdit.customer_name;
          customerToEdit.address =
            updatedData.address ?? customerToEdit.address;
          customerToEdit.updateAt = new Date();
        });
      } catch (error: any) {
        if (error instanceof Realm.AssertionError) {
          throw new Error(`Failed to edit customer: ${error.message}`);
        }
        throw new Error(
          `An unexpected error occurred while editing customer: ${String(
            error
          )}`
        );
      }
    },
    [realm]
  );

  /**
   * Deletes an existing customer.
   *
   * @param customerId The ObjectId of the customer to delete.
   * @throws {Error} If the customer is not found or an error occurs during deletion.
   */
  const deleteCustomer = useCallback(
    (customerId: BSON.ObjectId) => {
      const customerToDelete = realm.objectForPrimaryKey(Customer, customerId);

      if (!customerToDelete) {
        throw new Error(`Customer with ID ${customerId} not found.`);
      }

      try {
        realm.write(() => {
          realm.delete(customerToDelete);
        });
      } catch (error: any) {
        if (error instanceof Realm.AssertionError) {
          throw new Error(`Failed to delete customer: ${error.message}`);
        }
        throw new Error(
          `An unexpected error occurred while deleting customer: ${String(
            error
          )}`
        );
      }
    },
    [realm]
  );

  /**
   * Retrieves a single customer record by its ObjectId.
   *
   * @param customerId The ObjectId of the customer to retrieve.
   * @returns The Customer object if found, otherwise undefined.
   */
  const getCustomerById = useCallback(
    (customerId: BSON.ObjectId): Customer | null => {
      return realm.objectForPrimaryKey(Customer, customerId);
    },
    [realm]
  );

  return {
    customers,
    currentShop, // Exposing the shop in case it's needed for context
    searchTerm,
    addCustomer,
    editCustomer,
    deleteCustomer,
    searchCustomers, // New search function
    clearFilters, // New function to clear filters
    getCustomerById, // ✨ New function to get a single customer by ID
  };
}
