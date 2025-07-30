import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import Dashboard from "./secure/dashboard";
import Measurements from "./secure/measurements";
import { Button } from "react-native-paper";
import ScreenWrapper from "../components/ScreenWrapper";
import ShopType from "./secure/shop-type";
import AddCustomer from "./secure/add-customer";
import { TaskScreen } from "./TaskScreen";

export default () => {
  const uid = undefined;
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="TaskScreen"
          component={TaskScreen}
          options={{ title: "Task" }}
        /> */}

        <Stack.Screen
          name="ShopType"
          component={ShopType}
          options={{ title: "Shop Type" }}
        />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Measurements" component={Measurements} />
        <Stack.Screen name="AddCustomer" component={AddCustomer} />
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
