import axios from "axios";
import React, { useContext, useState } from "react";
import authContext from "../store/auth-context";
import { Outlet } from "react-router-dom";
import Spinner from "./../components/Spinner/Spinner";

const MakeAdminDashboardPrivate = () => {
  const [ok, setOk] = useState(false);
  const [authState] = useContext(authContext);

  useState(() => {
    try {
      const isUserAdmin = async () => {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/auth/admin-auth`,
          {
            headers: { authorization: authState?.token },
          }
        );

        if (response.data.ok) {
          setOk(true);
        }
      };

      isUserAdmin();
    } catch (err) {
      setOk(false);
      console.log(err + "error in make admin dashboard private");
    }
  });
  const redirectMessage = "Only Admin can access this route, Redirecting in";
  return ok ? (
    <Outlet />
  ) : (
    <Spinner path="/" redirectMessage={redirectMessage} />
  );
};

export default MakeAdminDashboardPrivate;
