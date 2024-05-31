// components/Card.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';
import { SlBasket } from "react-icons/sl";
import { IoIosHeartEmpty } from "react-icons/io";
import { CiSearch } from "react-icons/ci";

const Card = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div
      className="card max-w-[250px] border-t-[0.5px] border-transparent duration-200 hover:border-[#46A358]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
   <div className='  flex flex-col items-center max-w-[250px] max-h-[300px]'>
      <img src={product.image} alt={product.name} className="card__image " />
      <div className=' h-[35px] w-[125px] flex justify-center'>
      {isHovered && (
        <div className="card__icons flex items-center gap-x-6">
          <button onClick={handleAddToCart} className='text-[#3D3D3D] flex justify-center items-center text-[22px] h-[35px] bg-white w-[35px] hover:text-[#46A358] duration-200'>
            <SlBasket/>
          </button>
          <button className='text-[#3D3D3D]  flex justify-center items-center text-[22px] h-[35px]  bg-white w-[35px] hover:text-[#46A358] duration-200'>
            <IoIosHeartEmpty/>
          </button>
          <button className='text-[#3D3D3D] h-[35px] bg-white  w-[35px] hover:text-[#46A358] duration-200'>
            <span className="_icon-search text-[18px] transition-[0.2s] hover:text-[#46A358]" to="/search" />
          </button>
        </div>
      )}
      </div>
      </div>
      <div className="card__details">
        <h3 className='text-[16px] text-[#3D3D3D] font-[400]'>{product.title}</h3>
        <p className=' text-[18px] text-[#46A358]'>${product.price}</p>
      </div>
    </div>
  );
};

export default Card;