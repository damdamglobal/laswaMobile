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
import { elevate } from "react-native-elevate";
import RNPickerSelect from "react-native-picker-select";

const { width, height } = Dimensions.get("window");

export default function SignUpScreen(props) {
  const [phoneNumber, setPhoneNumber] = useState("+234");
  const [otpModal, setOtpModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [toastColor, setToastColor] = useState("red");
  const [serverMessage, setServerMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [residentialAddress, setResidentialAddress] = useState(true);
  const [areaOfOperation, setAreaOfOperation] = useState("");
  const [profileType, setProfileType] = useState("Company");

  useEffect(() => {
    async function fetchStoresData() {
      if (props.route.params) {
        if (props.route.params.profileType) {
          setProfileType(props.route.params.profileType);
        }
      }
    }
    fetchStoresData();
  }, []);

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
    if (password != confirmPassword) {
      setToastColor("red");
      setToastVisible(true);
      setServerMessage("Password don't match");
      return;
    }
    if (phoneNumber == "") {
      setToastColor("red");
      setToastVisible(true);
      setServerMessage("phoneNumber is required");
      return;
    }

    if (residentialAddress == "") {
      setToastColor("red");
      setToastVisible(true);
      setServerMessage("Residential Address is required");
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
        residentialAddress: residentialAddress,
        areaOfOperation: areaOfOperation,
        profileType: profileType,
      })
      .then((res) => {
        setToastColor("green");
        setOtpModal(true);
        setToastVisible(true);
        setServerMessage(res.data.message);
        props.navigation.push("OTPScreen", {
          screenType: "Signup",
          email: email,
        });
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

  const isValidEmail = () => {
    if (email == "") {
      return true;
    }
    // Regular expression pattern for basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
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
            <View center marginB-10>
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
            <View row bottom>
              <Text marginL-20 subheading primaryColor>
                Get Started
              </Text>
            </View>
            <View center>
              <View marginT-10>
                <Text smallF gray FontAven>
                  First Name
                </Text>
                <TextInput
                  onChangeText={(text) => setFirstName(text)}
                  style={styles.TextInput}
                  placeholder="Enter First Name"
                />
              </View>
              <View marginT-20>
                <Text smallF gray FontAven>
                  Last Name
                </Text>
                <TextInput
                  onChangeText={(text) => setLastName(text)}
                  style={styles.TextInput}
                  placeholder="Enter Last Name"
                />
              </View>
              <View marginT-20 style={{ position: "relative" }}>
                <Text smallF gray FontAven>
                  Email
                </Text>
                <TextInput
                  onChangeText={(text) => setEmail(text)}
                  style={styles.TextInput}
                  placeholder="Enter Email"
                  textContentType="emailAddress"
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    top: actuatedNormalize(30),
                    right: actuatedNormalize(10),
                  }}
                >
                  <Entypo
                    color="#999999"
                    size={actuatedNormalize(20)}
                    name="mail"
                  />
                </TouchableOpacity>
              </View>

              {!isValidEmail() ? (
                <View marginT-2 right>
                  <Text smallF errorColor FontAven>
                    Invalid email
                  </Text>
                </View>
              ) : null}
              <View style={styles.blockPhone} marginT-20>
                <Text smallF gray FontAven>
                  Phone Number
                </Text>
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
              <View marginT-20>
                <Text smallF gray FontAven>
                  Residential address
                </Text>
                <TextInput
                  multiline={true}
                  numberOfLines={4}
                  onChangeText={(text) => setResidentialAddress(text)}
                  style={styles.textArea}
                  placeholder="Enter Residential address"
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
                  Confirm Password
                </Text>
                <TextInput
                  onChangeText={(text) => setConfirmPassword(text)}
                  style={styles.TextInput}
                  placeholder="Enter Confirm Password"
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
              {confirmPassword && confirmPassword != password ? (
                <View marginT-2 right>
                  <Text smallF errorColor FontAven>
                    Password don't match
                  </Text>
                </View>
              ) : null}

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
                    signUp();
                  }}
                >
                  <View
                    style={styles.btn}
                    background-primaryColor
                    center
                    marginT-40
                  >
                    <Text whiteColor FontAven>
                      Next
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>

            <View center row marginT-50>
              <View style={styles.line} />
              <Text FontAven>Or</Text>
              <View style={styles.line} />
            </View>
            <TouchableOpacity
              onPress={() => {
                props.navigation.push("Login");
              }}
            >
              <Text marginT-20 center underline subheader>
                Login
              </Text>
            </TouchableOpacity>
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
      </KeyboardAvoidingView>
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
    height: width / 6,
    width: width / 6,
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
