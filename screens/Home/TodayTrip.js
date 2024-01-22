import React, { useEffect, useState, useContext } from "react";
import { Dimensions, FlatList, TouchableOpacity } from "react-native";
import { Text, View, Colors } from "react-native-ui-lib";
import { actuatedNormalize } from "../../components/FontResponsive";
import { elevate } from "react-native-elevate";
import TripCard from "../../components/TripHistory";
import EmptyTripCard from "./EmptyTripCard";
const { width, height } = Dimensions.get("window");
import { GetAuthUserTrips } from "../../APIs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { GeneralDatContext } from "../../context/index";

export default function TripCardFun(props) {
  const [navigation, setNavigation] = useState(props.props);
  const [token, setToken] = React.useState("");

  const { setTrip } = useContext(GeneralDatContext);

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
        setTrip(res.data.Trips);
      })
      .catch((err) => {
        setServerMessage(err.response.data.message);
      })
      .finally(() => {});
  };

  return (
    <View marginT-20 centerH>
      {props.trips.length > 0 ? (
        <>
          {props.trips.map((item, index) => {
            return (
              <TripCard
                key={index}
                props={props}
                item={item}
                getAuthUserTrips={getAuthUserTrips}
              />
            );
          })}
        </>
      ) : (
        <EmptyTripCard props={props} />
      )}
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
