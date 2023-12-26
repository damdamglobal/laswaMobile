import React, { useEffect, useState } from "react";
import { Dimensions, Image, TouchableOpacity, Modal } from "react-native";
import { Text, View, Incubator } from "react-native-ui-lib";
import { actuatedNormalize } from "../../components/FontResponsive";
import { elevate } from "react-native-elevate";
import {
  Entypo,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
const { TextField, Toast } = Incubator;
import Operators from "../BoatDetail/AssignBoatToUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { SearchOperator, AssignUserToBoat, RemoveCaptain } from "../../APIs";

const { width, height } = Dimensions.get("window");

export default function BoatCard(props) {
  const [navigation, setNavigation] = useState(props.props);
  const [isVisible, setIsVisible] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastColor, setToastColor] = useState("red");
  const [serverMessage, setServerMessage] = useState("");
  const [operatorModal, setOperatorModal] = useState(false);
  const [findUser, setFindUser] = useState([]);
  const [isOwner, setIsOwner] = useState(false);
  const [token, setToken] = React.useState("");

  let item = props.item;

  useEffect(() => {
    async function fetchStoresData() {
      let owner = props.User;
      let value = await AsyncStorage.getItem("user");
      let user = JSON.parse(value);
      if (user._id == owner._id) {
        setIsOwner(true);
      }

      let loginToken = await AsyncStorage.getItem("token");
      setToken(JSON.parse(loginToken));
    }

    fetchStoresData();
  }, []);

  const assignUserFun = async (id) => {
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
          userId: id,
          boatId: item._id,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => {
        setFindUser([]);
        setEmail("");
        setServerMessage(res.data.message);
        setToastVisible(true);
        setToastColor("green");
        setItem(res.data.Boat);
        setCaptains(res.data.Boat.operators);
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
    setLoading(true);
    axios
      .put(
        `${SearchOperator}`,
        {
          keyword: keyword,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => {
        setFindUser(res.data.users);
        setServerMessage(res.data.message);
        setToastVisible(true);
        setToastColor("green");
        console.log(res.data.users);
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
        setCaptains(res.data.Boat.operators);
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

  return (
    <View>
      <TouchableOpacity onPress={() => setIsVisible(true)}>
        <View style={styles.card}>
          <View>
            <View style={styles.imgCard} center>
              {item.imgUrl[0] ? (
                <Image
                  source={{ uri: item.imgUrl[0].url }}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              ) : (
                <MaterialIcons
                  color="#181818"
                  size={actuatedNormalize(60)}
                  name="directions-boat"
                />
              )}

              {item.activeTrip ? (
                <View
                  style={styles.active}
                  background-primaryColor
                  padding-5
                  paddingH-20
                >
                  <Text smallF whiteColor>
                    Active
                  </Text>
                </View>
              ) : null}

              {!item.verify ? (
                <View
                  style={styles.active2}
                  background-sosColor
                  padding-5
                  paddingH-20
                >
                  <Text smallF whiteColor>
                    verification Pending
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
          <View flex padding-20 row centerV>
            <View flex>
              <Text subheader>{item.boatName}</Text>
              <View row centerV marginT-5>
                <MaterialIcons
                  color="#181818"
                  size={actuatedNormalize(20)}
                  name="directions-boat"
                />
                <Text FontAven marginL-10>
                  {item.passengerCapacity}
                </Text>
              </View>
            </View>
            <View flex right row>
              <Text FontAven> {item.passengerCapacity}</Text>
              <Text> </Text>
              <Text FontAven gray>
                Passengers
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={isVisible}>
        <View style={styles.modal}>
          <View style={[styles.subModal, { backgroundColor: "#fff" }]}>
            <View style={styles.DialogCard}>
              <View row centerV>
                <View flex>
                  <Text subheader>Choose Option</Text>
                </View>
                <View flex right>
                  <TouchableOpacity onPress={() => setIsVisible(false)}>
                    <MaterialIcons
                      color="#181818"
                      size={actuatedNormalize(20)}
                      name="close"
                    />
                  </TouchableOpacity>
                </View>
              </View>
              {item.verify ? (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigation.push("BoatDetail", { item: item });
                      setIsVisible(false);
                    }}
                  >
                    <View row centerV marginT-20>
                      <View style={styles.iconBox} center>
                        <MaterialIcons
                          color="#181818"
                          size={actuatedNormalize(10)}
                          name="remove-red-eye"
                        />
                      </View>
                      <View marginH-10>
                        <Text>View Info</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigation.push("StartTrip", { item: item });
                      setIsVisible(false);
                    }}
                  >
                    <View row centerV marginT-5>
                      <View style={styles.iconBox} center>
                        <MaterialCommunityIcons
                          color="#181818"
                          size={actuatedNormalize(10)}
                          name="arrow-expand-right"
                        />
                      </View>
                      <View marginH-10>
                        <Text>Start Trip</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setOperatorModal(true);
                    }}
                  >
                    <View row centerV marginT-5>
                      <View style={styles.iconBox} center>
                        <Entypo
                          color="#181818"
                          size={actuatedNormalize(10)}
                          name="upload-to-cloud"
                        />
                      </View>
                      <View marginH-10>
                        <Text>Operators </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setToastVisible(true);
                      setServerMessage("service not available");
                    }}
                  >
                    <View row centerV marginT-5>
                      <View style={styles.iconBox} center>
                        <MaterialIcons
                          color="#181818"
                          size={actuatedNormalize(10)}
                          name="my-location"
                        />
                      </View>
                      <View marginH-10>
                        <Text>Get Location</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigation.push("BoatDoc", { item: item });
                      setIsVisible(false);
                    }}
                  >
                    <View row centerV marginT-10>
                      <View style={styles.iconBox} center>
                        <Entypo
                          color="#181818"
                          size={actuatedNormalize(10)}
                          name="upload-to-cloud"
                        />
                      </View>
                      <View marginH-10>
                        <Text>Upload Documents</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setOperatorModal(true);
                    }}
                  >
                    <View row centerV marginT-5>
                      <View style={styles.iconBox} center>
                        <Entypo
                          color="#181818"
                          size={actuatedNormalize(10)}
                          name="upload-to-cloud"
                        />
                      </View>
                      <View marginH-10>
                        <Text>Operators </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </View>
        <Modal animationType="slide" transparent={true} visible={operatorModal}>
          <Operators
            email={keyword}
            loading={loading}
            findUser={findUser}
            captains={item.operators}
            isOwner={isOwner}
            setIsVisible={setOperatorModal}
            setFindUser={setFindUser}
            setEmail={setKeyword}
            removeCaptain={removeCaptain}
            searchUser={searchUser}
            assignUserFun={assignUserFun}
          />
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
  iconBox: {
    height: actuatedNormalize(30),
    width: actuatedNormalize(30),
    backgroundColor: "#F6F6F6",
    borderRadius: actuatedNormalize(5),
  },
  DialogCard: {
    height: height / 4.5,
    width: width - actuatedNormalize(50),
    backgroundColor: "white",
    borderTopRightRadius: actuatedNormalize(10),
    borderTopLeftRadius: actuatedNormalize(10),
  },
  imgCard: {
    height: height / 5,
    width: width - actuatedNormalize(50),
    overflow: "hidden",
    borderRadius: actuatedNormalize(20),
    position: "relative",
  },
  card: {
    margin: actuatedNormalize(10),
    height: height / 3.5,
    width: width - actuatedNormalize(50),
    overflow: "hidden",
    backgroundColor: "white",
    borderWidth: actuatedNormalize(0.5),
    borderColor: "gray",
    borderRadius: actuatedNormalize(20),
    ...elevate(2),
  },
  btn: {
    width: width - actuatedNormalize(100),
    padding: actuatedNormalize(20),
    borderRadius: actuatedNormalize(10),
    ...elevate(4),
  },
  sos: {
    height: actuatedNormalize(70),
    width: actuatedNormalize(70),
    borderRadius: actuatedNormalize(10),
    overflow: "hidden",
    ...elevate(2),
  },
  active: {
    position: "absolute",
    top: actuatedNormalize(20),
    left: actuatedNormalize(20),
    borderRadius: actuatedNormalize(5),
  },
  active2: {
    position: "absolute",
    top: actuatedNormalize(20),
    right: actuatedNormalize(20),
    borderRadius: actuatedNormalize(5),
  },
  subModal: {
    flex: 1,
    marginTop: height / 1.5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: actuatedNormalize(20),
  },
  modal: {
    flex: 1,
    height: height / actuatedNormalize(10),
    backgroundColor: "rgba(28, 28, 28, 0.5)",
  },
};
