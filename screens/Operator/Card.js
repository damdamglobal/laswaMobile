import React, { useEffect, useState } from "react";
import { Dimensions, Image, TouchableOpacity } from "react-native";
import { Text, View, Colors } from "react-native-ui-lib";
import { actuatedNormalize } from "../../components/FontResponsive";
import { elevate } from "react-native-elevate";
import { Entypo, MaterialIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function BoatCard(props) {
  const [navigation, setNavigation] = useState(props.props);

  let item = props.item;

  return (
    <View style={styles.card}>
      <View flex row centerV>
        <View flex>
          <View style={styles.sos} center marginL-10>
            {item.imgUrl ? (
              <Image
                source={{ uri: item.imgUrl }}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            ) : (
              <Entypo
                color="#181818"
                size={actuatedNormalize(60)}
                name="user"
              />
            )}
          </View>
        </View>
        <View flex-2 marginH-5>
          <Text subheader>
            {item.firstName} {item.lastName}
          </Text>
          <Text gray FontAven marginT-5>
            User Name: {item.userName}
          </Text>
        </View>
        <View flex capital>
          <Text FontAven>{item.userType}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = {
  card: {
    marginTop: actuatedNormalize(10),
    height: actuatedNormalize(100),
    width: width - actuatedNormalize(50),
    overflow: "hidden",
    backgroundColor: "white",
    borderWidth: actuatedNormalize(0.5),
    borderColor: "gray",
    borderRadius: actuatedNormalize(5),
    ...elevate(2),
  },
  btn: {
    width: width - actuatedNormalize(100),
    padding: actuatedNormalize(20),
    borderRadius: actuatedNormalize(10),
    ...elevate(4),
  },
  sos: {
    height: actuatedNormalize(70),
    width: actuatedNormalize(70),
    borderRadius: actuatedNormalize(10),
    overflow: "hidden",
    ...elevate(2),
  },
};
