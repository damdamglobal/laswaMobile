import React, { useEffect, useState } from "react";
import { Dimensions, ImageBackground, TouchableOpacity } from "react-native";
import { Text, View, Colors } from "react-native-ui-lib";
import { actuatedNormalize } from "../../components/FontResponsive";
import { elevate } from "react-native-elevate";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { useActionSheet } from "@expo/react-native-action-sheet";

const { width, height } = Dimensions.get("window");

export default function BoatCard(props) {
  const [navigation, setNavigation] = useState(props.props);
  const { showActionSheetWithOptions } = useActionSheet();

  let totalOperatorPage = props.totalOperatorPage;
  let totalBoatPage = props.totalBoatPage;
  let totalTripPage = props.totalTripPage;

  const onPress = () => {
    const options = ["This Week", "Last Week", "Select Date", "Cancel"];
    const destructiveButtonIndex = 3;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (selectedIndex) => {
        switch (selectedIndex) {
          case 1:
            // Save
            break;

          case destructiveButtonIndex:
            // Delete
            break;

          case cancelButtonIndex:
          // Canceled
        }
      }
    );
  };

  return (
    <View style={styles.card} background-primaryColor>
      <Text smallF whiteColor FontAven>
        This week’s Data
      </Text>
      <View flex row bottom>
        <View flex center>
          <Text whiteColor headingT>
            {totalOperatorPage}
          </Text>
          <Text smallF whiteColor FontAven>
            Boats
          </Text>
        </View>
        <View flex center>
          <Text whiteColor headingT>
            {totalBoatPage}
          </Text>
          <Text smallF whiteColor FontAven>
            Operators
          </Text>
        </View>
        <View flex center>
          <Text whiteColor headingT>
            {totalTripPage}
          </Text>
          <Text smallF whiteColor FontAven>
            Trips
          </Text>
        </View>
      </View>
      <View flex centerH bottom>
        <TouchableOpacity onPress={onPress}>
          <View style={styles.btn} background-whiteColor center row>
            <Text marginR-2>Filter by</Text>
            <Entypo
              color="#999999"
              size={actuatedNormalize(20)}
              name="chevron-small-down"
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = {
  card: {
    marginTop: actuatedNormalize(30),
    height: height / 4,
    width: width - actuatedNormalize(50),
    borderRadius: actuatedNormalize(30),
    padding: actuatedNormalize(20),
    overflow: "hidden",
    ...elevate(2),
  },
  btn: {
    width: width - actuatedNormalize(100),
    padding: actuatedNormalize(15),
    borderRadius: actuatedNormalize(10),
    ...elevate(4),
  },
};
