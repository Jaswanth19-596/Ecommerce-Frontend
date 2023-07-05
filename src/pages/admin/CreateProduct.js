import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Select } from 'antd';
import axios from 'axios';
import authContext from '../../store/auth-context';
import { toast } from 'react-toastify';

const { Option } = Select;

const CreateProduct = () => {
  const [authState] = useContext(authContext);
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  // This state is only used for rendering the image
  const [imageForRendering, setImageForRendering] = useState();
  // This state is used for storing the image in the DB
  const [image, setImage] = useState();
  const [category, setCategory] = useState('');
  const [shipping, setShipping] = useState(0);
  const [description, setDescription] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Define the product creating function
    const submitDataOne = async () => {
      try {
        // Create an object with all the data
        const formData = {
          name,
          description,
          quantity,
          price,
          image,
          category,
          shipping,
        };

        // Send a request to server to create the product
        const { data } = await axios.post(
          '/products/create-product',
          formData,
          {
            headers: {
              Authorization: authState.token,
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        // if Created succfully
        if (data.success) {
          toast.success(data.message);
          navigate('/dashboard/admin/products');
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error('Something went wrong while creating product');
      }
    };

    // Call the product creating function
    submitDataOne();
  };

  // When the image is uploaded
  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // set the image to store in DB
      setImage(file);

      // create a reader
      const reader = new FileReader();

      // store the content of the file
      reader.onload = () => {
        setImageForRendering(reader.result);
      };

      // read the content of the file
      reader.readAsDataURL(file);
    }
  };

  // Function to get all categories
  const getAllCategories = async () => {
    try {
      const response = await axios.get('/category/categories', {
        headers: {
          Authorization: authState.token,
        },
      });

      // If the response contains the categories
      if (response?.data?.data) {
        setCategories(response.data.data);
      }
    } catch (error) {
      toast.error('something went wrong' + error.message);
    }
  };

  // Loads all the categories in the select category menu
  useEffect(() => {
    getAllCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Heading */}
      <h2 className="admin-dashboard-sub-heading">Create Product</h2>

      {/* Form */}
      <form action="" onSubmit={handleSubmit} className="mt-5">
        {/* Form - select -category */}
        <div className="m-1">
          <Select
            style={{ width: '100%' }}
            placeholder="Select Category"
            bordered={true}
            onChange={(value) => setCategory(value)}
          >
            {categories.map((category) => (
              <Option key={category.name} value={category._id}>
                {category.name}
              </Option>
            ))}
          </Select>
        </div>

        {/* Form - select -Image */}
        <div className="m-1 mt-3 ">
          <label
            className="btn btn-outline-secondary p-3"
            style={{ width: '100%' }}
          >
            {imageForRendering?.name ? imageForRendering.name : 'Upload Image'}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
              hidden
            />
          </label>
        </div>

        {/* Form - Display image */}
        <div className="m-3 text-center">
          {imageForRendering && (
            <img
              src={imageForRendering}
              alt="product"
              width={300}
              height={300}
            />
          )}
        </div>

        {/* Form - Name Input */}
        <div className="m-1 mt-3">
          <input
            className="form-control"
            type="text"
            name={'name'}
            placeholder="Name"
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>

        {/* Form - Description Input */}
        <div className="m-1 mt-3">
          <textarea
            style={{ resize: 'none' }}
            className="form-control"
            placeholder="Description"
            onChange={(event) => setDescription(event.target.value)}
            required
          />
        </div>

        {/* Form - Quantity Input */}
        <div className="m-1 mt-3">
          <input
            className="form-control"
            type="number"
            placeholder="quantity"
            onChange={(event) => setQuantity(event.target.value)}
            required
          />
        </div>

        {/* Form - Price Input */}
        <div className="m-1 mt-3">
          <input
            className="form-control"
            type="number"
            placeholder="price"
            onChange={(event) => {
              console.log(event.target.value);
              setPrice(event.target.value);
            }}
            required
          />
        </div>

        {/* Form - Shipping Input */}
        <div className="m-1 mt-3">
          <Select
            style={{ width: '100%' }}
            placeholder="Shipping"
            onChange={(value) => setShipping(value)}
          >
            <Option value="1">Yes</Option>
            <Option value="0">No</Option>
          </Select>
        </div>

        {/* Form - Submit - button */}
        <div className="m-1 mt-5">
          <button
            type="submit"
            style={{ width: '100%' }}
            className="btn btn-primary"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateProduct;
