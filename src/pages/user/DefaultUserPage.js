import React, { useContext } from "react";
import authContext from "../../store/auth-context";

const DefaultUserPage = () => {
  const [authState] = useContext(authContext);

  return (
    <div className="card p-3">
      <div>{authState?.user?.name}</div>
    </div>
  );
};

export default DefaultUserPage;
