import React, { useState, useEffect } from "react";
export const SplashscreenContextFile = React.createContext();

export const SplashscreenProviderFile = (props) => {
  const [Splashscreen, setSplashscreen] = useState(true);

  const myFunction = (payload) => {
    // Your function logic here
    console.log("Function called from context!" + payload);
  };
  const myFunction2 = (payload) => {
    // Your function logic here
    console.log("Function called from context!" + payload + "90");
  };

  return (
    <SplashscreenContextFile.Provider
      value={[Splashscreen, setSplashscreen, myFunction, myFunction2]}
    >
      {props.children}
    </SplashscreenContextFile.Provider>
  );
};
