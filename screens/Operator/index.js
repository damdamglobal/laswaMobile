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
import AllOperator from "./AllOperator";
import SuspendedOperator from "./SuspendedOperator";
import UnapprovedOperator from "./UnapprovedOperator";
const { width, height } = Dimensions.get("window");
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GetUserOperators } from "../../APIs";
import axios from "axios";

export default function OperatorScreen(props) {
  const [tab, setTab] = useState(1);
  const [token, setToken] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [serverMessage, setServerMessage] = React.useState("");
  const [allOperators, setAllOperators] = useState([]);
  const [susOperators, setSusAllOperators] = useState([]);
  const [UnOperators, setUnAllOperators] = useState([]);

  useEffect(() => {
    async function fetchStoresData() {
      let loginToken = await AsyncStorage.getItem("token");
      setToken(JSON.parse(loginToken));
      getUserOperators(JSON.parse(loginToken));
      getUnOperators(JSON.parse(loginToken));
      getSusOperators(JSON.parse(loginToken));
    }

    fetchStoresData();
  }, []);

  const getUserOperators = async (payload) => {
    setLoading(true);
    axios
      .put(
        `${GetUserOperators}`,
        {
          status: "all",
        },
        {
          headers: { Authorization: "Bearer " + payload },
        }
      )
      .then((res) => {
        setAllOperators(res.data.operators);
      })
      .catch((err) => {
        setServerMessage(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const getUnOperators = async (payload) => {
    setLoading(true);
    axios
      .put(
        `${GetUserOperators}`,
        {
          status: "unapproved",
        },
        {
          headers: { Authorization: "Bearer " + payload },
        }
      )
      .then((res) => {
        setUnAllOperators(res.data.operators);
      })
      .catch((err) => {
        setServerMessage(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const getSusOperators = async (payload) => {
    setLoading(true);
    axios
      .put(
        `${GetUserOperators}`,
        {
          status: "suspended",
        },
        {
          headers: { Authorization: "Bearer " + payload },
        }
      )
      .then((res) => {
        setSusAllOperators(res.data.operators);
      })
      .catch((err) => {
        setServerMessage(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <View flex background-whiteColor paddingH-20>
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
            Operators
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
      {tab == 1 ? <AllOperator operators={allOperators} props={props} /> : null}
      {tab == 2 ? (
        <SuspendedOperator operators={susOperators} props={props} />
      ) : null}
      {tab == 3 ? (
        <UnapprovedOperator operators={UnOperators} props={props} />
      ) : null}

      <View style={styles.btnCard} center flex>
        {loading ? (
          <TouchableOpacity>
            <View style={styles.btn} background-primaryColor center marginT-40>
              <ActivityIndicator size="small" color="#fff" />
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              props.navigation.push("AddOperator");
            }}
          >
            <View style={styles.btn} background-primaryColor center marginT-40>
              <Text whiteColor FontAven>
                Add Operator
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
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
  btnCard: {
    position: "absolute",
    bottom: actuatedNormalize(70),
    width: width,
  },
  btn: {
    width: width - actuatedNormalize(50),
    padding: actuatedNormalize(20),
    borderRadius: actuatedNormalize(10),
  },
};
