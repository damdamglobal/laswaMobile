import React, { useState, useEffect, useContext } from "react";
import {
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  StyleSheet,
} from "react-native";
import { actuatedNormalize } from "../../components/FontResponsive";
import { View, Text, Colors, Badge } from "react-native-ui-lib";
import { elevate } from "react-native-elevate";
import { OnboardingScreenContext } from "../../context/index";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

export default function Onboarding(props) {
  const [onboard, setOnboard] = useContext(OnboardingScreenContext);

  const getStarted = (payload) => {
    if (payload) {
      props.navigation.push(payload);
    } else {
      setOnboard(false);
    }
  };

  return (
    <View flex background-whiteColor>
      <ImageBackground
        source={require("../../assets/laswaBg.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <LinearGradient
          // Background Linear Gradient
          colors={["transparent", "rgba(0,0,0,0.9)"]}
          style={styles.background}
        >
          <View flex bottom centerH paddingB-40>
            <Text heading whiteColor>
              Lagos State
            </Text>
            <Text heading whiteColor>
              Waterways Authority{" "}
            </Text>
            <Text whiteColor FontAven>
              To transform Lagos into a model city with world class inland
            </Text>
            <Text whiteColor FontAven>
              waterways infrastructure and services.
            </Text>
            <TouchableOpacity
              onPress={() => {
                getStarted("GetStarted");
              }}
            >
              <View style={styles.btn} background-whiteColor center marginT-40>
                <Text FontAven>Get Started</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                getStarted();
              }}
            >
              <View style={styles.btnOutline} center marginT-20>
                <Text whiteColor FontAven>
                  Login
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = {
  btn: {
    width: width - actuatedNormalize(50),
    padding: actuatedNormalize(20),
    borderRadius: actuatedNormalize(10),
    ...elevate(4),
  },
  btnOutline: {
    width: width - actuatedNormalize(50),
    padding: actuatedNormalize(20),
    borderRadius: actuatedNormalize(10),
    borderWidth: actuatedNormalize(1),
    borderColor: "white",
    ...elevate(4),
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(39, 41, 43, 0.5)",
    // background: linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #080808 85.42%, #0A0A0A 100%);
  },
  background: {
    flex: 1,
  },
};
