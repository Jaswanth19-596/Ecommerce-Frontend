import React, { useContext, useEffect, useState } from "react";
import authContext from "../store/auth-context";
import Spinner from "../components/Spinner/Spinner";
import axios from "axios";
import { Outlet } from "react-router-dom";

const MakeRoutePrivate = () => {
  const [authState] = useContext(authContext);
  const [ok, setOk] = useState(false);

  console.log(ok);
  useEffect(() => {
    const checkIsUserLoggedIn = async () => {
      try {
        // Send the request whether user is logged in or not
        const response = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/auth/user-auth`,
          {
            headers: { authorization: `${authState?.token}` },
          }
        );

        // If the user is logged in
        if (response.data.ok === true) {
          setOk(true);
        }
      } catch (err) {
        // If the user is not logged in
        setOk(false);
      }
    };

    checkIsUserLoggedIn();
  }, [authState?.token]);
  const redirectMessage = "You are not logged in , Redirecting to login page";
  return (
    <>
      {ok === false ? (
        <Spinner path={"/login"} redirectMessage={redirectMessage} />
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default MakeRoutePrivate;
