import {
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
} from "react-native";
import { View, Text, Colors, Badge } from "react-native-ui-lib";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { actuatedNormalize } from "../../components/FontResponsive";
import SOS from "../../components/Sos";

const { width, height } = Dimensions.get("window");

export default function AddManifest(props) {
  return (
    <View flex paddingH-20 background-whiteColor>
      <View row centerV>
        <View flex>
          <TouchableOpacity onPress={() => props.navigation.pop()}>
            <AntDesign
              color="#181818"
              size={actuatedNormalize(20)}
              name="left"
            />
          </TouchableOpacity>
        </View>
        <View flex center>
          <Text subheading> Manifest</Text>
        </View>
        <View right flex>
          <SOS />
        </View>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View flex marginT-20>
          <View row>
            <View left flex>
              <Text subheader>Passenger Detail</Text>
            </View>
            <View right flex>
              <Badge label={"999"} size={16} />
              <FontAwesome5
                color="#181818"
                size={actuatedNormalize(20)}
                name="clipboard-list"
              />
            </View>
          </View>
          <View marginT-20>
            <Text smallF>Full Name</Text>
            <TextInput
              style={styles.TextInput}
              placeholder="Enter Location Destination"
            />
          </View>
          <View marginT-10>
            <Text smallF>Home Address</Text>
            <TextInput
              style={styles.TextInput}
              placeholder="Enter Location Destination"
            />
          </View>
          <View marginT-10>
            <Text smallF>Phone Number</Text>
            <TextInput
              style={styles.TextInput}
              placeholder="Enter Location Destination"
            />
          </View>
          <View row marginT-30>
            <View left flex>
              <Text subheader>Next of Kin Details</Text>
            </View>
            <View right flex>
              <FontAwesome5
                color="#181818"
                size={actuatedNormalize(20)}
                name="clipboard-list"
              />
            </View>
          </View>
          <View marginT-10>
            <Text smallF>Full Name</Text>
            <TextInput
              style={styles.TextInput}
              placeholder="Enter Location Destination"
            />
          </View>
          <View marginT-10>
            <Text smallF>Phone Number</Text>
            <TextInput
              style={styles.TextInput}
              placeholder="Enter Location Destination"
            />
          </View>
          <View center marginT-50>
            <View flex bottom>
              <TouchableOpacity
                onPress={() => {
                  setIsVisible(false);
                  props.navigate("AddPassengerManifest");
                }}
              >
                <View style={styles.btnOutline} center>
                  <Text primaryColor>Add Passenger</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setIsVisible(false);
                  props.navigate("AddPassengerManifest");
                }}
              >
                <View
                  style={styles.btn}
                  background-primaryColor
                  center
                  marginT-20
                >
                  <Text whiteColor>Submit</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = {
  TextInput: {
    height: 40,
    marginTop: actuatedNormalize(5),
    width: width - actuatedNormalize(50),
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: actuatedNormalize(5),
    padding: actuatedNormalize(10),
  },
  btn: {
    width: width - actuatedNormalize(50),
    padding: actuatedNormalize(20),
    borderRadius: actuatedNormalize(10),
  },
  btnOutline: {
    width: width - actuatedNormalize(50),
    padding: actuatedNormalize(20),
    borderRadius: actuatedNormalize(10),
    borderColor: Colors.primaryColor,
    borderWidth: actuatedNormalize(1),
  },
};
