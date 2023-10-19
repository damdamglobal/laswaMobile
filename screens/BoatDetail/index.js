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
import BoatCard from "./BoatCard";
import SOS from "../../components/Sos";
import TripHistory from "./TripHistory";
import EmptyCard from "./EmptyCard";

const { width, height } = Dimensions.get("window");

export default function BoatCardComponent(props) {
  return (
    <View flex paddingH-20 background-whiteColor>
      <View row centerV>
        <View flex>
          <TouchableHighlight onPress={() => props.navigation.pop()}>
            <AntDesign
              color="#181818"
              size={actuatedNormalize(20)}
              name="left"
            />
          </TouchableHighlight>
        </View>
        <View flex center>
          <Text>Boat Details</Text>
        </View>
        <View right flex>
          <SOS />
        </View>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View flex>
          <View centerH>
            <BoatCard />
            <TouchableHighlight
              onPress={() => props.navigation.navigate("StartTrip")}
            >
              <View style={styles.btn} background-primaryColor center>
                <Text whiteColor>Start Trip</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View>
            <Text subheading>Fleet Name</Text>
            <Text smallF marginT-5>
              Registration Number: 1234567889
            </Text>
            <Text smallF marginT-5>
              Number of Seats: 12
            </Text>
            <Text smallF marginT-5>
              Boat Size: 12
            </Text>
            <Text smallF marginT-5>
              Boat Features: 12
            </Text>
          </View>
          <View row flex marginT-20>
            <View flex left>
              <Text subheading>Trip History</Text>
            </View>
            <View flex right>
              <Text subheading marginT-5>
                25
                <Text smallF marginT-5>
                  Trips
                </Text>
              </Text>
            </View>
          </View>
          <FlatList
            //  onRefresh={() => getProduct(token, "reload")}
            //  refreshing={loading}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            // snapToInterval={width - actuatedNormalize(100)}
            data={["", "", ""]}
            renderItem={({ item }) => <TripHistory />}
            ListEmptyComponent={() => <EmptyCard />}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = {
  btn: {
    width: width - actuatedNormalize(50),
    padding: actuatedNormalize(20),
    margin: actuatedNormalize(20),
    borderRadius: actuatedNormalize(10),
  },
};
