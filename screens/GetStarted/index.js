import React, { useState, useContext, useEffect } from "react";
import { Dimensions, Image, TouchableOpacity } from "react-native";
import { actuatedNormalize } from "../../components/FontResponsive";
import { View, Text, Colors, Badge, Incubator } from "react-native-ui-lib";
import { elevate } from "react-native-elevate";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function LoginScreen(props) {
  const getStarted = (payload) => {
    props.navigation.push("Signup", { profileType: payload });
  };

  return (
    <View flex background-whiteColor center>
      <View center style={styles.sos}>
        <Image
          source={require("../../assets/splashq.png")}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </View>
      <View centerH paddingB-40>
        <Text marginT-10 headingT>
          Welcome to Laswa Client
        </Text>
        <Text FontAven marginT-10>
          Hello, please tell us who you are.{" "}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          getStarted("Individual");
        }}
      >
        <View row style={styles.btn} background-primaryColor centerV marginT-40>
          <View style={styles.iconBox} center>
            <Ionicons
              color="#0A519B"
              size={actuatedNormalize(20)}
              name="boat"
            />
          </View>

          <Text FontAven whiteColor>
            I am an Individual
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          getStarted("Company");
        }}
      >
        <View style={styles.btn} row background-primaryColor centerV marginT-20>
          <View style={styles.iconBox} center>
            <Ionicons
              color="#0A519B"
              size={actuatedNormalize(20)}
              name="boat"
            />
          </View>
          <Text FontAven whiteColor>
            I have a Company
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  btn: {
    width: width - actuatedNormalize(150),
    padding: actuatedNormalize(10),
    borderRadius: actuatedNormalize(10),
  },
  iconBox: {
    height: actuatedNormalize(40),
    width: actuatedNormalize(40),
    backgroundColor: "#fff",
    marginRight: actuatedNormalize(15),
    borderRadius: actuatedNormalize(5),
  },
  sos: {
    height: width / 5,
    width: width / 5,
    borderRadius: actuatedNormalize(100),
    backgroundColor: Colors.whiteColor,
    overflow: "hidden",
    ...elevate(2),
  },
};
