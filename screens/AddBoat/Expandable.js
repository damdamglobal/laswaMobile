import _ from "lodash";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { Card, Carousel, ExpandableSection, View } from "react-native-ui-lib";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { actuatedNormalize } from "../../components/FontResponsive";

const ExpandableSectionScreen = (props) => {
  const [expanded, setExpanded] = useState(false);

  const getHeaderElement = () => {
    return (
      <View row flex marginT-20>
        <View flex>
          <Text>{props.title}</Text>
        </View>
        <View flex right>
          {!expanded ? (
            <Entypo
              color="#999999"
              size={actuatedNormalize(20)}
              name="chevron-down"
            />
          ) : (
            <Entypo
              color="#999999"
              size={actuatedNormalize(20)}
              name="chevron-up"
            />
          )}
        </View>
      </View>
    );
  };

  return (
    <View>
      <ExpandableSection
        top={false}
        expanded={expanded}
        sectionHeader={getHeaderElement()}
        onPress={() => setExpanded(!expanded)}
      >
        <View background-primaryColor padding-5 style={styles.card}>
          {props.children}
        </View>
      </ExpandableSection>
    </View>
  );
};

export default ExpandableSectionScreen;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#EFEFEF",
  },
});
