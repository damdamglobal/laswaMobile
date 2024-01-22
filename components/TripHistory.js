import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, View, Colors, Incubator } from "react-native-ui-lib";
import { actuatedNormalize } from "./FontResponsive";
import { elevate } from "react-native-elevate";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import PassengerDetail from "./PassengerDetail";
import EmptyCard from "./EmptyCard";
import dayjs from "dayjs";
import { StartTrip, CancelTrip, EndTrip } from "../APIs";
import axios from "axios";

const { Toast } = Incubator;

const { width, height } = Dimensions.get("window");

export default function TripHistory(props) {
  const [isVisible, setIsVisible] = useState(false);
  //const [item, setItem] = useState(props.item);
  const [loading, setLoading] = React.useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastColor, setToastColor] = useState("red");
  const [serverMessage, setServerMessage] = useState("");
  const [token, setToken] = React.useState("");
  const [keyword, setKeyword] = React.useState("");
  const [sortedPassengers, setSortedPassengers] = React.useState([]);

  let item = props.item;

  useEffect(() => {
    async function fetchStoresData() {
      let loginToken = await AsyncStorage.getItem("token");
      setToken(JSON.parse(loginToken));
    }
    fetchStoresData();
  }, []);

  const searchFun = async (keyword) => {
    function searchObjectsByKeyword(array, keyword) {
      keyword = keyword.toLowerCase();

      const matchingObjects = array.filter((obj) => {
        if (obj.fullName) {
          const objectName = obj.fullName.toLowerCase();

          for (const letter of keyword) {
            if (objectName.includes(letter)) {
              return true;
            }
          }
        }
        return false;
      });

      return matchingObjects;
    }

    const result = searchObjectsByKeyword(props.item.passengers, keyword);
    setSortedPassengers(result);
  };
  const CalendarDate = (payload) => {
    var calendar = require("dayjs/plugin/calendar");
    dayjs.extend(calendar);
    return dayjs(payload).calendar(null, { sameDay: "[Today at] h:mm A" });
  };

  const startTrip = async () => {
    setServerMessage("");
    setLoading(true);
    axios
      .put(
        `${StartTrip}`,
        {
          tripId: item._id,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => {
        setServerMessage(res.data.message);
        setToastVisible(true);
        setToastColor("green");
        props.getAuthUserTrips(token, "reload");
      })
      .catch((err) => {
        setServerMessage(err.response.data.message);
        setToastVisible(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const cancelTrip = async () => {
    setServerMessage("");
    setLoading(true);
    axios
      .put(
        `${CancelTrip}`,
        {
          tripId: item._id,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => {
        setServerMessage(res.data.message);
        setToastVisible(true);
        setToastColor("green");
        props.getAuthUserTrips(token, "reload");
      })
      .catch((err) => {
        setServerMessage(err.response.data.message);
        setToastVisible(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const endTrip = async () => {
    setServerMessage("");
    setLoading(true);
    axios
      .put(
        `${EndTrip}`,
        {
          tripId: item._id,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => {
        setServerMessage(res.data.message);
        setToastVisible(true);
        setToastColor("green");
        props.getAuthUserTrips(token, "reload");
      })
      .catch((err) => {
        console.log(err.response);
        setServerMessage(err.response.data.message);
        setToastVisible(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={styles.card} center marginB-20>
      <View row>
        <View marginL-20 centerH>
          <View style={styles.origin} center background-primaryColor>
            <FontAwesome5
              color="#fff"
              size={actuatedNormalize(10)}
              name="dot-circle"
            />
          </View>
          <View style={styles.line} background-primaryColor />
          <View style={styles.destination} center background-primaryColor>
            <FontAwesome5
              color="#fff"
              size={actuatedNormalize(10)}
              name="dot-circle"
            />
          </View>
        </View>
        <View flex marginL-20>
          <View flex>
            <Text subhead>Origin</Text>
            <Text smallF2>{item.tripOrigin}</Text>
          </View>
          <View flex centerV row>
            <View style={styles.verticalLine} />
            <View center marginL-20 right style={styles.passageList}>
              <TouchableOpacity
                onPress={() => {
                  if (item.passengers.length) {
                    setIsVisible(true);
                  } else {
                    setToastVisible(true);
                    setServerMessage("no passenger onboard");
                  }
                }}
              >
                <FontAwesome5
                  color="#181818"
                  size={actuatedNormalize(20)}
                  name="clipboard-list"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View flex bottom>
            <Text subhead>Destination</Text>
            <Text smallF2>{item.tripDestination}</Text>
            <View row right marginH-25 centerV>
              <Text marginH-5 smallF>
                {CalendarDate(item.createdAt)}
              </Text>
              <Text successColor subheader>
                {item.status}
              </Text>
            </View>
          </View>
          <>
            {loading ? (
              <>
                <View flex style={styles.btnOutlineFull} center marginH-25>
                  <TouchableOpacity>
                    <ActivityIndicator size="small" color="#181818" />
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                {item.status == "Onboarding" ? (
                  <View row marginT-10>
                    <View flex style={styles.btnOutline} center marginH-25>
                      <TouchableOpacity onPress={() => startTrip()}>
                        <Text smallF>Start Trip</Text>
                      </TouchableOpacity>
                    </View>

                    <View flex style={styles.btnOutline} center marginH-25>
                      <TouchableOpacity
                        onPress={() => {
                          props.props.navigation.push("AddPassengerManifest", {
                            item: item,
                          });
                        }}
                      >
                        <Text smallF numberOfLines={1}>
                          Add Manifest
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : null}
                {item.status == "On-Transit" ? (
                  <View row marginT-10>
                    <View flex style={styles.btnOutline} center marginH-25>
                      <TouchableOpacity onPress={() => cancelTrip()}>
                        <Text smallF>Cancel Trip</Text>
                      </TouchableOpacity>
                    </View>

                    <View flex style={styles.btnOutline} center marginH-25>
                      <TouchableOpacity
                        onPress={() => {
                          endTrip();
                        }}
                      >
                        <Text smallF>End Trip</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : null}
              </>
            )}
          </>
        </View>
      </View>
      <Modal animationType="slide" transparent={true} visible={isVisible}>
        <View style={styles.modal}>
          <View style={styles.modalCard}>
            <TouchableOpacity onPress={() => setIsVisible(false)}>
              <Text center marginT-20>
                <AntDesign
                  color="#181818"
                  size={actuatedNormalize(30)}
                  name="down"
                />
              </Text>
            </TouchableOpacity>

            <View marginT-20 marginB-20 style={{ position: "relative" }}>
              <TextInput
                style={styles.TextInput}
                placeholder="Search passengers by name"
                onChangeText={(text) => {
                  setKeyword(text);
                  searchFun(text);
                  if (text == "") {
                    setSortedPassengers([]);
                  }
                }}
                value={keyword}
              />
              <View
                style={{
                  position: "absolute",
                  right: actuatedNormalize(20),
                  top: actuatedNormalize(20),
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setSortedPassengers([]);
                    setKeyword("");
                  }}
                >
                  <AntDesign
                    color="#181818"
                    size={actuatedNormalize(20)}
                    name="close"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View flex>
              {sortedPassengers.length > 0 ? (
                <>
                  <Text>.ooo</Text>
                  <FlatList
                    //  onRefresh={() => getProduct(token, "reload")}
                    //  refreshing={loading}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    // snapToInterval={width - actuatedNormalize(100)}
                    data={sortedPassengers}
                    renderItem={({ item }) => <PassengerDetail item={item} />}
                    ListEmptyComponent={() => <EmptyCard />}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </>
              ) : (
                <>
                  <FlatList
                    //  onRefresh={() => getProduct(token, "reload")}
                    //  refreshing={loading}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    // snapToInterval={width - actuatedNormalize(100)}
                    data={props.item.passengers}
                    renderItem={({ item }) => <PassengerDetail item={item} />}
                    ListEmptyComponent={() => <EmptyCard />}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </>
              )}
            </View>
          </View>
        </View>
      </Modal>
      <Toast
        visible={toastVisible}
        position={"top"}
        autoDismiss={5000}
        message={serverMessage}
        swipeable={true}
        onDismiss={() => setToastVisible(false)}
        backgroundColor={toastColor}
        messageStyle={{
          color: "white",
        }}
      ></Toast>
    </View>
  );
}

const styles = {
  card: {
    minHeight: actuatedNormalize(250),
    width: width / 1.2,
    backgroundColor: "#F6F6F6",
    borderRadius: actuatedNormalize(10),
    ...elevate(2),
  },
  origin: {
    height: actuatedNormalize(20),
    width: actuatedNormalize(20),
    borderRadius: actuatedNormalize(10),
    backgroundColor: "gray",
  },
  destination: {
    height: actuatedNormalize(20),
    width: actuatedNormalize(20),
    borderRadius: actuatedNormalize(10),
    backgroundColor: "#0A519B",
  },
  line: {
    height: actuatedNormalize(100),
    width: actuatedNormalize(3),
  },
  verticalLine: {
    width: width - actuatedNormalize(200),
    height: actuatedNormalize(2),
    backgroundColor: "#9EA2A7",
  },
  passageList: {
    width: actuatedNormalize(50),
    height: actuatedNormalize(50),
    borderRadius: actuatedNormalize(50),
    backgroundColor: "#fff",
    ...elevate(2),
  },
  modal: {
    flex: 1,
    height: height / actuatedNormalize(10),
    backgroundColor: "rgba(28, 28, 28, 0.5)",
  },
  modalCard: {
    flex: 1,
    marginTop: actuatedNormalize(70),
    borderTopRightRadius: actuatedNormalize(20),
    borderTopLeftRadius: actuatedNormalize(20),
    backgroundColor: "#fff",
    paddingHorizontal: actuatedNormalize(20),
  },
  TextInput: {
    height: 50,
    marginTop: actuatedNormalize(5),
    width: width - actuatedNormalize(50),
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: actuatedNormalize(5),
    padding: actuatedNormalize(10),
  },
  btnOutline: {
    width: width / 3,
    padding: actuatedNormalize(10),
    borderRadius: actuatedNormalize(10),
    borderColor: Colors.primaryColor,
    borderWidth: actuatedNormalize(1),
  },
  btnOutlineFull: {
    width: width / 2,
    padding: actuatedNormalize(10),
    borderRadius: actuatedNormalize(10),
    borderColor: Colors.primaryColor,
    borderWidth: actuatedNormalize(1),
  },
};
