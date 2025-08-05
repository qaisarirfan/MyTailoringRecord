export function formatMobileNumber(mobile: string, newPrefix: string = "0") {
  const regex = /^(\+|00)92/;
  return mobile.replace(regex, newPrefix);
}
