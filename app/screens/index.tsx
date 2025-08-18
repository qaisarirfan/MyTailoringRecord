import {
  DefaultTheme,
  NavigationContainer,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useColorScheme } from "react-native";

import AddCustomer from "./secure/add-customer";
import Dashboard from "./secure/dashboard";
import RegisterShop from "./secure/register-shop";
import ShopType from "./secure/shop-type";
import { useShopManager } from "../hooks/useShopManager";
import CustomerList from "./secure/customer-list";
import CustomerStack from "../navigation/CustomerStack";
import { RootStackParamList } from "../hooks/useNavigation";

export default () => {
  const scheme = useColorScheme();

  const Stack = createNativeStackNavigator<RootStackParamList>();
  const { shopExists } = useShopManager();

  return (
    <NavigationContainer theme={scheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack.Navigator>
        {!shopExists && (
          <Stack.Screen
            name="RegisterShop"
            component={RegisterShop}
            options={{ title: "Shop" }}
          />
        )}

        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen
          name="CustomerList"
          component={CustomerList}
          options={{ title: "Customers" }}
        />
        <Stack.Screen
          name="AddCustomer"
          component={AddCustomer}
          options={{ title: "Add New Customer" }}
        />
        <Stack.Screen
          name="ShopType"
          component={ShopType}
          options={{ title: "Shop Type" }}
        />

        <Stack.Screen
          name="CustomerStack"
          component={CustomerStack}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );

  // return (
  //   <NavigationContainer>
  //     {uid ? (
  //       <Stack.Navigator>
  //         <Stack.Screen
  //           name="SignIn"
  //           component={SignIn}
  //           options={{
  //             animationTypeForReplace: !uid ? 'pop' : 'push',
  //           }}
  //         />
  //         <Stack.Screen name="SignUp" component={SignUp} />
  //         <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
  //       </Stack.Navigator>
  //     ) : (
  //       <Stack.Navigator>
  //         {/* <Stack.Screen name="Measurements" component={Measurements} /> */}
  //         <Stack.Screen name="Dashboard" component={Dashboard} />
  //       </Stack.Navigator>
  //     )}
  //   </NavigationContainer>
  // );
};
