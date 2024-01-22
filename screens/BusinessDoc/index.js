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
import { View, Text, Incubator, Badge, Colors } from "react-native-ui-lib";
import { GetBusinessProfile, DomainSocket } from "../../APIs";
const { Toast } = Incubator;
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UploadCard from "./UploadCard";
import { SplashscreenContext, MainScreenContext } from "../../context/index";

const { width, height } = Dimensions.get("window");

export default function BusinessDocScreen(props) {
  const [businessProfile, setBusinessProfile] = useState(null);
  const [token, setToken] = React.useState("");
  const [loading, setLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [toastColor, setToastColor] = useState("red");
  const [splashscreen, setSplashScreen] = useContext(SplashscreenContext);
  const [mainScreen, setMainScreen] = useContext(MainScreenContext);

  useEffect(() => {
    async function fetchStoresData() {
      let loginToken = await AsyncStorage.getItem("token");
      setToken(JSON.parse(loginToken));
      getBusinessProfile(JSON.parse(loginToken));
    }

    fetchStoresData();
  }, []);

  const getBusinessProfile = async (payload) => {
    setLoading(true);
    axios
      .get(`${GetBusinessProfile}`, {
        headers: { Authorization: "Bearer " + payload },
      })
      .then((res) => {
        setBusinessProfile(res.data.BusinessProfile);
        if (res.data.BusinessProfile) {
          if (res.data.BusinessProfile.verify) {
            setMainScreen(false);
            setSplashScreen(true);
          }
        }
      })
      .catch((err) => {
        setServerMessage(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View flex background-whiteColor padding-20 centerH>
      <Text headingT blackColor numberOfLines={1}>
        Business Documents
      </Text>
      {businessProfile ? (
        <Text smallF FontAven>
          {businessProfile.companyName}
          {!businessProfile.verify ? (
            <Text sosColor> Awaiting Approval</Text>
          ) : null}
        </Text>
      ) : null}
      <TouchableOpacity
        onPress={() => props.navigation.replace("BusinessInfo")}
      >
        <Text smallF2 marginT-5 FontAven underLine>
          View Business Info
        </Text>
      </TouchableOpacity>
      {loading ? (
        <View center>
          <ActivityIndicator size="small" color="#181818" />
        </View>
      ) : (
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <UploadCard
            docType="businessOwner"
            businessProfile={businessProfile}
          />
          <UploadCard docType="CAC" businessProfile={businessProfile} />
          <UploadCard
            docType="OperationalLicense"
            businessProfile={businessProfile}
          />
          <UploadCard docType="CACForm2" businessProfile={businessProfile} />
          <UploadCard docType="CACForm7" businessProfile={businessProfile} />
        </ScrollView>
      )}
    </View>
  );
}
