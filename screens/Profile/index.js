import React, { useState, useContext, useEffect } from "react";

import {
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { Text, View, Colors, Button, Icon } from "react-native-ui-lib";
import { actuatedNormalize } from "../../components/FontResponsive";
import { elevate } from "react-native-elevate";
import {
  AntDesign,
  MaterialIcons,
  FontAwesome5,
  SimpleLineIcons,
  Entypo,
} from "@expo/vector-icons";
import {
  AuthContext,
  SplashscreenContext,
  MainScreenContext,
} from "../../context/index";
import SOS from "../../components/Sos";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

export default function AddFleet(props) {
  const [auth, setAuth] = useContext(AuthContext);
  const [user, setUser] = React.useState("");

  useEffect(() => {
    async function fetchToken() {
      let value = await AsyncStorage.getItem("user");
      console.log(value);
      setUser(JSON.parse(value));
    }
    fetchToken();
  }, []);

  return (
    <View flex paddingH-20 background-whiteColor>
      <View row centerV>
        <View flex></View>
        <View flex center>
          <Text subheading>Profile</Text>
        </View>
        <View right flex>
          <SOS />
        </View>
      </View>
      <View center marginT-20>
        <View center style={styles.sos}>
          <FontAwesome5
            color="#181818"
            size={actuatedNormalize(30)}
            name="user-alt"
          />
        </View>
        <Text marginT-20>
          {user.firstName} {user.lastName}
        </Text>
        <Text smallF marginT-5>
          {user.email}
        </Text>
      </View>
      <View style={styles.card}>
        <View row centerV>
          <View center style={styles.icon}>
            <FontAwesome5
              color="#181818"
              size={actuatedNormalize(15)}
              name="user-alt"
            />
          </View>
          <Text marginH-20 subhead>
            Edit Profile
          </Text>
        </View>
        <View row centerV marginT-20>
          <View center style={styles.icon}>
            <SimpleLineIcons
              color="#181818"
              size={actuatedNormalize(20)}
              name="settings"
            />
          </View>
          <Text marginH-20 subhead>
            Settings
          </Text>
        </View>
        <View row centerV marginT-20>
          <View center style={styles.icon}>
            <AntDesign
              color="#181818"
              size={actuatedNormalize(15)}
              name="delete"
            />
          </View>
          <Text marginH-20 subhead>
            Delete Account
          </Text>
        </View>
        <View row centerV marginT-20>
          <View center style={styles.icon}>
            <MaterialIcons
              color="#181818"
              size={actuatedNormalize(15)}
              name="apartment"
            />
          </View>
          <Text marginH-20 subhead>
            About LASWA
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            setAuth(true);
          }}
        >
          <View row centerV marginT-20>
            <View center style={styles.icon}>
              <Entypo
                color="#181818"
                size={actuatedNormalize(15)}
                name="log-out"
              />
            </View>
            <Text marginH-20 subhead>
              Log out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = {
  TextInput: {
    height: 50,
    marginTop: actuatedNormalize(5),
    width: width - actuatedNormalize(50),
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: actuatedNormalize(5),
    padding: actuatedNormalize(10),
  },
  btn: {
    width: width - actuatedNormalize(50),
    padding: actuatedNormalize(20),
    borderRadius: actuatedNormalize(10),
  },

  sos: {
    height: actuatedNormalize(70),
    width: actuatedNormalize(70),
    borderRadius: actuatedNormalize(50),
    backgroundColor: Colors.whiteColor,
    ...elevate(2),
  },
  card: {
    height: height / 2,
    backgroundColor: "white",
    marginTop: actuatedNormalize(50),
    padding: actuatedNormalize(20),
    borderRadius: actuatedNormalize(10),
    ...elevate(1),
  },
  icon: {
    height: actuatedNormalize(40),
    width: actuatedNormalize(40),
    borderRadius: actuatedNormalize(5),
    backgroundColor: "#F6F6FF",
  },
};
