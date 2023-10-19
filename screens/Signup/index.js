import {
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
} from "react-native";
import { actuatedNormalize } from "../../components/FontResponsive";
import { View, Text, Colors, Badge } from "react-native-ui-lib";

const { width, height } = Dimensions.get("window");

export default function Login(props) {
  return (
    <View flex background-whiteColor>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.block} centerV>
          <Text center subheading primaryColor>
            Get Started
          </Text>
          <View center>
            <View marginT-20>
              <Text smallF>Email</Text>
              <TextInput style={styles.TextInput} placeholder="Enter Email" />
            </View>
            <View marginT-20>
              <Text smallF>Email</Text>
              <TextInput style={styles.TextInput} placeholder="Enter Email" />
            </View>
            <View marginT-20>
              <Text smallF>Email</Text>
              <TextInput style={styles.TextInput} placeholder="Enter Email" />
            </View>
            <View marginT-20>
              <Text smallF>Password</Text>
              <TextInput
                style={styles.TextInput}
                placeholder="Enter Password"
              />
            </View>

            <TouchableOpacity
              onPress={() => {
                setIsVisible(false);
                props.navigate("AddPassengerManifest");
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
          </View>

          <View center row marginT-50>
            <View style={styles.line} />
            <Text>OR</Text>
            <View style={styles.line} />
          </View>
          <TouchableOpacity
            onPress={() => {
              props.navigation.pop();
            }}
          >
            <Text marginT-20 center underline subheader>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
};
