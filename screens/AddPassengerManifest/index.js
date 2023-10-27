import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  Modal,
  FlatList,
} from "react-native";
import { View, Text, Colors, Badge, Incubator } from "react-native-ui-lib";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { actuatedNormalize } from "../../components/FontResponsive";
import SOS from "../../components/Sos";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { AddPassengerToTrip, ConfirmManifest } from "../../APIs";
import PassengerDetail from "../../components/PassengerDetail";
import EmptyCard from "../../components/EmptyCard";
import { elevate } from "react-native-elevate";

const { Toast } = Incubator;

const { width, height } = Dimensions.get("window");

export default function AddManifest(props) {
  const [isVisible, setIsVisible] = useState(false);
  const [passengerCount, setPassengerCount] = useState(
    props.route.params.item.passengers
  );
  const [toastVisible, setToastVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = React.useState("");
  const [toastColor, setToastColor] = useState("red");
  const [serverMessage, setServerMessage] = useState("");
  const [item, setItem] = useState(props.route.params.item);
  const [fullName, setFullName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [nextKin, setNextKin] = React.useState("");
  const [nextKinPhoneNumber, setNextKinPhoneNumber] = React.useState("");
  const [address, setAddress] = React.useState("");

  useEffect(() => {
    async function fetchStoresData() {
      let loginToken = await AsyncStorage.getItem("token");
      setToken(JSON.parse(loginToken));
    }

    fetchStoresData();
  }, []);

  const addPassengerToTrip = async () => {
    setServerMessage("");

    if (!fullName || !phoneNumber) {
      setServerMessage("name and phone number are required");
      setToastVisible(true);
      return;
    }

    setLoading(true);
    axios
      .put(
        `${AddPassengerToTrip}`,
        {
          fullName: fullName,
          phoneNumber: phoneNumber,
          nextKin: nextKin,
          nextKinPhoneNumber: nextKinPhoneNumber,
          address: address,
          boatId: item.Boat,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => {
        setPassengerCount(res.data.Trip.passengers);
        setServerMessage(res.data.message);
        setToastVisible(true);
        setToastColor("green");
        setAddress("");
        setFullName("");
        setNextKin("");
        setNextKinPhoneNumber("");
        setPhoneNumber("");
      })
      .catch((err) => {
        setServerMessage(err.response.data.message);
        setToastVisible(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const confirmManifest = async () => {
    setServerMessage("");
    setLoading(true);
    axios
      .put(
        `${ConfirmManifest}`,
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
        setIsVisible(false);
        props.navigation.navigate("TripHistory");
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
    <View flex paddingH-20 background-whiteColor>
      <View row centerV>
        <View flex>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("TripHistory")}
          >
            <AntDesign
              color="#181818"
              size={actuatedNormalize(20)}
              name="left"
            />
          </TouchableOpacity>
        </View>
        <View flex center>
          <Text subheading> Manifest</Text>
        </View>
        <View right flex>
          <SOS />
        </View>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View flex marginT-20>
          <View row>
            <View left flex>
              <Text subheader>Passenger Detail</Text>
            </View>
            <View right flex>
              {passengerCount.length ? (
                <TouchableOpacity
                  onPress={() => {
                    setIsVisible(true);
                  }}
                >
                  <Badge label={passengerCount.length} size={16} />
                  <FontAwesome5
                    color="#181818"
                    size={actuatedNormalize(20)}
                    name="clipboard-list"
                  />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
          <View marginT-20>
            <Text smallF>Full Name</Text>
            <TextInput
              onChangeText={(text) => setFullName(text)}
              style={styles.TextInput}
              placeholder="Enter FullName"
              value={fullName}
            />
          </View>
          <View marginT-10>
            <Text smallF>Home Address</Text>
            <TextInput
              onChangeText={(text) => setAddress(text)}
              style={styles.TextInput}
              placeholder="Enter Home Address"
              value={address}
            />
          </View>
          <View marginT-10>
            <Text smallF>Phone Number</Text>
            <TextInput
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}
              style={styles.TextInput}
              placeholder="Enter Phone Number"
            />
          </View>
          <View row marginT-30>
            <View left flex>
              <Text subheader>Next of Kin Details</Text>
            </View>
            <View right flex></View>
          </View>
          <View marginT-10>
            <Text smallF>Full Name</Text>
            <TextInput
              value={nextKin}
              onChangeText={(text) => setNextKin(text)}
              style={styles.TextInput}
              placeholder="Enter Next of Kin Full name"
            />
          </View>
          <View marginT-10>
            <Text smallF>Phone Number</Text>
            <TextInput
              value={nextKinPhoneNumber}
              onChangeText={(text) => setNextKinPhoneNumber(text)}
              style={styles.TextInput}
              placeholder="Enter Next of Kin Phone Number"
            />
          </View>
          <View center marginT-50>
            <View flex bottom>
              <TouchableOpacity
                onPress={() => {
                  addPassengerToTrip();
                }}
              >
                <View style={styles.btn} center background-primaryColor>
                  <Text whiteColor>Add More Passenger</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
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

            <View marginT-20 marginB-20>
              <TextInput style={styles.TextInput} placeholder="Search" />
            </View>
            <View flex-5>
              <FlatList
                //  onRefresh={() => getProduct(token, "reload")}
                //  refreshing={loading}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                // snapToInterval={width - actuatedNormalize(100)}
                data={passengerCount}
                renderItem={({ item }) => <PassengerDetail item={item} />}
                ListEmptyComponent={() => <EmptyCard />}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
            <View flex-1>
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
                    confirmManifest();
                  }}
                >
                  <View style={styles.btn} background-primaryColor center>
                    <Text whiteColor>Confirm Manifest</Text>
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
    </View>
  );
}

const styles = {
  TextInput: {
    height: 40,
    marginTop: actuatedNormalize(5),
    width: width - actuatedNormalize(50),
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: actuatedNormalize(5),
    padding: actuatedNormalize(10),
  },
  btn: {
    width: width - actuatedNormalize(50),
    padding: actuatedNormalize(20),
    borderRadius: actuatedNormalize(10),
  },
  btnOutline: {
    width: width - actuatedNormalize(50),
    padding: actuatedNormalize(20),
    borderRadius: actuatedNormalize(10),
    borderColor: Colors.primaryColor,
    borderWidth: actuatedNormalize(1),
  },
  verticalLine: {
    width: width - actuatedNormalize(170),
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
};
