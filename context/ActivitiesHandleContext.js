import React, { useState, useEffect } from "react";
export const ActivitiesHandleContextFile = React.createContext();

export const ActivitiesHandleProviderFile = (props) => {
  const [loading, setLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState("server error");
  const [toastVisible, setToastVisible] = useState(false);
  const [toastColor, setToastColor] = useState("red");

  return (
    <ActivitiesHandleContextFile.Provider
      value={{
        loading: loading,
        setLoading: setLoading,
        serverMessage: serverMessage,
        setServerMessage: setServerMessage,
        toastVisible: toastVisible,
        setToastVisible: setToastVisible,
        toastColor: toastColor,
        setToastColor: setToastColor,
      }}
    >
      {props.children}
    </ActivitiesHandleContextFile.Provider>
  );
};
