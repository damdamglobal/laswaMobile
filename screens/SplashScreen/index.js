import React, { useState, useEffect, useContext } from "react";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import {
  View,
  Text,
  Button,
  Incubator,
  ProgressBar,
  Colors,
} from "react-native-ui-lib";
import { Image, Dimensions } from "react-native";
import { actuatedNormalize } from "../../components/FontResponsive";
import {
  AuthContext,
  SplashscreenContext,
  MainScreenContext,
} from "../../context/index";
import { Login, UpdateUserProfile } from "../../APIs";
import * as Notifications from "expo-notifications";
import axios from "axios";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { elevate } from "react-native-elevate";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const { width, height } = Dimensions.get("window");

export default function SplashScreen(props) {
  const [value, setValue] = useState(20);
  const [auth, setAuth] = useContext(AuthContext);
  const [splashscreen, setSplashScreen] = useContext(SplashscreenContext);
  const [mainScreen, setMainScreen] = useContext(MainScreenContext);

  useEffect(() => {
    async function fetchStoresData() {
      //AsyncStorage.clear();
      const interval = setInterval(() => {
        setValue((value) => value + 10);
      }, 1000);
      let loginDetails = await AsyncStorage.getItem("loginDetails");
      if (loginDetails) {
        let loginDetail = JSON.parse(loginDetails);
        let email = loginDetail.email;
        let password = loginDetail.password;
        LoginFuc(email, password);
      } else {
        setAuth(true);
        setMainScreen(false);
        setSplashScreen(false);
      }
    }

    fetchStoresData();
    return () => clearInterval(interval);
  }, []);

  const interval = setTimeout(() => {}, 10000);

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

  const LoginFuc = (email, password) => {
    axios
      .put(`${Login}`, { email: email, password: password }, { timeout: 5000 })
      .then((res) => {
        let loginDetails = {
          email: email,
          password: password,
        };
        saveLoginDetails(res, loginDetails);
        /*registerForPushNotificationsAsync().then(async (token) => {
          if (res.data.profile.NotificationToken != token) {
            //UpdateNotification(token, res.data.token);
          }
        });*/
      })
      .catch((err) => {
        console.log(err);
        setAuth(true);
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
      //setMainScreen(true);
      //setSplashscreen(false);
      setSplashScreen(false);
      setAuth(false);
    } catch (err) {
      console.log(err);
      setMainScreen(true);
    }
  };

  const UpdateNotification = (payload, loginToken) => {
    axios
      .put(
        `${UpdateUserProfile}`,
        { NotificationToken: payload },
        {
          headers: { Authorization: "Bearer " + loginToken },
        }
      )
      .then((res) => {})
      .catch((err) => {
        setAuth(true);
      });
  };

  return (
    <View flex>
      <View flex centerH bottom>
        <View style={styles.sos}>
          <Image
            source={require("../../assets/splashq.png")}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </View>
      </View>
      <View flex paddingH-50>
        <ProgressBar
          style={{ marginTop: actuatedNormalize(70) }}
          progress={value}
          progressColor="black" //{Colors.secondaryColor}
        />
      </View>
    </View>
  );
}

const styles = {
  sos: {
    height: width / 4,
    width: width / 4,
    borderRadius: actuatedNormalize(100),
    backgroundColor: Colors.whiteColor,
    overflow: "hidden",
    ...elevate(2),
  },
};
