import { useNavigation, NavigationProp } from "@react-navigation/native";


export type RootStackParamList = {
  Dashboard: undefined;
  CustomerList: undefined;
  AddCustomer: undefined;
  ShopType: undefined;
  RegisterShop: undefined;
  CustomerStack: { customerId: string }; // pass down into nested stack
};

export type CustomerStackParamList = {
  CustomerDetail: { customerId: string };
  AddMeasurement: { customerId: string };
  AdditionalCustomizationOptions: { customerId: string };
  DeliveryScheduling: { customerId: string };
};

export type RootStackNavigationProp = NavigationProp<
  RootStackParamList & CustomerStackParamList
>;

export function useAppNavigation() {
  return useNavigation<RootStackNavigationProp>();
}
