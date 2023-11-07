import React, { useEffect, useState } from "react";
import { Dimensions, Image, TouchableHighlight } from "react-native";
import { Text, View, Colors } from "react-native-ui-lib";
import { actuatedNormalize } from "../../components/FontResponsive";
import { elevate } from "react-native-elevate";
const { width, height } = Dimensions.get("window");

export default function BoatCard(props) {
  useEffect(() => {}, []);

  return (
    <View center style={styles.card} marginH-5>
      <Image
        source={{
          uri: props.item.imgUrl,
        }}
        resizeMode="stretch"
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
    height: height / 5,
    width: width - actuatedNormalize(50),
    borderRadius: actuatedNormalize(10),
    overflow: "hidden",
    backgroundColor: Colors.sosColor,
    ...elevate(2),
  },
};
