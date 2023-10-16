import { Dimensions } from "react-native";
import { Text, View, Colors } from "react-native-ui-lib";
import { FontAwesome5 } from "@expo/vector-icons";
import { actuatedNormalize } from "../../components/FontResponsive";
import { elevate } from "react-native-elevate";

const { width, height } = Dimensions.get("window");

export default function UserAvatar() {
  return (
    <View row centerV>
      <View center style={styles.sos}>
        <FontAwesome5
          color="#181818"
          size={actuatedNormalize(30)}
          name="user-alt"
        />
      </View>
      <View marginH-10>
        <Text smallF>Hello</Text>
        <Text subheading>Alfredo Schuster</Text>
      </View>
    </View>
  );
}

const styles = {
  sos: {
    height: actuatedNormalize(50),
    width: actuatedNormalize(50),
    borderRadius: actuatedNormalize(50),
    backgroundColor: Colors.whiteColor,
    ...elevate(2),
  },
};
