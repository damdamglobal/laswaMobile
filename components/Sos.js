import React, { useEffect, useState } from "react";
import { Dimensions, Modal, TouchableOpacity, Linking } from "react-native";
import { Text, View, Colors } from "react-native-ui-lib";
import { actuatedNormalize } from "./FontResponsive";
import { elevate } from "react-native-elevate";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function SOS() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View center style={styles.sos} background-sosColor>
      <TouchableOpacity
        onPress={() =>
          Linking.openURL("whatsapp://send?text=hello&phone=+15551022251")
        }
      >
        <Text whiteColor FontAven>
          SOS
        </Text>
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={isVisible}>
        <View style={styles.modal}>
          <View flex style={styles.modalCard}>
            <TouchableOpacity onPress={() => setIsVisible(false)}>
              <Text center marginT-20>
                <AntDesign
                  color="#181818"
                  size={actuatedNormalize(30)}
                  name="down"
                />
              </Text>
            </TouchableOpacity>
            <View marginT-20 style={styles.card2} center></View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = {
  sos: {
    height: actuatedNormalize(50),
    width: actuatedNormalize(50),
    borderRadius: actuatedNormalize(50),
    ...elevate(2),
  },
  modal: {
    flex: 1,
    height: height / actuatedNormalize(10),
    backgroundColor: "rgba(28, 28, 28, 0.5)",
  },
  modalCard: {
    flex: 1,
    marginTop: actuatedNormalize(70),
    borderTopRightRadius: actuatedNormalize(20),
    borderTopLeftRadius: actuatedNormalize(20),
    backgroundColor: "#fff",
  },
  card2: {
    width: width,
    borderRadius: actuatedNormalize(10),
  },
};
