import React, { useEffect, useState } from "react";
import { Dimensions, Image, TouchableOpacity } from "react-native";
import { Text, View, Colors } from "react-native-ui-lib";
import { actuatedNormalize } from "../../components/FontResponsive";
import { elevate } from "react-native-elevate";

const { width, height } = Dimensions.get("window");

export default function BoatCard(props) {
  const [navigation, setNavigation] = useState(props.props);

  return (
    <View style={styles.card}>
      <View flex centerH bottom paddingB-20>
        <View center style={styles.sos}>
          <Image
            source={require("../../assets/Group.png")}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </View>
        <Text smallF>You do not have any operators</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.props.navigation.push("AddOperator");
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
  NUMCard: {
    height: actuatedNormalize(25),
    width: actuatedNormalize(25),
    borderRadius: actuatedNormalize(5),
  },
  card: {
    marginTop: actuatedNormalize(30),
    height: height / 3,
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
  sos: {
    height: width / 4,
    width: width / 4,
    borderRadius: actuatedNormalize(100),
    backgroundColor: Colors.whiteColor,
    overflow: "hidden",
    ...elevate(2),
  },
};
