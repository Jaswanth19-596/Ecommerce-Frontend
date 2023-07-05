import React, { useContext, useEffect, useState } from 'react';
import ReusableCategoryForm from '../../components/utilities/ReusableCategoryForm';
import authContext from '../../store/auth-context';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Modal } from 'antd';
import Loading from './../../components/Loading';

const CreateCategory = () => {
  // Getting the state from the context to use the token
  const [authState] = useContext(authContext);

  // Used for entering new category
  const [newCategoryName, setNewCategoryname] = useState('');

  // Holds all the categories
  const [categories, setCategories] = useState([]);

  // State to know if the modal is open or not
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Holds the new category input
  const [updatedCategoryName, setUpdatedCategoryName] = useState('');

  // To find out which category is selected
  const [selectedCategory, setSelectedCategory] = useState();

  // To check if the data is loading or not
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = (categoryId) => {
    // Define the deleting function
    const deleteCategory = async (categoryId) => {
      console.log('Category Id' + categoryId);
      try {
        const { data } = await axios.delete(
          `/category/delete-category/${categoryId}`,
          {
            headers: {
              Authorization: authState.token,
            },
          }
        );

        if (data.success) {
          getAllCategories();
          toast.success(data.message);
        } else {
          throw new Error();
        }
      } catch (error) {
        toast.error('Cannot delete the category' + error.message);
      }
    };
    // Call the deleting function
    deleteCategory(categoryId);
  };

  // When the user hits ok on the modal
  const handleModalOk = (event) => {
    event.preventDefault();

    // Define the updating function
    const updateCategory = async () => {
      try {
        // Update the category
        const { data } = await axios.put(
          `/category/update-category/${selectedCategory['_id']}`,
          {
            name: updatedCategoryName,
          },
          {
            headers: {
              Authorization: authState.token,
            },
          }
        );

        // If updating  is successfull
        if (data.success) {
          toast.success('Category updated successfully');
          // rerender all the categories
          getAllCategories();
          setSelectedCategory(null);
          setUpdatedCategoryName('');
          setIsModalOpen(false);
        } else {
          toast.error('something went wrong');
        }

        // Clost the moddal
        setIsModalOpen(false);
      } catch (error) {
        toast.error('Error while updating the category');
      }
    };
    // Call the updating function
    updateCategory();
  };

  // Function to get all categories
  const getAllCategories = async () => {
    try {
      setIsLoading(true);

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
    } finally {
      setIsLoading(false);
    }
  };

  const createNewCategory = async () => {
    try {
      // The headers that needed to be set
      const headersObject = {
        headers: {
          Authorization: authState.token,
        },
      };

      // The data that is to be sent to server
      const data = {
        name: newCategoryName,
      };

      const response = await axios.post(
        '/category/create-category/',
        data,
        headersObject
      );

      // Reset the input field
      setNewCategoryname('');
      // Again reload all the categories
      getAllCategories();
      // Show a success message
      toast.success(response.data.message);
    } catch (error) {
      toast.error('Something went wrong while creating a new category');
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (event.target.value === '') {
      return toast.error('Category name should not be empty');
    }

    createNewCategory();
  };

  useEffect(() => {
    getAllCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {/* Heading */}
      <h3 className='admin-dashboard-sub-heading'>Manage Categories</h3>

      {/* Form */}
      <ReusableCategoryForm
        handleFormSubmit={handleFormSubmit}
        value={newCategoryName}
        setValue={setNewCategoryname}
        placeholder={'Enter a category'}
      />

      {/* All Categories */}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Category</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && <Loading />}
          {!isLoading &&
            categories.map((category) => {
              return (
                <tr className="m-3" key={category.name}>
                  <td>{category.name}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        setIsModalOpen(true);
                        setSelectedCategory(category);
                        setUpdatedCategoryName(category.name);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        handleDelete(category._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <Modal
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <ReusableCategoryForm
          handleFormSubmit={handleModalOk}
          value={updatedCategoryName}
          setValue={setUpdatedCategoryName}
          placeholder={'Enter New Category Name'}
          type={'update'}
        />
      </Modal>
    </div>
  );
};

export default CreateCategory;
