import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import './../utilitycss/product.css';
import './CategoryProducts.css';
import Loading from './../components/Loading';
import NoProductAvailable from '../components/NoProductAvailabe/NoProductAvailable';

const CategoryProducts = () => {
  const { slug } = useParams();

  const [products, setProducts] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const getProductsOnCategory = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`/products/get-by-category/${slug}`);

      if (data.success) {
        setProducts(data?.data);
      }
    } catch (error) {
      console.log('Error while fetching products based on category');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProductsOnCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return (
    <Layout>
      <div className="entire-container">
        <h1 className="text-center">Category : {slug}</h1>

        <div className="container category-container">
          <div className="row justify-content-center">
            {isLoading && <Loading />}

            {!isLoading &&
              products?.map((product) => {
                return (
                  <div
                    className="col-10 col-sm-6 col-md-5 col-lg-4"
                    key={product._id}
                  >
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

                        <p className="product-description">
                          {product.description.substring(0, 130)}...
                        </p>
                        <p className="product-price">${product.price}</p>
                        <Link to={`/products/product-details/${product.slug}`}>
                          <button className="product-button more-details-button">
                            More Details
                          </button>
                        </Link>
                        <button className="product-button add-to-cart-button">
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            {!isLoading && products.length === 0 && <NoProductAvailable />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProducts;
