import React, { memo } from "react";
function SearchInput({ search, onSearch }) {
  console.log("Rendering SearchInput:");
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(event) => onSearch(event.target.value)}
      />
    </div>
  );
}

export default memo(SearchInput);