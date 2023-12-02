import React, { useEffect, useState } from "react";
import { Dimensions, ImageBackground, TouchableOpacity } from "react-native";
import { Text, View, Colors } from "react-native-ui-lib";
import { actuatedNormalize } from "../../components/FontResponsive";
import { elevate } from "react-native-elevate";

const { width, height } = Dimensions.get("window");

export default function BoatCard(props) {
  const [navigation, setNavigation] = useState(props.props);

  return (
    <View style={styles.card}>
      <Text subhead>Active Operators</Text>
      <View flex centerH bottom paddingB-20>
        <Text smallF>You do not have any active Operators</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigation.navigate("AddFleet");
          }}
        >
          <View style={styles.btn} background-primaryColor center marginT-40>
            <Text whiteColor>Add Operator</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = {
  card: {
    marginTop: actuatedNormalize(30),
    height: height / 4,
    width: width - actuatedNormalize(50),
    overflow: "hidden",
    padding: actuatedNormalize(20),
    backgroundColor: "#fff",
    ...elevate(2),
  },
  btn: {
    width: width - actuatedNormalize(100),
    padding: actuatedNormalize(20),
    borderRadius: actuatedNormalize(10),
    ...elevate(4),
  },
};
