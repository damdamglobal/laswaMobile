import React, { useState, useEffect } from "react";
import {
  Dimensions,
  FlatList,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import { Text, View, Colors, Button } from "react-native-ui-lib";
import { actuatedNormalize } from "../../components/FontResponsive";
import { elevate } from "react-native-elevate";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import SOS from "../../components/Sos";
import TripHistory from "../../components/TripHistory";
import EmptyCard from "../../components/EmptyTrip";
const { width, height } = Dimensions.get("window");
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { GetAuthUserTrips } from "../../APIs";

export default function TripHistories(props) {
  const [token, setToken] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [serverMessage, setServerMessage] = React.useState("");
  const [trips, setTrips] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);
  const [totalPage, setTotalPage] = useState(null);

  useEffect(() => {
    async function fetchStoresData() {
      let loginToken = await AsyncStorage.getItem("token");
      setToken(JSON.parse(loginToken));
      getAuthUserTrips(JSON.parse(loginToken, "reload"));
    }

    fetchStoresData();
  }, []);

  const getAuthUserTrips = async (payload, reload) => {
    let page;
    if (reload) {
      page = 1;
    } else {
      page = currentPage + 1;
    }
    setLoading(true);
    axios
      .get(`${GetAuthUserTrips}?page=${page}`, {
        headers: { Authorization: "Bearer " + payload },
      })
      .then((res) => {
        setCurrentPage(page);
        setTotalPage(res.data.count);
        if (reload) {
          setTrips(res.data.Trips);
        } else {
          setTrips((initDate) => [...initDate, ...res.data.Trips]);
        }
      })
      .catch((err) => {
        setServerMessage(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View flex paddingH-20 background-whiteColor>
      <View row centerV>
        <View flex></View>
        <View flex center>
          <Text subheading>Trips History</Text>
        </View>
        <View right flex>
          <SOS />
        </View>
      </View>

      <FlatList
        onRefresh={() => getAuthUserTrips(token, "reload")}
        refreshing={loading}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        // snapToInterval={width - actuatedNormalize(100)}
        data={trips}
        renderItem={({ item }) => <TripHistory props={props} item={item} />}
        ListEmptyComponent={() => <EmptyCard />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
