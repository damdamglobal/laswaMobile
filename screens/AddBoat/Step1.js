import React, { useState, useEffect, useContext } from "react";
import { TextInput, Dimensions, TouchableOpacity } from "react-native";
import { Text, View, Incubator, DateTimePicker } from "react-native-ui-lib";
import { actuatedNormalize } from "../../components/FontResponsive";
import Expandable from "./Expandable";
import CheckBoxCard from "./CheckBoxCard";
import YesNoCard from "./YesNoCard";
const { width, height } = Dimensions.get("window");
const { Toast } = Incubator;

import Step2 from "./Step2";

const StepOne = (props) => {
  const [boatName, setBoatName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [manufactureYear, setManufactureYear] = useState("");
  const [hullMaterial, setHullMaterial] = useState("");
  const [passengerCapacity, setPassengerCapacity] = useState("");
  const [previouslyRegister, setPreviouslyRegister] = useState(false);
  const [agree, setAgree] = useState(false);
  const [validLagosStateOperational, setValidLagosStateOperational] =
    useState(false);
  const [vesselType, setVesselType] = useState("Barge");
  const [vesselUse, setVesselUse] = useState("Passenger/commercial Transport");
  const [constructionMaterial, setConstructionMaterial] = useState("Steel");
  const [HullColor, setHullColor] = useState("White");
  const [superstructureColor, setSuperstructureColor] = useState("White");

  const nextStep = () => {
    if (!agree) {
      props.setServerMessage("I agree to terms to continue");
      props.setToastColor("red");
      props.setToastVisible(true);
      return;
    }
    if (!boatName) {
      props.setServerMessage("vessel name is required");
      props.setToastColor("red");
      props.setToastVisible(true);
      return;
    }
    if (!registrationNumber) {
      props.setServerMessage("Registration Number name is required");
      props.setToastColor("red");
      props.setToastVisible(true);
      return;
    }
    if (!manufacturer) {
      props.setServerMessage("manufacturer is required");
      props.setToastColor("red");
      props.setToastVisible(true);
      return;
    }
    if (!manufactureYear) {
      props.setServerMessage("manufactureYear is required");
      props.setToastColor("red");
      props.setToastVisible(true);
      return;
    }
    if (!passengerCapacity) {
      props.setServerMessage("Passenger Capacity is required");
      props.setToastColor("red");
      props.setToastVisible(true);
      return;
    }
    props.setStep(2);
  };

  let step = props.step;
  return (
    <>
      {step == 1 ? (
        <>
          <Text center subhead marginT-20>
            Vessel Details
          </Text>
          <Text smallF gray FontAven center>
            step 1
          </Text>

          <View marginT-20>
            <Text smallF gray FontAven>
              Registration Number
            </Text>
            <TextInput
              onChangeText={(text) => setRegistrationNumber(text)}
              style={styles.TextInput}
              placeholder="Enter Registration Number"
              value={registrationNumber}
            />
          </View>
          <View marginT-20>
            <Text smallF gray FontAven>
              Vessel Name
            </Text>
            <TextInput
              onChangeText={(text) => setBoatName(text)}
              style={styles.TextInput}
              placeholder="Enter Vessel Name"
              value={boatName}
            />
          </View>
          <View marginT-20>
            <Text smallF gray FontAven>
              Vessel Manufacturer
            </Text>
            <TextInput
              onChangeText={(text) => setManufacturer(text)}
              style={styles.TextInput}
              placeholder="Enter Vessel Manufacturer"
              value={manufacturer}
            />
          </View>
          <View marginT-20>
            <Text smallF gray FontAven>
              Hull Material
            </Text>
            <TextInput
              onChangeText={(text) => setHullMaterial(text)}
              style={styles.TextInput}
              placeholder="Enter Hull Material"
              value={hullMaterial}
            />
          </View>

          <View marginT-20>
            <Text smallF gray FontAven>
              Passenger Capacity
            </Text>
            <TextInput
              onChangeText={(text) => setPassengerCapacity(text)}
              style={styles.TextInput}
              placeholder="Enter  Passenger Capacity"
              value={passengerCapacity}
            />
          </View>
          <View marginT-20>
            <Text smallF gray FontAven marginB-5>
              Vessel Manufacture Year
            </Text>
            <DateTimePicker
              style={{
                borderWidth: 1,
                borderColor: "gray",
                height: actuatedNormalize(45),
              }}
              // placeholder={"Enter Vessel Manufacture Year"}
              mode={"date"}
              onChange={(text) => setManufactureYear(text)}
            />
          </View>
          <YesNoCard
            label="
        Has this vessel previously been used as a commercial vessel in Nigeria
        or overseas and is now being registered in Lagos for the first time?"
            setTypeHandle={setPreviouslyRegister}
            typeValue={previouslyRegister}
          />

          <Expandable title={"Vessel Type"}>
            <View background-whiteColor>
              <CheckBoxCard
                type="Barge"
                setVesselTypeHandle={setVesselType}
                typeValue={vesselType}
              />
              <CheckBoxCard
                type="Fishing Vessel"
                setVesselTypeHandle={setVesselType}
                typeValue={vesselType}
              />
              <CheckBoxCard
                type="Sail Vessel"
                setVesselTypeHandle={setVesselType}
                typeValue={vesselType}
              />
              <CheckBoxCard
                type="Boat"
                setVesselTypeHandle={setVesselType}
                typeValue={vesselType}
              />
              <CheckBoxCard
                type="PWC"
                setVesselTypeHandle={setVesselType}
                typeValue={vesselType}
              />
              <CheckBoxCard
                type="Cargo Vessel"
                setVesselTypeHandle={setVesselType}
                typeValue={vesselType}
              />
              <CheckBoxCard
                type="Cabin Cruiser"
                setVesselTypeHandle={setVesselType}
                typeValue={vesselType}
              />
              <CheckBoxCard
                type="Tug Boat"
                setVesselTypeHandle={setVesselType}
                typeValue={vesselType}
              />
              <CheckBoxCard
                type="Other"
                setVesselTypeHandle={setVesselType}
                typeValue={vesselType}
              />
            </View>
          </Expandable>
          <Expandable title={"Vessel Use"}>
            <CheckBoxCard
              type="Passenger/commercial Transport"
              setVesselTypeHandle={setVesselUse}
              typeValue={vesselUse}
            />

            <CheckBoxCard
              type="Wakeboarding"
              setVesselTypeHandle={setVesselUse}
              typeValue={vesselUse}
            />
            <CheckBoxCard
              type="Skiing"
              setVesselTypeHandle={setVesselUse}
              typeValue={vesselUse}
            />
            <CheckBoxCard
              type="Fishing"
              setVesselTypeHandle={setVesselUse}
              typeValue={vesselUse}
            />
            <CheckBoxCard
              type="Cruising"
              setVesselTypeHandle={setVesselUse}
              typeValue={vesselUse}
            />
            <CheckBoxCard
              type="Sailing"
              setVesselTypeHandle={setVesselUse}
              typeValue={vesselUse}
            />
            <CheckBoxCard
              type="Freight and cargo Movement"
              setVesselTypeHandle={setVesselUse}
              typeValue={vesselUse}
            />
            <CheckBoxCard
              type="Other"
              setVesselTypeHandle={setVesselUse}
              typeValue={vesselUse}
            />
          </Expandable>

          <Expandable title={"Construction Material"}>
            <CheckBoxCard
              type="Steel"
              setVesselTypeHandle={setConstructionMaterial}
              typeValue={constructionMaterial}
            />
            <CheckBoxCard
              type="Aluminium"
              setVesselTypeHandle={setConstructionMaterial}
              typeValue={constructionMaterial}
            />
            <CheckBoxCard
              type="Wood"
              setVesselTypeHandle={setConstructionMaterial}
              typeValue={constructionMaterial}
            />
            <CheckBoxCard
              type="Fiberglass"
              setVesselTypeHandle={setConstructionMaterial}
              typeValue={constructionMaterial}
            />
            <CheckBoxCard
              type="Carbon Fibre"
              setVesselTypeHandle={setConstructionMaterial}
              typeValue={constructionMaterial}
            />
            <CheckBoxCard
              type="Other"
              setVesselTypeHandle={setConstructionMaterial}
              typeValue={constructionMaterial}
            />
          </Expandable>
          <Expandable title={"Hull Color"}>
            <CheckBoxCard
              type="White"
              setVesselTypeHandle={setHullColor}
              typeValue={HullColor}
            />
            <CheckBoxCard
              type="Red"
              setVesselTypeHandle={setHullColor}
              typeValue={HullColor}
            />
            <CheckBoxCard
              type="Yellow"
              setVesselTypeHandle={setHullColor}
              typeValue={HullColor}
            />
            <CheckBoxCard
              type="Green"
              setVesselTypeHandle={setHullColor}
              typeValue={HullColor}
            />
            <CheckBoxCard
              type="Cream"
              setVesselTypeHandle={setHullColor}
              typeValue={HullColor}
            />
            <CheckBoxCard
              type="Unpainted"
              setVesselTypeHandle={setHullColor}
              typeValue={HullColor}
            />
            <CheckBoxCard
              type="Other"
              setVesselTypeHandle={setHullColor}
              typeValue={HullColor}
            />
          </Expandable>
          <Expandable title={"Superstructure Color"}>
            <CheckBoxCard
              type="White"
              setVesselTypeHandle={setSuperstructureColor}
              typeValue={superstructureColor}
            />
            <CheckBoxCard
              type="Red"
              setVesselTypeHandle={setSuperstructureColor}
              typeValue={superstructureColor}
            />
            <CheckBoxCard
              type="Yellow"
              setVesselTypeHandle={setSuperstructureColor}
              typeValue={superstructureColor}
            />
            <CheckBoxCard
              type="Green"
              setVesselTypeHandle={setSuperstructureColor}
              typeValue={superstructureColor}
            />
            <CheckBoxCard
              type="Cream"
              setVesselTypeHandle={setSuperstructureColor}
              typeValue={superstructureColor}
            />
            <CheckBoxCard
              type="Unpainted"
              setVesselTypeHandle={setSuperstructureColor}
              typeValue={superstructureColor}
            />
            <CheckBoxCard
              type="Other"
              setVesselTypeHandle={setSuperstructureColor}
              typeValue={superstructureColor}
            />
          </Expandable>

          <YesNoCard
            label="
        Do you have a valid Lagos State Operational Commercial Ferry License?"
            setTypeHandle={setValidLagosStateOperational}
            typeValue={validLagosStateOperational}
          />
          <Text>{String(agree)}</Text>
          <YesNoCard
            setTypeHandle={setAgree}
            typeValue={agree}
            title2="I do not agree"
            title1="I agree"
            label="
            I do solemnly and sincerely declare that I have read and understand the information on this application form and that all statements made with respect to this application are true and correct. I agree to comply with the regulations of the Lagos State Waterways Authority. I consent to the disclosure of information on the application to other relevant Ministries or Agencies to verify my statements and certificates. I understand that misinterpretation, falsified documents may be shared with the Nigerian Police Force, Federal Ministries and Lagos State Ministries. I authorize all relevant Federal, State ministries or agencies to release my records should the need arise to accelerate processing of this application."
          />
          <TouchableOpacity
            onPress={() => {
              nextStep();
            }}
          >
            <View style={styles.btn} center marginT-40 background-primaryColor>
              <Text whiteColor>Next</Text>
            </View>
          </TouchableOpacity>
        </>
      ) : (
        <Step2
          superstructureColor={superstructureColor}
          HullColor={HullColor}
          constructionMaterial={constructionMaterial}
          vesselUse={vesselUse}
          vesselType={vesselType}
          validLagosStateOperational={validLagosStateOperational}
          boatName={boatName}
          registrationNumber={registrationNumber}
          manufacturer={manufacturer}
          manufactureYear={manufactureYear}
          hullMaterial={hullMaterial}
          passengerCapacity={passengerCapacity}
          previouslyRegister={previouslyRegister}
          setStep={props.setStep}
          setServerMessage={props.setServerMessage}
          setToastVisible={props.setToastVisible}
          setToastColor={props.setToastColor}
          props={props.props}
        />
      )}
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
