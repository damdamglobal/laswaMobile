import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Text, View, Colors, Incubator } from "react-native-ui-lib";
import { actuatedNormalize } from "../../components/FontResponsive";
import { elevate } from "react-native-elevate";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import BoatCard from "./BoatCard";
import SOS from "../../components/Sos";
import TripHistory from "../../components/TripHistory";
import EmptyCard from "./EmptyCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {
  GetBoatTrips,
  SearchUser,
  AssignUserToBoat,
  RemoveCaptain,
} from "../../APIs";

const { TextField, Toast } = Incubator;

const { width, height } = Dimensions.get("window");

export default function BoatCardComponent(props) {
  const [item, setItem] = useState(props.route.params.item);
  const [token, setToken] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [serverMessage, setServerMessage] = React.useState("");
  const [trips, setTrips] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);
  const [totalPage, setTotalPage] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [findUser, setFindUser] = useState(null);
  const [captains, setCaptains] = useState(props.route.params.item.captains);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastColor, setToastColor] = useState("red");
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    async function fetchStoresData() {
      let owner = props.route.params.item.User;
      let value = await AsyncStorage.getItem("user");
      let user = JSON.parse(value);
      if (user._id == owner) {
        setIsOwner(true);
      }

      let loginToken = await AsyncStorage.getItem("token");
      setToken(JSON.parse(loginToken));
      getBoatTrips(JSON.parse(loginToken, "reload"));
    }

    fetchStoresData();
  }, []);

  const assignUserFun = async () => {
    setServerMessage("");
    if (!findUser) {
      setServerMessage("Captain is required");
      setToastVisible(true);
      return;
    }
    setLoading(true);
    axios
      .put(
        `${AssignUserToBoat}`,
        {
          userId: findUser._id,
          boatId: item._id,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => {
        setFindUser(null);
        setEmail("");
        setServerMessage(res.data.message);
        setToastVisible(true);
        setToastColor("green");
        setItem(res.data.Boat);
        setCaptains(res.data.Boat.captains);
      })
      .catch((err) => {
        console.log(err.response.data);
        setServerMessage(err.response.data.message);
        setToastVisible(true);
        setToastColor("red");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const searchUser = async () => {
    setServerMessage("");
    if (!email) {
      setServerMessage("Captain Email is required");
      setToastVisible(true);
      return;
    }
    setFindUser(null);
    setLoading(true);
    axios
      .put(
        `${SearchUser}`,
        {
          userName: email,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => {
        setFindUser(res.data.user);
        setServerMessage(res.data.message);
        setToastVisible(true);
        setToastColor("green");
      })
      .catch((err) => {
        setServerMessage(err.response.data.message);
        setToastVisible(true);
        setToastColor("red");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const removeCaptain = async (userId) => {
    setLoading(true);
    axios
      .put(
        `${RemoveCaptain}`,
        {
          userId: userId,
          boatId: item._id,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => {
        setItem(res.data.Boat);
        setCaptains(res.data.Boat.captains);
        setServerMessage(res.data.message);
        setToastVisible(true);
        setToastColor("green");
      })
      .catch((err) => {
        setServerMessage(err.response.data.message);
        setServerMessage(err.response.data.message);
        setToastVisible(true);
        setToastColor("red");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getBoatTrips = async (payload, reload) => {
    let page;
    if (reload) {
      page = 1;
    } else {
      page = currentPage + 1;
    }
    setLoading(true);
    axios
      .put(
        `${GetBoatTrips}?page=${page}`,
        {
          boatId: item._id,
        },
        {
          headers: { Authorization: "Bearer " + payload },
        }
      )
      .then((res) => {
        setCurrentPage(page);
        setTotalPage(res.data.count);
        if (reload) {
          setTrips(res.data.Trips);
        } else {
          setTrips((initDate) => [...initDate, ...res.data.Trips]);
        }
      })
      .catch((err) => {
        setServerMessage(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View
      flex
      paddingH-20
      background-whiteColor
      style={{ position: "relative" }}
    >
      <View row centerV>
        <View flex>
          <TouchableOpacity onPress={() => props.navigation.pop()}>
            <AntDesign
              color="#181818"
              size={actuatedNormalize(20)}
              name="left"
            />
          </TouchableOpacity>
        </View>
        <View flex center>
          <Text>Boat Details</Text>
        </View>
        <View right flex>
          <SOS />
        </View>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <BoatCard item={item} />
        <View flex marginV-20>
          <View>
            <Text subheading capital>
              {item.boatName}
            </Text>

            <Text smallF marginT-5>
              Registration Number: {item.registrationNumber}
            </Text>
            <Text smallF marginT-5>
              Boat Size: {item.passengerCapacity}
            </Text>
            <Text smallF marginT-5>
              Boat Status: {item.status}
            </Text>
          </View>
          <View row>
            <View row centerV>
              <MaterialIcons
                color="#181818"
                size={actuatedNormalize(20)}
                name="directions-boat"
              />
              <Text marginH-5>{item.passengerCapacity}</Text>
            </View>
            <View flex right>
              <TouchableOpacity
                onPress={
                  () => setIsVisible(true)
                  // props.navigation.navigate("StartTrip", { item: item })
                }
              >
                <View row style={styles.btn3} center background-primaryColor>
                  <Text FontAven whiteColor marginH-5>
                    Operators
                  </Text>
                  <AntDesign
                    color="#fff"
                    size={actuatedNormalize(15)}
                    name="down"
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View row marginT-20>
            <View flex left>
              <Text subheading>Trip History</Text>
            </View>
            <View flex right>
              <Text subheading marginT-5>
                {totalPage}
                <Text smallF marginT-5>
                  Trips
                </Text>
              </Text>
            </View>
          </View>
        </View>

        {loading ? (
          <ActivityIndicator size="small" color="#181818" />
        ) : (
          <View>
            {trips.length ? (
              <View style={{ marginBottom: actuatedNormalize(150) }}>
                {trips.map((item) => (
                  <View key={item._id}>
                    <TripHistory item={item} props={props} />
                  </View>
                ))}
              </View>
            ) : (
              <EmptyCard />
            )}
          </View>
        )}
      </ScrollView>
      <View center style={styles.startTripBtn}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("StartTrip", { item: item })}
        >
          <View style={styles.btn2} background-primaryColor center>
            <Text whiteColor>Start Trip</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Modal animationType="slide" transparent={true} visible={isVisible}>
        <View style={styles.modal}>
          <View flex style={styles.modalCard}>
            <TouchableOpacity
              onPress={() => {
                setIsVisible(false);
                setFindUser(null);
                setEmail("");
              }}
            >
              <Text center marginT-20>
                <AntDesign
                  color="#181818"
                  size={actuatedNormalize(30)}
                  name="down"
                />
              </Text>
            </TouchableOpacity>
            <View marginT-20 style={styles.card2} center>
              <View marginT-20>
                <Text smallF>Captain Email</Text>
                <TextInput
                  onChangeText={(text) => setEmail(text)}
                  style={styles.TextInput}
                  placeholder="Enter Captain Email"
                  autoCapitalize="none"
                  textContentType="emailAddress"
                  value={email}
                />
              </View>
              <View right marginT-20>
                {loading ? (
                  <TouchableOpacity onPress={() => searchUser()}>
                    <View style={styles.btn} background-primaryColor center>
                      <ActivityIndicator size="small" color="#fff" />
                    </View>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => searchUser()}>
                    <View style={styles.btn} background-primaryColor center>
                      <Text whiteColor>Search</Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
              {findUser ? (
                <View style={styles.userCard} centerV>
                  <View row>
                    <View flex>
                      <Text>First Name :</Text>
                      <Text>Last Name :</Text>
                      <Text>Email :</Text>
                      <Text>Phone :</Text>
                    </View>
                    <View flex right>
                      <Text>{findUser.firstName}</Text>
                      <Text>{findUser.lastName}</Text>
                      <Text>{findUser.email}</Text>
                      <Text>{findUser.phoneNumber}</Text>
                    </View>
                  </View>
                  {loading ? (
                    <TouchableOpacity>
                      <View style={styles.btn} background-primaryColor center>
                        <ActivityIndicator size="small" color="#fff" />
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <View row marginT-20>
                      <View flex center>
                        <TouchableOpacity
                          onPress={() => {
                            setFindUser(null);
                            setEmail("");
                          }}
                        >
                          <View style={styles.btn} center>
                            <Text underLine>Close</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View flex center>
                        <TouchableOpacity onPress={() => assignUserFun()}>
                          <View
                            style={styles.btn}
                            background-primaryColor
                            center
                          >
                            <Text whiteColor>Assign</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </View>
              ) : (
                <View marginT-20>
                  <Text underLine subheader>
                    Available Operations
                  </Text>
                  {captains.map((item) => (
                    <View style={styles.captainCard}>
                      <View row>
                        <View flex>
                          <Text>First Name :</Text>
                          <Text>Last Name :</Text>
                          <Text>Email :</Text>
                          <Text>Phone :</Text>
                        </View>
                        <View flex right>
                          <Text>{item.firstName}</Text>
                          <Text>{item.lastName}</Text>
                          <Text>{item.email}</Text>
                          <Text>{item.phoneNumber}</Text>
                        </View>
                      </View>
                      {isOwner ? (
                        <>
                          {loading ? (
                            <TouchableOpacity onPress={() => searchUser()}>
                              <View style={styles.btnD} center row>
                                <ActivityIndicator size="small" color="#fff" />
                              </View>
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity
                              onPress={() => removeCaptain(item._id)}
                            >
                              <View style={styles.btnD} center row>
                                <Text marginH-10 whiteColor>
                                  Remove
                                </Text>
                                <AntDesign
                                  color="#fff"
                                  size={actuatedNormalize(15)}
                                  name="delete"
                                />
                              </View>
                            </TouchableOpacity>
                          )}
                        </>
                      ) : null}
                    </View>
                  ))}
                </View>
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
  userCard: {
    width: width - actuatedNormalize(50),
    minHeight: 200,
    backgroundColor: "white",
    padding: actuatedNormalize(5),
    borderRadius: actuatedNormalize(10),
    marginTop: actuatedNormalize(20),
    ...elevate(4),
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
  btn: {
    width: width / 2 - actuatedNormalize(40),
    padding: actuatedNormalize(20),
    borderRadius: actuatedNormalize(10),
  },
  btn2: {
    width: width - actuatedNormalize(50),
    padding: actuatedNormalize(20),
    borderRadius: actuatedNormalize(10),
  },
  btn3: {
    width: width / 2.5,
    padding: actuatedNormalize(10),
    borderRadius: actuatedNormalize(5),
  },
  btnD: {
    padding: actuatedNormalize(20),
    borderRadius: actuatedNormalize(10),
    backgroundColor: "red",
    marginTop: actuatedNormalize(10),
  },
  modal: {
    flex: 1,
    height: height / actuatedNormalize(10),
    backgroundColor: "rgba(28, 28, 28, 0.5)",
  },
  modalCard: {
    flex: 1,
    marginTop: actuatedNormalize(30),
    borderTopRightRadius: actuatedNormalize(20),
    borderTopLeftRadius: actuatedNormalize(20),
    backgroundColor: "#fff",
  },
  card2: {
    width: width,
    borderRadius: actuatedNormalize(10),
  },
  captainCard: {
    width: width - actuatedNormalize(40),
    borderRadius: actuatedNormalize(5),
    backgroundColor: "white",
    padding: actuatedNormalize(10),
    marginTop: actuatedNormalize(10),
    ...elevate(3),
  },
  startTripBtn: {
    position: "absolute",
    bottom: actuatedNormalize(10),
    zIndex: 2,
    left: actuatedNormalize(25),
  },
};
