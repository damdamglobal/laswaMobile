import React, { useState, useEffect } from "react";
export const AuthContextFile = React.createContext();

export const AuthProviderFile = (props) => {
  const [auth, setAuth] = useState(false);

  return (
    <AuthContextFile.Provider value={[auth, setAuth]}>
      {props.children}
    </AuthContextFile.Provider>
  );
};
