import { NavLink } from 'react-router-dom';

const AdminMenu = () => {
  return (
    <ul className="list-group">
      <NavLink to="profile" className="list-group-item list-group-item-action">
        Profile
      </NavLink>
      <NavLink
        to="create-category"
        className="list-group-item list-group-item-action"
      >
        Create Category
      </NavLink>
      <NavLink
        to="create-product"
        className="list-group-item list-group-item-action"
      >
        Create Product
      </NavLink>
      <NavLink to="users" className="list-group-item list-group-item-action">
        Users
      </NavLink>
      <NavLink to="products" className="list-group-item list-group-item-action">
        Products
      </NavLink>
      <NavLink to="orders" className="list-group-item list-group-item-action">
        Orders
      </NavLink>
    </ul>
  );
};

export default AdminMenu;
