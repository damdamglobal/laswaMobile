import React, { useState, useEffect } from "react";
export const GeneralDatContextFile = React.createContext();

export const GeneralDataProviderFile = (props) => {
  const [trip, setTrip] = useState([]);
  const [boat, setBoat] = useState([]);
  const [operators, setOperators] = useState([]);

  return (
    <GeneralDatContextFile.Provider
      value={{
        trip,
        setTrip,
        boat,
        setBoat,
        operators,
        setOperators,
      }}
    >
      {props.children}
    </GeneralDatContextFile.Provider>
  );
};
