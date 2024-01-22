import React, { useState, useContext, useEffect } from "react";
import {
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  Image,
  ActivityIndicator,
} from "react-native";
import { actuatedNormalize } from "../../components/FontResponsive";
import { View, Text, Colors, Badge, Incubator } from "react-native-ui-lib";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Login } from "../../APIs";
import {
  AuthContext,
  SplashscreenContext,
  ActivitiesHandleContext,
} from "../../context/index";
import { elevate } from "react-native-elevate";

const { TextField, Toast } = Incubator;

const { width, height } = Dimensions.get("window");

export default function LoginScreen(props) {
  const [auth, setAuth] = useContext(AuthContext);
  const [mainScreen, setSplashScreen] = useContext(SplashscreenContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  const {
    toastVisible,
    setToastVisible,
    loading,
    setLoading,
    toastColor,
    setToastColor,
    serverMessage,
    setServerMessage,
  } = useContext(ActivitiesHandleContext);

  useEffect(() => {
    async function fetchStoresData() {
      let value = await AsyncStorage.getItem("loginDetails");
      if (value) {
        let loginDetails = JSON.parse(value);
        setEmail(loginDetails.email);
      }
    }
    fetchStoresData();
  }, []);

  const LoginFun = async () => {
    setServerMessage("");
    if (!email) {
      setServerMessage("Email is required");
      setToastVisible(true);
      return;
    }
    if (!password) {
      setServerMessage("Password is required");
      setToastVisible(true);
      return;
    }
    setLoading(true);
    axios
      .put(`${Login}`, { email: email, password: password })
      .then((res) => {
        let loginDetails = {
          email: email,
          password: password,
        };
        saveLoginDetails(res, loginDetails);
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

  const saveLoginDetails = async (res, loginDetails) => {
    try {
      let user = await AsyncStorage.setItem(
        "user",
        JSON.stringify(res.data.profile)
      );
      let loginDetail = await AsyncStorage.setItem(
        "loginDetails",
        JSON.stringify(loginDetails)
      );
      let token = await AsyncStorage.setItem(
        "token",
        JSON.stringify(res.data.token)
      );
      // setMainScreen(true);
      setSplashScreen(false);
      setAuth(false);
    } catch (err) {
      console.log(err);
      setServerMessage("something went wrong");
    }
  };

  return (
    <View flex background-whiteColor>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.block} centerV>
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

          <Text subheading primaryColor marginT-20 marginH-20>
            Login
          </Text>
          <View center>
            <View marginT-20>
              <Text smallF gray FontAven>
                Email/UserName
              </Text>
              <TextInput
                onChangeText={(text) => setEmail(text)}
                style={styles.TextInput}
                placeholder="Enter Email Or UserName"
                autoCapitalize="none"
                textContentType="emailAddress"
                value={email}
              />
            </View>

            <View marginT-20 style={{ position: "relative" }}>
              <Text smallF gray FontAven>
                Password
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
                  LoginFun();
                }}
              >
                <View
                  style={styles.btn}
                  background-primaryColor
                  center
                  marginT-40
                >
                  <Text whiteColor FontAven>
                    Submit
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>

          <View right marginH-25>
            <TouchableOpacity
              onPress={() => {
                props.navigation.push("ForgotPassword");
              }}
            >
              <Text marginT-20 underline FontAven>
                Forgot Password
              </Text>
            </TouchableOpacity>
          </View>
          <View center row marginT-50>
            <View style={styles.line} />
            <Text FontAven>Or</Text>
            <View style={styles.line} />
          </View>
          <TouchableOpacity
            onPress={() => {
              props.navigation.push("Signup");
            }}
          >
            <Text marginT-20 center smallF underline primaryColor>
              Are you a Boat owner? Register
            </Text>
          </TouchableOpacity>
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
      </ScrollView>
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
  sos: {
    height: width / 6,
    width: width / 6,
    borderRadius: actuatedNormalize(100),
    backgroundColor: Colors.whiteColor,
    overflow: "hidden",
    ...elevate(2),
  },
  input: {
    backgroundColor: "white",
    padding: actuatedNormalize(10),
    borderRadius: actuatedNormalize(50),
    marginVertical: actuatedNormalize(10),
    minHeight: actuatedNormalize(50),
    justifyContent: "center",
    ...elevate(4),
  },
};
