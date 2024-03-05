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

import { Entypo } from "@expo/vector-icons";
import { actuatedNormalize } from "../../components/FontResponsive";
import { View, Text, Incubator, Badge, Colors } from "react-native-ui-lib";
import { SetBusinessProfile } from "../../APIs";
const { Toast } = Incubator;
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";
import { Country, State, City } from "country-state-city";
import { AuthContext } from "../../context/index";
import { elevate } from "react-native-elevate";
import RNPickerSelect from "react-native-picker-select";

const { width, height } = Dimensions.get("window");

export default function BusinessProfileScreen(props) {
  const [areaOfOperation, setAreaOfOperation] = useState("");
  const [addressState, setAddressState] = useState("");
  const [listState, setListState] = useState("");
  const [localGovt, setLocalGovt] = useState("");
  const [NIN, setNIN] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [toastVisible, setToastVisible] = useState("");
  const [toastColor, setToastColor] = useState("red");
  const [serverMessage, setServerMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = React.useState("");
  const [auth, setAuth] = useContext(AuthContext);

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

  const setBusinessProfile = () => {
    if (companyName == "") {
      setToastColor("red");
      setToastVisible(true);
      setServerMessage("Company Name is required");
      return;
    }
    if (companyAddress == "") {
      setToastColor("red");
      setToastVisible(true);
      setServerMessage("Company Address is required");
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

    if (areaOfOperation == "") {
      setToastColor("red");
      setToastVisible(true);
      setServerMessage("area Of Operation is required");
      return;
    }

    if (NIN == "") {
      setToastColor("red");
      setToastVisible(true);
      setServerMessage("NIN is required");
      return;
    }

    setLoading(true);
    axios
      .post(
        `${SetBusinessProfile}`,
        {
          NIN: NIN,
          state: addressState,
          localGovt: localGovt,
          postalCode: postalCode,
          companyName: companyName,
          companyAddress: companyAddress,
          areaOfOperation: areaOfOperation,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => {
        setToastColor("green");
        setToastVisible(true);
        setServerMessage(res.data.message);
        props.navigation.replace("BusinessDoc");
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
          <View style={styles.block} center>
            <View row paddingH-20 centerV>
              <View flex-2>
                <Text headingT blackColor>
                  Business Profile
                </Text>
              </View>
              <View flex right>
                <TouchableOpacity onPress={() => logOut()}>
                  <View style={styles.btn2} background-blackColor center>
                    <Text whiteColor FontAven>
                      Logout
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View marginT-20>
              <Text smallF gray FontAven>
                Company Name
              </Text>
              <TextInput
                onChangeText={(text) => setCompanyName(text)}
                style={styles.TextInput}
                placeholder="Enter Company Name"
              />
            </View>

            <View marginT-20>
              <Text smallF gray FontAven>
                Residential address
              </Text>
              <TextInput
                multiline={true}
                numberOfLines={4}
                onChangeText={(text) => setCompanyAddress(text)}
                style={styles.textArea}
                placeholder="Enter Residential address"
              />
            </View>
            <View marginT-20 marginB-5 style={styles.AreaOfOperation}>
              <Text smallF gray FontAven>
                Area Of Operation
              </Text>
            </View>
            <View style={styles.selectField}>
              <RNPickerSelect
                onValueChange={(text) => setAreaOfOperation(text)}
                items={[
                  { label: "Jetty Operations", value: "Jetty Operations" },
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
                  label: "Select Area of operation",
                  value: null,
                  color: "gray",
                }}
                Icon={Platform.OS === "ios" ? dropDownIcon : null}
              />
            </View>
            <View marginT-20 marginB-5 style={styles.AreaOfOperation}>
              <Text smallF gray FontAven>
                Select State
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
                  label: "Select State",
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
                placeholder="Enter Local Govt"
              />
            </View>

            <View marginT-20>
              <Text smallF gray FontAven>
                Postal Code
              </Text>
              <TextInput
                onChangeText={(text) => setPostalCode(text)}
                style={styles.TextInput}
                placeholder="Enter Postal Code"
              />
            </View>

            <View marginT-20>
              <Text smallF gray FontAven>
                NIN
              </Text>
              <TextInput
                onChangeText={(text) => setNIN(text)}
                style={styles.TextInput}
                placeholder="Enter NIN"
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
                  setBusinessProfile();
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
  btn2: {
    width: actuatedNormalize(80),
    padding: actuatedNormalize(10),
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
    height: 50,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    color: "#181818",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
