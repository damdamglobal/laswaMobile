import "react-native-gesture-handler";
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

Colors.loadColors({
  primaryColor: "#0A519B",
  whiteColor: "#fff",
  whiteColorF: "#F6F6F6",
  sosColor: "#FF473E",
  errorColor: "#FF001E",
  successColor: "#00AF12",
  gray: "gray",
});

Typography.loadTypographies({
  heading: { fontSize: actuatedNormalize(36), fontWeight: "600" },
  subheading: { fontSize: actuatedNormalize(20), fontWeight: "500" },
  subheader: { fontSize: actuatedNormalize(15), fontWeight: "bold" },
  subhead: { fontSize: actuatedNormalize(13), fontWeight: "bold" },
  smallF: { fontSize: actuatedNormalize(10), fontWeight: "400" },
  cap: { textTransform: "uppercase" },
  underLine: { textDecorationLine: "underline" },
});

export default function App() {
  return (
    <SafeAreaProvider>
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
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
