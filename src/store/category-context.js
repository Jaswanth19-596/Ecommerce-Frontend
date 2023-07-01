import React, { useEffect, useState } from 'react';
import axios from 'axios';

const categoryContext = React.createContext();

export default categoryContext;

export const CategoryProvider = (props) => {
  const [categories, setCategories] = useState([]);

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get('/category/categories');

      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <categoryContext.Provider value={[categories, setCategories]}>
      {props.children}
    </categoryContext.Provider>
  );
};
