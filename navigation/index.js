import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import React from "react";

import DashboardScreen from "./BottomTab.js";
import StartTrip from "../screens/StartTrip/index.js";
import AddPassengerManifest from "../screens/AddPassengerManifest/index.js";
import Login from "../screens/Login/index.js";
import Signup from "../screens/Signup/index.js";
import ForgotPassword from "../screens/ForgotPassword/index.js";

const options = {
  gestureEnabled: true,
  gestureDirection: "horizontal",
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  headerShown: false,
};

const Stack = createStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={options}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="dashboard" component={DashboardScreen} />
      <Stack.Screen name="StartTrip" component={StartTrip} />
      <Stack.Screen
        name="AddPassengerManifest"
        component={AddPassengerManifest}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
