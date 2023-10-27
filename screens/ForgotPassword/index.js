import React, { useState } from "react";
import {
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  Modal,
} from "react-native";
import { actuatedNormalize } from "../../components/FontResponsive";
import { View, Text, Colors, Badge, Incubator } from "react-native-ui-lib";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ResetPassword, ConfirmResetPassword } from "../../APIs";
const { Toast } = Incubator;

const { width, height } = Dimensions.get("window");

export default function ForgotPassword(props) {
  const [otpModal, setOtpModal] = useState(false);
  const [activationCode, setActivationCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toastVisible, setToastVisible] = useState("");
  const [toastColor, setToastColor] = useState("red");
  const [serverMessage, setServerMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const resetPassword = () => {
    if (email == "") {
      setToastColor("red");
      setToastVisible(true);
      setServerMessage("email is required");
      return;
    }
    setLoading(true);
    axios
      .put(`${ResetPassword}`, {
        email: email,
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
    console.log(activationCode);

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
        saveLoginDetails(loginDetails);
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

  const saveLoginDetails = async (loginDetails) => {
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
    <View flex background-whiteColor>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.block} centerV>
          <Text center subheading primaryColor>
            Forgot Password
          </Text>
          <View center>
            <View marginT-20>
              <Text smallF>Email</Text>
              <TextInput
                onChangeText={(text) => setEmail(text)}
                style={styles.TextInput}
                placeholder="Enter Email"
              />
            </View>

            {loading ? (
              <TouchableOpacity>
                <View
                  style={styles.btn}
                  background-primaryColor
                  center
                  marginT-40
                >
                  <Text whiteColor>Processing...</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  resetPassword();
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
            <Text marginT-20 center subheader underline>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal animationType="slide" transparent={true} visible={otpModal}>
        <View style={styles.modal}>
          <View centerH style={[styles.subModal, { backgroundColor: "#fff" }]}>
            <Text marginV-20 subheading>
              Enter OTP
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
              autoFocusOnLoad
              codeInputFieldStyle={[
                styles.underlineStyleBase,
                { color: "#181818" },
              ]}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
            />

            <View marginT-20>
              <Text smallF>New Password</Text>
              <TextInput
                onChangeText={(text) => setPassword(text)}
                style={styles.TextInput}
                placeholder="Enter New Password"
                secureTextEntry
              />
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
};
