import React, { useContext } from 'react';
import searchContext from './../store/search-context';
import Layout from '../components/Layout/Layout';
import './../utilitycss/product.css';
import Product from './../components/Product/Product';
import cartContext from '../store/cart-context';
import hottoast from 'react-hot-toast';

const SearchPage = () => {
  const [searchState] = useContext(searchContext);
  const [cartState, setCartState] = useContext(cartContext);

  const handleAddToCart = (product) => {
    setCartState([...cartState, product]);
    localStorage.setItem('cartItems', JSON.stringify([...cartState, product]));
    // toast.success('Added');
    hottoast.success('Added to cart');
  };

  return (
    <Layout>
      <h3 className="text-center p-5">Search Results</h3>

      <div className="container">
        <div className="row justify-content-center">
          {searchState.results?.map((product) => {
            return (
              <div
                className="col-10 col-sm-6 col-md-6 col-lg-4"
                key={product._id}
              >
                <Product product={product} handleAddToCart={handleAddToCart} />
              </div>
            );
          })}
          {searchState.results.length === 0 && (
            <p>No Products are available for the selected filters</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;
