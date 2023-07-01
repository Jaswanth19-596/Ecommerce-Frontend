import React from 'react';
import { Link } from 'react-router-dom';
import './../../utilitycss/product.css';

const Product = (props) => {
  const { product, handleAddToCart } = props;

  return (
    <div className="card product margin-product" key={product._id}>
      <img
        src={`https://ecommerce-backend-jaswanth.onrender.com/api/v1/products/get-image/${product._id}`}
        className="card-img-top product-image"
        alt="..."
      />
      <div className="card-body product-body">
        <h5 className="card-title product-heading">{product.name}</h5>

        <p
          className="card-text product-description"
          style={{ textOverflow: 'ellipsis' }}
        >
          {`${product.description}`.substring(0, 130)}...
        </p>
        <p className="product-price">${product.price}</p>
        {/* If path is provided then it is done by admin to update the product */}
        <Link
          to={
            props.isAdmin
              ? `/dashboard/admin/products/update-product/${product._id}`
              : `/products/product-details/${product.slug}`
          }
        >
          <button className="product-button more-details-button">
            {props.isAdmin ? 'Update Product' : 'More Details'}
          </button>
        </Link>
        {!props.isAdmin && (
          <button
            className="product-button add-to-cart-button"
            onClick={() => {
              handleAddToCart(product);
            }}
          >
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Product;
