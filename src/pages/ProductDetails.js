import React, { useEffect, useState, useContext } from 'react';
import Layout from '../components/Layout/Layout';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './../utilitycss/product.css';
import './ProductDetails.css';
import cartContext from '../store/cart-context';
import hottoast from 'react-hot-toast';

const ProductDetails = () => {
  const { slug } = useParams();

  const [product, setProduct] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [cartState, setCartState] = useContext(cartContext);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(`/products/product-details/${slug}`);
      if (data.success) {
        setProduct(data.data[0]);
      }
    } catch (error) {
      console.log('Error while fetching details of product');
    }
  };

  const getSimilarProducts = async () => {
    try {
      const pid = product._id;
      console.log(pid);
      const cid = product.category._id;
      console.log(cid);

      const { data } = await axios.get(
        `/products/get-similar-products/${cid}/${pid}`
      );
      console.log(data);
      if (!data.success) throw new Error();

      setSimilarProducts(data.data);
    } catch (error) {
      console.log('error while fetching similar products', error.message);
    }
  };

  const handleAddToCart = (product) => {
    console.log('In add to cart');
    setCartState([...cartState, product]);
    localStorage.setItem('cartItems', JSON.stringify([...cartState, product]));
    // toast.success('Added');
    hottoast.success('Added to cart');
  };

  useEffect(() => {
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  useEffect(() => {
    getSimilarProducts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  return (
    <Layout>
      <div className="product-detail-page">
        <h1 className="text-center product-details-heading">Product Details</h1>

        <div className="container-fluid product-detail-container">
          <div className="row product-detail-container product-detail-container-top">
            <div className="col-12 col-sm-6 col-lg-5">
              <img
                src={`https://ecommerce-backend-jaswanth.onrender.com/api/v1/products/get-image/${product?._id}`}
                className="card-img-top product-detail-image"
                alt="..."
              />
            </div>
            <div className="col-10 col-sm-6 col-lg-5 product-detail-description">
              <h3 className="product-detail-description-heading">
                {product?.name}
              </h3>
              <p className="product-detail-category">
                {product?.category?.name}
              </p>
              <p className="product-detail-description-para">
                {product?.description}
              </p>
              <p className="product-detail-description-price">
                ${product?.price}
              </p>
              <button
                className="product-details-button"
                onClick={() => handleAddToCart(product)}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
        <div className="container-fluid similar-products-container">
          <div className="row similar-products-row">
            <h3 className="col-12 similar-product-heading">Similar Products</h3>
            {similarProducts?.map((product) => {
              return (
                <div
                  className="col-10 col-sm-5 col-md-4 col-lg-3 similar-product"
                  key={product._id}
                >
                  <div className="card product" key={product._id}>
                    <img
                      src={`https://ecommerce-backend-jaswanth.onrender.com/api/v1/products/get-image/${product._id}`}
                      className="card-img-top product-image"
                      alt="..."
                    />
                    <div className="card-body product-body">
                      <h5 className="card-title product-heading">
                        {product.name}
                      </h5>

                      <p className="card-text product-description">
                        {product.description.substring(0, 130)}...
                      </p>
                      <p className="product-price">${product.price}</p>
                      <Link to={`/products/product-details/${product.slug}`}>
                        <button className="product-button more-details-button">
                          More Details
                        </button>
                      </Link>

                      <button
                        className="product-button add-to-cart-button"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            {similarProducts.length === 0 && <p>No Similar products </p>}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
