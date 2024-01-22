import React, { useEffect } from "react";
import { Dimensions } from "react-native";
import { Text, View, Colors } from "react-native-ui-lib";
import { FontAwesome5 } from "@expo/vector-icons";
import { actuatedNormalize } from "../../components/FontResponsive";
import { elevate } from "react-native-elevate";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

export default function UserAvatar() {
  const [user, setUser] = React.useState("");

  useEffect(() => {
    async function fetchToken() {
      let value = await AsyncStorage.getItem("user");
      setUser(JSON.parse(value));
    }
    fetchToken();
  }, []);

  function getGreeting() {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    let greeting;

    if (currentHour >= 5 && currentHour < 12) {
      greeting = "Good morning";
    } else if (currentHour >= 12 && currentHour < 18) {
      greeting = "Good afternoon";
    } else {
      greeting = "Good evening";
    }

    return greeting;
  }
  return (
    <View row centerV>
      <View marginH-10>
        <Text smallF FontAven>
          {getGreeting()}
        </Text>
        <Text subheading marginT-5>
          {user.firstName} {user.lastName}{" "}
        </Text>
      </View>
    </View>
  );
}

const styles = {
  sos: {
    height: actuatedNormalize(50),
    width: actuatedNormalize(50),
    borderRadius: actuatedNormalize(50),
    backgroundColor: Colors.whiteColor,
    ...elevate(2),
  },
};
