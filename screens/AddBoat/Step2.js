import React, { useState, useEffect, useContext } from "react";
import { ActivityIndicator, Dimensions, TouchableOpacity } from "react-native";
import { Text, View, Incubator } from "react-native-ui-lib";
import { actuatedNormalize } from "../../components/FontResponsive";
import { AddBoat, GetUserBoat } from "../../APIs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import YesNoCard from "./YesNoCard";
const { width, height } = Dimensions.get("window");

const Step2 = (props) => {
  const [lifeJacket, setLifeJacket] = useState(false);
  const [firstAid, setFirstAid] = useState(false);
  const [fireExtinguisher, setFireExtinguisher] = useState(false);
  const [Lifebuoy, setLifebuoy] = useState(false);
  const [VHFTelephone, setVHFTelephone] = useState(false);
  const [F4Fenders, setF4Fenders] = useState(false);
  const [GPSCompass, setGPSCompass] = useState(false);
  const [sandBucket, setSandBucket] = useState(false);
  const [paddle, setPaddle] = useState(false);
  const [horn, setHorn] = useState(false);
  const [searchLight, setSearchLight] = useState(false);
  const [NavigationLight, setNavigationLight] = useState(false);
  const [token, setToken] = React.useState("");
  const [loading, setLoading] = useState(false);
  const [navigation, setNavigation] = useState(props.props);

  useEffect(() => {
    async function fetchStoresData() {
      let loginToken = await AsyncStorage.getItem("token");
      setToken(JSON.parse(loginToken));
    }

    fetchStoresData();
  }, []);

  const addBoat = () => {
    setLoading(true);
    axios
      .post(
        `${AddBoat}`,
        {
          superstructureColor: props.superstructureColor,
          HullColor: props.HullColor,
          constructionMaterial: props.constructionMaterial,
          useOfVessel: props.vesselUse,
          typeOfVessel: props.vesselType,
          validLagosStateOperational: props.validLagosStateOperational,
          boatName: props.boatName,
          registrationNumber: props.registrationNumber,
          manufacturer: props.manufacturer,
          manufactureYear: props.manufactureYear,
          hullMaterial: props.hullMaterial,
          passengerCapacity: props.passengerCapacity,
          previouslyRegister: props.previouslyRegister,
          lifeJacket: lifeJacket,
          firstAid: firstAid,
          fireExtinguisher: fireExtinguisher,
          Lifebuoy: Lifebuoy,
          VHFTelephone: VHFTelephone,
          F4Fenders: F4Fenders,
          GPSCompass: GPSCompass,
          sandBucket: sandBucket,
          paddle: paddle,
          horn: horn,
          searchLight: searchLight,
          NavigationLight: NavigationLight,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => {
        props.setServerMessage(res.data.message);
        props.setToastColor("green");
        props.setToastVisible(true);
        navigation.navigation.navigate("BoatDoc", {
          item: res.data.Boat,
          noShow: true,
        });
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
    <>
      <Text center subhead marginT-20>
        Safety Equipment required Onboard
      </Text>
      <Text smallF gray FontAven center>
        step 2
      </Text>
      <YesNoCard
        setTypeHandle={setLifeJacket}
        typeValue={lifeJacket}
        label="Standard Life Jacket for boat capacity"
      />
      <YesNoCard
        setTypeHandle={setFirstAid}
        typeValue={firstAid}
        label="First aid kit"
      />
      <YesNoCard
        setTypeHandle={setFireExtinguisher}
        typeValue={fireExtinguisher}
        label="DCP Fire Extinguisher"
      />
      <YesNoCard
        setTypeHandle={setLifebuoy}
        typeValue={Lifebuoy}
        label="Life Buoy"
      />
      <YesNoCard
        setTypeHandle={setF4Fenders}
        typeValue={F4Fenders}
        label="4pcs of F1 or/to F4 Fenders"
      />
      <YesNoCard
        setTypeHandle={setVHFTelephone}
        typeValue={VHFTelephone}
        label="VHF/Telephone"
      />
      <YesNoCard
        setTypeHandle={setGPSCompass}
        typeValue={GPSCompass}
        label="GPS Compass"
      />
      <YesNoCard
        setTypeHandle={setSandBucket}
        typeValue={sandBucket}
        label="Sand bucket"
      />
      <YesNoCard setTypeHandle={setPaddle} typeValue={paddle} label="Paddle" />
      <YesNoCard setTypeHandle={setHorn} typeValue={horn} label="Horn" />
      <YesNoCard
        setTypeHandle={setSearchLight}
        typeValue={searchLight}
        label="Search light"
      />
      <YesNoCard
        setTypeHandle={setNavigationLight}
        typeValue={NavigationLight}
        label="Navigation light"
      />

      {loading ? (
        <TouchableOpacity>
          <View style={styles.btn} background-primaryColor center marginT-40>
            <ActivityIndicator size="small" color="#fff" />
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            addBoat();
          }}
        >
          <View style={styles.btn} center marginT-40 background-primaryColor>
            <Text whiteColor>Next</Text>
          </View>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        onPress={() => {
          props.setStep(1);
        }}
      >
        <View style={styles.btn} center marginT-10>
          <Text underLine FontAven>
            Back
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default Step2;

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
