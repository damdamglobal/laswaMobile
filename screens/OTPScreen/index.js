import React, { useState, useContext, useEffect } from "react";
import {
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  Modal,
  Image,
  KeyboardAvoidingView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { actuatedNormalize } from "../../components/FontResponsive";
import { View, Text, Incubator, Badge, Colors } from "react-native-ui-lib";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { ConfirmResetPassword, ActivateUser } from "../../APIs";
const { Toast } = Incubator;
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  AuthContext,
  SplashscreenContext,
  OnboardingScreenContext,
} from "../../context/index";
import { elevate } from "react-native-elevate";
const { width, height } = Dimensions.get("window");

export default OTPComponent = (props) => {
  const [auth, setAuth] = useContext(AuthContext);
  const [splashScreen, setSplashScreen] = useContext(SplashscreenContext);
  const [onboard, setOnboard] = React.useContext(OnboardingScreenContext);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [toastColor, setToastColor] = useState("red");
  const [serverMessage, setServerMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [screenType, setScreenType] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [activationCode, setActivationCode] = useState("");

  useEffect(() => {
    async function fetchStoresData() {
      if (props.route.params) {
        if (props.route.params.email) {
          setEmail(props.route.params.email);
        }
        if (props.route.params.password) {
          setPassword(props.route.params.password);
        }
        if (props.route.params.screenType) {
          setScreenType(props.route.params.screenType);
        }
      }
    }
    fetchStoresData();
  }, []);

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
      setSplashScreen(false);
      setAuth(false);
      setOnboard(false);
    } catch (err) {
      console.log(err);
      setServerMessage("something went wrong");
    }
  };

  const activateAccount = (code) => {
    setLoading(true);
    axios
      .post(`${ActivateUser}`, {
        activationCode: code,
        email: email,
      })
      .then((res) => {
        setToastColor("green");
        setServerMessage("sign up success");
        setToastVisible(true);
        let loginDetails = {
          email: email,
          password: password,
        };
        saveLoginDetails(res, loginDetails);
      })
      .catch((err) => {
        console.log(err);
        setToastColor("red");
        setToastVisible(true);
        setServerMessage(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const confirmResetPassword = () => {
    if (email == "") {
      setToastColor("red");
      setToastVisible(true);
      setServerMessage("email is required");
      return;
    }
    if (password == "") {
      setToastColor("red");
      setToastVisible(true);
      setServerMessage("password is required");
      return;
    }
    if (activationCode.code == "") {
      setToastColor("red");
      setToastVisible(true);
      setServerMessage("activationCode is required");
      return;
    }

    setLoading(true);
    axios
      .put(`${ConfirmResetPassword}`, {
        email: email,
        activationCode: activationCode.code,
        newPassword: password,
      })
      .then((res) => {
        setToastColor("green");
        setServerMessage("Password Reset Successful");
        setToastVisible(true);
        setOtpModal(false);
        let loginDetails = {
          email: email,
          password: password,
        };
        saveLoginDetail(loginDetails);
      })
      .catch((err) => {
        console.log(err.response.data);
        setToastColor("red");
        setToastVisible(true);
        setServerMessage(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const saveLoginDetail = async (loginDetails) => {
    try {
      let loginDetail = await AsyncStorage.setItem(
        "loginDetails",
        JSON.stringify(loginDetails)
      );
      props.navigation.pop();
    } catch (err) {
      setToastColor("red");
      setServerMessage("something went wrong");
      setToastVisible(true);
    }
  };

  return (
    <View flex>
      {screenType != "ForgotPassword" ? (
        <View style={styles.modal}>
          <View centerH style={[styles.subModal, { backgroundColor: "#fff" }]}>
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
            <Text marginT-20 subheading primaryColor>
              Enter OTP
            </Text>

            <Text smallF primaryColor marginB-10>
              sent to {email}
            </Text>
            <OTPInputView
              style={{
                width: "80%",
                height: actuatedNormalize(50),
              }}
              pinCount={6}
              //code={activationCode} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              // onCodeChanged={(code) => {setActivationCode({ code });}}
              codeInputFieldStyle={[
                styles.underlineStyleBase,
                { color: "#181818" },
              ]}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              onCodeFilled={(code) => {
                activateAccount(code);
              }}
            />
            <TouchableOpacity onPress={() => props.navigation.pop()}>
              <Text marginT-50 body underLine FontAven>
                Resend
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.modal}>
          <View centerH style={[styles.subModal, { backgroundColor: "#fff" }]}>
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
              Enter OTP
            </Text>
            <Text smallF primaryColor marginB-10>
              sent to {email}
            </Text>
            <OTPInputView
              style={{
                width: "80%",
                height: actuatedNormalize(50),
              }}
              pinCount={6}
              //code={activationCode} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              onCodeChanged={(code) => {
                setActivationCode({ code });
              }}
              codeInputFieldStyle={[
                styles.underlineStyleBase,
                { color: "#181818" },
              ]}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
            />

            <View marginT-20 style={{ position: "relative" }}>
              <Text smallF gray FontAven>
                New Password
              </Text>
              <TextInput
                onChangeText={(text) => setPassword(text)}
                style={styles.TextInput}
                placeholder="Enter New Password"
                autoCapitalize="none"
                secureTextEntry={showPassword}
              />
              <TouchableOpacity
                style={{
                  position: "absolute",
                  top: actuatedNormalize(30),
                  right: actuatedNormalize(10),
                }}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Entypo
                  color="#999999"
                  size={actuatedNormalize(20)}
                  name="eye-with-line"
                />
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
                  confirmResetPassword();
                }}
              >
                <View
                  style={styles.btn}
                  background-primaryColor
                  center
                  marginT-40
                >
                  <Text whiteColor>Submit</Text>
                </View>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => props.navigation.pop()}>
              <Text marginT-50 body FontAven underLine>
                Resend
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
};

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
  textArea: {
    height: 80,
    marginTop: actuatedNormalize(5),
    width: width - actuatedNormalize(50),
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: actuatedNormalize(5),
    padding: actuatedNormalize(10),
    justifyContent: "flex-start",
    textAlignVertical: "top",
  },
  AreaOfOperation: {
    width: width - actuatedNormalize(50),
  },
  btn: {
    width: width - actuatedNormalize(50),
    padding: actuatedNormalize(20),
    borderRadius: actuatedNormalize(10),
  },
  block: {
    minHeight: height,
  },
  blockPhone: {
    width: width - actuatedNormalize(50),
    borderColor: "gray",
    borderWidth: 1,
    padding: actuatedNormalize(5),
    borderRadius: actuatedNormalize(5),
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
  selectField: {
    height: 50,
    marginTop: actuatedNormalize(5),
    width: width - actuatedNormalize(50),
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: actuatedNormalize(5),
    padding: actuatedNormalize(10),
  },
};
