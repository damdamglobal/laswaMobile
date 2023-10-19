import {
  Dimensions,
  FlatList,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import { Text, View, Colors, Button } from "react-native-ui-lib";
import { actuatedNormalize } from "../../components/FontResponsive";
import { elevate } from "react-native-elevate";
import { AntDesign } from "@expo/vector-icons";
import SOS from "../../components/Sos";

export default function TripHistory(props) {
  return (
    <View flex paddingH-20 background-whiteColor>
      <View row centerV>
        <View flex></View>
        <View flex center>
          <Text>Trips History</Text>
        </View>
        <View right flex>
          <SOS />
        </View>
      </View>
    </View>
  );
}
