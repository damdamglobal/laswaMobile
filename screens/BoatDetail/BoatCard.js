import React, { useEffect, useState } from "react";
import { Dimensions, Image, TouchableHighlight } from "react-native";
import { Text, View, Colors } from "react-native-ui-lib";
import { actuatedNormalize } from "../../components/FontResponsive";
import { elevate } from "react-native-elevate";
const { width, height } = Dimensions.get("window");

export default function BoatCard(props) {
  const [navigation, setNavigation] = useState(props.props);

  useEffect(() => {}, []);

  return (
    <View center style={styles.card} marginH-5>
      <Image
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/haulee-1b003.appspot.com/o/boat.jpeg?alt=media&token=7c5a96e6-db0d-4b05-be5d-e5a9e4c9996d",
        }}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </View>
  );
}

const styles = {
  card: {
    marginTop: actuatedNormalize(30),
    height: actuatedNormalize(420),
    width: width - actuatedNormalize(50),
    borderRadius: actuatedNormalize(30),
    overflow: "hidden",
    backgroundColor: Colors.sosColor,
    ...elevate(2),
  },
};
