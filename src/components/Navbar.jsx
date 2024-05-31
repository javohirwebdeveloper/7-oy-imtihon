import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LoginSvg from "../assets/icons/login.svg";
import Logo from '../assets/Logo.svg';
import { FaShoppingCart } from 'react-icons/fa';
import OrderModal from './OrderModal';

const Navbar = () => {
  const cartItems = useSelector((state) => state.cartItems);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCartClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <header className="header fixed z-50 w-full backdrop-blur-md">
      <div className="header__wrapper">
        <div className="header__container _container">
          <div className="header__body flex w-full justify-between items-start mt-[25px] border-b-[0.5px] border-[#46A35880]">
            <NavLink to="/">
              <img className="logo__img w-full h-full" src={Logo} alt="logo" />
            </NavLink>
            <ul className="space-x-10 md:flex hidden">
              <NavLink 
                to="/" 
                className={({ isActive }) => isActive ? 'font-black text-[16px] duration-300 menu__list-link border-b-4 border-green-500 h-[45px]' : 'menu__list-link'}>
                Home
              </NavLink>
              <NavLink 
                to="/shop" 
                className={({ isActive }) => isActive ? 'font-black text-[16px] duration-300 menu__list-link border-b-4 border-green-500 h-[45px]' : 'menu__list-link'}>
                Shop
              </NavLink>
              <NavLink to="/plant-care" className="menu__list-link _hover">
                Plant Care
              </NavLink>
              <NavLink to="/blogs" className="menu__list-link _hover">
                Blogs
              </NavLink>
            </ul>
            <div className="header__box flex items-center space-x-6">
              <NavLink className="_icon-search text-[18px] inline-block relative top-[3px] transition-[0.2s] hover:text-[#46A358]" to="/search" />
              <button className="_icon-cart flex hover:text-[#46A358] text-[22px]" onClick={handleCartClick}>
                <div className="cart-count bg-[#46A358] text-white h-[12px] w-[12px] rounded-[50px] text-[10px] flex justify-center items-center">{cartItems.length}</div>
              </button>
              <NavLink to="/login" className="header__login">
                <div className="bg-[#46A358] flex text-white justify-center items-center space-x-1 rounded-[6px] hover:bg-green-700 duration-300 h-[35px] w-[100px] text-[16px]">
                  <img className="login__img" src={LoginSvg} alt="login" />
                  <span className="login__title">Login</span>
                </div>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && <OrderModal cartItems={cartItems} onClose={handleCloseModal} />}
    </header>
  );
}

export default Navbar;
