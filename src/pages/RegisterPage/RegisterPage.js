import React, { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './RegisterPage.css';
import Layout from '../../components/Layout/Layout';

// Reducer
const registerReducer = (prevState, action) => {
  switch (action.type) {
    case 'NAME':
      return { ...prevState, name: action.name, isNameTouched: true };
    case 'EMAIL':
      return { ...prevState, email: action.email, isEmailTouched: true };
    case 'PASSWORD':
      return {
        ...prevState,
        password: action.password,
        isPasswordTouched: true,
      };
    case 'PHONE':
      return { ...prevState, phone: action.phone, isPhoneTouched: true };
    case 'ADDRESS':
      return { ...prevState, address: action.address, isAddressTouched: true };
    default:
      return prevState;
  }
};

const initialState = {
  name: '',
  email: '',
  password: '',
  phone: '',
  address: '',
  isNameTouched: false,
  isEmailTouched: false,
  isPasswordTouched: false,
  isPhoneTouched: false,
  isAddressTouched: false,
};

const Register = () => {
  // Using state to store all the details
  const [state, dispatch] = useReducer(registerReducer, initialState);

  // Creating Navigation object
  const navigate = useNavigate();

  // Checking whether the form is valid or not
  const isFormValid =
    state.name.length > 2 &&
    state.email.endsWith('@gmail.com') &&
    state.password.length >= 8 &&
    state.phone.length === 10 &&
    state.address.length > 1;

  // When the form is submitted
  const formRegisterHandler = async (event) => {
    event.preventDefault();
    const data = {
      name: state.name,
      email: state.email,
      phone: state.phone,
      password: state.password,
      address: state.address,
    };
    try {
      // Send the HTTP request
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        data
      );

      // If user is already registered
      if (!response.data.success) {
        toast.error(response.data.message);
        navigate('/login');
        return;
      }
      toast.success(response.data.message);
      navigate('/login');
    } catch (error) {
      toast.error('Something went wrong' + error);
    }
  };

  return (
    <Layout>
      <div className="container register-container">
        <div className="row justify-content-center">
          <h3 className="col-12 heading-tertiary text-center">
            Get Started with a account
          </h3>
          <p className="col-12 para text-center">
            Create a account with Ecartify app to do whatever you want
          </p>
          <form
            action=""
            className="form col-12 col-md-8"
            onSubmit={formRegisterHandler}
          >
            <div className="input-group">
              <label htmlFor="name" className="label">
                Name
              </label>
              <input
                value={state.name}
                type="text"
                className="input"
                id="name"
                onChange={(event) =>
                  dispatch({ type: 'NAME', name: event.target.value })
                }
              />
              {state.isNameTouched &&
                (state.name === '' || state.name.length < 2) && (
                  <p className="error-text">
                    Come on, Thats not your name, Isn't it{' '}
                  </p>
                )}
            </div>
            <div className="input-group">
              <label htmlFor="email" className="label">
                Email
              </label>
              <input
                type="email"
                className="input"
                id="email"
                onChange={(event) =>
                  dispatch({ type: 'EMAIL', email: event.target.value })
                }
              />
              {state.isEmailTouched &&
                (!state.email.endsWith('@gmail.com') ||
                  state.email.length < 12) && (
                  <p className="error-text">
                    Come on, Thats not your email, Isn't it{' '}
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
                onChange={(event) =>
                  dispatch({ type: 'PASSWORD', password: event.target.value })
                }
              />
              {state.isPasswordTouched && state.password.length < 8 && (
                <p className="error-text">
                  Come on, Thats not a valid password
                </p>
              )}
            </div>
            <div className="input-group">
              <label htmlFor="phone" className="label">
                Phone No
              </label>
              <input
                type="number"
                className="input"
                id="phone"
                onChange={(event) =>
                  dispatch({ type: 'PHONE', phone: event.target.value })
                }
              />
              {state.isPhoneTouched && state.phone.length !== 10 && (
                <p className="error-text">
                  I bet, Thats not a valid phone number
                </p>
              )}
            </div>
            <div className="input-group">
              <label htmlFor="address" className="label">
                Address
              </label>
              <textarea
                name=""
                id="address"
                cols="30"
                rows="10"
                className="textarea"
                onChange={(event) =>
                  dispatch({ type: 'ADDRESS', address: event.target.value })
                }
              ></textarea>
              {state.isAddressTouched && state.address.length < 1 && (
                <p className="error-text">
                  You dont even have a adress either !!!!!!!! Come on
                </p>
              )}
            </div>

            <div className="input-group">
              <button
                className="button register-button"
                disabled={!isFormValid}
                type="submit"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
