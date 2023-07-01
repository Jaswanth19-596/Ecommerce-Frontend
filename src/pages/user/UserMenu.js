import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <ul className="list-group">
      <NavLink to="profile" className="list-group-item list-group-item-action">
        Profile
      </NavLink>
      <NavLink to="orders" className="list-group-item list-group-item-action">
        Orders
      </NavLink>
    </ul>
  );
};

export default UserMenu;
