import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  Modal,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import { actuatedNormalize } from "../../components/FontResponsive";
import { View, Text, Colors, Badge, Incubator } from "react-native-ui-lib";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { elevate } from "react-native-elevate";
import axios from "axios";
import { ChangePassword } from "../../APIs";
const { Toast } = Incubator;
import { Entypo, AntDesign } from "@expo/vector-icons";
import SOS from "../../components/Sos";
import { AuthContext } from "../../context/index";

const { width, height } = Dimensions.get("window");

export default function ForgotPassword(props) {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [toastVisible, setToastVisible] = useState("");
  const [toastColor, setToastColor] = useState("red");
  const [serverMessage, setServerMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [token, setToken] = useState("");
  const [auth, setAuth] = React.useContext(AuthContext);

  useEffect(() => {
    async function fetchStoresData() {
      let loginToken = await AsyncStorage.getItem("token");
      setToken(JSON.parse(loginToken));
    }

    fetchStoresData();
  }, []);

  const changePassword = () => {
    if (!password && !newPassword) {
      setServerMessage("fill all the required field");
      setToastColor("red");
      setToastVisible(true);
      return;
    }
    setLoading(true);
    axios
      .put(
        `${ChangePassword}`,
        {
          oldPassword: password,
          newPassword: newPassword,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => {
        setToastColor("green");
        setToastVisible(true);
        setServerMessage(res.data.message);
        logOut();
      })
      .catch((err) => {
        setToastColor("red");
        setToastVisible(true);
        setServerMessage(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const logOut = async () => {
    let loginDetailObj = {
      email: "",
      password: "",
    };

    let value = await AsyncStorage.getItem("loginDetails");
    if (value) {
      let loginDetails = JSON.parse(value);
      loginDetailObj.email = loginDetails.email;
    }

    let loginDetail = await AsyncStorage.setItem(
      "loginDetails",
      JSON.stringify(loginDetailObj)
    );

    setAuth(true);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled
    >
      <View flex background-whiteColor>
        <View row centerV marginH-20>
          <View flex>
            <TouchableOpacity onPress={() => props.navigation.pop()}>
              <AntDesign
                color="#181818"
                size={actuatedNormalize(20)}
                name="left"
              />
            </TouchableOpacity>
          </View>
          <View flex-2 center></View>
          <View right flex>
            <SOS />
          </View>
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.block} marginT-100>
            <View center>
              <View center style={styles.sos}>
                <Image
                  source={require("../../assets/splashq.png")}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </View>
            </View>
            <Text marginH-20 subheading primaryColor>
              Change Password
            </Text>
            <View center>
              <View marginT-20 style={{ position: "relative" }}>
                <Text smallF gray FontAven>
                  Old Password
                </Text>
                <TextInput
                  onChangeText={(text) => setPassword(text)}
                  style={styles.TextInput}
                  placeholder="Enter Password"
                  autoCapitalize="none"
                  secureTextEntry={showPassword}
                  value={password}
                />
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    top: actuatedNormalize(30),
                    right: actuatedNormalize(10),
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
              <View marginT-20 style={{ position: "relative" }}>
                <Text smallF gray FontAven>
                  New Password
                </Text>
                <TextInput
                  onChangeText={(text) => setNewPassword(text)}
                  style={styles.TextInput}
                  placeholder="Enter Password"
                  autoCapitalize="none"
                  secureTextEntry={showPassword}
                  value={newPassword}
                />
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    top: actuatedNormalize(30),
                    right: actuatedNormalize(10),
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
                    changePassword();
                  }}
                >
                  <View
                    style={styles.btn}
                    background-primaryColor
                    center
                    marginT-40
                  >
                    <Text whiteColor FontAven>
                      Confirm
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </ScrollView>
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
    </KeyboardAvoidingView>
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
  btn: {
    width: width - actuatedNormalize(50),
    padding: actuatedNormalize(20),
    borderRadius: actuatedNormalize(10),
  },
  block: {
    minHeight: height,
  },
  line: {
    width: actuatedNormalize(150),
    backgroundColor: "gray",
    height: actuatedNormalize(1),
  },
  underline: {
    textDecorationLine: "underline",
  },
  subModal: {
    flex: 1,
    marginTop: height / actuatedNormalize(10),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modal: {
    flex: 1,
    height: height / actuatedNormalize(10),
    backgroundColor: "rgba(28, 28, 28, 0.5)",
  },
  sos: {
    height: width / 4,
    width: width / 4,
    borderRadius: actuatedNormalize(100),
    backgroundColor: Colors.whiteColor,
    overflow: "hidden",
    ...elevate(2),
  },
};
