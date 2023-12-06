import React, { useState, useEffect, useContext } from "react";
import { TextInput, Dimensions, TouchableOpacity } from "react-native";
import { Text, View, Incubator } from "react-native-ui-lib";
import { actuatedNormalize } from "../../components/FontResponsive";
const { width, height } = Dimensions.get("window");
import UploadCard from "./UploadCard";

const Step3 = (props) => {
  return (
    <>
      <Text center marginT-5>
        Images of your Boat
      </Text>
      <TouchableOpacity
        onPress={() => {
          props.setStep(2);
        }}
      >
        <View style={styles.btn} center>
          <Text underLine FontAven>
            Vessel Documents
          </Text>
        </View>
      </TouchableOpacity>
      <UploadCard
        docTypeValue="image"
        docType="Upload Images of the Boat (Orientation; Front)"
        item={props.item}
        index={1}
        img={props.item.imgUrl}
        setServerMessage={props.setServerMessage}
        setToastVisible={props.setToastVisible}
        setToastColor={props.setToastColor}
      />
      <UploadCard
        docTypeValue="image"
        docType="Upload Images of the Boat (Orientation; Left)"
        item={props.item}
        index={2}
        img={props.item.imgUrl}
        setServerMessage={props.setServerMessage}
        setToastVisible={props.setToastVisible}
        setToastColor={props.setToastColor}
      />
      <UploadCard
        docTypeValue="image"
        docType="Upload Images of the Boat (Orientation; Interior)"
        item={props.item}
        index={3}
        img={props.item.imgUrl}
        setServerMessage={props.setServerMessage}
        setToastVisible={props.setToastVisible}
        setToastColor={props.setToastColor}
      />
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
