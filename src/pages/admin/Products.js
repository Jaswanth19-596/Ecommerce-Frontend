import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import authContext from './../../store/auth-context';
import cartContext from '../../store/cart-context';
import Product from '../../components/Product/Product';
import hottoast from 'react-hot-toast';
import Loading from '../../components/Loading';

const Products = () => {
  const [authState] = useContext(authContext);
  const [cartState, setCartState] = useContext(cartContext);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllProducts = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get('/products/get-all-products', {
        headers: {
          Authorization: authState.token,
        },
      });

      if (data.success) {
        setProducts(data.data);
      } else {
        throw new Error();
      }
    } catch (error) {
      toast.error('Error while fetching products');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
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
      <h1 className="admin-dashboard-sub-heading text-center">All Products</h1>
      <div className="container">
        <div className="row mt-5">
          {isLoading && <Loading />}

          {!isLoading &&
            products?.map((product) => {
              return (
                <div className="col-12 col-sm-6 col-md-4 col-lg-4">
                  <Product
                    product={product}
                    handleAddToCart={handleAddToCart}
                    isAdmin={true}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Products;
