import { NavLink } from 'react-router-dom';
import './AdminMenu.css';

const AdminMenu = () => {
  return (
    <ul className="list-group">
      <NavLink
        to="profile"
        className="list-group-item list-group-item-action custom-nav-link"
      >
        Profile
      </NavLink>
      <NavLink
        to="create-category"
        className="list-group-item list-group-item-action custom-nav-link"
      >
        Create Category
      </NavLink>
      <NavLink
        to="create-product"
        className="list-group-item list-group-item-action custom-nav-link"
      >
        Create Product
      </NavLink>
      <NavLink
        to="users"
        className="list-group-item list-group-item-action custom-nav-link"
      >
        Users
      </NavLink>
      <NavLink
        to="products"
        className="list-group-item list-group-item-action custom-nav-link"
      >
        Products
      </NavLink>
      <NavLink
        to="orders"
        className="list-group-item list-group-item-action custom-nav-link"
      >
        Orders
      </NavLink>
    </ul>
  );
};

export default AdminMenu;
