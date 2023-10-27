import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Text, View, Colors, Button } from "react-native-ui-lib";
import { actuatedNormalize } from "../../components/FontResponsive";
import { elevate } from "react-native-elevate";
import { AntDesign } from "@expo/vector-icons";
import BoatCard from "./BoatCard";
import SOS from "../../components/Sos";
import TripHistory from "../../components/TripHistory";
import EmptyCard from "./EmptyCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { GetBoatTrips } from "../../APIs";

const { width, height } = Dimensions.get("window");

export default function BoatCardComponent(props) {
  const [item, setItem] = useState(props.route.params.item);
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
      getBoatTrips(JSON.parse(loginToken, "reload"));
    }

    fetchStoresData();
  }, []);

  const getBoatTrips = async (payload, reload) => {
    let page;
    if (reload) {
      page = 1;
    } else {
      page = currentPage + 1;
    }
    setLoading(true);
    axios
      .put(
        `${GetBoatTrips}?page=${page}`,
        {
          boatId: item._id,
        },
        {
          headers: { Authorization: "Bearer " + payload },
        }
      )
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
          <Text>Boat Details</Text>
        </View>
        <View right flex>
          <SOS />
        </View>
      </View>
      <BoatCard item={item} />
      <View flex>
        <View centerH>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("StartTrip", { item: item })
            }
          >
            <View style={styles.btn} background-primaryColor center>
              <Text whiteColor>Start Trip</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <Text subheading>Fleet info</Text>
          <Text smallF marginT-5>
            Registration Number: {item.regNumber}
          </Text>
          <Text smallF marginT-5>
            Number of Seats: 12
          </Text>
          <Text smallF marginT-5>
            Boat Size: 12
          </Text>
          <Text smallF marginT-5>
            Boat Features: 12
          </Text>
        </View>
        <View row marginT-20>
          <View flex left>
            <Text subheading>Trip History</Text>
          </View>
          <View flex right>
            <Text subheading marginT-5>
              {totalPage}
              <Text smallF marginT-5>
                Trips
              </Text>
            </Text>
          </View>
        </View>
        <FlatList
          onRefresh={() => getBoatTrips(token, "reload")}
          refreshing={loading}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          // snapToInterval={width - actuatedNormalize(100)}
          data={trips}
          renderItem={({ item }) => <TripHistory item={item} />}
          ListEmptyComponent={() => <EmptyCard />}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
}

const styles = {
  btn: {
    width: width - actuatedNormalize(50),
    padding: actuatedNormalize(20),
    margin: actuatedNormalize(20),
    borderRadius: actuatedNormalize(10),
  },
};
