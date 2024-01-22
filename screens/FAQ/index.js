import React, { useState } from "react";
import {
  TouchableOpacity,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import { actuatedNormalize } from "../../components/FontResponsive";
import { Text, View, Colors, Button, Incubator } from "react-native-ui-lib";
import { AntDesign } from "@expo/vector-icons";

import SOS from "../../components/Sos";
import FAQBox from "./FAQBox";

const { width, height } = Dimensions.get("window");

export default function ForgotPassword(props) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled
    >
      <View flex background-whiteColor>
        <View row centerV marginH-20>
          <View flex>
            <TouchableOpacity onPress={() => props.navigation.pop()}>
              <AntDesign
                color="#181818"
                size={actuatedNormalize(20)}
                name="left"
              />
            </TouchableOpacity>
          </View>
          <View flex-2 center>
            <Text subheading>F.A.Q</Text>
          </View>
          <View right flex>
            <SOS />
          </View>
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View marginT-50>
            <FAQBox
              title="What provision are there to ensure inclusivity to waterways transportation for people such as the physically challenged?"
              details="Provisions of amenities for the physically challenged people such as wheelchair, special car parking space to make more accessible"
            />
          </View>
          <View marginT-50>
            <FAQBox
              title="What about environmental pollution? What policies does LASWA have in place to reduce pollution and ensure sustainability of the environment?"
              details="Research is currently to ascertain the sources and volume of waste on the Lagos waterways and to find a lasting solution to the problem. In addition, the Authority has embarked on a public sensitization programme that covers all communities in the city and in the riverine communities where markets tend to be situated and in residential communities on the shores to teach them about the importance of keeping the waterways clean.
To ensure compliance, Lagos State sanitation laws are also strictly enforced on those who violate the rules. LASWA in conjunction with our sister agency LAWMA and a Non-Governmental Organization, FIBRA (Which is a consortium of bottling companies) carries out daily sanitation patrols using 6 units of open fiber boats to patrol the waterways and the shorelines."
            />
          </View>

          <View marginT-50>
            <FAQBox
              title="What is LASWAs vision for the future of water transportation in Lagos?"
              details="By 2030, the vision is that improvement and frequency of use of water transportation in Lagos State would contribute to about 40 percent of total transport demand in the state. And there will be well integrated multimodel Transport system across the state."
            />
          </View>
          <View marginT-50>
            <FAQBox
              title="What is LASWA doing to ensure coverage and access to ferry transportation in communities that offer water access?"
              details="At present, ferry routes exist within 30 commercial jetties and terminals that cut across the 3 (three) senatorial districts in Lagos."
            />
          </View>
          <View marginT-50>
            <FAQBox
              title="Vessels only operate only at peak periods (mornings and evenings), why?"
              details="Currently, boat operators operate at peak periods in response to customer demand and in response to the popular routes, which at present is focused on ferrying passengers into the city from the suburbs in the mornings, and back in the evenings. There are services available during non-peak periods and we anticipate that as customer demand increases, so too will the frequency of travel times and routes during the non-peak periods. Water transportation is helping to solve the problem of perennial traffic congestion on our roads in Lagos, especially during peak periods. Regular usage by customers will establish waterways transportation as a suitable alternative that is safe and fast for the transportation of cargo and passengers."
            />
          </View>
          <View marginT-50>
            <FAQBox
              title="What is LASWA doing to prevent illegal ferries and boats from plying the waterways?"
              details="LASWA performs routine checks of all boats and ferries plying the waterways to ensure they are authorized to operate and that they are complying with safety standards as set out in their terms of operations. These include clamping down on activities of unregistered and unlicensed ferry operators"
            />
          </View>
          <View marginT-50>
            <FAQBox
              title="How do I know if a ferry is approved and certified by LASWA?"
              details="For any vessel to ply the waterways, they must first go through the LASWA licensing and registration process also must be given a vessel survey certificate from LASWA."
            />
          </View>
          <View marginT-50>
            <FAQBox
              title="Regarding my safety and that of my fellow passengers and our possessions – what regulations, and processes does LASWA have in place, in the event of any emergency on the waterways?"
              details="The safety of all passengers, staff, operators, and property on the waterways is a matter that we take very seriously. To this end, LASWA has numerous processes in place to ensure that swift and efficient action is taken in the event of any emergency.
Prevention is our first priority. To achieve this, all ferries and boats are required to allow on-the-spot access to their vessels for regular inspections at jetties and terminals to ensure that their vessels continue to meet the standards stipulated as a condition of their terms of operations. These include:
Bi-annual inspections and random spot checks on boats daily
Positioning of Water Guards at state-owned jetties to ensure compliance with safety regulations.
Installation of compulsory navigational aids and maker buoys to aid smooth navigation.
Cessation of operations during adverse weather conditions. If caught midstream, ferry captains are advised to go to the closest jetty to wait until they can safely continue on their journey
Strict prohibition against the overloading of vessels with passengers or cargo
Insurance of passengers and ferry operators
Everyone is required to wear life jackets for the entire duration of their trip, including all personnel, with heavy penalties and sanctions issued for non-compliance. In the unlikely event of an accident/emergency, the following procedures are in readily in place:
Regular monitoring by the water patrol unit who is strategically positioned to respond quickly by reaching the point of any emergency as soon as the unit is alerted."
            />
          </View>
          <View marginT-50>
            <FAQBox
              title="Where do I find out information about fares and timetable?"
              details="BADORE – IJEDE 500
BAIYEKU – AJAH 500
BAYEKU – LANGBASA 500
BAIYEKU – ADDAX 1000
EBUTE-OJO-IJEGUN-CMS 1500
EBUTE-OJO-IREWE 300
IJEDE – MARINA/CMS 1500
IJEGUN EGBA – IBASA 200
IKORODU – ADDAX / FALOMO 1000
MARINA /CMS – IKORODU 1000
EBUTE ERO – IKORODU 1000
MARINA – TAEKWA BAY 300
IKORODU(METRO) – ADDAX 1000
EBUTE ERO – IJEDE 1000
IBESHE – ADDAX 1000
EBUTE OJO – LIVERPOOL 1000
BADAGRY – APAPA/LIVERPOOL 1000
BADAGRY – EBUTE-ERO / CMS 1500
ILAJE BARIGA – EBUTE-ERO 700
ILAJE BARIGA – FIVE COWRIES 1000"
            />
          </View>
          <View marginT-50>
            <FAQBox
              title="How many jetties are there? Are they plans to introduce more?"
              details="There are currently 28 operational jetties and terminals in Lagos State, all of which are regulated by LASWA in its role as the official regulatory body of the Lagos State government. State-owned jetties include Falomo, Badore, Bayeku, Adax, and Ebute-Ero jetties, while private companies run other jetties. The full list of all operational jetties can be found here"
            />
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = {
  block: {
    minHeight: height,
  },
};
