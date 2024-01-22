import React, { useEffect, useState } from "react";
import {
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { Text, View, Checkbox, Colors, Assets } from "react-native-ui-lib";
import { actuatedNormalize } from "../../components/FontResponsive";
import { elevate } from "react-native-elevate";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5,
  SimpleLineIcons,
  Entypo,
} from "@expo/vector-icons";
const { width, height } = Dimensions.get("window");

export default function YesNoCard(props) {
  const [isVisible, setIsVisible] = useState(false);
  const [expandDevHeight, setExpandDevHeight] = useState(10);

  const ExpandDevHeightFunc = (payload) => {
    if (!payload) {
      setExpandDevHeight(100);
    } else {
      setExpandDevHeight(10);
    }
  };

  return (
    <View style={styles.card} padding-10 marginH-20>
      <TouchableOpacity
        onPress={() => {
          setIsVisible(!isVisible);
        }}
      >
        <View style={styles.card2} background-primaryColor padding-10 row>
          <View flex-2>
            <Text whiteColorF>{props.title}</Text>
          </View>
          <View>
            <Entypo
              color="#fff"
              size={actuatedNormalize(15)}
              name={isVisible ? "plus" : "minus"}
            />
          </View>
        </View>
        <View marginH-10 style={[styles.expandDev]}>
          {isVisible ? (
            <View>
              <Text smallF marginT-50>
                {props.details}
              </Text>
            </View>
          ) : null}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  card: {
    backgroundColor: "#fff",
    ...elevate(2),
  },
  card2: {
    minHeight: actuatedNormalize(70),
  },
  expandDev: {
    overflow: "hidden",
  },
};
