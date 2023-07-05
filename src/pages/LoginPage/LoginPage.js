import React, { useContext, useReducer, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './LoginPage.css';
import authContext from '../../store/auth-context';
import cartContext from '../../store/cart-context';
import Layout from '../../components/Layout/Layout';
import { ImWarning } from 'react-icons/im';

axios.defaults.baseURL =
  'https://ecommerce-backend-jaswanth.onrender.com/api/v1';
// axios.defaults.headers.common['Authorization'] =

const initialState = {
  email: '',
  password: '',
  isEmailTouched: false,
  isPasswordTouched: false,
  isEmailBlurred: false,
  isPasswordBlurred: false,
};

const loginReducer = (prevState, action) => {
  switch (action.type) {
    case 'EMAIL':
      return { ...prevState, email: action.email, isEmailTouched: true };
    case 'PASSWORD':
      return {
        ...prevState,
        password: action.password,
        isPasswordTouched: true,
      };
    case 'EMAIL_BLUR':
      return { ...prevState, isEmailBlurred: true };
    case 'PASSWORD_BLUR':
      return { ...prevState, isPasswordBlurred: true };
    default:
      return prevState;
  }
};

const LoginPage = () => {
  // When user logs in -> Update the context to the user details
  const [authState, setAuthState] = useContext(authContext);
  const [, setCartState] = useContext(cartContext);
  const [loginButtonText, setLoginButtonText] = useState('Login');

  // Storing the state
  const [state, dispatch] = useReducer(loginReducer, initialState);

  // Creating a navigation object
  const navigate = useNavigate();

  // Creating a location object
  const location = useLocation();

  // Handler when form is submitted
  const submitHandler = async (event) => {
    event.preventDefault();
    const data = { email: state.email, password: state.password };

    try {
      setLoginButtonText('Logging in');

      const response = await axios.post(`/auth/login`, data);

      if (!response.data.success) {
        toast.error(response.data.message);
        return;
      }

      // Set the context to the user
      setAuthState((prevState) => ({
        ...prevState,
        user: response.data.user,
        token: response.data.token,
      }));

      // set the cart items of the user
      setCartState(response.data.user.cart);

      // store the user in local storage
      localStorage.setItem(
        'authData',
        JSON.stringify({ user: response.data.user, token: response.data.token })
      );

      // After succesfully logging in , set the token in the header
      // So that all the requests will have the token
      axios.defaults.headers.common['Authorization'] = authState.token;

      // Successfully logged in
      toast.success(response.data.message);

      // Navigate to Home page
      navigate(location.state ? location.state : '/home');
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoginButtonText('Login');
    }
  };

  return (
    <Layout>
      <div className="container login-container">
        <div className="row d-flex justify-content-center">
          <p className="custom-heading col-12">Login</p>

          <form
            action=""
            className="form col-12 col-lg-8 login-form"
            onSubmit={submitHandler}
          >
            <div className="input-group">
              <label htmlFor="email" className="label">
                Email
              </label>
              <input
                type="email"
                className="input"
                id="email"
                onChange={(event) => {
                  dispatch({ type: 'EMAIL', email: event.target.value });
                }}
                onBlur={(event) => {
                  dispatch({ type: 'EMAIL_BLUR' });
                }}
                value={state.email}
              />
              {state.isEmailBlurred && !state.email.endsWith('@gmail.com') && (
                <p className="error-text">
                  {<ImWarning className="error-icon" />}Come on !!!!!! Thats not
                  a valid email{' '}
                </p>
              )}
            </div>
            <div className="input-group">
              <label htmlFor="password" className="label">
                Password
              </label>
              <input
                type="password"
                className="input"
                id="password"
                onChange={(event) => {
                  dispatch({ type: 'PASSWORD', password: event.target.value });
                }}
                onBlur={(event) => {
                  dispatch({ type: 'PASSWORD_BLUR' });
                }}
                value={state.password}
              />
              {state.isPasswordBlurred && state.password.length < 8 && (
                <p className="error-text text-start">
                  You're not even having minimum common sense, The Password must
                  be Atleast 8 characters long 🙄
                </p>
              )}
            </div>

            <div className="input-group">
              <button className="button login-button" type="submit">
                {loginButtonText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
