import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import authContext from './../../store/auth-context';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Loading from './../../components/Loading';

import './Orders.css';
import './../CartPage.css';
import './../../utilitycss/product.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState([]);

  const [authState] = useContext(authContext);
  const getOrders = async () => {
    try {
      setIsLoading(true);

      const { data } = await axios.get('/orders/get-orders', {
        headers: {
          Authorization: authState.token,
        },
      });
      if (!data.success) throw new Error();
      setIsLoading(false);
      setOrders(data.data);
    } catch (error) {
      console.log('Error while fetching the orders');
    }
  };

  useEffect(() => {
    getOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1 className="text-center">Your Orders</h1>
      <table className="table">
        <thead>
          <tr>
            <th className="t-heading" scope="col">
              #
            </th>
            <th className="t-heading" scope="col">
              Status
            </th>
            <th className="t-heading" scope="col">
              Buyer
            </th>
            <th className="t-heading" scope="col">
              Date
            </th>
            <th className="t-heading" scope="col">
              Payment
            </th>
            <th className="t-heading" scope="col">
              Quantity
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading && <Loading />}
          {!isLoading &&
            orders?.map((order, i) => {
              return (
                <tr>
                  <td className="t-data">{i + 1}</td>
                  <td className="t-data">{order.status}</td>
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
              <h3 className="order-number">Order {i + 1}</h3>
              <div className="row">
                {order.products.map((product) => {
                  return (
                    <div className="col-10 col-sm-6 col-md-6" key={product._id}>
                      <div
                        className="card product margin-product"
                        key={product._id}
                      >
                        <img
                          src={`https://ecommerce-backend-jaswanth.onrender.com/api/v1/products/get-image/${product._id}`}
                          className="card-img-top product-image"
                          alt="..."
                        />
                        <div className="card-body product-body">
                          <h5 className="card-title product-heading">
                            {product.name}
                          </h5>

                          <p
                            className="card-text product-description"
                            style={{ textOverflow: 'ellipsis' }}
                          >
                            {product.description.substring(0, 100)}...
                          </p>
                          <p className="product-price">{product.price}</p>
                          <Link
                            to={`/products/product-details/${product.slug}`}
                          >
                            <button className="product-button more-details-button">
                              More Details
                            </button>
                          </Link>
                        </div>
                      </div>
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

export default Orders;
