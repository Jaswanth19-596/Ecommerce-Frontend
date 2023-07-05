import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import cartContext from '../store/cart-context';
import authContext from '../store/auth-context';
import { Link } from 'react-router-dom';
import DropIn from 'braintree-web-drop-in-react'; // For payment
import axios from 'axios';
import { toast } from 'react-toastify';
import './CartPage.css';
import Loading from './../components/Loading';

const Cart = () => {
  const [cartState, setCartState] = useContext(cartContext);
  const [authState] = useContext(authContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [clientToken, setClientToken] = useState('');
  const [instance, setInstance] = useState('');

  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentButtonText, setPaymentButtonText] = useState('Make Payment');

  const findTotal = () => {
    const total = cartState.reduce((acc, item) => {
      return acc + item.price;
    }, 0);
    setTotalPrice(total);
  };

  useEffect(() => {
    findTotal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartState]);

  const handleItemRemove = (id) => {
    const filteredCartItems = cartState.filter((item) => {
      return item._id !== id;
    });

    setCartState(filteredCartItems);
    localStorage.setItem('cartItems', filteredCartItems);
  };

  // Get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get('/products/braintree/token');
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log('Error while fetching the token');
    }
  };

  const handlePayment = async () => {
    try {
      setPaymentButtonText('Payment Processing');
      const { nonce } = await instance.requestPaymentMethod();

      // Do the payment
      await axios.post(
        '/products/braintree/payment',
        {
          nonce,
          cart: cartState,
        },
        {
          headers: {
            Authorization: authState.token,
          },
        }
      );
      // Give a toast message
      toast.success('Payment done successfully');

      // Make the cart empty
      setCartState([]);

      // remove the cart items from local storage
      localStorage.removeItem('cartItems');

      // Navigate to orders
      navigate('/dashboard/user/orders');
    } catch (error) {
      toast.error('Payment cannot be done');
    } finally {
      setPaymentButtonText('Make Payment');
    }
  };

  useEffect(() => {
    getToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState?.token]);

  return (
    <Layout>
      <h3 className="cart-heading">Your Basket</h3>

      <div className="container">
        <table className="table">
          <thead style={{ width: '100%' }}>
            <tr>
              <th scope="col" className="table-heading th-image">
                Image
              </th>
              <th scope="col" className="table-heading th-name">
                Product Name
              </th>
              <th scope="col" className="table-heading th-description">
                Description
              </th>
              <th scope="col" className="table-heading th-price">
                Price
              </th>
              <th scope="col" className="table-heading th-price">
                {' '}
              </th>
            </tr>
          </thead>
          <tbody>
            {cartState.length === 0 && (
              <tr>
                <td colSpan={4} className="no-items-text">
                  There are no items in the cart
                </td>
              </tr>
            )}

            {cartState?.map((item) => (
              <tr>
                <td>
                  <img
                    src={`https://ecommerce-backend-jaswanth.onrender.com/api/v1/products/get-image/${item._id}`}
                    alt=""
                    style={{ width: '100px', height: '80px' }}
                  />
                </td>
                <td className="td-name">{item.name}</td>
                <td className="td-description">
                  {item.description.substring(0, 100)}
                </td>
                <td className="td-price">${item.price}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleItemRemove(item._id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="row bottom-row">
          <div className="col-12 col-md-6">
            <div className="text-center mb-5">
              <h3>Current Address</h3>
              <p>{authState?.user?.address}</p>

              {authState?.token ? (
                <Link
                  to={`/dashboard/${
                    authState?.user?.role === 1 ? 'admin' : 'user'
                  }/profile`}
                  className="btn btn-outline-danger"
                >
                  Update Address{location.pathname}
                </Link>
              ) : (
                <button
                  className="btn btn-outline-danger"
                  onClick={() => {
                    console.log('Clicked');
                    navigate('/login', { state: location.pathname });
                  }}
                >
                  Login to checkout{location.pathname}
                </button>
              )}
            </div>

            <table className="order-summary-table">
              <thead>
                <tr>
                  <th colSpan={2} className="order-summary-heading">
                    Order Summary
                  </th>
                </tr>
              </thead>
              <tbody className="table-body">
                <tr className="table-row">
                  <td className="order-label">Subtotal</td>
                  <td className="order-value">${totalPrice}</td>
                </tr>
                <tr className="table-row">
                  <td className="order-label">Shipping & Handling</td>
                  <td className="order-value">
                    ${(totalPrice * 0.03).toFixed(2)}
                  </td>
                </tr>
                <tr className="table-row">
                  <td className="order-label">Est. Tax</td>
                  <td className="order-value">
                    ${(totalPrice * 0.18).toFixed(2)}
                  </td>
                </tr>
                <tr className="table-row">
                  <td className="order-label">Total</td>
                  <td className="order-value">
                    $
                    {(
                      totalPrice +
                      totalPrice * 0.03 +
                      totalPrice * 0.18
                    ).toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="col-12 col-md-6 col-lg-5 d-flex justify-content-center align-items-center">
            {authState?.token && cartState.length && !clientToken && (
              <Loading />
            )}

            {!authState?.token && (
              <div className="payment-container">
                <p className="login-to-pay">Login To Pay</p>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => {
                    navigate('/login', { state: location.pathname });
                  }}
                >
                  Login to checkout{location.pathname}
                </button>
              </div>
            )}

            {clientToken && authState?.token && !cartState.length && (
              <div className="d-flex flex-column justify-content-center align-items-center m-5">
                <p className="add-items-to-cart-para">
                  Add items to enable payment
                </p>
                <button
                  onClick={() => {
                    navigate('/');
                  }}
                  className="btn btn-outline-danger"
                >
                  Add items
                </button>
              </div>
            )}

            {clientToken && authState?.token && cartState.length && (
              <div className="payment-option">
                <DropIn
                  options={{
                    authorization: clientToken,
                  }}
                  onInstance={(instance) => setInstance(instance)}
                />
                <button
                  className="btn btn-outline-danger"
                  onClick={handlePayment}
                >
                  {paymentButtonText}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
