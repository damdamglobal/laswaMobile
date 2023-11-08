import React, { useEffect, useState } from "react";
import {
  Dimensions,
  TextInput,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Text, View, Colors, Incubator } from "react-native-ui-lib";
import { actuatedNormalize } from "../../components/FontResponsive";
import { elevate } from "react-native-elevate";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { InitialStartTrip, GetTerminals } from "../../APIs";
const { width, height } = Dimensions.get("window");
const { Toast } = Incubator;

import RNPickerSelect from "react-native-picker-select";

export default function StartTripModal(props) {
  const [isVisible, setIsVisible] = useState(false);
  const [navigation, setNavigation] = useState(props.props);
  const [tripOrigin, setTripOrigin] = useState("");
  const [tripDestination, setTripDestination] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = React.useState("");
  const [toastColor, setToastColor] = useState("red");
  const [serverMessage, setServerMessage] = useState("");
  const [item, setItem] = useState(props.props.route.params.item);
  const [terminal, setTerminal] = useState([]);

  useEffect(() => {
    async function fetchStoresData() {
      let loginToken = await AsyncStorage.getItem("token");
      setToken(JSON.parse(loginToken));
      getTerminals(JSON.parse(loginToken));
    }

    fetchStoresData();
  }, []);

  const getTerminals = async (payload) => {
    setLoading(true);
    axios
      .get(`${GetTerminals}`, {
        headers: { Authorization: "Bearer " + payload },
      })
      .then((res) => {
        let perTerminal = [];
        res.data.Terminal.forEach((element) => {
          let obj = { label: element, value: element };
          perTerminal.push(obj);
        });
        setTerminal(perTerminal);
      })
      .catch((err) => {
        setServerMessage(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const dropDownIcon = () => {
    return (
      <View
        style={{
          backgroundColor: "transparent",
          borderTopWidth: 10,
          borderTopColor: "#181818",
          borderRightWidth: 10,
          borderRightColor: "transparent",
          borderLeftWidth: 10,
          borderLeftColor: "transparent",
          width: 0,
          height: 0,
        }}
      />
    );
  };

  const initialStartTrip = async () => {
    setServerMessage("");
    if (!tripOrigin || !tripDestination) {
      setServerMessage("fill all the  required Field");
      setToastVisible(true);
      return;
    }

    setLoading(true);
    axios
      .post(
        `${InitialStartTrip}`,
        {
          tripOrigin: tripOrigin,
          tripDestination: tripDestination,
          boatId: item._id,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => {
        setServerMessage(res.data.message);
        setToastVisible(true);
        setToastColor("green");
        setIsVisible(false);
        navigation.navigation.navigate("AddPassengerManifest", {
          item: res.data.Trip,
        });
      })
      .catch((err) => {
        setServerMessage(err.response.data.message);
        setToastVisible(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View marginT-30>
      <View style={styles.card} center>
        <View row>
          <View marginL-20 centerH>
            <View style={styles.origin} center>
              <FontAwesome5
                color="#fff"
                size={actuatedNormalize(10)}
                name="dot-circle"
              />
            </View>
            <View style={styles.line} />
            <View style={styles.destination} center>
              <FontAwesome5
                color="#fff"
                size={actuatedNormalize(10)}
                name="dot-circle"
              />
            </View>
          </View>
          <TouchableOpacity onPress={() => setIsVisible(true)}>
            <View flex marginL-20>
              <View flex>
                <Text>Select Terminal</Text>
                <Text smallF marginT-10>
                  Enter Current Location
                </Text>
              </View>
              <View flex centerV row>
                <View style={styles.verticalLine1} />
                <View center marginL-20 right style={styles.passageList}>
                  <FontAwesome5
                    color="#181818"
                    size={actuatedNormalize(20)}
                    name="clipboard-list"
                  />
                </View>
              </View>
              <View flex bottom>
                <Text>Destination Terminal</Text>
                <Text smallF marginT-10>
                  Enter Location Destination
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <Modal animationType="slide" transparent={true} visible={isVisible}>
        <View style={styles.modal}>
          <View flex style={styles.modalCard}>
            <TouchableOpacity onPress={() => setIsVisible(false)}>
              <Text center marginT-20>
                <AntDesign
                  color="#181818"
                  size={actuatedNormalize(30)}
                  name="down"
                />
              </Text>
            </TouchableOpacity>
            <View marginT-20 style={styles.card2} center>
              <View row>
                <View marginL-20 centerH>
                  <View style={styles.origin} center>
                    <FontAwesome5
                      color="#fff"
                      size={actuatedNormalize(10)}
                      name="dot-circle"
                    />
                  </View>
                  <View style={styles.line} />
                  <View style={styles.destination} center>
                    <FontAwesome5
                      color="#fff"
                      size={actuatedNormalize(10)}
                      name="dot-circle"
                    />
                  </View>
                </View>
                <View flex marginL-20>
                  <View flex>
                    <Text>Start Terminal</Text>
                    <View style={styles.selectField}>
                      <RNPickerSelect
                        onValueChange={(text) => setTripOrigin(text)}
                        items={terminal}
                        style={{
                          ...pickerSelectStyles,
                          iconContainer: {
                            top: 20,
                            right: 10,
                          },
                          placeholder: {
                            color: "gray",
                            fontSize: 16,
                          },
                        }}
                        placeholder={{
                          label: "Select Current Location",
                          value: null,
                          color: "gray",
                        }}
                        Icon={dropDownIcon}
                      />
                    </View>
                  </View>
                  <View flex centerV>
                    <View style={styles.verticalLine} />
                  </View>
                  <View flex bottom style={styles.selectField}>
                    <Text>Destination Terminal</Text>

                    <RNPickerSelect
                      onValueChange={(text) => setTripDestination(text)}
                      items={terminal}
                      style={{
                        ...pickerSelectStyles,
                        iconContainer: {
                          top: 20,
                          right: 10,
                        },
                        placeholder: {
                          color: "gray",
                          fontSize: 16,
                        },
                      }}
                      placeholder={{
                        label: "Select Location Destination",
                        value: null,
                        color: "gray",
                      }}
                      Icon={dropDownIcon}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View flex bottom>
              {loading ? (
                <TouchableOpacity>
                  <View
                    style={styles.btn}
                    background-primaryColor
                    center
                    marginT-40
                  >
                    <ActivityIndicator size="small" color="#fff" />
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    initialStartTrip();
                  }}
                >
                  <View style={styles.btn} background-primaryColor center>
                    <Text whiteColor>Start Trip</Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
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
    height: actuatedNormalize(290),
    width: width,
    borderRadius: actuatedNormalize(10),
  },
  card2: {
    width: width,
    borderRadius: actuatedNormalize(10),
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
    backgroundColor: "#0A519B", //Colors.primaryColor,
  },
  line: {
    height: actuatedNormalize(100),
    width: actuatedNormalize(3),
    backgroundColor: "#0A519B", //Colors.primaryColor,
  },
  verticalLine: {
    width: width - actuatedNormalize(90),
    height: actuatedNormalize(2),
    backgroundColor: "#9EA2A7",
  },
  verticalLine1: {
    width: width - actuatedNormalize(190),
    height: actuatedNormalize(2),
    backgroundColor: "#9EA2A7",
  },
  passageList: {
    width: actuatedNormalize(50),
    height: actuatedNormalize(50),
    borderRadius: actuatedNormalize(10),
    borderWidth: actuatedNormalize(1),
    borderColor: "#9EA2A7",
    backgroundColor: "#fff",
    ...elevate(2),
  },
  TextInput: {
    height: 40,
    marginTop: actuatedNormalize(5),
    width: width - actuatedNormalize(130),
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: actuatedNormalize(5),
    padding: actuatedNormalize(10),
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
  },
  btn: {
    width: width - actuatedNormalize(50),
    padding: actuatedNormalize(20),
    margin: actuatedNormalize(20),
    borderRadius: actuatedNormalize(10),
  },
  selectField: {
    width: width - actuatedNormalize(90),
    backgroundColor: "white",
    borderRadius: actuatedNormalize(5),
    ...elevate(1),
  },
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 50,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 10,
    color: "#181818",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    height: 50,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    color: "#181818",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
