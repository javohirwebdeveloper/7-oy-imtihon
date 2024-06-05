import React from 'react';
import Footertop1 from '../assets/Footertop1.svg';
import Footertop2 from '../assets/Footertop2.svg';
import Footertop3 from '../assets/Footertop3.svg';
import Logo from '../assets/Logo.svg';
import Location from '../assets/Location.svg';
import Message from '../assets/Message.svg';
import Calling from '../assets/Calling.svg'
import { Link } from 'react-router-dom';
import FooterF from '../assets/FooterF.svg';
import FooterI from '../assets/FooterI.svg';
import FooterT from '../assets/FooterT.svg';
import FooterL from '../assets/FooterL.svg';
import FooterY from '../assets/FooterY.svg';
const Footer = () => {
  return (
    <footer className="wrapper mt-[100px]">
      <div className="flex pl-[23px] gap-x-[27px]">
        <div className="w-[238px] pr-[34px] border-r-[1px] border-[#46A3581A]">
          <img src={Footertop1} alt="" />
          <h2 className="text-[17px] font-[700] text-[#3D3D3D] ">
            Garden Care
          </h2>
          <p className="text-[14px] font-[400] ">
            We are an online plant shop offering a wide range of cheap and
            trendy plants.
          </p>
        </div>
        <div className="w-[238px] pr-[34px] border-r-[1px] border-[#46A3581A]">
          <img src={Footertop2} alt="" />
          <h2 className="text-[17px] font-[700] text-[#3D3D3D] ">
            Garden Care
          </h2>
          <p className="text-[14px] font-[400] ">
            We are an online plant shop offering a wide range of cheap and
            trendy plants.
          </p>
        </div>
        <div className="w-[238px] pr-[34px]">
          <img src={Footertop3} alt="" />
          <h2 className="text-[17px] font-[700] text-[#3D3D3D] ">
            Garden Care
          </h2>
          <p className="text-[14px] font-[400] ">
            We are an online plant shop offering a wide range of cheap and
            trendy plants.
          </p>
        </div>
        <div>
          <h2 className="text-[#3D3D3D] text-[18px] font-[700]">
            Would you like to join newsletters?
          </h2>
          <div className="flex rounded-[6px] h-[40px] justify-between w-[354px] shadow-[0px_0px_8px_1px_#00000024] mt-[18px] mb-[17px] pl-[11px] ">
            <input
              className="w-[260px] outline-none"
              type="text"
              placeholder="enter your email address..."
              name=""
              id=""
            />
            <button className="bg-[#46A358] h-[40px] w-[85px] rounded-tr-[6px] rounded-br-[6px] duration-200 text-[18px] hover:bg-[#25572f] text-white">
              Join
            </button>
          </div>
          <p className="text-[13px] font-[400] max-w-[354px] w-full">
            We usually post offers and challenges in newsletter. We’re your
            online houseplant destination. We offer a wide range of houseplants
            and accessories shipped directly from our (green)house to yours!{" "}
          </p>
        </div>
      </div>
      <div className="flex mt-[23px] bg-[#46A3581A] pl-[23px] py-[27px] gap-x-[50px]">
        <img src={Logo} alt="" className="mr-[40px]" />
        <div className="flex items-center gap-x-3">
          <img src={Location} alt="" />
          <p className="w-[176px] text-[14px] font-[400]">
            70 West Buckingham Ave. Farmingdale, NY 11735
          </p>
        </div>
        <div className="flex items-center gap-x-3">
          <img src={Message} alt="" />
          <p className=" text-[14px] font-[400]">contact@greenshop.com</p>
        </div>
        <div className="flex items-center gap-x-3">
          <img src={Calling} alt="" />
          <p className=" text-[14px] font-[400]">+88 01911 717 490</p>
        </div>
      </div>
      <div className="flex pl-[23px] mt-[33px]">
        <div className="flex flex-col gap-y-[8px] mr-[166px]">
          <Link className="text-[#3D3D3D] text-[18px] font-[700]">
            My Account
          </Link>
          <Link className="text-[#3D3D3D] text-[14px] font-[400]">
            My Account
          </Link>
          <Link className="text-[#3D3D3D] text-[14px] font-[400]">
            Our stores
          </Link>
          <Link className="text-[#3D3D3D] text-[14px] font-[400]">
            Contact us
          </Link>
          <Link className="text-[#3D3D3D] text-[14px] font-[400]">Career</Link>
          <Link className="text-[#3D3D3D] text-[14px] font-[400]">
            Specials
          </Link>
        </div>
        <div className="flex flex-col gap-y-[8px] mr-[154px] ">
          <Link className="text-[#3D3D3D] text-[18px] font-[700]">
            Help & Guide
          </Link>
          <Link className="text-[#3D3D3D] text-[14px] font-[400]">
            Help Center
          </Link>
          <Link className="text-[#3D3D3D] text-[14px] font-[400]">
            How to Buy
          </Link>
          <Link className="text-[#3D3D3D] text-[14px] font-[400]">
            Shipping & Delivery
          </Link>
          <Link className="text-[#3D3D3D] text-[14px] font-[400]">
            Product Policy
          </Link>
          <Link className="text-[#3D3D3D] text-[14px] font-[400]">
            How to Return
          </Link>
        </div>
        <div className="flex flex-col gap-y-[8px] mr-[173px]">
          <Link className="text-[#3D3D3D] text-[18px] font-[700]">
            Categories
          </Link>
          <Link className="text-[#3D3D3D] text-[14px] font-[400]">
            House Plants
          </Link>
          <Link className="text-[#3D3D3D] text-[14px] font-[400]">
            Potter Plants
          </Link>
          <Link className="text-[#3D3D3D] text-[14px] font-[400]">Seeds</Link>
          <Link className="text-[#3D3D3D] text-[14px] font-[400]">
            Small Plants
          </Link>
          <Link className="text-[#3D3D3D] text-[14px] font-[400]">
            Accessories
          </Link>
        </div>
        <div>
          <Link className="text-[18px] font-[700] text-[#3D3D3D]">
            Social Media
          </Link>
          <div className="flex gap-x-[10px] mt-[20px] mb-[33px]">
            <Link>
              <img src={FooterF} alt="" />
            </Link>
            <Link>
              <img src={FooterI} alt="" />
            </Link>
            <Link>
              <img src={FooterT} alt="" />
            </Link>
            <Link>
              <img src={FooterL} alt="" />
            </Link>
            <Link>
              <img src={FooterY} alt="" />
            </Link>
          </div>
          <Link className="text-[18px] font-[700] text-[#3D3D3D]">
            We accept
          </Link>
          <img
            className="mt-[13px]"
            src="https://s3-alpha-sig.figma.com/img/1e46/0c89/ee17b2b09a69f96d2552ed3b0b04ac05?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=R4tmbQShtV6Hzk3wnjsSsVdrLjTgece1H2aFRJStjVBpCyuu6QX356LdZwy5ZNWIni6QvJPS1UNBaEut~DpTOZCutQbZYxrm8kRBnITKgaMHthXwDZLjAd78liJvzbLEzwf18k5ZoJzWA3ZetlqvJ3fj8cALivqeqjFzznSU04F8huAXrgYilN85k~CUHYlaYIsrp6GsK163YCaDu~z0BaoJnRR5YMKMUeJ8uyoYB3Dg9tiA~Wv2wA3ppKe2KgVUPJcugdfg5nZYy5P4Or8HImdjwJyMN9OODoGrlvryDMx29QThGO5mbGhLo36jB4TT~1m8~eV62aO8aMbCQUBHLQ__"
            alt=""
          />
        </div>
      </div>
      <div className="mt-[27px] border-t-[1px] border-[#46A35833] p-[10px] text-center">
        <p className="text-[14px] text-[#3D3D3D] font-[400]">
          © 2021 GreenShop. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer