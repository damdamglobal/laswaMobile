import React, { useState, useEffect, useContext } from "react";
import { TextInput, Dimensions, TouchableOpacity } from "react-native";
import { Text, View, Incubator } from "react-native-ui-lib";
import { actuatedNormalize } from "../../components/FontResponsive";
const { width, height } = Dimensions.get("window");
import UploadCard from "./UploadCard";

const Step3 = (props) => {
  return (
    <>
      <Text center subhead marginT-20>
        Images of your Boat
      </Text>
      <Text smallF gray FontAven center>
        step 4
      </Text>
      <UploadCard docType="Upload Images of the Boat (Orientation; Front)" />
      <UploadCard docType="Upload Images of the Boat (Orientation; Left)" />
      <UploadCard docType="Upload Images of the Boat (Orientation; Interior)" />
      <TouchableOpacity
        onPress={() => {
          props.setStep(4);
        }}
      >
        <View style={styles.btn} center marginT-40 background-primaryColor>
          <Text whiteColor>Next</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          props.setStep(3);
        }}
      >
        <View style={styles.btn} center marginT-10>
          <Text>Back</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default Step3;

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
