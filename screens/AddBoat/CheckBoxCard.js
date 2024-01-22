import React, { useEffect, useState } from "react";
import { Dimensions, ImageBackground, TouchableOpacity } from "react-native";
import { Text, View, Checkbox, Colors, Assets } from "react-native-ui-lib";
import { actuatedNormalize } from "../../components/FontResponsive";

const { width, height } = Dimensions.get("window");

export default function YesNoCard(props) {
  return (
    <View style={styles.devCard}>
      <View flex row>
        <View flex>
          <Text>{props.type}</Text>
        </View>
        <View flex right marginH-10>
          <Checkbox
            value={props.type == props.typeValue ? true : false}
            onValueChange={(item) => props.setVesselTypeHandle(props.type)}
            iconColor="white"
            color={Colors.primaryColor}
          />
        </View>
      </View>
    </View>
  );
}

const styles = {
  devCard: {
    backgroundColor: "#EFEFEF",
    justifyContent: "center",
    alignItems: "center",
    padding: actuatedNormalize(5),
  },
};
