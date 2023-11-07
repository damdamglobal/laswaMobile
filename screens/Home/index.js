import React, { useState, useEffect, useContext } from "react";
import { FlatList, Dimensions } from "react-native";
import { Text, View, Avatar } from "react-native-ui-lib";
import axios from "axios";
import { GetUserBoat } from "../../APIs";
import Sos from "../../components/Sos";
import UserAvatar from "./UserAvatar";
import BoatCard from "./BoatCard";
import EmptyCard from "./EmptyCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width, height } = Dimensions.get("window");
import { BoatScreenContext } from "../../context/index";

export default function HomeFun(props) {
  const [token, setToken] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [serverMessage, setServerMessage] = React.useState("");
  const [currentPage, setCurrentPage] = useState(null);
  const [totalPage, setTotalPage] = useState(null);
  const [boat, setBoats] = useContext(BoatScreenContext);

  useEffect(() => {
    async function fetchStoresData() {
      let loginToken = await AsyncStorage.getItem("token");
      setToken(JSON.parse(loginToken));
      getUserBoat(JSON.parse(loginToken, "reload"));
    }

    fetchStoresData();
  }, []);

  const getUserBoat = async (payload, reload) => {
    let page;
    if (reload) {
      page = 1;
    } else {
      page = 1; //currentPage + 1;
    }
    setLoading(true);
    axios
      .get(`${GetUserBoat}?page=${page}`, {
        headers: { Authorization: "Bearer " + payload },
      })
      .then((res) => {
        setCurrentPage(page);
        setTotalPage(res.data.count);
        setBoats(res.data.Boat);

        /* if (reload) {
          setBoats(res.data.Boat);
        } else {
          setBoats((initDate) => [...initDate, ...res.data.Boat]);
        }*/
      })
      .catch((err) => {
        setServerMessage(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View flex padding-20 background-whiteColor>
      <View row>
        <View flex left>
          <UserAvatar />
        </View>
        <View flex right>
          <Sos />
        </View>
      </View>
      <View>
        <View row centerV marginV-40>
          <View flex left>
            <Text subheading>My Fleet </Text>
          </View>
          <View flex right>
            {/*<Text smallF>View all </Text>*/}
          </View>
        </View>
        <View>
          <FlatList
            onRefresh={() => getUserBoat(token, "reload")}
            refreshing={loading}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            horizontal={true}
            // snapToInterval={width - actuatedNormalize(100)}
            data={boat}
            renderItem={({ item }) => <BoatCard props={props} item={item} />}
            ListEmptyComponent={() => <EmptyCard props={props} />}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={() => getUserBoat(token)}
            onEndReachedThreshold={0.5}
          />
        </View>
      </View>
    </View>
  );
}
