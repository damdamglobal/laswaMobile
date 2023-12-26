import React, { useState, useEffect } from "react";
export const MainScreenContextFile = React.createContext();

export const MainScreenProviderFile = (props) => {
  const [mainScreen, setMainScreen] = useState(false);

  return (
    <MainScreenContextFile.Provider value={[mainScreen, setMainScreen]}>
      {props.children}
    </MainScreenContextFile.Provider>
  );
};
