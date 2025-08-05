import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import AddCustomer from "./secure/add-customer";
import Dashboard from "./secure/dashboard";
import Measurements from "./secure/measurements";
import RegisterShop from "./secure/register-shop";
import ShopType from "./secure/shop-type";
import { useShopManager } from "../hooks/useShopManager";
import CustomerList from "./secure/customer-list";

export default () => {
  const Stack = createNativeStackNavigator();
  const { shopExists } = useShopManager();

  return (
    <NavigationContainer>
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
          name="ShopType"
          component={ShopType}
          options={{ title: "Shop Type" }}
        />
        <Stack.Screen name="Measurements" component={Measurements} />
        <Stack.Screen
          name="AddCustomer"
          component={AddCustomer}
          options={{ title: "Add New Customer" }}
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
