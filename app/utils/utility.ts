export function formatMobileNumber(mobile: string, newPrefix: string = "0") {
  const regex = /^(\+|00)92/;
  return mobile.replace(regex, newPrefix);
}

/**
 * Filters an object, removing properties that have null, undefined, or empty string values.
 * This function is generic and can be used with any object type.
 *
 * @param obj The input object to filter.
 * @returns A new object with only properties that have valid (non-empty) values.
 */
export const filterEmptyValues = <T extends Record<string, unknown>>(
  obj: T
): Partial<T> => {
  const filteredObject: Partial<T> = {};

  for (const key in obj) {
    // Ensure it's an own property of the object, not from the prototype chain
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];

      // Check if the value is not null, not undefined, and not an empty string
      if (value !== null && value !== undefined && value !== "") {
        filteredObject[key] = value;
      }
    }
  }
  return filteredObject;
};
