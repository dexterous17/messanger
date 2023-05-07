import React from 'react';
import { InputGroup } from "@blueprintjs/core";

function SearchBar({ searchText, onSearchTextChange }) {
  const handleSearchTextChange = (event) => {
    onSearchTextChange(event.target.value);
  };

  return (
    <div className="search-bar">
      <InputGroup
        type="text"
        placeholder="Search"
        value={searchText}
        onChange={handleSearchTextChange}
      />
    </div>
  );
}

export default SearchBar;
