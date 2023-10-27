import React, { useEffect, useState } from "react";
import { Dimensions, TextInput, TouchableOpacity, Modal } from "react-native";
import { Text, View, Colors, Incubator } from "react-native-ui-lib";
import { actuatedNormalize } from "../../components/FontResponsive";
import { elevate } from "react-native-elevate";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { InitialStartTrip } from "../../APIs";
const { width, height } = Dimensions.get("window");
const { Toast } = Incubator;

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

  useEffect(() => {
    async function fetchStoresData() {
      let loginToken = await AsyncStorage.getItem("token");
      setToken(JSON.parse(loginToken));
    }

    fetchStoresData();
  }, []);

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
        navigation.navigation.navigate("AddPassengerManifest", { item: item });
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
              <AntDesign
                color="#fff"
                size={actuatedNormalize(10)}
                name="circledown"
              />
            </View>
            <View style={styles.line} />
            <View style={styles.destination} center>
              <AntDesign
                color="#fff"
                size={actuatedNormalize(10)}
                name="upcircle"
              />
            </View>
          </View>
          <TouchableOpacity onPress={() => setIsVisible(true)}>
            <View flex marginL-20>
              <View flex>
                <Text>Origin</Text>
                <Text smallF marginT-10>
                  Enter Current Location
                </Text>
              </View>
              <View flex centerV row>
                <View style={styles.verticalLine} />
                <View center marginL-20 right style={styles.passageList}>
                  <FontAwesome5
                    color="#181818"
                    size={actuatedNormalize(20)}
                    name="clipboard-list"
                  />
                </View>
              </View>
              <View flex bottom>
                <Text>Destination</Text>
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
                    <AntDesign
                      color="#fff"
                      size={actuatedNormalize(10)}
                      name="circledown"
                    />
                  </View>
                  <View style={styles.line} />
                  <View style={styles.destination} center>
                    <AntDesign
                      color="#fff"
                      size={actuatedNormalize(10)}
                      name="upcircle"
                    />
                  </View>
                </View>
                <View flex marginL-20>
                  <View flex>
                    <Text>Origin</Text>
                    <TextInput
                      onChangeText={(text) => setTripOrigin(text)}
                      style={styles.TextInput}
                      placeholder="Enter Current Location"
                      autoFocus
                    />
                  </View>
                  <View flex centerV row>
                    <View style={styles.verticalLine} />
                    <View center marginL-20 right style={styles.passageList}>
                      <FontAwesome5
                        color="#181818"
                        size={actuatedNormalize(20)}
                        name="clipboard-list"
                      />
                    </View>
                  </View>
                  <View flex bottom>
                    <Text>Destination</Text>
                    <TextInput
                      onChangeText={(text) => setTripDestination(text)}
                      style={styles.TextInput}
                      placeholder="Enter Location Destination"
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
                    <Text whiteColor>processing...</Text>
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
    backgroundColor: Colors.primaryColor,
  },
  destination: {
    height: actuatedNormalize(20),
    width: actuatedNormalize(20),
    borderRadius: actuatedNormalize(10),
    backgroundColor: Colors.primaryColor,
  },
  line: {
    height: actuatedNormalize(100),
    width: actuatedNormalize(3),
    backgroundColor: Colors.primaryColor,
  },
  verticalLine: {
    width: width - actuatedNormalize(140),
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
};
