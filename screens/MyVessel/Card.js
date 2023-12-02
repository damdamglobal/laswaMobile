import React, { useEffect, useState } from "react";
import { Dimensions, Image, TouchableOpacity } from "react-native";
import {
  Text,
  View,
  Colors,
  PanningProvider,
  Constants,
  Incubator,
  Dialog,
} from "react-native-ui-lib";
import { actuatedNormalize } from "../../components/FontResponsive";
import { elevate } from "react-native-elevate";
import {
  Entypo,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
const { TextField, Toast } = Incubator;

const { width, height } = Dimensions.get("window");

export default function BoatCard(props) {
  const [navigation, setNavigation] = useState(props.props);
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState(true);
  const [toastVisible, setToastVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastColor, setToastColor] = useState("red");
  const [serverMessage, setServerMessage] = useState("");

  let item = props.item;

  return (
    <View>
      <View style={styles.card}>
        <TouchableOpacity onPress={() => setIsVisible(true)}>
          <View flex>
            <View style={styles.imgCard} center>
              {item.imgUrl ? (
                <Image
                  source={{ uri: item.imgUrl }}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              ) : (
                <MaterialIcons
                  color="#181818"
                  size={actuatedNormalize(60)}
                  name="directions-boat"
                />
              )}
              <View style={styles.active} background-primaryColor padding-5>
                <Text smallF whiteColor>
                  Active
                </Text>
              </View>
            </View>
            <View flex padding-20 row centerV>
              <View flex>
                <Text subheader>
                  {item.firstName} {item.lastName}
                </Text>
                <View row centerV marginT-5>
                  <MaterialIcons
                    color="#181818"
                    size={actuatedNormalize(20)}
                    name="directions-boat"
                  />
                  <Text FontAven marginL-10>
                    50
                  </Text>
                </View>
              </View>
              <View flex right row>
                <Text FontAven>50</Text>
                <Text> </Text>
                <Text FontAven gray>
                  Passengers
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <Dialog
        visible={isVisible}
        onDismiss={() => setIsVisible(false)}
        panDirection={PanningProvider.Directions.DOWN}
        bottom
        centerH
      >
        <View style={styles.DialogCard} padding-20>
          <View row centerV>
            <View flex>
              <Text subheader>Choose Option</Text>
            </View>
            <View flex right>
              <TouchableOpacity onPress={() => setIsVisible(false)}>
                <MaterialIcons
                  color="#181818"
                  size={actuatedNormalize(15)}
                  name="close"
                />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigation.push("BoatDetail", { item: item })
            }
          >
            <View row centerV marginT-20>
              <View style={styles.iconBox} center>
                <MaterialIcons
                  color="#181818"
                  size={actuatedNormalize(10)}
                  name="remove-red-eye"
                />
              </View>
              <View marginH-10>
                <Text>View Info</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigation.push("StartTrip", { item: item })
            }
          >
            <View row centerV marginT-5>
              <View style={styles.iconBox} center>
                <MaterialCommunityIcons
                  color="#181818"
                  size={actuatedNormalize(10)}
                  name="arrow-expand-right"
                />
              </View>
              <View marginH-10>
                <Text>Start Trip</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setToastVisible(true);
              setServerMessage("service not available");
            }}
          >
            <View row centerV marginT-5>
              <View style={styles.iconBox} center>
                <MaterialIcons
                  color="#181818"
                  size={actuatedNormalize(10)}
                  name="my-location"
                />
              </View>
              <View marginH-10>
                <Text>Get Location</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Dialog>
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
  iconBox: {
    height: actuatedNormalize(30),
    width: actuatedNormalize(30),
    backgroundColor: "#F6F6F6",
    borderRadius: actuatedNormalize(5),
  },
  DialogCard: {
    height: height / 4.5,
    width: width - actuatedNormalize(50),
    backgroundColor: "white",
    borderTopRightRadius: actuatedNormalize(10),
    borderTopLeftRadius: actuatedNormalize(10),
  },
  imgCard: {
    height: height / 5,
    width: width - actuatedNormalize(50),
    overflow: "hidden",
    borderRadius: actuatedNormalize(20),
    position: "relative",
  },
  card: {
    marginTop: actuatedNormalize(10),
    height: height / 3.5,
    width: width - actuatedNormalize(50),
    overflow: "hidden",
    backgroundColor: "white",
    borderWidth: actuatedNormalize(0.5),
    borderColor: "gray",
    borderRadius: actuatedNormalize(20),
    ...elevate(2),
  },
  btn: {
    width: width - actuatedNormalize(100),
    padding: actuatedNormalize(20),
    borderRadius: actuatedNormalize(10),
    ...elevate(4),
  },
  sos: {
    height: actuatedNormalize(70),
    width: actuatedNormalize(70),
    borderRadius: actuatedNormalize(10),
    overflow: "hidden",
    ...elevate(2),
  },
  active: {
    position: "absolute",
    top: actuatedNormalize(20),
    left: actuatedNormalize(20),
    borderRadius: actuatedNormalize(5),
  },
};
