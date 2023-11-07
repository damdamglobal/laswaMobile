import {
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  StyleSheet,
} from "react-native";
import { actuatedNormalize } from "../../components/FontResponsive";
import { View, Text, Colors, Badge } from "react-native-ui-lib";
import { elevate } from "react-native-elevate";

const { width, height } = Dimensions.get("window");

export default function Onboarding(props) {
  return (
    <View flex background-whiteColor>
      <ImageBackground
        source={require("../../assets/laswa.jpeg")}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={styles.overlay} />
        <View flex bottom centerH paddingB-40>
          <Text heading whiteColor>
            Lagos State
          </Text>
          <Text heading whiteColor>
            Waterways Authority{" "}
          </Text>
          <Text whiteColor>
            To transform Lagos into a model city with world class inland
          </Text>
          <Text whiteColor>waterways infrastructure and services.</Text>
          <TouchableOpacity
            onPress={() => {
              props.navigation.push("Login");
            }}
          >
            <View style={styles.btn} background-whiteColor center marginT-40>
              <Text>Get Started</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = {
  btn: {
    width: width - actuatedNormalize(50),
    padding: actuatedNormalize(20),
    borderRadius: actuatedNormalize(10),
    ...elevate(4),
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(39, 41, 43, 0.5)",
    // background: linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #080808 85.42%, #0A0A0A 100%);
  },
};
