import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const context = createContext();

export default context;

export const SearchContextProvider = (props) => {
  const navigate = useNavigate();

  const [searchState, setSearchState] = useState({
    keyword: '',
    results: [],
  });

  const getProductsOnSearch = async () => {
    try {
      if (searchState.keyword.length === 0) return;

      const { data } = await axios.get(
        `/products/get-products/search/${searchState.keyword}`
      );

      if (!data.success) {
        throw new Error();
      }

      setSearchState({ ...searchState, results: data.data });

      navigate('/search');
    } catch (error) {
      console.log('Error while getting products on search');
    }
  };

  useEffect(() => {
    getProductsOnSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchState.keyword]);

  return (
    <context.Provider value={[searchState, setSearchState]}>
      {props.children}
    </context.Provider>
  );
};
