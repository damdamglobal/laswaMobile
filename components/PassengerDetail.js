import React, { useEffect, useState } from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import { View, Text } from "react-native-ui-lib";
import { actuatedNormalize } from "./FontResponsive";
import { elevate } from "react-native-elevate";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
const { width, height } = Dimensions.get("window");
import dayjs from "dayjs";

export default function PassengerDetail(props) {
  const [cardHeight, setCardHeight] = useState(false);

  const item = props.item;

  useEffect(() => {
    async function fetchStoresData() {}

    fetchStoresData();
  }, []);

  const CalendarDate = (payload) => {
    return dayjs(payload).format("DD/MM/YYYY hh:mm:A");
  };

  return (
    <>
      {cardHeight ? (
        <TouchableOpacity
          onPress={() => {
            setCardHeight(!cardHeight);
          }}
        >
          <View style={styles.card1} margin-10 background-whiteColor>
            <View row>
              <View style={styles.avatar} center>
                <Text whiteColor cap>
                  {item.fullName.substring(0, 2)}
                </Text>
              </View>
              <View marginH-10>
                <Text subheader>{item.fullName}</Text>
              </View>
              <View flex right>
                <AntDesign
                  color="#181818"
                  size={actuatedNormalize(20)}
                  name="up"
                />
              </View>
            </View>

            <View row marginT-10>
              <View flex>
                <Text>Phone No.</Text>
              </View>
              <View flex right>
                <Text>{item.phoneNumber}</Text>
              </View>
            </View>
            <View row marginT-10>
              <View flex>
                <Text>Next Kin</Text>
              </View>
              <View flex right>
                <Text>{item.nextKin}</Text>
              </View>
            </View>
            <View row marginT-10>
              <View flex>
                <Text>Next Kin phone No.</Text>
              </View>
              <View flex right>
                <Text>{item.nextKinPhoneNumber}</Text>
              </View>
            </View>
            <View row marginT-10>
              <View flex>
                <Text>Board Time</Text>
              </View>
              <View flex right>
                <Text>{CalendarDate(item.boardTime)}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <View style={styles.card} margin-10 row background-whiteColor>
          <View flex left row centerV>
            <View style={styles.avatar} center>
              <Text whiteColor cap>
                {item.fullName.substring(0, 2)}
              </Text>
            </View>
            <View marginH-10>
              <Text subheader>{item.fullName}</Text>
            </View>
          </View>
          <View flex right centerV>
            <TouchableOpacity onPress={() => setCardHeight(!cardHeight)}>
              <AntDesign
                color="#181818"
                size={actuatedNormalize(20)}
                name="down"
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
}

const styles = {
  card: {
    // minHeight: cardHeight ? height / 3 : 0,
    //  width: width - actuatedNormalize(20),
    //  backgroundColor: "#F6F6F6",
    borderRadius: actuatedNormalize(10),
    padding: actuatedNormalize(10),
    ...elevate(1),
  },
  card1: {
    minHeight: height / 5,
    //  width: width - actuatedNormalize(20),
    //  backgroundColor: "#F6F6F6",
    borderRadius: actuatedNormalize(10),
    padding: actuatedNormalize(10),
    paddingTop: actuatedNormalize(20),
    ...elevate(1),
  },
  avatar: {
    height: actuatedNormalize(50),
    width: actuatedNormalize(50),
    backgroundColor: "#181818",
    borderRadius: actuatedNormalize(50),
  },
};
