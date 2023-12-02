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
import Onboarding from "../screens/Onboarding/index.js";
import SplashScreen from "../screens/SplashScreen/index.js";
import GetStarted from "../screens/GetStarted/index.js";
import AddFleet from "../screens/AddBoat/index";
import BoatDetail from "../screens/BoatDetail";

import {
  AuthContext,
  SplashscreenContext,
  OnboardingScreenContext,
  MainScreenContext,
} from "../context/index.js";

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
      <Stack.Screen name="dashboard" component={DashboardScreen} />
      <Stack.Screen name="StartTrip" component={StartTrip} />
      <Stack.Screen name="AddFleet" component={AddFleet} />
      <Stack.Screen name="BoatDetail" component={BoatDetail} />
      <Stack.Screen
        name="AddPassengerManifest"
        component={AddPassengerManifest}
      />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={options}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
};

const OnboardingStack = () => {
  return (
    <Stack.Navigator screenOptions={options}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="GetStarted" component={GetStarted} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
};

function SplashScreenNavigation() {
  const [auth, setAuth] = React.useContext(AuthContext);
  const [splashscreen, setSplashscreen] = React.useContext(SplashscreenContext);
  const [onboard, setOnboard] = React.useContext(OnboardingScreenContext);
  const [mainScreen, setMainScreen] = React.useContext(MainScreenContext);

  console.log(onboard, auth, splashscreen);

  if (onboard) {
    return <OnboardingStack />;
  } else if (auth) {
    return <AuthStack />;
  } else if (splashscreen) {
    return <SplashScreen />;
  } else {
    return (
      <Stack.Navigator
        screenOptions={{
          cardOverlayEnabled: true,
          cardStyleInterpolator: ({ current: { progress } }) => ({
            cardStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 0.5, 0.9, 1],
                outputRange: [0, 0.25, 0.7, 1],
              }),
            },
            overlayStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.5],
                extrapolate: "clamp",
              }),
            },
          }),
        }}
      >
        <Stack.Screen
          options={({ route }) => ({ headerShown: false })}
          name="Main"
          component={RootStack}
        />
      </Stack.Navigator>
    );
  }
}

export default function Navigation() {
  return <SplashScreenNavigation />;
}

//export default RootStack;
