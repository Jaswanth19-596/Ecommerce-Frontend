import React, { useEffect, useState } from "react";

const authContext = React.createContext();

export default authContext;

export const AuthProvider = (props) => {
  const [authState, setAuthState] = useState({
    user: null,
    token: "",
  });

  useEffect(() => {
    const authData = localStorage.getItem("authData");

    if (authData) {
      setAuthState(JSON.parse(authData));
    }
  }, []);

  return (
    <authContext.Provider value={[authState, setAuthState]}>
      {props.children}
    </authContext.Provider>
  );
};
