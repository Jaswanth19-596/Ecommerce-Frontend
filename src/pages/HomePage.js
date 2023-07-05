import React, { useEffect, useState, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import cartContext from '../store/cart-context';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Checkbox, Radio } from 'antd';
import Prices from './../components/Prices';
import './HomePage.css';
import './../utilitycss/product.css';
import hottoast from 'react-hot-toast';
import Loading from './../components/Loading';
import NoProductAvailable from '../components/NoProductAvailabe/NoProductAvailable';
import Carousel from './../components/Carousel';

const HomePage = () => {
  // const [authState] = useContext(authContext);
  const imagesForCarousel = [
    '/images/carousel1.jpg',
    '/images/carousel2.jpg',
    '/images/carousel3.jpg',
    '/images/carousel4.jpg',
  ];

  const [products, setProducts] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  // When products are filtered , I will use this state and keep the actual products as it is.
  const [temporaryFilteredProducts, setTemporaryFilteredProducts] = useState(
    []
  );

  const [cartState, setCartState] = useContext(cartContext);

  // Categories are objects with the following schema
  //   {
  //       name : "Womens collection"
  //       slug:"Womens-collection"
  //      _id :"646a0244a8d3acc6a89e5f45"
  //   }
  const [categories, setCategories] = useState([]);

  const [selectedCategories, setSelectedCategories] = useState([]);

  const [selectedPriceRange, setSelectedPriceRange] = useState([]);

  const [page, setPage] = useState(1);

  const [totalProducts, setTotalProducts] = useState(0);

  const getAllProducts = async () => {
    try {
      setIsLoading(true);
      // Gets only the products which are decided by the page no
      const { data } = await axios.get(`/products/get-all-products/${page}`);

      if (!data.success) throw new Error();
      // Keep all the existing products and add the new ones
      setProducts([...products, ...data.data]);
    } catch (error) {
      toast.error('Something went wrong while fetching the products');
    } finally {
      setIsLoading(false);
    }
  };

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get('/category/categories');

      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.log(error);
      toast.error('Error while fetching categories');
    }
  };

  const filterProducts = () => {
    // If no filters are selected -> show all products
    if (selectedCategories.length === 0 && selectedPriceRange.length === 0) {
      // If I set temporary products as null , then all products will be displayed
      setTemporaryFilteredProducts([]);
      return;
    }

    // Copy all the products
    let filteredProducts = [...products];

    // Filter the products based on category - Only if categories are selected
    if (selectedCategories.length > 0) {
      filteredProducts = filteredProducts.filter((product) => {
        return selectedCategories.includes(product.category._id);
      });
    }

    // Filter the products based on price - only if the price is selected
    if (selectedPriceRange.length > 0) {
      filteredProducts = filteredProducts.filter((product) => {
        return (
          product.price >= selectedPriceRange[0] &&
          product.price <= selectedPriceRange[1]
        );
      });
    }

    // Set the new product list
    setTemporaryFilteredProducts(filteredProducts);
  };

  const getProductCount = async () => {
    try {
      // Get the response
      const { data } = await axios.get('/products/get-products-count');

      // If the request is successfull
      if (data.success) {
        // Set the total products
        setTotalProducts(data.total);
      } else {
        // throw a new error
        throw new Error();
      }
    } catch (error) {
      console.log('Error while fetching the total count of products');
    }
  };

  // Executes when the user modifies the filters
  useEffect(() => {
    // Filter the products when filters are changed
    filterProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategories, selectedPriceRange]);

  // Executes only one time , When the component gets loaded
  useEffect(() => {
    getAllProducts();
    getAllCategories();
    getProductCount();

    // If there are cartitems in local storage , Load them
    const cartItems = localStorage.getItem('cartItems');

    if (cartItems) {
      setCartState(JSON.parse(cartItems));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Executes when loadmore is clicked
  useEffect(() => {
    getAllProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleCheckboxChange = (event, category) => {
    if (event.target.checked) {
      setSelectedCategories((prevCategories) => [
        category._id,
        ...prevCategories,
      ]);
    } else {
      setSelectedCategories((prevCategories) => {
        const newArray = prevCategories.filter((ele) => ele !== category._id);
        return newArray;
      });
    }
  };

  const handleRadioChange = (event) => {
    setSelectedPriceRange(event.target.value);
  };

  const handleResetFilters = (event) => {
    setSelectedCategories([]);
    setSelectedPriceRange([]);
  };

  const handleLoadMore = (event) => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleAddToCart = (product) => {
    setCartState([...cartState, product]);
    localStorage.setItem('cartItems', JSON.stringify([...cartState, product]));
    // toast.success('Added');
    hottoast.success('Added to cart');
  };

  // Decides the final products that needed to be displayed
  const finalProducts =
    temporaryFilteredProducts.length > 0 ||
    selectedCategories.length > 0 ||
    selectedPriceRange.length > 0
      ? temporaryFilteredProducts
      : products;

  return (
    <Layout>
      <div className="container carousel-container">
        <div>
          <Carousel images={imagesForCarousel} />
        </div>
      </div>

      <div className="container-fluid homepage">
        <div className="row homepage-body gy-3">
          {/* Only displays for desktop */}
          <div className="col-2 col-md-2 col-lg-2 desktop mt-5">
            <h4 className="filter-heading">Filter By Categories</h4>
            {categories?.map((category) => {
              return (
                <div className="checkbox" key={category._id}>
                  <Checkbox
                    onChange={(event) => {
                      handleCheckboxChange(event, category);
                    }}
                    checked={selectedCategories.includes(category._id)}
                  >
                    <p className="category-name">{category.name}</p>
                  </Checkbox>
                </div>
              );
            })}

            <h4 className="filter-heading">Filter By Prices</h4>
            <Radio.Group
              onChange={handleRadioChange}
              value={selectedPriceRange.length > 0 ? selectedPriceRange : null}
            >
              {Prices?.map((price) => (
                <div className="radio radio-container" key={price._id}>
                  <Radio value={price.range}>
                    <p className="price-name">{price.name}</p>
                  </Radio>
                </div>
              ))}
            </Radio.Group>

            <div className="reset-button-container">
              <button className="reset-button" onClick={handleResetFilters}>
                Reset Filters
              </button>
            </div>
          </div>

          {/* Only displays for mobile */}
          <div className="col-5 mobile">
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle custom-nav-link category-name"
                id="navbarDropdownMenuLink"
                data-bs-toggle="dropdown"
              >
                <p className="category-name category-name-mobile">Filters</p>
              </NavLink>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                {categories?.map((category) => {
                  return (
                    <div className="checkbox" key={category._id}>
                      <Checkbox
                        onChange={(event) => {
                          handleCheckboxChange(event, category);
                        }}
                        checked={selectedCategories.includes(category._id)}
                      >
                        <p className="category-name">{category.name}</p>
                      </Checkbox>
                    </div>
                  );
                })}
              </ul>
            </li>
          </div>

          {/* Only displays for mobile */}
          <div className="col-5 mobile">
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle custom-nav-link"
                id="navbarDropdownMenuLink"
                data-bs-toggle="dropdown"
              >
                <p className="price-name price-name-mobile">Prices</p>
              </NavLink>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <Radio.Group
                  onChange={handleRadioChange}
                  value={
                    selectedPriceRange.length > 0 ? selectedPriceRange : null
                  }
                >
                  {Prices?.map((price) => (
                    <div className="radio" key={price._id}>
                      <Radio value={price.range}>
                        <p className="price-name">{price.name}</p>
                      </Radio>
                    </div>
                  ))}
                </Radio.Group>
              </ul>
            </li>
          </div>

          {/* Only displays for mobile */}
          <div className="col-12 mobile reset-button-container">
            <button className="btn reset-button" onClick={handleResetFilters}>
              Reset Filters
            </button>
          </div>

          <div className="col-12 col-md-12 col-lg-10">
            <h1 className="text-center my-3">All Products</h1>

            {/* Making an other container for the products only */}
            <div className="container">
              <div className="row entire-container justify-content-center">
                {isLoading && <Loading />}

                {!isLoading &&
                  finalProducts?.map((product) => {
                    return (
                      <div
                        className="col-10 col-sm-6 col-md-6 col-lg-4 justify-content-center margin-product"
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

                            <p
                              className="card-text product-description"
                              style={{ textOverflow: 'ellipsis' }}
                            >
                              {`${product.description}`.substring(0, 130)}...
                            </p>
                            <p className="product-price">${product.price}</p>
                            <Link
                              to={`/products/product-details/${product.slug}`}
                            >
                              <button className="product-button more-details-button">
                                More Details
                              </button>
                            </Link>
                            <button
                              className="product-button add-to-cart-button"
                              onClick={() => {
                                handleAddToCart(product);
                              }}
                            >
                              Add to cart
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                {!isLoading && finalProducts.length === 0 && (
                  <NoProductAvailable />
                )}
              </div>
            </div>
          </div>
          <div className="text-center">
            {selectedCategories.length === 0 &&
              selectedPriceRange.length === 0 &&
              products.length < totalProducts && (
                <button className="reset-button" onClick={handleLoadMore}>
                  Load more
                </button>
              )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
