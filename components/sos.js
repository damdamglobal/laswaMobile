import { Dimensions } from "react-native";
import { Text, View, Colors } from "react-native-ui-lib";
import { actuatedNormalize } from "./FontResponsive";
import { elevate } from "react-native-elevate";

const { width, height } = Dimensions.get("window");

export default function SOS() {
  return (
    <View center style={styles.sos}>
      <Text whiteColor>SOS</Text>
    </View>
  );
}

const styles = {
  sos: {
    height: actuatedNormalize(50),
    width: actuatedNormalize(50),
    borderRadius: actuatedNormalize(50),
    backgroundColor: Colors.sosColor,
    ...elevate(2),
  },
};
