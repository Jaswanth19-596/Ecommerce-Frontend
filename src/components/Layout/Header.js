import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import authContext from '../../store/auth-context';
import categoryContext from '../../store/category-context';
import cartContext from '../../store/cart-context';
import { toast } from 'react-toastify';
import SearchInput from '../SearchInput';
import 'react-toastify/dist/ReactToastify.css';
import './Header.css';
import axios from 'axios';

const Header = () => {
  const [authState, setAuthState] = useContext(authContext);
  const [cartState, setCartState] = useContext(cartContext);

  const [categories] = useContext(categoryContext);

  // Store the cart Items of the user in db
  const storeCartItems = async () => {
    try {
      const { data } = await axios.put(
        '/auth/update-cart',
        {
          cart: cartState,
          user: authState.user,
        },
        {
          headers: { Authorization: authState.token },
        }
      );
    } catch (error) {
      console.log('Error while storing cart items in db');
    }
  };

  const logoutHandler = (event) => {
    // Resetting the user so that he will be logged out
    setAuthState({ ...authState, user: null, token: '' });

    // set cart state to empty
    setCartState([]);

    // storeCart items in database
    storeCartItems();

    // remove cart items from localstorage
    localStorage.removeItem('cartItems');

    // Remove user from localstorage
    localStorage.removeItem('authData');

    // Sending the toast notification
    toast.success('Succesfully Logged out');
  };

  return (
    <header className="header-nav">
      <NavLink className="ecommerce-logo " to="/">
        Ecartify
      </NavLink>

      <div className="search-container">
        <SearchInput />
      </div>

      <ul className="navbar-nav ">
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/home">
            Home
          </NavLink>
        </li>
        <li className="nav-item dropdown">
          <NavLink
            className="nav-link dropdown-toggle"
            id="navbarDropdownMenuLink"
            data-bs-toggle="dropdown"
          >
            Category
          </NavLink>
          <ul
            className="dropdown-menu"
            aria-labelledby="navbarDropdownMenuLink"
          >
            {categories?.map((category) => (
              <li key={category.slug}>
                <Link
                  to={`/products/${category.slug}`}
                  className="dropdown-item"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </li>

        {/* Only show the Register and login buttons when the user is loggedin */}
        {!authState.user && (
          <>
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">
                Register
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </li>{' '}
          </>
        )}
        {authState.user && (
          <li className="nav-item dropdown">
            <NavLink
              className="nav-link dropdown-toggle"
              id="navbarDropdownMenuLink"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {authState.user.name}
            </NavLink>
            <ul
              className="dropdown-menu"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <li>
                <NavLink
                  className="dropdown-item"
                  to={`${
                    authState.user.role === 1
                      ? '/dashboard/admin'
                      : '/dashboard/user'
                  } `}
                >
                  Dashboard
                </NavLink>
              </li>
              <li onClick={logoutHandler}>
                <NavLink className="dropdown-item" to="/login">
                  Logout
                </NavLink>
              </li>
            </ul>
          </li>
        )}
        <li className="nav-item">
          <NavLink className="nav-link" to="/cart">
            Cart({cartState.length})
          </NavLink>
        </li>
      </ul>
    </header>
  );
};

export default Header;
