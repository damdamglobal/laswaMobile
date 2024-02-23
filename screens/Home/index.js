import React, { useState, useEffect, useContext } from "react";
import { FlatList, Dimensions, ScrollView } from "react-native";
import { Text, View, Avatar, Incubator } from "react-native-ui-lib";
import axios from "axios";
import { GetUserBoat, GetUserOperators, GetAuthUserTrips } from "../../APIs";
import Sos from "../../components/Sos";
import UserAvatar from "./UserAvatar";
import BoatCard from "./BoatCard";
import EmptyCard from "./EmptyCard";
import DashboardData from "./DashboardData";
import ActiveOperators from "./ActiveOperators";
import ActiveVessel from "./ActiveVessel";
import TodayTrip from "./TodayTrip";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width, height } = Dimensions.get("window");
const { Toast } = Incubator;

import { GeneralDatContext } from "../../context/index";

export default function HomeFun(props) {
  const [token, setToken] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [serverMessage, setServerMessage] = React.useState("");
  const [currentPage, setCurrentPage] = useState(null);
  const [totalPage, setTotalPage] = useState(null);
  const [User, setUser] = useState({});
  const [totalOperatorPage, setTotalOperatorPage] = useState(0);
  const [totalBoatPage, setTotalBoatPage] = useState(0);
  const [totalTripPage, setTotalTripPage] = useState(0);

  const [toastVisible, setToastVisible] = useState(false);
  const [toastColor, setToastColor] = useState("red");

  const { trip, setTrip, boat, setBoat, operators, setOperators } =
    useContext(GeneralDatContext);

  useEffect(() => {
    async function fetchStoresData() {
      let loginToken = await AsyncStorage.getItem("token");
      setToken(JSON.parse(loginToken));
      getUserBoat(JSON.parse(loginToken));
      getUserOperators(JSON.parse(loginToken));
      getAuthUserTrips(JSON.parse(loginToken));

      let value = await AsyncStorage.getItem("user");
      setUser(JSON.parse(value));

      setToastVisible(true);
      setToastColor("green");
      setServerMessage(
        `Welcome back ${JSON.parse(value).firstName} ${
          JSON.parse(value).lastName
        }`
      );

      let businessProfile = JSON.parse(value);
      if (businessProfile.profileType == "vesselOwner") {
        if (!businessProfile.BusinessProfile) {
          props.navigation.replace("BusinessProfile");
        } else if (!businessProfile.BusinessProfile.verify) {
          props.navigation.replace("BusinessDoc");
        }
      }
    }

    fetchStoresData();
  }, []);

  const getUserBoat = async (payload) => {
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
        setTotalBoatPage(res.data.count);
        setBoat(res.data.Boat);
      })
      .catch((err) => {
        setServerMessage(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
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
        setTotalOperatorPage(res.data.count);
        setOperators(res.data.operators);
      })
      .catch((err) => {
        setServerMessage(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getAuthUserTrips = async (payload) => {
    setLoading(true);
    axios
      .get(`${GetAuthUserTrips}`, {
        headers: { Authorization: "Bearer " + payload },
      })
      .then((res) => {
        setTotalTripPage(res.data.count);
        setTrip(res.data.Trips);
      })
      .catch((err) => {
        setServerMessage(err.response.data.message);
        console.log(err.response);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  function getFirstFiveItems(arr) {
    return arr.slice(0, 3);
  }

  return (
    <View padding-20 background-whiteColor flex>
      <View row centerV>
        <View flex left>
          <UserAvatar />
        </View>
        <View flex right>
          <Sos />
        </View>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View paddingB-50>
          <DashboardData
            props={props}
            totalBoatPage={totalBoatPage}
            totalOperatorPage={totalOperatorPage}
            totalTripPage={totalTripPage}
          />
          <ActiveOperators props={props} operators={operators} />
          <ActiveVessel props={props} boat={boat} User={User} />
          <TodayTrip
            props={props}
            totalTripPage={totalTripPage}
            trips={getFirstFiveItems(trip)}
          />
        </View>
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
}
