import React, { useEffect, useState } from "react";
import { Dimensions, Image, TouchableHighlight } from "react-native";
import { Text, View, Colors } from "react-native-ui-lib";
import { actuatedNormalize } from "../../components/FontResponsive";
import { elevate } from "react-native-elevate";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function TripHistory(props) {
  const [navigation, setNavigation] = useState(props.props);

  useEffect(() => {}, []);

  return (
    <View marginT-30>
      <View style={styles.card} center>
        <View row>
          <View marginL-20 centerH>
            <View style={styles.origin} center>
              <AntDesign
                color="#fff"
                size={actuatedNormalize(10)}
                name="circledown"
              />
            </View>
            <View style={styles.line} />
            <View style={styles.destination} center>
              <AntDesign
                color="#fff"
                size={actuatedNormalize(10)}
                name="upcircle"
              />
            </View>
          </View>
          <View flex marginL-20>
            <View flex>
              <Text>Origin</Text>
              <Text>345 Hardesty Street, 368972</Text>
            </View>
            <View flex centerV row>
              <View style={styles.verticalLine} />
              <View center marginL-20 right style={styles.passageList}>
                <FontAwesome5
                  color="#181818"
                  size={actuatedNormalize(20)}
                  name="clipboard-list"
                />
              </View>
            </View>
            <View flex bottom>
              <Text>Origin</Text>
              <Text>345 Hardesty Street, 368972</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = {
  card: {
    height: actuatedNormalize(200),
    width: width - actuatedNormalize(20),
    backgroundColor: "#F6F6F6",
    borderRadius: actuatedNormalize(10),
    ...elevate(2),
  },
  origin: {
    height: actuatedNormalize(20),
    width: actuatedNormalize(20),
    borderRadius: actuatedNormalize(10),
    backgroundColor: Colors.primaryColor,
  },
  destination: {
    height: actuatedNormalize(20),
    width: actuatedNormalize(20),
    borderRadius: actuatedNormalize(10),
    backgroundColor: Colors.primaryColor,
  },
  line: {
    height: actuatedNormalize(100),
    width: actuatedNormalize(3),
    backgroundColor: Colors.primaryColor,
  },
  verticalLine: {
    width: width - actuatedNormalize(170),
    height: actuatedNormalize(2),
    backgroundColor: "#9EA2A7",
  },
  passageList: {
    width: actuatedNormalize(50),
    height: actuatedNormalize(50),
    borderRadius: actuatedNormalize(50),
    backgroundColor: "#fff",
    ...elevate(2),
  },
};
