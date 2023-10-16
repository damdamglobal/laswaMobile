import { Dimensions, Image } from "react-native";
import { Text, View, Colors } from "react-native-ui-lib";
import { actuatedNormalize } from "../../components/FontResponsive";
import { elevate } from "react-native-elevate";

const { width, height } = Dimensions.get("window");

export default function BoatCard() {
  return (
    <View flex>
      <Text>Boat</Text>
    </View>
  );
}

const styles = {};
