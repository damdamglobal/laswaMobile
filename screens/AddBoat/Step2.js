import React, { useState, useEffect, useContext } from "react";
import { TextInput, Dimensions, TouchableOpacity } from "react-native";
import { Text, View, Incubator } from "react-native-ui-lib";
import { actuatedNormalize } from "../../components/FontResponsive";
import Expandable from "./Expandable";
import CheckBoxCard from "./CheckBoxCard";
import YesNoCard from "./YesNoCard";
const { width, height } = Dimensions.get("window");

const Step2 = (props) => {
  return (
    <>
      <Text center subhead marginT-20>
        Safety Equipment required Onboard
      </Text>
      <Text smallF gray FontAven center>
        step 2
      </Text>
      <YesNoCard label="Standard Life Jacket for boat capacity" />
      <YesNoCard label="First aid kit" />
      <YesNoCard label="DCP Fire Extinguisher" />
      <YesNoCard label="Life Bouy" />
      <YesNoCard label="4pcs of F1 or/to F4 Fenders" />
      <YesNoCard label="VHF/Telephone" />
      <YesNoCard label="GPS Compass" />
      <YesNoCard label="Sand bucket" />
      <YesNoCard label="Paddle" />
      <YesNoCard label="Horn" />
      <YesNoCard label="Search light" />
      <YesNoCard label="Navigation light" />
      <TouchableOpacity
        onPress={() => {
          props.setStep(3);
        }}
      >
        <View style={styles.btn} center marginT-40 background-primaryColor>
          <Text whiteColor>Next</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          props.setStep(1);
        }}
      >
        <View style={styles.btn} center marginT-10>
          <Text>Back</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default Step2;

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
  img: {
    height: height / 4,
    width: width / 1.2,
    marginHorizontal: actuatedNormalize(5),
    backgroundColor: "#0A519B",
    marginTop: actuatedNormalize(20),
  },
};
