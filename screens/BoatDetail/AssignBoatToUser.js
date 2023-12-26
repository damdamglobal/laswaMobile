import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Text, View, Colors, Incubator } from "react-native-ui-lib";
import { actuatedNormalize } from "../../components/FontResponsive";
const { width, height } = Dimensions.get("window");
import { elevate } from "react-native-elevate";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

export default function Operators(props) {
  let item = props.item;
  let findUser = props.findUser;
  let email = props.email;
  let loading = props.loading;
  let captains = props.captains;
  let isOwner = props.isOwner;
  let setIsVisible = props.setIsVisible;
  let setFindUser = props.setFindUser;
  let setEmail = props.setEmail;
  let removeCaptain = props.removeCaptain;
  let searchUser = props.searchUser;
  let assignUserFun = props.assignUserFun;

  return (
    <View style={styles.modal}>
      <View flex style={styles.modalCard}>
        <TouchableOpacity
          onPress={() => {
            setIsVisible(false);
            setFindUser([]);
            setEmail("");
          }}
        >
          <Text center marginT-20>
            <AntDesign
              color="#181818"
              size={actuatedNormalize(30)}
              name="down"
            />
          </Text>
        </TouchableOpacity>
        <View marginT-20 style={styles.card2} center>
          <View marginT-20>
            <Text smallF>Captain name/username</Text>
            <TextInput
              onChangeText={(text) => setEmail(text)}
              style={styles.TextInput}
              placeholder="Search Operator name/username"
              autoCapitalize="none"
              textContentType="emailAddress"
              value={email}
            />
          </View>
          <View right marginT-20>
            {loading ? (
              <TouchableOpacity onPress={() => searchUser()}>
                <View style={styles.btn} background-primaryColor center>
                  <ActivityIndicator size="small" color="#fff" />
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => searchUser()}>
                <View style={styles.btn} background-primaryColor center>
                  <Text whiteColor>Search</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
          {findUser.length ? (
            <>
              {findUser.map((item) => (
                <View key={item._id} style={styles.userCard} centerV>
                  <View row>
                    <View flex>
                      <Text>Full Name :</Text>
                      <Text>User Name :</Text>
                      <Text>Role :</Text>
                      <Text>Phone :</Text>
                    </View>
                    <View flex right>
                      <Text capital>
                        {item.firstName} {item.lastName}
                      </Text>
                      <Text capital>{item.userName}</Text>
                      <Text capital>{item.userType}</Text>
                      <Text>{item.phoneNumber}</Text>
                    </View>
                  </View>
                  {loading ? (
                    <TouchableOpacity>
                      <View style={styles.btn} background-primaryColor center>
                        <ActivityIndicator size="small" color="#fff" />
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <View row marginT-20>
                      <View flex center>
                        <TouchableOpacity
                          onPress={() => {
                            setFindUser([]);
                            setEmail("");
                          }}
                        >
                          <View style={styles.btn} center>
                            <Text underLine>Close</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View flex center>
                        <TouchableOpacity
                          onPress={() => assignUserFun(item._id)}
                        >
                          <View
                            style={styles.btn}
                            background-primaryColor
                            center
                          >
                            <Text whiteColor>Assign</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </View>
              ))}
            </>
          ) : (
            <View marginT-20>
              <Text underLine subheader>
                Available Operations
              </Text>
              {captains.map((item) => (
                <View key={item._id} style={styles.captainCard}>
                  <View row>
                    <View flex>
                      <Text>Full Name :</Text>
                      <Text>Role :</Text>
                      <Text>Email :</Text>
                      <Text>Phone :</Text>
                    </View>
                    <View flex right>
                      <Text>
                        {item.firstName} {item.lastName}
                      </Text>
                      <Text>{item.userType}</Text>
                      <Text>{item.email}</Text>
                      <Text>{item.phoneNumber}</Text>
                    </View>
                  </View>
                  {isOwner ? (
                    <>
                      {loading ? (
                        <TouchableOpacity onPress={() => searchUser()}>
                          <View style={styles.btnD} center row>
                            <ActivityIndicator size="small" color="#fff" />
                          </View>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() => removeCaptain(item._id)}
                        >
                          <View style={styles.btnD} center row>
                            <Text marginH-10 whiteColor>
                              Remove
                            </Text>
                            <AntDesign
                              color="#fff"
                              size={actuatedNormalize(15)}
                              name="delete"
                            />
                          </View>
                        </TouchableOpacity>
                      )}
                    </>
                  ) : null}
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = {
  userCard: {
    width: width - actuatedNormalize(50),
    minHeight: 200,
    backgroundColor: "white",
    padding: actuatedNormalize(5),
    borderRadius: actuatedNormalize(10),
    marginTop: actuatedNormalize(20),
    ...elevate(4),
  },
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
    width: width / 2 - actuatedNormalize(40),
    padding: actuatedNormalize(20),
    borderRadius: actuatedNormalize(10),
  },
  btn2: {
    width: width - actuatedNormalize(50),
    padding: actuatedNormalize(20),
    borderRadius: actuatedNormalize(10),
  },
  btn3: {
    width: width / 2.5,
    padding: actuatedNormalize(10),
    borderRadius: actuatedNormalize(5),
  },
  btnD: {
    padding: actuatedNormalize(20),
    borderRadius: actuatedNormalize(10),
    backgroundColor: "red",
    marginTop: actuatedNormalize(10),
  },
  modal: {
    flex: 1,
    height: height / actuatedNormalize(10),
    backgroundColor: "rgba(28, 28, 28, 0.5)",
  },
  modalCard: {
    flex: 1,
    marginTop: actuatedNormalize(30),
    borderTopRightRadius: actuatedNormalize(20),
    borderTopLeftRadius: actuatedNormalize(20),
    backgroundColor: "#fff",
  },
  card2: {
    width: width,
    borderRadius: actuatedNormalize(10),
  },
  captainCard: {
    width: width - actuatedNormalize(40),
    borderRadius: actuatedNormalize(5),
    backgroundColor: "white",
    padding: actuatedNormalize(10),
    marginTop: actuatedNormalize(10),
    ...elevate(3),
  },
  startTripBtn: {
    position: "absolute",
    bottom: actuatedNormalize(10),
    zIndex: 2,
    left: actuatedNormalize(25),
  },
};
