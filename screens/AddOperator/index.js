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
  Platform,
} from "react-native";

import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
import { actuatedNormalize } from "../../components/FontResponsive";
import { View, Text, Incubator, Badge, Colors } from "react-native-ui-lib";
import { AddOperator } from "../../APIs";
const { Toast } = Incubator;
import AsyncStorage from "@react-native-async-storage/async-storage";
import SOS from "../../components/Sos";
import PhoneCode from "react-native-phone-input";
import Code from "../../components/PhoneCode";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import axios from "axios";
import { Country, State, City } from "country-state-city";

import { elevate } from "react-native-elevate";
import RNPickerSelect from "react-native-picker-select";

const { width, height } = Dimensions.get("window");

export default function AddOperatorScreen(props) {
  const [role, setRole] = useState("");
  const [addressState, setAddressState] = useState("");
  const [listState, setListState] = useState("");
  const [localGovt, setLocalGovt] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [toastVisible, setToastVisible] = useState("");
  const [toastColor, setToastColor] = useState("red");
  const [serverMessage, setServerMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = React.useState("");
  const [phoneNumber, setPhoneNumber] = useState("+234");
  const [numberCode, setNumberCode] = useState("+234");
  const [img, setImage] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [nextOfKinPhoneNumber, setNextOfKinPhoneNumber] = useState("");
  const [nextOfKinFullName, setNextOfKinFullName] = useState("");

  useEffect(() => {
    async function fetchStoresData() {
      function transformArray(array) {
        return array.map((item) => {
          return {
            label: item.name,
            value: item.name,
          };
        });
      }
      let listedState = State.getStatesOfCountry("NG");

      const transformedData = transformArray(listedState);
      setListState(transformedData);
      let loginToken = await AsyncStorage.getItem("token");
      setToken(JSON.parse(loginToken));
    }
    fetchStoresData();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.image,
      allowsEditing: false,
      quality: 0.8,
    });
    if (!result.cancelled) {
      const manipResult = await ImageManipulator.manipulateAsync(
        result.uri,
        [{ resize: { width: 1000 } }],
        { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
      );
      setImage(manipResult.uri);
    }
  };

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

  const GetCode = (payload) => {
    let Obj = Code.Data;
    let codes = Object.values(Obj);
    let index = codes.filter((code) => code.cc == payload.toUpperCase());
    let num = index[0].code;
    setNumberCode(num);
  };

  const dropDownIcon = () => {
    return (
      <View
        style={{
          backgroundColor: "transparent",
          borderTopWidth: 10,
          borderTopColor: "#181818",
          borderRightWidth: 10,
          borderRightColor: "transparent",
          borderLeftWidth: 10,
          borderLeftColor: "transparent",
          width: 0,
          height: 0,
        }}
      />
    );
  };

  const addOperator = () => {
    if (firstName == "") {
      setToastColor("red");
      setToastVisible(true);
      setServerMessage("First Name is required");
      return;
    }
    if (lastName == "") {
      setToastColor("red");
      setToastVisible(true);
      setServerMessage("last Name is required");
      return;
    }
    if (userName == "") {
      setToastColor("red");
      setToastVisible(true);
      setServerMessage("userName is required");
      return;
    }
    if (localGovt == "") {
      setToastColor("red");
      setToastVisible(true);
      setServerMessage("localGovt is required");
      return;
    }
    if (addressState == "") {
      setToastColor("red");
      setToastVisible(true);
      setServerMessage("State is required");
      return;
    }

    if (role == "") {
      setToastColor("red");
      setToastVisible(true);
      setServerMessage("role is required");
      return;
    }

    if (phoneNumber == "") {
      setToastColor("red");
      setToastVisible(true);
      setServerMessage("phoneNumber is required");
      return;
    }
    if (password == "") {
      setToastColor("red");
      setToastVisible(true);
      setServerMessage("operator password is required");
      return;
    }
    if (img == "") {
      setToastColor("red");
      setToastVisible(true);
      setServerMessage("Valid ID Card is required");
      return;
    }

    if (nextOfKinFullName == "") {
      setToastColor("red");
      setToastVisible(true);
      setServerMessage("Next Of Kin FullName is required");
      return;
    }

    if (nextOfKinPhoneNumber == "") {
      setToastColor("red");
      setToastVisible(true);
      setServerMessage("next Of Kin PhoneNumber is required");
      return;
    }

    let localUri = img;
    let filename = localUri.split("/").pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    const formData = new FormData();

    formData.append("image", {
      uri: localUri,
      name: filename,
      type: type,
    });
    formData.append("password", password);
    formData.append("phoneNumber", phoneNumber);
    formData.append("userType", role);
    formData.append("state", addressState);
    formData.append("localGovt", localGovt);
    formData.append("lastName", lastName);
    formData.append("firstName", firstName);
    formData.append("userName", userName);
    formData.append("nextOfKinPhoneNumber", nextOfKinPhoneNumber);
    formData.append("nextOfKinFullName", nextOfKinFullName);

    setLoading(true);
    axios
      .post(`${AddOperator}`, formData, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        setToastColor("green");
        setToastVisible(true);
        setServerMessage(res.data.message);
        props.navigation.replace("Operator");
      })
      .catch((err) => {
        setToastColor("red");
        setToastVisible(true);
        console.log(err);
        setServerMessage(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
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
        <View flex-2 center>
          <Text subheading numberOfLines={1}>
            Add Operator
          </Text>
        </View>
        <View right flex>
          <SOS />
        </View>
      </View>
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
          <View style={styles.block} centerH paddingB-90>
            <View marginT-20>
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
                placeholder="Enter First Name"
              />
            </View>
            <View marginT-20 style={{ position: "relative" }}>
              <Text smallF gray FontAven>
                UserName(For Login)
              </Text>
              <TextInput
                onChangeText={(text) => setUserName(text)}
                style={styles.TextInput}
                placeholder="Enter UserName"
              />
              <View
                style={{
                  position: "absolute",
                  top: actuatedNormalize(30),
                  right: actuatedNormalize(10),
                }}
              >
                <Entypo
                  color="#999999"
                  size={actuatedNormalize(20)}
                  name="email"
                />
              </View>
            </View>

            <View marginT-20 style={{ position: "relative" }}>
              <Text smallF gray FontAven>
                Operator Password
              </Text>
              <TextInput
                onChangeText={(text) => setPassword(text)}
                style={styles.TextInput}
                placeholder="Enter Password"
                secureTextEntry={showPassword}
                autoCapitalize="none"
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

            <View marginT-20 style={styles.AreaOfOperation}>
              <Text smallF gray FontAven marginB-5>
                Select Role*
              </Text>
            </View>
            <View style={styles.selectField}>
              <RNPickerSelect
                onValueChange={(text) => setRole(text)}
                items={[
                  { label: "Captain", value: "captain" },
                  { label: "Deckhand", value: "deckhand" },
                ]}
                style={{
                  ...pickerSelectStyles,
                  iconContainer: {
                    top: actuatedNormalize(10),
                    right: actuatedNormalize(0),
                  },
                  placeholder: {
                    color: "gray",
                    fontSize: 16,
                  },
                }}
                placeholder={{
                  label: "Select Role*",
                  value: null,
                  color: "gray",
                }}
                Icon={Platform.OS === "ios" ? dropDownIcon : null}
              />
            </View>
            <View marginT-20 style={styles.AreaOfOperation}>
              <Text smallF gray FontAven marginB-5>
                Select State Origin*
              </Text>
            </View>
            <View style={styles.selectField}>
              <RNPickerSelect
                onValueChange={(text) => setAddressState(text)}
                items={listState}
                style={{
                  ...pickerSelectStyles,
                  iconContainer: {
                    top: actuatedNormalize(10),
                    right: actuatedNormalize(0),
                  },
                  placeholder: {
                    color: "gray",
                    fontSize: 16,
                  },
                }}
                placeholder={{
                  label: "Select State Of Origin*",
                  value: null,
                  color: "gray",
                }}
                Icon={Platform.OS === "ios" ? dropDownIcon : null}
              />
            </View>

            <View marginT-20>
              <Text smallF gray FontAven>
                Local Govt
              </Text>
              <TextInput
                onChangeText={(text) => setLocalGovt(text)}
                style={styles.TextInput}
                placeholder="Enter LocalGovt"
              />
            </View>

            <View marginT-20>
              <Text subheader numberOfLines={1}>
                Next Of Kin Details
              </Text>
              <View marginT-10>
                <Text smallF gray FontAven>
                  Full Name
                </Text>
                <TextInput
                  onChangeText={(text) => setNextOfKinFullName(text)}
                  style={styles.TextInput}
                  placeholder="Enter Next Of Kin Full Name"
                />
              </View>
              <View style={styles.blockPhone} marginT-20>
                <Text smallF gray FontAven>
                  Phone Number
                </Text>
                <PhoneCode
                  flagStyle={{ margin: 5 }}
                  allowZeroAfterCountryCode={false}
                  value={nextOfKinPhoneNumber}
                  textStyle={{ color: "black" }}
                  initialCountry="ng"
                  onChangePhoneNumber={(y) => setNextOfKinPhoneNumber(y)}
                  onSelectCountry={(tx) => {
                    GetCode(tx);
                  }}
                />
              </View>
            </View>

            <View style={styles.card} background-whiteColorF>
              <View flex paddingT-20>
                <Text subheader numberOfLines={1}>
                  Upload Operator Photo*
                </Text>
                <View row marginT-30>
                  <View flex-2>
                    <Text smallF2 FontAven>
                      Image should be in png, pdf or jpeg
                    </Text>

                    <TouchableOpacity onPress={() => pickImage()}>
                      <View
                        center
                        marginT-40
                        style={styles.btn2}
                        background-blackColor
                      >
                        <Text whiteColor smallF>
                          Choose File
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View flex right>
                    <View center style={styles.sos2}>
                      {img ? (
                        <View flex center>
                          <Image
                            source={{
                              uri: img,
                            }}
                            style={{
                              height: width / 5,
                              width: width / 5,
                            }}
                            resizeMode="contain"
                          />
                        </View>
                      ) : (
                        <FontAwesome
                          color="#999999"
                          size={actuatedNormalize(55)}
                          name="photo"
                        />
                      )}
                    </View>
                  </View>
                </View>
              </View>
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
                  addOperator();
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
    width: width,
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
    width: width - actuatedNormalize(50),
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: actuatedNormalize(5),
    padding: actuatedNormalize(10),
  },
  card: {
    marginTop: actuatedNormalize(20),
    minHeight: height / 5,
    width: width - actuatedNormalize(50),
    borderRadius: actuatedNormalize(10),
    overflow: "hidden",
    padding: actuatedNormalize(10),
    //backgroundColor: "#f0f8fc",
  },
  btn2: {
    width: width / 2,
    padding: actuatedNormalize(10),
    borderRadius: actuatedNormalize(5),
    ...elevate(4),
  },
  sos2: {
    justifyContent: "center",
    height: width / 5,
    width: width / 5,
    borderWidth: 1,
    borderRadius: actuatedNormalize(5),
    borderStyle: "dashed",
    borderColor: "#181818",
    overflow: "hidden",
  },
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 0,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 10,
    color: "#181818",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    height: 0,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    color: "#181818",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
