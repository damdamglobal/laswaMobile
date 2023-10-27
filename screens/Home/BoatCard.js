import React, { useEffect, useState } from "react";
import { Dimensions, Image, TouchableOpacity } from "react-native";
import { Text, View, Colors } from "react-native-ui-lib";
import { actuatedNormalize } from "../../components/FontResponsive";
import { elevate } from "react-native-elevate";
const { width, height } = Dimensions.get("window");

export default function BoatCard(props) {
  const [navigation, setNavigation] = useState(props.props);
  const [item, setItem] = useState(props.item);

  useEffect(() => {}, []);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigation.push("BoatDetail", { item: item });
      }}
    >
      <View center style={styles.card} marginH-5>
        <Image
          source={{
            uri: item.imgUrl,
          }}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = {
  card: {
    marginTop: actuatedNormalize(30),
    height: height / 1.7,
    width: width - actuatedNormalize(70),
    borderRadius: actuatedNormalize(30),
    overflow: "hidden",
    backgroundColor: Colors.sosColor,
    ...elevate(2),
  },
};
