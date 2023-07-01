import React, { useState, useContext, useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Select } from "antd";
import axios from "axios";
import authContext from "../../store/auth-context";
import { toast } from "react-toastify";
const { Option } = Select;

const initialProduct = {
  name: "",
  quantity: 0,
  price: 0,
  category: "",
  shipping: "",
  description: "",
};

const reducer = (prevState, action) => {
  console.log("In the reducer");
  console.log(prevState);
  switch (action.type) {
    case "product":
      return action.product;
    case "name":
      return { ...prevState, name: action.name };
    case "quantity":
      return { ...prevState, quantity: action.quantity };
    case "price":
      return { ...prevState, price: action.price };
    case "category":
      return { ...prevState, category: action.category };
    case "shipping":
      return { ...prevState, shipping: action.shipping };
    case "description":
      return { ...prevState, description: action.description };
    default:
      return prevState;
  }
};

const UpdateProduct = () => {
  const [state, dispatch] = useReducer(reducer, initialProduct);

  console.log("State");
  console.log(state);

  const params = useParams();
  const [authState] = useContext(authContext);
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  // This state is only used for rendering the image
  const [imageForRendering, setImageForRendering] = useState();
  // This state is used for storing the image in the DB
  const [image, setImage] = useState();

  const handleDelete = (event) => {
    event.preventDefault();

    const deleteProduct = async () => {
      try {
        const { data } = await axios.delete(
          `/products/delete-product/${params.id}`,
          {
            headers: { Authorization: authState.token },
          }
        );
        console.log(data);
        if (data.success) {
          toast.success(data.message);
          navigate("/dashboard/admin/products");
        } else {
          throw new Error();
        }
      } catch (error) {
        toast.error("Error while deleting the product");
      }
    };

    deleteProduct();
  };

  const handleUpdate = (event) => {
    event.preventDefault();

    // Define the product updating function
    const updateData = async () => {
      try {
        // Update an object with all the data
        const formData = new FormData();
        formData.append("name", state.name);
        formData.append("description", state.description);
        formData.append("quantity", state.quantity);
        formData.append("price", state.price);
        image && formData.append("image", image);
        formData.append("category", state.category._id);

        // Send a request to server to create the product
        const { data } = await axios.put(
          `/products/update-product/${params.id}`,
          formData,
          {
            headers: {
              Authorization: authState.token,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log(data);

        // if updated succfully
        if (data.success) {
          toast.success(data.message);
          navigate("/dashboard/admin/products");
        } else {
          toast.error(data);
        }
      } catch (error) {
        toast.error("Something went wrong while updating product");
      }
    };

    // Call the product creating function
    updateData();
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

  // Initially get the single product and fill the form
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/products/get-single-product/${params.id}`,
        {
          headers: {
            Authorization: authState.token,
          },
        }
      );

      if (data.success) {
        dispatch({ type: "product", product: data.data });
      }
    } catch (error) {}
  };

  const getAllCategories = async () => {
    try {
      const response = await axios.get("/category/categories", {
        headers: {
          Authorization: authState.token,
        },
      });

      // If the response contains the categories
      if (response?.data?.data) {
        setCategories(response.data.data);
      }
    } catch (error) {
      toast.error("something went wrong" + error.message);
    }
  };

  useEffect(() => {
    getSingleProduct();
    getAllCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Heading */}
      <h1>Update Product</h1>

      {/* Form */}
      <form action="" className="mt-5">
        {/* Form - select -category */}
        <div className="m-1">
          <Select
            style={{ width: "100%" }}
            placeholder="Select Category"
            bordered={true}
            onChange={(value) =>
              dispatch({ type: "category", category: value })
            }
            value={state?.category.name}
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
            style={{ width: "100%" }}
          >
            {image?.name ? image.name : "Upload Image"}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
          </label>
        </div>

        {/* Form - Display image */}
        <div className="m-3 text-center">
          {
            <img
              src={
                imageForRendering ||
                `https://ecommerce-backend-jaswanth.onrender.com/api/v1/products/get-image/${params.id}`
              }
              alt="product"
              width={300}
              height={300}
            />
          }
        </div>

        {/* Form - Name Input */}
        <div className="m-1 mt-3">
          <input
            className="form-control"
            type="text"
            name={"name"}
            placeholder="Name"
            onChange={(event) =>
              dispatch({ type: "name", name: event.target.value })
            }
            required
            value={state.name}
          />
        </div>

        {/* Form - Description Input */}
        <div className="m-1 mt-3">
          <textarea
            style={{ resize: "none" }}
            className="form-control"
            placeholder="Description"
            onChange={(event) =>
              dispatch({ type: "description", description: event.target.value })
            }
            required
            value={state.description}
          />
        </div>

        {/* Form - Quantity Input */}
        <div className="m-1 mt-3">
          <input
            className="form-control"
            type="number"
            placeholder="quantity"
            onChange={(event) =>
              dispatch({ type: "quantity", quantity: event.target.value })
            }
            required
            value={state.quantity}
          />
        </div>

        {/* Form - Price Input */}
        <div className="m-1 mt-3">
          <input
            className="form-control"
            type="number"
            placeholder="price"
            onChange={(event) =>
              dispatch({ type: "price", price: event.target.value })
            }
            required
            value={state.price}
          />
        </div>

        {/* Form - Shipping Input */}
        <div className="m-1 mt-3">
          <Select
            style={{ width: "100%" }}
            placeholder="Shipping"
            onChange={(value) =>
              dispatch({ type: "shipping", shipping: value })
            }
            value={state.shipping ? "Yes" : "No"}
          >
            <Option value="1">Yes</Option>
            <Option value="0">No</Option>
          </Select>
        </div>

        {/* Form - Submit - button */}
        <div className="d-flex">
          <div className="m-1 flex-grow-1">
            <button
              onClick={handleUpdate}
              className="btn btn-primary"
              style={{ width: "100%" }}
            >
              Update
            </button>
          </div>
          <div className="m-1 flex-grow-1">
            <button
              className="btn btn-danger"
              style={{ width: "100%" }}
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default UpdateProduct;
