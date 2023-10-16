import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Colors, Typography, Spacings, Assets } from "react-native-ui-lib";
import Navigation from "./navigation/index";
import { actuatedNormalize } from "./components/FontResponsive";
Colors.loadColors({
  primaryColor: "#0A519B",
  whiteColor: "#fff",
  sosColor: "#FF473E",
});

Typography.loadTypographies({
  heading: { fontSize: actuatedNormalize(36), fontWeight: "600" },
  subheading: { fontSize: actuatedNormalize(20), fontWeight: "500" },
  smallF: { fontSize: actuatedNormalize(10), fontWeight: "400" },
});

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <Navigation />
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
