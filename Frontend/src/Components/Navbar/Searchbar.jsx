import React from 'react';

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Coimbatore" />
      <input type="text" placeholder="Flat +1" />
      <input type="text" placeholder="Budget" />
      <button>Search</button>
    </div>
  );
};

export default SearchBar;
