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
const { width, height } = Dimensions.get("window");

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
  let noShow = props.route.params.noShow;

  return (
    <View
      flex
      center
      background-whiteColor
      paddingH-20
      style={{ position: "relative" }}
    >
      <View row centerV>
        <View flex>
          {!noShow ? (
            <TouchableOpacity onPress={() => props.navigation.pop()}>
              <AntDesign
                color="#181818"
                size={actuatedNormalize(20)}
                name="left"
              />
            </TouchableOpacity>
          ) : null}
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

      <View center row style={styles.tab} background-whiteColorF marginT-20>
        <TouchableOpacity onPress={() => setStep(1)}>
          <View
            style={[
              styles.tabBtn,
              { backgroundColor: step == 1 ? "#0A519B" : "#fff" },
            ]}
            marginH-10
            center
          >
            <Text
              subheader
              FontAven
              numberOfLines={1}
              style={{ color: step == 1 ? "#fff" : "#181818" }}
            >
              Vessel Image
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setStep(2)}>
          <View
            style={[
              styles.tabBtn,
              { backgroundColor: step == 2 ? "#0A519B" : "#fff" },
            ]}
            marginH-10
            center
          >
            <Text
              subheader
              FontAven
              numberOfLines={1}
              style={{ color: step == 2 ? "#fff" : "#181818" }}
            >
              Vessel Doc
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {step == 1 ? (
          <UploadVesselImages
            item={item}
            props={props}
            setServerMessage={setServerMessage}
            setToastVisible={setToastVisible}
            setToastColor={setToastColor}
          />
        ) : null}
        {step == 2 ? (
          <UploadVesselDoc
            item={item}
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
      <TouchableOpacity
        onPress={() => {
          if (!noShow) {
            props.navigation.pop();
          } else {
            props.navigation.navigate("HomeScreen");
          }
        }}
        style={{
          position: "absolute",
          bottom: actuatedNormalize(10),
          left: actuatedNormalize(25),
        }}
      >
        <View style={styles.btn} background-primaryColor center marginT-40>
          <Text whiteColor FontAven>
            Done
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default VesselDetail;

const styles = {
  btn: {
    width: width - actuatedNormalize(50),
    padding: actuatedNormalize(20),
    borderRadius: actuatedNormalize(10),
  },
  tab: {
    height: actuatedNormalize(70),
    borderRadius: actuatedNormalize(10),
  },
  tabBtn: {
    height: actuatedNormalize(50),
    width: width / 2.5,
    borderRadius: actuatedNormalize(10),
  },
};
