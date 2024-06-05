import React, { useState } from "react";
import jsonData from "../data/products.json";
import { NavLink } from "react-router-dom";

const SearchComponent = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    if (!searchTerm) {
      setSearchResults([]);
    } else {
      const filteredResults = jsonData.products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredResults);
    }
  };

  return (
    <div className="fixed inset-0 bg-black p-9 bg-opacity-50 backdrop-blur-sm flex justify-center items-center overflow-hidden z-50">
      <div className="bg-white w-[800px] h-full p-8 overflow-auto rounded-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-1 right-3 text-2xl font-bold"
        >
          ×
        </button>
        <div className="flex p-[11px] space-x-[8px] items-center overflow-hidden bg-[#F8F8F8] rounded-[10px] h-[45px] w-full">
          <button
            onClick={handleSearch}
            className="_icon-search text-[18px] hover:text-[#46A358] transition duration-300"
          ></button>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Find your plants"
            className="w-full outline-none bg-transparent"
          />
        </div>
        <div>
          {searchResults.map((product) => (
            <div key={product.id} className="mb-4">
              <NavLink
                to={`/product/${product.id}`}
                onClick={onClose}
                className={`flex items-center justify-between`}
              >
                <div className="flex space-x-3 items-center">
                  <img src={product.image} className="w-[70px]" alt="" />
                  <div>
                    <h3 className="text-lg font-semibold">{product.title}</h3>
                    <p>{product.sku}</p>
                  </div>
                </div>
                <p className="text-[#46A358] text-[18px]">${product.price}</p>
              </NavLink>
              {/* Boshqa mahsulot ma'lumotlari */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
