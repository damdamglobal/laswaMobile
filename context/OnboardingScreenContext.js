import React, { useState, useEffect } from "react";
export const OnboardingScreenContextFile = React.createContext();
import AsyncStorage from "@react-native-async-storage/async-storage";

export const OnboardingScreenProviderFile = (props) => {
  const [onboard, setOnboard] = useState(true);

  useEffect(() => {
    async function fetchStoresData() {
      let value = await AsyncStorage.getItem("onboard");
      let Onboarding = JSON.parse(value);

      if (Onboarding == "false") {
        setOnboard(value);
      }
    }
    fetchStoresData();
  }, []);

  return (
    <OnboardingScreenContextFile.Provider value={[onboard, setOnboard]}>
      {props.children}
    </OnboardingScreenContextFile.Provider>
  );
};
