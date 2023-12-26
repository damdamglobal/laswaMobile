import React, { useEffect, useState } from "react";
import { Dimensions, ImageBackground, TouchableOpacity } from "react-native";
import { Text, View, Colors } from "react-native-ui-lib";
import { actuatedNormalize } from "../../components/FontResponsive";
import { elevate } from "react-native-elevate";
import { AntDesign } from "@expo/vector-icons";
import SOS from "../../components/Sos";

const { width, height } = Dimensions.get("window");

export default function AboutLaswa(props) {
  const [navigation, setNavigation] = useState(props.props);

  return (
    <View flex padding-20 background-whiteColorF>
      <View row centerV>
        <View flex>
          <TouchableOpacity onPress={() => props.navigation.pop()}>
            <AntDesign
              color="#181818"
              size={actuatedNormalize(20)}
              name="left"
            />
          </TouchableOpacity>
        </View>
        <View flex-2 center>
          <Text subheading numberOfLines={1}>
            About Laswa
          </Text>
        </View>
        <View right flex>
          <SOS />
        </View>
      </View>
      <View center>
        <View style={styles.card}>
          <Text
            style={{
              fontFamily: "AvenirLTStd",
              letterSpacing: 1,
              lineHeight: 20,
            }}
          >
            The Lagos State Government (LASG) in 2008 enacted the Lagos State
            Waterways Authority Act, which established the Lagos Waterways
            Authority (LASWA). LASWA is charged with the responsibility of
            coordinating and managing the reforms necessary for the long-term
            growth and development of water transportation in Lagos State,
            including the granting of ferry licenses and concessions for the
            operation of terminals to the private sector. These reforms entail
            the creation of an enabling long-term regulatory environment that
            attracts significant private sector involvement in the provision of
            water transport services. Through LASWA, the LASG has embarked on
            policy reforms that promote and facilitate investments for the
            provision of water transport aimed at realizing potentials towards
            becoming an attractive mode of transport. The fundamental
            responsibility of LASWA is to manage, improve and enhance navigation
            opportunities for Lagos State inland waterways.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = {
  card: {
    marginTop: actuatedNormalize(30),
    minHeight: height / 1.7,
    width: width - actuatedNormalize(50),
    borderRadius: actuatedNormalize(10),
    overflow: "hidden",
    backgroundColor: "#fff",
    padding: actuatedNormalize(10),
    ...elevate(2),
  },
  btn: {
    width: width - actuatedNormalize(70),
    padding: actuatedNormalize(20),
    borderRadius: actuatedNormalize(10),
    ...elevate(4),
  },
};
