import React, { useState, useEffect, useContext } from "react";
import {
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { Text, View, Incubator } from "react-native-ui-lib";
import { actuatedNormalize } from "../../components/FontResponsive";
import SOS from "../../components/Sos";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { AddBoat, GetUserBoat } from "../../APIs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BoatScreenContext } from "../../context/index";
import Step1 from "./Step1";

const { Toast } = Incubator;

const { width, height } = Dimensions.get("window");

export default function AddFleet(props) {
  const [regNumber, setRegNumber] = useState("");
  const [model, setModel] = useState("");
  const [capacity, setCapacity] = useState("");
  const [serverMessage, setServerMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [toastColor, setToastColor] = useState("red");
  const [token, setToken] = React.useState("");
  const [img, setImage] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [boat, setBoats] = useContext(BoatScreenContext);

  useEffect(() => {
    async function fetchStoresData() {
      let loginToken = await AsyncStorage.getItem("token");
      setToken(JSON.parse(loginToken));
    }

    fetchStoresData();
  }, []);

  const getUserBoat = async (payload) => {
    setLoading(true);
    axios
      .get(`${GetUserBoat}`, {
        headers: { Authorization: "Bearer " + payload },
      })
      .then((res) => {
        props.navigation.navigate("Home");
        setBoats(res.data.Boat);
      })
      .catch((err) => {
        setServerMessage(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View flex paddingH-20 background-whiteColor centerH>
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
        <View flex center>
          <Text subheading>Add Vessel</Text>
        </View>
        <View right flex>
          <SOS />
        </View>
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        enabled
      >
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {step == 1 || step == 2 ? (
            <Step1
              step={step}
              setStep={setStep}
              props={props}
              setServerMessage={setServerMessage}
              setToastVisible={setToastVisible}
              setToastColor={setToastColor}
            />
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>
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
  img: {
    height: height / 4,
    width: width / 1.2,
    marginHorizontal: actuatedNormalize(5),
    backgroundColor: "#0A519B",
    marginTop: actuatedNormalize(20),
  },
};
