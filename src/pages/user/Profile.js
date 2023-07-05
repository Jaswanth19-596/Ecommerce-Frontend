import React, { useContext, useEffect, useReducer } from 'react';
import authContext from '../../store/auth-context';
import { toast } from 'react-toastify';
import axios from 'axios';

// Reducer
const registerReducer = (prevState, action) => {
  switch (action.type) {
    case 'STATE':
      return action.state;
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
  role: 0,
};

const Profile = () => {
  const [state, dispatch] = useReducer(registerReducer, initialState);

  const [authState, setAuthState] = useContext(authContext);

  console.log(authState.user);

  const isFormValid =
    state?.name?.length > 2 &&
    state?.email?.endsWith('@gmail.com') &&
    state?.phone?.length === 10 &&
    state?.address?.length > 1;

  const handleProfileUpdate = async (event) => {
    try {
      event.preventDefault();

      if (!isFormValid) {
        toast.error('One of the fields is invalid');
      }

      const { data } = await axios.put('/auth/update-profile', state, {
        headers: {
          Authorization: authState.token,
        },
      });

      setAuthState({ ...authState, user: data.data });
      toast.success('Succesfully updated the products');
    } catch (error) {
      console.log('Error while updating profile');
    }
  };

  useEffect(() => {
    console.log(authState);
    dispatch({ type: 'STATE', state: authState.user });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1 className="text-center">Update Profile</h1>

      <form action="" className="form" onSubmit={handleProfileUpdate}>
        <div className="input-group">
          <label htmlFor="name" className="label">
            Name
          </label>
          <input
            value={state?.name}
            type="text"
            className="input"
            id="name"
            onChange={(event) =>
              dispatch({ type: 'NAME', name: event.target.value })
            }
          />
          {state?.isNameTouched &&
            (state?.name === '' || state?.name.length < 2) && (
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
            value={state?.email}
            type="email"
            className="input"
            id="email"
            onChange={(event) =>
              dispatch({ type: 'EMAIL', email: event.target.value })
            }
          />
          {state?.isEmailTouched &&
            (!state?.email.endsWith('@gmail.com') ||
              state?.email.length < 12) && (
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
          {state?.isPasswordTouched && state?.password.length < 8 && (
            <p className="error-text">Come on, Thats not a valid password</p>
          )}
        </div>
        <div className="input-group">
          <label htmlFor="phone" className="label">
            Phone No
          </label>
          <input
            value={state?.phone}
            type="number"
            className="input"
            id="phone"
            onChange={(event) =>
              dispatch({ type: 'PHONE', phone: event.target.value })
            }
          />
          {state?.isPhoneTouched && state?.phone.length !== 10 && (
            <p className="error-text">I bet, Thats not a valid phone number</p>
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
            value={state?.address}
          ></textarea>
          {state?.isAddressTouched && state?.address.length < 1 && (
            <p className="error-text">
              You dont even have a adress either !!!!!!!! Come on
            </p>
          )}
        </div>

        <div className="input-group">
          <button className="button" type="submit">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
