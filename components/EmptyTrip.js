import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
} from "react-native";
import { Text, View, Colors, Button } from "react-native-ui-lib";
import { actuatedNormalize } from "./FontResponsive";
import { elevate } from "react-native-elevate";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import PassengerDetail from "./PassengerDetail";
import EmptyCard from "./EmptyCard";
const { width, height } = Dimensions.get("window");

export default function TripHistory() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View style={styles.card} center marginB-20>
      <View row>
        <View marginL-20 centerH>
          <View style={styles.origin} center background-primaryColor>
            <FontAwesome5
              color="#fff"
              size={actuatedNormalize(10)}
              name="dot-circle"
            />
          </View>
          <View style={styles.line} />
          <View style={styles.destination} center background-primaryColor>
            <FontAwesome5
              color="#fff"
              size={actuatedNormalize(10)}
              name="dot-circle"
            />
          </View>
        </View>
        <View flex center>
          <Text>No Record</Text>
        </View>
      </View>
    </View>
  );
}

const styles = {
  card: {
    height: actuatedNormalize(220),
    width: width - actuatedNormalize(20),
    backgroundColor: "#F6F6F6",
    borderRadius: actuatedNormalize(10),
    ...elevate(2),
  },
  origin: {
    height: actuatedNormalize(20),
    width: actuatedNormalize(20),
    borderRadius: actuatedNormalize(10),
    backgroundColor: Colors.primaryColor,
  },
  destination: {
    height: actuatedNormalize(20),
    width: actuatedNormalize(20),
    borderRadius: actuatedNormalize(10),
    backgroundColor: Colors.primaryColor,
  },
  line: {
    height: actuatedNormalize(100),
    width: actuatedNormalize(3),
    backgroundColor: Colors.primaryColor,
  },
  verticalLine: {
    width: width - actuatedNormalize(170),
    height: actuatedNormalize(2),
    backgroundColor: "#9EA2A7",
  },
  passageList: {
    width: actuatedNormalize(50),
    height: actuatedNormalize(50),
    borderRadius: actuatedNormalize(50),
    backgroundColor: "#fff",
    ...elevate(2),
  },
  modal: {
    flex: 1,
    height: height / actuatedNormalize(10),
    backgroundColor: "rgba(28, 28, 28, 0.5)",
  },
  modalCard: {
    flex: 1,
    marginTop: actuatedNormalize(70),
    borderTopRightRadius: actuatedNormalize(20),
    borderTopLeftRadius: actuatedNormalize(20),
    backgroundColor: "#fff",
    paddingHorizontal: actuatedNormalize(20),
  },
  TextInput: {
    height: 50,
    marginTop: actuatedNormalize(5),
    width: width - actuatedNormalize(50),
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: actuatedNormalize(5),
    padding: actuatedNormalize(10),
  },
};
