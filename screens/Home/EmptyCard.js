import React, { useEffect, useState } from "react";
import { Dimensions, ImageBackground, TouchableOpacity } from "react-native";
import { Text, View, Colors } from "react-native-ui-lib";
import { actuatedNormalize } from "../../components/FontResponsive";
import { elevate } from "react-native-elevate";

const { width, height } = Dimensions.get("window");

export default function BoatCard(props) {
  const [navigation, setNavigation] = useState(props.props);

  return (
    <View center style={styles.card}>
      <ImageBackground
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/haulee-1b003.appspot.com/o/boat.jpeg?alt=media&token=7c5a96e6-db0d-4b05-be5d-e5a9e4c9996d",
        }}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <View flex centerH bottom paddingB-20>
          <TouchableOpacity
            onPress={() => {
              navigation.navigation.navigate("AddFleet");
            }}
          >
            <View style={styles.btn} background-whiteColor center marginT-40>
              <Text>Register A Boat</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = {
  card: {
    marginTop: actuatedNormalize(30),
    height: height / 1.7,
    width: width - actuatedNormalize(50),
    borderRadius: actuatedNormalize(30),
    overflow: "hidden",
    backgroundColor: Colors.sosColor,
    ...elevate(2),
  },
  btn: {
    width: width - actuatedNormalize(70),
    padding: actuatedNormalize(20),
    borderRadius: actuatedNormalize(10),
    ...elevate(4),
  },
};
