import React, { useState, useContext } from "react";
import {
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  Modal,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import PhoneCode from "react-native-phone-input";
import Code from "../../components/PhoneCode";
import { Entypo } from "@expo/vector-icons";
import { actuatedNormalize } from "../../components/FontResponsive";
import { View, Text, Incubator, Badge, Colors } from "react-native-ui-lib";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { SignUp, ActivateUser } from "../../APIs";
const { Toast } = Incubator;
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext, SplashscreenContext } from "../../context/index";
import { elevate } from "react-native-elevate";

const { width, height } = Dimensions.get("window");

export default function SignUpScreen(props) {
  const [auth, setAuth] = useContext(AuthContext);
  const [splashScreen, setSplashScreen] = useContext(SplashscreenContext);
  const [phoneNumber, setPhoneNumber] = useState("+234");
  const [otpModal, setOtpModal] = useState(false);
  const [activationCode, setActivationCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [toastColor, setToastColor] = useState("red");
  const [serverMessage, setServerMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const GetCode = (payload) => {
    let Obj = Code.Data;
    let codes = Object.values(Obj);
    let index = codes.filter((code) => code.cc == payload.toUpperCase());
    let num = index[0].code;
    setNumberCode(num);
  };

  const signUp = () => {
    if (firstName == "") {
      setToastColor("red");
      setToastVisible(true);
      setServerMessage("First Name is required");
      return;
    }
    if (lastName == "") {
      setToastColor("red");
      setToastVisible(true);
      setServerMessage("Last Name is required");
      return;
    }
    if (email == "") {
      setToastColor("red");
      setToastVisible(true);
      setServerMessage("email is required");
      return;
    }
    if (password == "") {
      setToastColor("red");
      setToastVisible(true);
      setServerMessage("Password is required");
      return;
    }
    if (phoneNumber == "") {
      setToastColor("red");
      setToastVisible(true);
      setServerMessage("phoneNumber is required");
      return;
    }
    setLoading(true);
    axios
      .post(`${SignUp}`, {
        password: password,
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
      })
      .then((res) => {
        setToastColor("green");
        setOtpModal(true);
        setToastVisible(true);
        setServerMessage(res.data.message);
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

  const activateAccount = (code) => {
    setOtpModal(false);
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
        console.log(res.data);
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
    } catch (err) {
      console.log(err);
      setServerMessage("something went wrong");
    }
  };

  return (
    <View flex background-whiteColor>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        enabled
      >
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
            <Text marginH-20 subheading primaryColor>
              Get Started
            </Text>
            <View center>
              <View marginT-20>
                <Text smallF>First Name</Text>
                <TextInput
                  onChangeText={(text) => setFirstName(text)}
                  style={styles.TextInput}
                  placeholder="Enter First Name"
                />
              </View>
              <View marginT-20>
                <Text smallF>Last Name</Text>
                <TextInput
                  onChangeText={(text) => setLastName(text)}
                  style={styles.TextInput}
                  placeholder="Enter Last Name"
                />
              </View>
              <View marginT-20>
                <Text smallF>Email</Text>
                <TextInput
                  onChangeText={(text) => setEmail(text)}
                  style={styles.TextInput}
                  placeholder="Enter Email"
                  textContentType="emailAddress"
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.blockPhone} marginT-20>
                <Text smallF>Phone Number</Text>
                <PhoneCode
                  flagStyle={{ margin: 5 }}
                  allowZeroAfterCountryCode={false}
                  value={phoneNumber}
                  textStyle={{ color: "black" }}
                  initialCountry="ng"
                  onChangePhoneNumber={(y) => setPhoneNumber(y)}
                  onSelectCountry={(tx) => {
                    GetCode(tx);
                  }}
                />
              </View>
              <View marginT-20 style={{ position: "relative" }}>
                <Text smallF>Password</Text>
                <TextInput
                  onChangeText={(text) => setPassword(text)}
                  style={styles.TextInput}
                  placeholder="Enter Password"
                  secureTextEntry={showPassword}
                  autoCapitalize="none"
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
                    color="#181818"
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
                    <Text whiteColor>processing...</Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    signUp();
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
            </View>

            <View center row marginT-50>
              <View style={styles.line} />
              <Text>OR</Text>
              <View style={styles.line} />
            </View>
            <TouchableOpacity
              onPress={() => {
                props.navigation.pop();
              }}
            >
              <Text marginT-20 center underline subheader>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Modal animationType="slide" transparent={true} visible={otpModal}>
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
            <OTPInputView
              style={{
                width: "80%",
                height: actuatedNormalize(50),
              }}
              pinCount={6}
              //code={activationCode} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              // onCodeChanged={(code) => {setActivationCode({ code });}}
              autoFocusOnLoad
              codeInputFieldStyle={[
                styles.underlineStyleBase,
                { color: "#181818" },
              ]}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              onCodeFilled={(code) => {
                activateAccount(code);
              }}
            />
            <TouchableOpacity onPress={() => setOtpModal(false)}>
              <Text marginT-50 body>
                Resend
              </Text>
            </TouchableOpacity>
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
};
