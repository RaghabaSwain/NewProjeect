import React, { useState } from "react";
import GridPostList from "../../components/shared/GridPostList";

const Explore = () => {
  const [searchValue, setSearchValue] = useState("");
  const shouldShowSearch = searchValue!==''
  
  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="w-full">Search Posts</h2>

        <div className="flex gap-1 w-full px-4">
          <img
            src="/assets/icons/search.svg"
            alt="search"
            className="absolute z-10 bg-slate-300"
          />
          <input
            type="text"
            placeholder="Searc post here"
            className="bg-gray-500 absolute px-8"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-9 w-full max-w-5xl">
        {}
      </div>
    </div>
  );
};

export default Explore;
