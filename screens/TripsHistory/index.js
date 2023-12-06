import React, { useState, useEffect, useContext } from "react";
import { Dimensions, FlatList, ScrollView } from "react-native";
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
import { TripsScreenContext } from "../../context/index";

export default function TripHistories(props) {
  const [token, setToken] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [serverMessage, setServerMessage] = React.useState("");
  const [trips, setTrips] = useContext(TripsScreenContext);
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
    setLoading(true);
    axios
      .get(`${GetAuthUserTrips}`, {
        headers: { Authorization: "Bearer " + payload },
      })
      .then((res) => {
        // setCurrentPage(page);
        setTotalPage(res.data.count);
        setTrips(res.data.Trips);
      })
      .catch((err) => {
        setServerMessage(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const TripCard = (item, index) => {
    return (
      <TripHistory
        props={props}
        item={item}
        getAuthUserTrips={getAuthUserTrips}
      />
    );
  };

  const keyExtractor = (item, index) => item._id + index;

  return (
    <View flex paddingH-20 background-whiteColor center>
      <View row centerV>
        <View flex></View>
        <View flex-2 center>
          <Text subheading numberOfLines={1}>
            Trips History
          </Text>
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
        data={trips}
        renderItem={({ item, index }) => TripCard(item, index)}
        ListEmptyComponent={() => <EmptyCard />}
        keyExtractor={keyExtractor}
      />
    </View>
  );
}
