import { useNavigation, NavigationProp } from "@react-navigation/native";

export type RootStackParamList = {
  AddCustomer: undefined;
  AddMeasurement: { customerId: string };
  CustomerDetail: { customerId: string };
  CustomerList: undefined;
  Dashboard: undefined;
  Measurements: undefined;
  RegisterShop: undefined;
  ShopType: undefined;
};

export type RootStackNavigationProp = NavigationProp<RootStackParamList>;

export function useAppNavigation() {
  return useNavigation<RootStackNavigationProp>();
}
