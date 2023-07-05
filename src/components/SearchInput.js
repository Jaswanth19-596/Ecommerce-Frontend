import React, { useContext, useState } from 'react';
import searchContext from '../store/search-context';
import './Layout/Header.css';
import { AiOutlineSearch } from 'react-icons/ai';

const SearchInput = () => {
  const [searchState, setSearchState] = useContext(searchContext);

  const [input, setInput] = useState('');

  const handleSearch = (event) => {
    setSearchState({ ...searchState, keyword: input });
  };

  return (
    <div className="d-flex">
      <input
        className="form-control search"
        type="search"
        placeholder="Search"
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />
      <button className="search-button" onClick={handleSearch}>
        <AiOutlineSearch className="search-icon" />
      </button>
    </div>
  );
};

export default SearchInput;
