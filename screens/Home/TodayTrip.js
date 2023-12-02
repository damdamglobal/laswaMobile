import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, TouchableOpacity } from "react-native";
import { Text, View, Colors } from "react-native-ui-lib";
import { actuatedNormalize } from "../../components/FontResponsive";
import { elevate } from "react-native-elevate";
import TripCard from "./TripCard";
import EmptyTripCard from "./EmptyTripCard";
const { width, height } = Dimensions.get("window");

export default function TripCardFun(props) {
  const [navigation, setNavigation] = useState(props.props);

  return (
    <FlatList
      //onRefresh={() => getUserBoat(token, "reload")}
      // refreshing={loading}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      horizontal={true}
      // snapToInterval={width - actuatedNormalize(100)}
      data={[]}
      renderItem={({ item }) => <TripCard props={props} item={item} />}
      ListEmptyComponent={() => <EmptyTripCard props={props} />}
      keyExtractor={(item, index) => index.toString()}
      // onEndReached={() => getUserBoat(token)}
      // onEndReachedThreshold={0.5}
    />
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
};
