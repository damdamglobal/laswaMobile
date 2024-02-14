import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { Text, View, Incubator } from "react-native-ui-lib";
import { actuatedNormalize } from "../../components/FontResponsive";
import { elevate } from "react-native-elevate";
import {
  Entypo,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
const { TextField, Toast } = Incubator;
import {
  ResetOperatorPassword,
  SuspendOperator,
  UnSuspendOperator,
} from "../../APIs";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

export default function BoatCard(props) {
  const [navigation, setNavigation] = useState(props.props);
  const [otpModal, setOtpModal] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [toastColor, setToastColor] = useState("red");
  const [serverMessage, setServerMessage] = useState("service not available");
  const [loading, setLoading] = React.useState(false);
  const [token, setToken] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(true);
  const [resetPassword, setResetPassword] = React.useState(false);

  let item = props.item;

  useEffect(() => {
    async function fetchStoresData() {
      let loginToken = await AsyncStorage.getItem("token");
      setToken(JSON.parse(loginToken));
    }

    fetchStoresData();
  }, []);

  const AutoGeneratePassword = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"; // All letters
    let result = "";

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * letters.length);
      result += letters.charAt(randomIndex);
    }
    setPassword(result);
    //return result;
  };

  const suspendOperator = async () => {
    setLoading(true);
    axios
      .put(
        `${SuspendOperator}`,
        {
          userId: item._id,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => {
        props.getAllOperator();
        setToastVisible(true);
        setServerMessage(res.data.message);
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
  const unSuspendOperator = async () => {
    setLoading(true);
    axios
      .put(
        `${UnSuspendOperator}`,
        {
          userId: item._id,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => {
        props.getAllOperator();
        setToastVisible(true);
        setServerMessage(res.data.message);
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

  const ResetPassword = () => {
    if (!password) {
      setToastVisible(true);
      setServerMessage("Password is required");
      setToastColor("red");
      return;
    }
    setLoading(true);
    axios
      .put(
        `${ResetOperatorPassword}`,
        {
          userId: item._id,
          password: password,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => {
        props.getAllOperator();
        setToastVisible(true);
        setServerMessage(res.data.message);
        setToastColor("green");
        setPassword("");
        setResetPassword(false);
        setShowPassword(false);
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

  return (
    <View flex>
      <TouchableOpacity onPress={() => setOtpModal(true)}>
        <View style={styles.card}>
          <View flex row centerV>
            <View flex>
              <View style={styles.sos} center marginL-10>
                {item.imgUrl ? (
                  <Image
                    source={{ uri: item.imgUrl }}
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                ) : (
                  <Entypo
                    color="#181818"
                    size={actuatedNormalize(60)}
                    name="user"
                  />
                )}
              </View>
            </View>
            <View flex-2 marginH-5>
              <Text subheader>
                {item.firstName} {item.lastName}
              </Text>
              <Text gray FontAven marginT-5>
                User Name: {item.userName}
              </Text>
            </View>
            <View flex capital>
              <Text FontAven>{item.userType}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={otpModal}>
        <View style={styles.modal}>
          <View style={[styles.subModal, { backgroundColor: "#fff" }]}>
            <View row>
              <View flex>
                <Text subheader>Choose option</Text>
              </View>
              <View flex right>
                <TouchableOpacity
                  onPress={() => {
                    setOtpModal(false);
                    setShowConfirm(false);
                  }}
                >
                  <MaterialIcons
                    color="#181818"
                    size={actuatedNormalize(25)}
                    name="close"
                  />
                </TouchableOpacity>
              </View>
            </View>
            {resetPassword ? (
              <>
                <View style={{ position: "relative" }}>
                  <Text smallF gray FontAven>
                    Operator Password
                  </Text>
                  <TextInput
                    onChangeText={(text) => setPassword(text)}
                    style={styles.TextInput}
                    placeholder="Enter New Password"
                    secureTextEntry={showPassword}
                    autoCapitalize="none"
                    value={password}
                  />
                  <TouchableOpacity
                    style={{
                      position: "absolute",
                      top: actuatedNormalize(30),
                      right: actuatedNormalize(15),
                    }}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    {!showPassword ? (
                      <Entypo
                        color="#999999"
                        size={actuatedNormalize(20)}
                        name="eye"
                      />
                    ) : (
                      <Entypo
                        color="#999999"
                        size={actuatedNormalize(20)}
                        name="eye-with-line"
                      />
                    )}
                  </TouchableOpacity>
                </View>
                <View
                  right
                  style={{ width: width - actuatedNormalize(50) }}
                  marginT-10
                >
                  <TouchableOpacity onPress={AutoGeneratePassword}>
                    <Text underline smallF FontAven right>
                      Auto generate Password
                    </Text>
                  </TouchableOpacity>
                </View>
                {loading ? (
                  <TouchableOpacity>
                    <View
                      style={{ width: width - actuatedNormalize(50) }}
                      marginT-10
                      background-primaryColor
                      padding-20
                      center
                    >
                      <ActivityIndicator size="small" color="#fff" />
                    </View>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={ResetPassword}>
                    <View
                      style={{ width: width - actuatedNormalize(50) }}
                      marginT-10
                      background-primaryColor
                      padding-20
                      center
                    >
                      <Text whiteColor FontAven>
                        Continue
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              </>
            ) : null}
            <TouchableOpacity
              onPress={() => {
                setResetPassword(!resetPassword);
              }}
            >
              <View row centerV marginT-20>
                <View style={styles.iconBox} center>
                  <MaterialIcons
                    color="#181818"
                    size={actuatedNormalize(15)}
                    name="security"
                  />
                </View>
                <View marginH-10>
                  <Text>Reset Password</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowConfirm(!showConfirm);
              }}
            >
              <View row centerV marginT-20>
                <View style={styles.iconBox} center>
                  {item.suspendedByOwner ? (
                    <MaterialCommunityIcons
                      color="#181818"
                      size={actuatedNormalize(15)}
                      name="bookmark"
                    />
                  ) : (
                    <MaterialCommunityIcons
                      color="#181818"
                      size={actuatedNormalize(15)}
                      name="bookmark-remove"
                    />
                  )}
                </View>
                <View marginH-10>
                  {item.suspendedByOwner ? (
                    <Text numberOfLines={1}>
                      UnSuspend {item.firstName} {item.lastName}
                    </Text>
                  ) : (
                    <Text numberOfLines={1}>
                      Suspend {item.firstName} {item.lastName}
                    </Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>

            {showConfirm ? (
              <View padding-10 centerV flex>
                <View right row centerV>
                  {item.suspendedByOwner ? (
                    <Text numberOfLines={1}>
                      Are you Sure UnSuspend {item.firstName} {item.lastName}
                    </Text>
                  ) : (
                    <Text numberOfLines={1}>
                      Are you Sure Suspend {item.firstName} {item.lastName}
                    </Text>
                  )}
                  <View
                    center
                    style={styles.btn}
                    background-primaryColor
                    marginH-10
                  >
                    {loading ? (
                      <TouchableOpacity>
                        <ActivityIndicator size="small" color="#fff" />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          if (item.suspendedByOwner) {
                            unSuspendOperator();
                          } else {
                            suspendOperator();
                          }
                        }}
                      >
                        <Text whiteColor>Confirm</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
            ) : null}
          </View>
        </View>
        <Toast
          visible={toastVisible}
          position={"bottom"}
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
  TextInput: {
    height: 50,
    marginTop: actuatedNormalize(5),
    width: width - actuatedNormalize(50),
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: actuatedNormalize(5),
    padding: actuatedNormalize(10),
  },
  card: {
    marginTop: actuatedNormalize(10),
    height: actuatedNormalize(100),
    width: width - actuatedNormalize(50),
    overflow: "hidden",
    backgroundColor: "white",
    borderWidth: actuatedNormalize(1),
    borderColor: "#edf5fc",
    borderRadius: actuatedNormalize(5),
    ...elevate(2),
  },
  btn: {
    width: actuatedNormalize(100),
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
  subModal: {
    flex: 1,
    marginTop: height / 3,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: actuatedNormalize(20),
  },
  modal: {
    flex: 1,
    height: height / actuatedNormalize(10),
    backgroundColor: "rgba(28, 28, 28, 0.5)",
  },
  iconBox: {
    height: actuatedNormalize(30),
    width: actuatedNormalize(30),
    backgroundColor: "#F6F6F6",
    borderRadius: actuatedNormalize(5),
  },
};
