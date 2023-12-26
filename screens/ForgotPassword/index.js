import React, { useState } from "react";
import {
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  Modal,
  Image,
  ActivityIndicator,
} from "react-native";
import { actuatedNormalize } from "../../components/FontResponsive";
import { View, Text, Colors, Badge, Incubator } from "react-native-ui-lib";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { elevate } from "react-native-elevate";
import axios from "axios";
import { ResetPassword, ConfirmResetPassword } from "../../APIs";
const { Toast } = Incubator;
import { Entypo, MaterialIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function ForgotPassword(props) {
  const [otpModal, setOtpModal] = useState(false);
  const [email, setEmail] = useState("");
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
        //setOtpModal(true);
        setToastVisible(true);
        setServerMessage(res.data.message);
        props.navigation.push("OTPScreen", {
          screenType: "ForgotPassword",
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

  return (
    <View flex background-whiteColor>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
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
            Forgot Password
          </Text>
          <View center>
            <View marginT-20>
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
                  resetPassword();
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

          <View center row marginT-50>
            <View style={styles.line} />
            <Text FontAven>OR</Text>
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
  sos: {
    height: width / 4,
    width: width / 4,
    borderRadius: actuatedNormalize(100),
    backgroundColor: Colors.whiteColor,
    overflow: "hidden",
    ...elevate(2),
  },
};
