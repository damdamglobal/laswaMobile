import React from "react";
import MapView from "react-native-maps";
import { StyleSheet, Dimensions, TouchableHighlight } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { elevate } from "react-native-elevate";
import { Text, View, Colors } from "react-native-ui-lib";
import { actuatedNormalize } from "../../components/FontResponsive";
import SOS from "../../components/Sos";
import StartTripModal from "./StartTripModal";
const { width, height } = Dimensions.get("window");

export default function MapScreen(props) {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} />
      <View style={styles.header} row centerV paddingH-20>
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
      <View style={styles.bottom} center>
        <StartTripModal props={props} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  header: {
    height: actuatedNormalize(100),
    width: width,
    position: "absolute",
  },
  bottom: {
    height: actuatedNormalize(200),
    width: width,
    position: "absolute",
    bottom: actuatedNormalize(0),
    backgroundColor: "#fff",
    borderTopLeftRadius: actuatedNormalize(20),
    borderTopRightRadius: actuatedNormalize(20),
  },
});
