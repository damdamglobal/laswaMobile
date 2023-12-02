import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon, { Icons } from "../components/Icons";
import { Colors } from "react-native-ui-lib";

import HomeScreen from "../screens/Home/index";
import MyVessel from "../screens/MyVessel/index";
import Profile from "../screens/Profile/index";
import TripHistory from "../screens/TripsHistory/index";
import BoatDetail from "../screens/BoatDetail";
import AboutLaswa from "../screens/AboutLaswa/index";
import BusinessProfile from "../screens/BusinessProfile/index";
import BusinessDoc from "../screens/BusinessDoc/index";
import BusinessInfo from "../screens/BusinessInfo/index";
import AddOperator from "../screens/AddOperator/index";
import Operator from "../screens/Operator/index";

import * as Animatable from "react-native-animatable";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const options = {
  gestureEnabled: true,
  gestureDirection: "horizontal",
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  headerShown: false,
};

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={options}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="BoatDetail" component={BoatDetail} />
      <Stack.Screen name="AddOperator" component={AddOperator} />
      <Stack.Screen name="Operator" component={Operator} />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={options}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="AboutLaswa" component={AboutLaswa} />
    </Stack.Navigator>
  );
};

const TabArr = [
  {
    route: "Home",
    label: "Home",
    type: Icons.Feather,
    icon: "home",
    component: HomeStack,
  },
  {
    route: "TripHistory",
    label: "Trip History",
    type: Icons.FontAwesome5,
    icon: "history",
    component: TripHistory,
  },
  {
    route: "MyVessel",
    label: "My Vessel",
    type: Icons.Ionicons,
    icon: "boat",
    component: MyVessel,
  },
  {
    route: "UserProfile",
    label: "UserProfile",
    type: Icons.Feather,
    icon: "user",
    component: ProfileStack,
  },
];

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const textViewRef = useRef(null);

  useEffect(() => {
    if (focused) {
      // 0.3: { scale: .7 }, 0.5: { scale: .3 }, 0.8: { scale: .7 },
      viewRef.current.animate({ 0: { scale: 0 }, 1: { scale: 1 } });
      textViewRef.current.animate({ 0: { scale: 0 }, 1: { scale: 1 } });
    } else {
      viewRef.current.animate({ 0: { scale: 1 }, 1: { scale: 0 } });
      textViewRef.current.animate({ 0: { scale: 1 }, 1: { scale: 0 } });
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[styles.container, { flex: focused ? 1 : 0.65 }]}
    >
      <View>
        <Animatable.View
          ref={viewRef}
          style={[
            StyleSheet.absoluteFillObject,
            { backgroundColor: Colors.whiteColor, borderRadius: 16 },
          ]}
        />
        <View
          style={[
            styles.btn,
            { backgroundColor: focused ? null : item.alphaClr },
          ]}
        >
          <Icon
            type={item.type}
            name={item.icon}
            color={focused ? Colors.primaryColor : Colors.whiteColor}
          />
          <Animatable.View ref={textViewRef}>
            {focused && (
              <Text
                style={{
                  color: Colors.primaryColor,
                  paddingHorizontal: 8,
                }}
              >
                {item.label}
              </Text>
            )}
          </Animatable.View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const BottomTabStack = () => {
  return (
    <Stack.Navigator screenOptions={options}>
      <Stack.Screen name="BottomTab" component={BottomTab} />
      <Stack.Screen name="BusinessProfile" component={BusinessProfile} />
      <Stack.Screen name="BusinessDoc" component={BusinessDoc} />
      <Stack.Screen name="BusinessInfo" component={BusinessInfo} />
    </Stack.Navigator>
  );
};

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          position: "absolute",
          bottom: 16,
          right: 16,
          left: 16,
          borderRadius: 16,
          backgroundColor: Colors.primaryColor,
        },
      }}
    >
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: (props) => <TabButton {...props} item={item} />,
              lazy: false,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default BottomTabStack;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 16,
  },
});
