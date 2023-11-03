import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
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
      <View center style={styles.card}>
        <ImageBackground
          source={{
            uri: item.imgUrl,
          }}
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          {item.activeTrip ? (
            <View right>
              <View background-whiteColor padding-10 margin-20>
                <Text primaryColor>Active</Text>
              </View>
            </View>
          ) : null}
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
}

const styles = {
  card: {
    margin: actuatedNormalize(10),
    height: height / 1.7,
    width: width - actuatedNormalize(70),
    borderRadius: actuatedNormalize(30),
    overflow: "hidden",
    backgroundColor: "#F6F6FF",
    ...elevate(2),
  },
};
