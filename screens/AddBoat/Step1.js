import React, { useState, useEffect, useContext } from "react";
import { TextInput, Dimensions, TouchableOpacity } from "react-native";
import { Text, View, Incubator } from "react-native-ui-lib";
import { actuatedNormalize } from "../../components/FontResponsive";
import Expandable from "./Expandable";
import CheckBoxCard from "./CheckBoxCard";
import YesNoCard from "./YesNoCard";
const { width, height } = Dimensions.get("window");

const StepOne = (props) => {
  const [regNumber, setRegNumber] = useState("");

  return (
    <>
      <Text center subhead marginT-20>
        Vessel Details
      </Text>
      <Text smallF gray FontAven center>
        step 1
      </Text>

      <View marginT-20>
        <Text smallF gray FontAven>
          REGISTRATION NUMBER
        </Text>
        <TextInput
          onChangeText={(text) => setRegNumber(text)}
          style={styles.TextInput}
          placeholder="Enter Registration Number"
          value={regNumber}
        />
      </View>
      <YesNoCard
        label="
        Has this vessel previously been used as a commercial vessel in Nigeria
        or overseas and is now being registered in Lagos for the first time?"
      />

      <Expandable title={"Vessel Type"}>
        <CheckBoxCard />
        <CheckBoxCard />
        <CheckBoxCard />
        <CheckBoxCard />
      </Expandable>
      <Expandable title={"Vessel Use"}>
        <CheckBoxCard />
        <CheckBoxCard />
        <CheckBoxCard />
        <CheckBoxCard />
      </Expandable>

      <Expandable title={"Construction Material"}>
        <CheckBoxCard />
        <CheckBoxCard />
        <CheckBoxCard />
        <CheckBoxCard />
      </Expandable>
      <Expandable title={"Hull Color"}>
        <CheckBoxCard />
        <CheckBoxCard />
        <CheckBoxCard />
        <CheckBoxCard />
      </Expandable>
      <Expandable title={"Superstructure Color"}>
        <CheckBoxCard />
        <CheckBoxCard />
        <CheckBoxCard />
        <CheckBoxCard />
      </Expandable>

      <YesNoCard
        label="
        Has this vessel previously been used as a commercial vessel in Nigeria
        or overseas and is now being registered in Lagos for the first time?"
      />

      <YesNoCard
        title2="I do not agree"
        title1="I agree"
        label="
            I [Owner’s name]  do solemnly and sincerely declare that I have read and understand the information on this application form and that all statements made with respect to this application are true and correct. I agree to comply with the regulations of the Lagos State Waterways Authority. I consent to the disclosure of information on the application to other relevant Ministries or Agencies to verify my statements and certificates. I understand that misinterpretation, falsified documents may be shared with the Nigerian Police Force, Federal Ministries and Lagos State Ministries. I authorize all relevant Federal, State ministries or agencies to release my records should the need arise to accelerate processing of this application."
      />
      <TouchableOpacity
        onPress={() => {
          props.setStep(2);
        }}
      >
        <View style={styles.btn} center marginT-40 background-primaryColor>
          <Text whiteColor>Next</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default StepOne;

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
  img: {
    height: height / 4,
    width: width / 1.2,
    marginHorizontal: actuatedNormalize(5),
    backgroundColor: "#0A519B",
    marginTop: actuatedNormalize(20),
  },
};
