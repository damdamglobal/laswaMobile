import React, { useEffect, useState } from "react";
import { Dimensions, ImageBackground, TouchableOpacity } from "react-native";
import { Text, View, Checkbox, Colors, Assets } from "react-native-ui-lib";

const { width, height } = Dimensions.get("window");

export default function YesNoCard(props) {
  return (
    <View>
      <View flex row marginT-10>
        <View flex>
          <Text>Tiltle</Text>
        </View>
        <View flex right marginH-10>
          <Checkbox
            value={true}
            onValueChange={() => console.log("value changed")}
            iconColor="white"
            color={Colors.primaryColor}
          />
        </View>
      </View>
    </View>
  );
}

const styles = {};
