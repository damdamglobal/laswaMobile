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
        Extra Documents
      </Text>
      <TouchableOpacity
        onPress={() => {
          props.setStep(1);
        }}
      >
        <View style={styles.btn} center>
          <Text underLine FontAven>
            Vessel Images
          </Text>
        </View>
      </TouchableOpacity>

      <UploadCard
        docTypeValue="doc"
        docType="Evidence of Insurance of the Vessels"
        item={props.item}
        img={props.item.doc}
        index={1}
        setServerMessage={props.setServerMessage}
        setToastVisible={props.setToastVisible}
        setToastColor={props.setToastColor}
      />
      <UploadCard
        item={props.item}
        docTypeValue="doc"
        docType="Payment Receipt (₦25,000)"
        index={2}
        img={props.item.doc}
        setServerMessage={props.setServerMessage}
        setToastVisible={props.setToastVisible}
        setToastColor={props.setToastColor}
      />
      <UploadCard
        item={props.item}
        docTypeValue="doc"
        docType="Proof of Annual Registration of Waterways Operations"
        index={3}
        img={props.item.doc}
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
