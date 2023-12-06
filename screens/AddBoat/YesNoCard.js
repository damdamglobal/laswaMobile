import React, { useEffect, useState } from "react";
import { Dimensions, ImageBackground, TouchableOpacity } from "react-native";
import { Text, View, Checkbox, Colors, Assets } from "react-native-ui-lib";
import { actuatedNormalize } from "../../components/FontResponsive";
import { elevate } from "react-native-elevate";

const { width, height } = Dimensions.get("window");

export default function YesNoCard(props) {
  return (
    <View style={styles.card} padding-10>
      <Text>{props.label}</Text>
      <View flex row marginT-10 bottom>
        <View marginH-10>
          <Checkbox
            label={props.title2 ? props.title2 : "No"}
            value={!props.typeValue}
            onValueChange={(text) => props.setTypeHandle(!text)}
            iconColor="white"
            color={Colors.primaryColor}
          />
        </View>
        <View marginH-10>
          <Checkbox
            label={props.title1 ? props.title1 : "Yes"}
            value={props.typeValue}
            onValueChange={(text) => props.setTypeHandle(text)}
            iconColor="white"
            color={Colors.primaryColor}
          />
        </View>
      </View>
    </View>
  );
}

const styles = {
  card: {
    marginTop: actuatedNormalize(20),
    minHeight: actuatedNormalize(80),
    width: width - actuatedNormalize(50),
    borderRadius: actuatedNormalize(5),
    overflow: "hidden",
    backgroundColor: "#EFEFEF",
    ...elevate(2),
  },
  btn: {
    width: width - actuatedNormalize(70),
    padding: actuatedNormalize(20),
    borderRadius: actuatedNormalize(10),
    ...elevate(4),
  },
};
