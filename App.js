import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Colors, Typography, Spacings, Assets } from "react-native-ui-lib";
import Navigation from "./navigation/index";
import { actuatedNormalize } from "./components/FontResponsive";
import {
  AuthProvider,
  SplashscreenProvider,
  OnboardingScreenProvider,
  MainScreenProvider,
} from "./context/index";

Colors.loadColors({
  primaryColor: "#0A519B",
  whiteColor: "#fff",
  whiteColorF: "#F6F6F6",
  sosColor: "#FF473E",
  errorColor: "#FF001E",
  successColor: "#00AF12",
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
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <MainScreenProvider>
          <OnboardingScreenProvider>
            <AuthProvider>
              <SplashscreenProvider>
                <Navigation />
              </SplashscreenProvider>
            </AuthProvider>
          </OnboardingScreenProvider>
        </MainScreenProvider>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
