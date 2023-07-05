import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { Select } from 'antd';
import Product from '../../components/Product/Product';
import authContext from './../../store/auth-context';
import cartContext from '../../store/cart-context';
import { toast } from 'react-toastify';
import hottoast from 'react-hot-toast';
import Loading from '../../components/Loading';
import './OrdersAdmin.css';

const { Option } = Select;

const OrdersAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [authState] = useContext(authContext);
  const [cartState, setCartState] = useContext(cartContext);
  const [isLoading, setIsLoading] = useState(false);

  const getOrders = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get('/orders/get-orders-admin', {
        headers: {
          Authorization: authState.token,
        },
      });
      if (!data.success) throw new Error();
      setOrders(data.data);
    } catch (error) {
      console.log('Error while fetching the orders');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (value, order) => {
    try {
      await axios.put(
        `/orders/update-order-status/${order._id}`,
        {
          status: value,
        },
        {
          headers: {
            Authorization: authState.token,
          },
        }
      );
    } catch (error) {
      toast.error('Cannot update the status');
    }
  };

  useEffect(() => {
    getOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddToCart = (product) => {
    setCartState([...cartState, product]);
    localStorage.setItem('cartItems', JSON.stringify([...cartState, product]));
    // toast.success('Added');
    hottoast.success('Added to cart');
  };

  return (
    <div>
      <h3 className="text-center admin-dashboard-sub-heading">All Orders</h3>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Status</th>
            <th scope="col">Buyer</th>
            <th scope="col">Date</th>
            <th scope="col">Payment</th>
            <th scope="col">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <div className="center">
              <Loading />
            </div>
          )}
          {!isLoading &&
            orders?.map((order, i) => {
              return (
                <tr>
                  <th scope="row">{i + 1}</th>
                  <td className="t-data">
                    <Select
                      className="select t-data"
                      defaultValue={order.status}
                      onChange={(value) => handleStatusChange(value, order)}
                    >
                      <Option value="notprocessed">Not Processed</Option>
                      <Option className={'value'} value="processing">
                        Processing
                      </Option>
                      <Option className={'value'} value="shipping">
                        Shipping
                      </Option>
                      <Option className={'value'} value="delivering">
                        Delivering
                      </Option>
                      <Option className={'value'} value="cancelled">
                        Cancelled
                      </Option>
                    </Select>
                  </td>
                  <td className="t-data">{order.buyer.name}</td>
                  <td className="t-data">
                    {moment
                      .utc(order.createdAt)
                      .local()
                      .startOf('seconds')
                      .fromNow()}
                  </td>
                  <td className="t-data">
                    {order.payment.success ? 'Success' : 'Failed'}
                  </td>
                  <td className="t-data">{order.products.length}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className="container">
        {orders.map((order, i) => {
          return (
            <>
              <h3 className="mb-5">Order {i + 1}</h3>
              <div className="row">
                {order.products.map((product) => {
                  return (
                    <div className="col-12 col-sm-6 col-md-5" key={product._id}>
                      <Product
                        product={product}
                        handleAddToCart={handleAddToCart}
                      />
                    </div>
                  );
                })}
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default OrdersAdmin;
