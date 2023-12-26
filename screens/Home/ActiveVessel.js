import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, TouchableOpacity } from "react-native";
import { Text, View, Colors } from "react-native-ui-lib";
import { actuatedNormalize } from "../../components/FontResponsive";
import { elevate } from "react-native-elevate";
import VesselCard from "./VesselCard";
import EmptyVesselCard from "./EmptyVesselCard";
const { width, height } = Dimensions.get("window");

export default function VesselCardFun(props) {
  const [navigation, setNavigation] = useState(props.props);
  let boat = props.boat;
  let User = props.User;
  return (
    <View>
      {boat.length > 0 ? (
        <View row>
          <View flex>
            <Text subhead>Active Vessels</Text>
          </View>
          <View center right style={styles.NUMCard} background-primaryColor>
            <Text subhead whiteColor numberOfLines={1}>
              {boat.length}
            </Text>
          </View>
        </View>
      ) : null}
      <FlatList
        //onRefresh={() => getUserBoat(token, "reload")}
        // refreshing={loading}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal={true}
        // snapToInterval={width - actuatedNormalize(100)}
        data={boat}
        renderItem={({ item }) => (
          <VesselCard props={navigation} item={item} User={User} />
        )}
        ListEmptyComponent={() => <EmptyVesselCard props={navigation} />}
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
