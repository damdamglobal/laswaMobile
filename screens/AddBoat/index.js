import React, { useState, useEffect, useContext } from "react";
import {
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { Text, View, Incubator } from "react-native-ui-lib";
import { actuatedNormalize } from "../../components/FontResponsive";
import SOS from "../../components/Sos";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { AddBoat, GetUserBoat } from "../../APIs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { BoatScreenContext } from "../../context/index";

const { Toast } = Incubator;

const { width, height } = Dimensions.get("window");

export default function AddFleet(props) {
  const [regNumber, setRegNumber] = useState("");
  const [model, setModel] = useState("");
  const [capacity, setCapacity] = useState("");
  const [serverMessage, setServerMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [toastColor, setToastColor] = useState("red");
  const [token, setToken] = React.useState("");
  const [img, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [boat, setBoats] = useContext(BoatScreenContext);

  useEffect(() => {
    async function fetchStoresData() {
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

  const getUserBoat = async (payload) => {
    setLoading(true);
    axios
      .get(`${GetUserBoat}`, {
        headers: { Authorization: "Bearer " + payload },
      })
      .then((res) => {
        props.navigation.navigate("Home");
        setBoats(res.data.Boat);
      })
      .catch((err) => {
        setServerMessage(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const addBoat = () => {
    if (regNumber == "" || model == "") {
      setServerMessage("Full all the required field");
      setToastVisible(true);
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
    formData.append("regNumber", regNumber);
    formData.append("model", model);
    formData.append("capacity", capacity);

    setLoading(true);
    axios
      .post(`${AddBoat}`, formData, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        setServerMessage(res.data.message);
        setToastColor("green");
        setToastVisible(true);
        setImage("");
        setRegNumber("");
        setModel("");
        setCapacity("");
        getUserBoat(token);
      })
      .catch((err) => {
        console.log(err.response, "OPO");
        setServerMessage(err.response.data.message);
        setToastColor("red");
        setToastVisible(true);
        setRegNumber("");
        setModel("");
        setImage("");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View flex paddingH-20 background-whiteColor centerH>
      <View row centerV>
        <View flex></View>
        <View flex center>
          <Text subheading>Add Fleet</Text>
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
          <Text center subhead marginT-20>
            step 1
          </Text>
          <TouchableOpacity onPress={() => pickImage()}>
            <View center style={styles.img}>
              {img ? (
                <View flex>
                  <Image
                    source={{
                      uri: img,
                    }}
                    style={{
                      height: height / 4,
                      width: width / 1.5,
                    }}
                  />
                </View>
              ) : (
                <MaterialIcons
                  color="#fff"
                  size={actuatedNormalize(60)}
                  name="add-a-photo"
                />
              )}
            </View>
          </TouchableOpacity>
          <View marginT-20>
            <TextInput
              onChangeText={(text) => setRegNumber(text)}
              style={styles.TextInput}
              placeholder="Enter Reg. Number"
              value={regNumber}
            />
          </View>
          <View marginT-20>
            <TextInput
              onChangeText={(text) => setModel(text)}
              style={styles.TextInput}
              placeholder="Enter Model"
              value={model}
            />
          </View>
          <View marginT-20>
            <TextInput
              onChangeText={(text) => setCapacity(text)}
              style={styles.TextInput}
              placeholder="Enter Capacity"
              value={capacity}
            />
          </View>

          {loading ? (
            <TouchableOpacity>
              <View style={styles.btn} background- center marginT-40>
                <Text whiteColor>processing...</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                addBoat();
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
        </ScrollView>
      </KeyboardAvoidingView>
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
    backgroundColor: "#181818",
  },
  img: {
    height: height / 4,
    width: width / 1.2,
    marginHorizontal: actuatedNormalize(5),
    backgroundColor: "#0A519B",
    marginTop: actuatedNormalize(20),
  },
};
