import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, TouchableOpacity } from "react-native";
import { Text, View, Colors } from "react-native-ui-lib";
import { actuatedNormalize } from "../../components/FontResponsive";
import { elevate } from "react-native-elevate";
import OperatorCard from "./OperatorCard";
import EmptyOperatorCard from "./EmptyOperatorCard";

const { width, height } = Dimensions.get("window");

export default function OperatorCardFun(props) {
  const [navigation, setNavigation] = useState(props);
  let operators = props.operators;

  return (
    <View marginV-20>
      {operators.length > 0 ? (
        <View row>
          <View flex>
            <Text subhead>Active Operators</Text>
          </View>
          <View center right>
            <TouchableOpacity
              onPress={() => navigation.props.navigation.push("Operator")}
            >
              <Text smallF underLine>
                View All
              </Text>
            </TouchableOpacity>
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
        data={operators}
        renderItem={({ item }) => (
          <OperatorCard props={navigation} item={item} />
        )}
        ListEmptyComponent={() => <EmptyOperatorCard props={navigation} />}
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
};
