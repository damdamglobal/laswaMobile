import React, { useEffect, useState, useContext } from "react";
import { Dimensions, FlatList, TouchableOpacity } from "react-native";
import { Text, View, Colors } from "react-native-ui-lib";
import { actuatedNormalize } from "../../components/FontResponsive";
import { elevate } from "react-native-elevate";
import TripCard from "../../components/TripHistory";
import EmptyTripCard from "./EmptyTripCard";
const { width, height } = Dimensions.get("window");
import { GetAuthUserTrips } from "../../APIs";
import { TripsScreenContext } from "../../context/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function TripCardFun(props) {
  const [navigation, setNavigation] = useState(props.props);
  const [token, setToken] = React.useState("");
  const [trips, setTrips] = useContext(TripsScreenContext);

  useEffect(() => {
    async function fetchStoresData() {
      let loginToken = await AsyncStorage.getItem("token");
      setToken(JSON.parse(loginToken));
    }

    fetchStoresData();
  }, []);

  const getAuthUserTrips = async () => {
    axios
      .get(`${GetAuthUserTrips}`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        // setCurrentPage(page);
        //setTotalPage(res.data.count);
        setTrips(res.data.Trips);
      })
      .catch((err) => {
        setServerMessage(err.response.data.message);
      })
      .finally(() => {});
  };

  return (
    <View paddingH-10 marginT-20>
      <View row>
        <View flex>
          <Text subhead>Active Vessels</Text>
        </View>
        <View center right style={styles.NUMCard} background-primaryColor>
          <Text subhead whiteColor numberOfLines={1}>
            1
          </Text>
        </View>
      </View>
      <FlatList
        //onRefresh={() => getUserBoat(token, "reload")}
        // refreshing={loading}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        //horizontal={true}
        // snapToInterval={width - actuatedNormalize(100)}
        data={props.trips}
        renderItem={({ item }) => (
          <TripCard
            props={props}
            item={item}
            getAuthUserTrips={getAuthUserTrips}
          />
        )}
        ListEmptyComponent={() => <EmptyTripCard props={props} />}
        keyExtractor={(item, index) => index.toString()}
        // onEndReached={() => getUserBoat(token)}
        // onEndReachedThreshold={0.5}
      />
    </View>
  );
}

const styles = {
  card: {
    marginTop: actuatedNormalize(30),
    height: height / 1.7,
    width: width - actuatedNormalize(50),
    borderRadius: actuatedNormalize(30),
    overflow: "hidden",
    backgroundColor: Colors.sosColor,
    ...elevate(2),
  },
  btn: {
    width: width - actuatedNormalize(70),
    padding: actuatedNormalize(20),
    borderRadius: actuatedNormalize(10),
    ...elevate(4),
  },
  NUMCard: {
    height: actuatedNormalize(25),
    width: actuatedNormalize(25),
    borderRadius: actuatedNormalize(5),
  },
};
