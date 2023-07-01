import React, { useContext } from "react";
import authContext from "../../store/auth-context";

const DefaultAdminPage = () => {
  const [authState] = useContext(authContext);
  return (
    <div className="card">
      <div>{authState?.user?.name}</div>
    </div>
  );
};

export default DefaultAdminPage;
