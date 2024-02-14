import React, { useState, useContext, useEffect } from "react";
import {
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  Modal,
  Image,
  KeyboardAvoidingView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
import { actuatedNormalize } from "../../components/FontResponsive";
import { View, Text, Incubator, Badge, Colors } from "react-native-ui-lib";
import SOS from "../../components/Sos";
import AllVessel from "./AllVessel";
import SuspendedVessel from "./SuspendedVessel";
import UnapprovedVessel from "./UnapprovedVessel";
const { width, height } = Dimensions.get("window");
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GetUserBoat } from "../../APIs";
import axios from "axios";
const { TextField, Toast } = Incubator;
import { GeneralDatContext } from "../../context/index";

export default function OperatorScreen(props) {
  const [tab, setTab] = useState(1);
  const [token, setToken] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [serverMessage, setServerMessage] = React.useState("");
  const [toastColor, setToastColor] = useState("red");
  const [toastVisible, setToastVisible] = useState(false);
  const [allOperators, setAllOperators] = useState([]);
  const [susOperators, setSusAllOperators] = useState([]);
  const [UnOperators, setUnAllOperators] = useState([]);

  const { boat, setBoat } = useContext(GeneralDatContext);

  useEffect(() => {
    async function fetchStoresData() {
      let loginToken = await AsyncStorage.getItem("token");
      setToken(JSON.parse(loginToken));
      getUserBoats(JSON.parse(loginToken));
      getUnBoats(JSON.parse(loginToken));
      getSusBoats(JSON.parse(loginToken));
    }

    fetchStoresData();
  }, []);

  const getUserBoats = async (payload) => {
    setLoading(true);
    axios
      .put(
        `${GetUserBoat}`,
        {
          status: "all",
        },
        {
          headers: { Authorization: "Bearer " + payload },
        }
      )
      .then((res) => {
        setBoat(res.data.Boat);
      })
      .catch((err) => {
        setServerMessage(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const getUnBoats = async (payload) => {
    setLoading(true);
    axios
      .put(
        `${GetUserBoat}`,
        {
          status: "unapproved",
        },
        {
          headers: { Authorization: "Bearer " + payload },
        }
      )
      .then((res) => {
        setUnAllOperators(res.data.Boat);
      })
      .catch((err) => {
        setServerMessage(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const getSusBoats = async (payload) => {
    setLoading(true);
    axios
      .put(
        `${GetUserBoat}`,
        {
          status: "suspended",
        },
        {
          headers: { Authorization: "Bearer " + payload },
        }
      )
      .then((res) => {
        setSusAllOperators(res.data.Boat);
      })
      .catch((err) => {
        setServerMessage(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <View
      flex
      background-whiteColor
      paddingH-20
      style={{ position: "relative" }}
    >
      <View row centerV>
        <View flex></View>
        <View flex-2 center>
          <Text subheading numberOfLines={1}>
            My Vessel
          </Text>
        </View>
        <View right flex>
          <SOS />
        </View>
      </View>
      <View center row style={styles.tab} background-whiteColorF marginT-20>
        <TouchableOpacity onPress={() => setTab(1)}>
          <View
            style={[
              styles.tabBtn,
              { backgroundColor: tab == 1 ? "#0A519B" : "#fff" },
            ]}
            marginH-10
            center
          >
            <Text
              subheader
              FontAven
              numberOfLines={1}
              style={{ color: tab == 1 ? "#fff" : "#181818" }}
            >
              All
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTab(2)}>
          <View
            style={[
              styles.tabBtn,
              { backgroundColor: tab == 2 ? "#0A519B" : "#fff" },
            ]}
            marginH-10
            center
          >
            <Text
              subheader
              FontAven
              numberOfLines={1}
              style={{ color: tab == 2 ? "#fff" : "#181818" }}
            >
              Suspended
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTab(3)}>
          <View
            style={[
              styles.tabBtn,
              { backgroundColor: tab == 3 ? "#0A519B" : "#fff" },
            ]}
            marginH-10
            center
          >
            <Text
              style={{ color: tab == 3 ? "#fff" : "#181818" }}
              subheader
              FontAven
              numberOfLines={1}
            >
              Unapproved
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View flex paddingB-150 center>
        {tab == 1 ? <AllVessel Vessel={boat} props={props} /> : null}
        {tab == 2 ? (
          <SuspendedVessel Vessel={susOperators} props={props} />
        ) : null}
        {tab == 3 ? (
          <UnapprovedVessel Vessel={UnOperators} props={props} />
        ) : null}
      </View>
      <View style={styles.btnCard} center>
        {tab == 1 ? (
          <TouchableOpacity
            onPress={() => {
              props.navigation.push("AddFleet");
            }}
          >
            <View style={styles.btn} background-primaryColor center marginT-40>
              <Text whiteColor FontAven>
                Add Vessel
              </Text>
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
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
  tab: {
    height: actuatedNormalize(70),
    borderRadius: actuatedNormalize(10),
  },
  tabBtn: {
    height: actuatedNormalize(50),
    width: width / 4,
    borderRadius: actuatedNormalize(10),
  },
  btn: {
    width: width - actuatedNormalize(50),
    padding: actuatedNormalize(20),
    borderRadius: actuatedNormalize(10),
  },
  btnCard: {
    position: "absolute",
    bottom: actuatedNormalize(80),
    width: width,
  },
};
