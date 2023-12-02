import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Text, View, Colors, Incubator } from "react-native-ui-lib";
import { actuatedNormalize } from "../../components/FontResponsive";
import { elevate } from "react-native-elevate";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import axios from "axios";
import { BusinessUploadDoc } from "../../APIs";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { Toast } = Incubator;

const { width, height } = Dimensions.get("window");

export default function UploadCard(props) {
  const [img, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = React.useState("");
  const [serverMessage, setServerMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [toastColor, setToastColor] = useState("red");

  useEffect(() => {
    async function fetchStoresData() {
      let loginToken = await AsyncStorage.getItem("token");
      setToken(JSON.parse(loginToken));
      let BusinessProfile = props.businessProfile;

      if (BusinessProfile) {
        if (props.docType == "CAC") {
          if (BusinessProfile.CAC) {
            setImage(BusinessProfile.CAC.url);
          }
        }
        if (props.docType == "businessOwner") {
          if (BusinessProfile.businessOwner) {
            setImage(BusinessProfile.businessOwner.url);
          }
        }
        if (props.docType == "OperationalLicense") {
          if (BusinessProfile.OperationalLicense) {
            setImage(BusinessProfile.OperationalLicense.url);
          }
        }
        if (props.docType == "CACForm2") {
          if (BusinessProfile.CACForm2) {
            setImage(BusinessProfile.CACForm2.url);
          }
        }
        if (props.docType == "CACForm7") {
          if (BusinessProfile.CACForm7) {
            setImage(BusinessProfile.CACForm7.url);
          }
        }
      }
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
      businessUploadDoc(manipResult.uri);
    }
  };

  const businessUploadDoc = (payload) => {
    let localUri = payload;
    let filename = localUri.split("/").pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    const formData = new FormData();

    formData.append("image", {
      uri: localUri,
      name: filename,
      type: type,
    });
    formData.append("docType", props.docType);

    setLoading(true);
    axios
      .put(`${BusinessUploadDoc}`, formData, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        setServerMessage(res.data.message);
        setToastColor("green");
        setToastVisible(true);
      })
      .catch((err) => {
        setServerMessage(err.response.data.message);
        setToastColor("red");
        setToastVisible(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={styles.card} background-whiteColorF>
      <View flex paddingT-20>
        <Text subheader>{props.docType}</Text>
        <View row marginT-30>
          <View flex-2>
            <Text smallF FontAven>
              Image should be in png or pdf or jpeg
            </Text>
            {loading ? (
              <TouchableOpacity>
                <View
                  center
                  marginT-40
                  style={styles.btn}
                  background-blackColor
                >
                  <ActivityIndicator size="small" color="#fff" />
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => pickImage()}>
                <View
                  center
                  marginT-40
                  style={styles.btn}
                  background-blackColor
                >
                  <Text whiteColor smallF>
                    Choose File
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
          <View flex right>
            <View center style={styles.sos}>
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
  card: {
    marginTop: actuatedNormalize(20),
    height: height / 5,
    width: width - actuatedNormalize(50),
    borderRadius: actuatedNormalize(10),
    overflow: "hidden",
    padding: actuatedNormalize(10),
    //backgroundColor: "#f0f8fc",
    ...elevate(2),
  },
  btn: {
    width: width / 2,
    padding: actuatedNormalize(10),
    borderRadius: actuatedNormalize(5),
    ...elevate(4),
  },
  sos: {
    justifyContent: "center",
    height: width / 5,
    width: width / 5,
    borderWidth: 1,
    borderRadius: actuatedNormalize(5),
    borderStyle: "dashed",
    borderColor: "#181818",
    overflow: "hidden",
    ...elevate(2),
  },
};
