import React, { useState, useEffect } from "react";

export const AuthContext = React.createContext();
export const SplashscreenContext = React.createContext();
export const MainScreenContext = React.createContext();
export const BusinessProfileContext = React.createContext();
export const OnboardingScreenContext = React.createContext();
export const BoatScreenContext = React.createContext();
export const TripsScreenContext = React.createContext();

export const BoatScreenProvider = (props) => {
  const [boat, setBoat] = useState([]);

  return (
    <BoatScreenContext.Provider value={[boat, setBoat]}>
      {props.children}
    </BoatScreenContext.Provider>
  );
};

export const TripsScreenProvider = (props) => {
  const [trip, setTrip] = useState([]);

  return (
    <TripsScreenContext.Provider value={[trip, setTrip]}>
      {props.children}
    </TripsScreenContext.Provider>
  );
};

export const OnboardingScreenProvider = (props) => {
  const [onboard, setOnboard] = useState(false);

  return (
    <OnboardingScreenContext.Provider value={[onboard, setOnboard]}>
      {props.children}
    </OnboardingScreenContext.Provider>
  );
};

export const MainScreenProvider = (props) => {
  const [mainScreen, setMainScreen] = useState(false);

  return (
    <MainScreenContext.Provider value={[mainScreen, setMainScreen]}>
      {props.children}
    </MainScreenContext.Provider>
  );
};

export const AuthProvider = (props) => {
  const [auth, setAuth] = useState(false);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const SplashscreenProvider = (props) => {
  const [Splashscreen, setSplashscreen] = useState(true);

  return (
    <SplashscreenContext.Provider value={[Splashscreen, setSplashscreen]}>
      {props.children}
    </SplashscreenContext.Provider>
  );
};
