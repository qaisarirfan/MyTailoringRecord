import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomerDetail from "../screens/secure/customer-detail";
import AddMeasurement from "../screens/secure/add-measurement";
import AdditionalCustomizationOptions from "../screens/secure/additional-customization-options";
import { DeliveryScheduling } from "../screens/secure/delivery-scheduling";
import { RouteProp, useRoute } from "@react-navigation/native";
import { CustomerStackParamList } from "../hooks/useNavigation";

const Stack = createNativeStackNavigator<CustomerStackParamList>();

type Route = RouteProp<CustomerStackParamList, "CustomerDetail">;

export default function CustomerStack() {
  const { params } = useRoute<Route>();
  const { customerId } = params;

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CustomerDetail"
        component={CustomerDetail}
        options={{ title: "Customer" }}
        initialParams={{ customerId }}
      />
      <Stack.Screen
        name="AddMeasurement"
        component={AddMeasurement}
        options={{ title: "Measurement" }}
        initialParams={{ customerId }}
      />
      <Stack.Screen
        name="AdditionalCustomizationOptions"
        component={AdditionalCustomizationOptions}
        options={{ title: "Customization" }}
        initialParams={{ customerId }}
      />
      <Stack.Screen
        name="DeliveryScheduling"
        component={DeliveryScheduling}
        options={{ title: "Delivery Scheduling" }}
        initialParams={{ customerId }}
      />
    </Stack.Navigator>
  );
}
