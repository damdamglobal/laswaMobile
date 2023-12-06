import React, { useState, useEffect } from "react";
import {
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import UploadVesselDoc from "./UploadVesselDoc";
import UploadVesselImages from "./UploadVesselImages";
import { Text, View, Incubator } from "react-native-ui-lib";
import { AddBoat, GetUserBoat } from "../../APIs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import SOS from "../../components/Sos";
import { AntDesign } from "@expo/vector-icons";
import { actuatedNormalize } from "../../components/FontResponsive";
const { Toast } = Incubator;

const VesselDetail = (props) => {
  const [step, setStep] = React.useState(2);
  const [serverMessage, setServerMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [toastColor, setToastColor] = useState("red");

  useEffect(() => {
    async function fetchStoresData() {
      //console.log(props.route.params.item);
    }

    fetchStoresData();
  }, []);

  let item = props.route.params.item;

  return (
    <View flex center background-whiteColor paddingH-20>
      <View row centerV>
        <View flex>
          <TouchableOpacity onPress={() => props.navigation.pop()}>
            <AntDesign
              color="#181818"
              size={actuatedNormalize(20)}
              name="left"
            />
          </TouchableOpacity>
        </View>
        <View flex-2 center>
          <Text subheading numberOfLines={1}>
            {item.boatName}
          </Text>
        </View>
        <View right flex>
          <SOS />
        </View>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {step == 1 ? (
          <UploadVesselImages
            step={step}
            item={item}
            setStep={setStep}
            props={props}
            setServerMessage={setServerMessage}
            setToastVisible={setToastVisible}
            setToastColor={setToastColor}
          />
        ) : null}
        {step == 2 ? (
          <UploadVesselDoc
            step={step}
            item={item}
            setStep={setStep}
            props={props}
            setServerMessage={setServerMessage}
            setToastVisible={setToastVisible}
            setToastColor={setToastColor}
          />
        ) : null}
      </ScrollView>
      <Toast
        visible={toastVisible}
        position={"top"}
        autoDismiss={5000}
        message={serverMessage}
        swipeable={true}
        onDismiss={() => setToastVisible(false)}
        backgroundColor={toastColor}
        messageStyle={{
          color: "white",
        }}
      ></Toast>
    </View>
  );
};

export default VesselDetail;
