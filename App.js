import "react-native-gesture-handler";
import { useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { Colors, Typography, Spacings, Assets } from "react-native-ui-lib";
import Navigation from "./navigation/index";
import { actuatedNormalize } from "./components/FontResponsive";
import {
  AuthProvider,
  SplashscreenProvider,
  OnboardingScreenProvider,
  MainScreenProvider,
  BoatScreenProvider,
  TripsScreenProvider,
} from "./context/index";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

Colors.loadColors({
  primaryColor: "#0A519B",
  whiteColor: "#fff",
  blackColor: "#181818",
  whiteColorF: "#F6F6F6",
  sosColor: "#FF473E",
  errorColor: "#FF001E",
  successColor: "#00AF12",
  gray: "#999999",
});

Typography.loadTypographies({
  heading: {
    fontSize: actuatedNormalize(36),
    fontWeight: "600",
    fontFamily: "AvenHeavy",
  },
  headingT: {
    fontSize: actuatedNormalize(25),
    fontFamily: "AvenHeavy",
  },
  subheading: {
    fontSize: actuatedNormalize(20),
    fontWeight: "500",
    fontFamily: "AvenHeavy",
  },
  subheader: { fontSize: actuatedNormalize(15), fontWeight: "bold" },
  subhead: { fontSize: actuatedNormalize(13), fontWeight: "bold" },
  smallF: { fontSize: actuatedNormalize(10), fontWeight: "400" },
  cap: { textTransform: "uppercase" },
  capital: { textTransform: "capitalize" },
  underLine: { textDecorationLine: "underline" },
  FontAven: { fontFamily: "Aven" },
});

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Aven: require("./assets/fonts/Aven.otf"),
    AvenirLTStd: require("./assets/fonts/AvenirLTStd-Book.otf"),
    AvenHeavy: require("./assets/fonts/AvenirLTStd-Heavy.otf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <ActionSheetProvider>
        <NavigationContainer>
          <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <MainScreenProvider>
              <OnboardingScreenProvider>
                <AuthProvider>
                  <SplashscreenProvider>
                    <BoatScreenProvider>
                      <TripsScreenProvider>
                        <Navigation />
                      </TripsScreenProvider>
                    </BoatScreenProvider>
                  </SplashscreenProvider>
                </AuthProvider>
              </OnboardingScreenProvider>
            </MainScreenProvider>
          </SafeAreaView>
        </NavigationContainer>
      </ActionSheetProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
