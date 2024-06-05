import React, { useEffect, useState } from "react";
import jsonData from "../data/products.json";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  adjustQuantity,
  applyDiscount,
} from "../actions/cartActions";
import { NavLink } from "react-router-dom";
import productsData from "../data/products.json";
import { AiOutlineDelete } from "react-icons/ai";
import Carousel from "../components/ProductCarousel";
const ProductCart = () => {
  const cartItems = useSelector((state) => state.cartItems);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const shippingCost = 16.0;
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const isCouponApplied = coupon === "Javohir";
  const discountAmount = isCouponApplied ? subtotal * 0.05 : 0;
  const total = subtotal - discountAmount + shippingCost;
  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleAdjustQuantity = (productId, amount) => {
    dispatch(adjustQuantity(productId, amount));
  };

  const calculateTotal = (price, quantity) => {
    return price * quantity;
  };
  const handleCouponChange = (e) => {
    setCoupon(e.target.value);
  };

  const applyCoupon = () => {
    if (isCouponApplied) {
      dispatch(applyDiscount(setDiscount(discountAmount)));
    } else {
      alert(`Noto'g'ri kupon kodi!`);
      dispatch(applyDiscount(0));
    }
  };
  useEffect(() => {
    setRelatedProducts(jsonData.products);
  }, []);

  return (
    <>
      <div className="_container mx-auto mt-[114px]">
        <h2 className="text-[15px] font-[400] text-[#3D3D3D]">
          <span className="font-[700]">Home</span> / Shop / Shopping Cart
        </h2>
        <div className="flex mt-[51px] gap-x-[86px]">
          <div className="w-[782px] overflow-auto">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th
                    className="border-b-[0.3px] text-[#3D3D3D] pb-[11px] border-[#46A35880] text-start"
                    style={{ width: "300px" }}
                  >
                    Products
                  </th>
                  <th
                    className="border-b-[0.3px] text-[#3D3D3D] pb-[11px] border-[#46A35880] text-start"
                    style={{ width: "150px" }}
                  >
                    Price
                  </th>
                  <th
                    className="border-b-[0.3px] text-[#3D3D3D] pb-[11px] border-[#46A35880] text-start"
                    style={{ width: "150px" }}
                  >
                    Quantity
                  </th>
                  <th
                    className="border-b-[0.3px] text-[#3D3D3D] pb-[11px] border-[#46A35880] text-start"
                    style={{ width: "150px" }}
                  >
                    Total
                  </th>
                  <th
                    className="border-b-[0.3px] text-[#3D3D3D] pb-[11px] border-[#46A35880] text-start"
                    style={{ width: "50px" }}
                  ></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <tr key={item.id} className="max-h-[70px] bg-[#FBFBFB] ">
                      <td
                        className="text-[#3D3D3D] mx-w-[212px] flex items-center"
                        style={{ width: "300px" }}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-[70px] h-[70px] mr-4"
                        />
                        <div>
                          <h2 className="text-[16px]">{item.title}</h2>
                          <h2 className="text-[14px]">
                            <span className="text-[#727272]">SKU: </span>{" "}
                            {item.sku}
                          </h2>
                        </div>
                      </td>
                      <td className="h-[70px]" style={{ width: "150px" }}>
                        ${item.price}.00
                      </td>
                      <td className="h-[70px]" style={{ width: "150px" }}>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleAdjustQuantity(item.id, -1)}
                            className="h-[25px] w-[21.71px] rounded-[29px] bg-[#46A358CC] text-white"
                          >
                            -
                          </button>
                          <h2>{item.quantity}</h2>
                          <button
                            onClick={() => handleAdjustQuantity(item.id, 1)}
                            className="h-[25px] w-[21.71px] rounded-[29px] bg-[#46A358CC] text-white"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td
                        className="text-[#46A358] font-[700] h-[70px]"
                        style={{ width: "150px" }}
                      >
                        ${calculateTotal(item.price, item.quantity)}.00
                      </td>
                      <td className="h-[70px]" style={{ width: "50px" }}>
                        <button
                          onClick={() => handleRemoveFromCart(item.id)}
                          className="hover:text-[#46A358] text-[#727272] text-[24px]"
                        >
                          <AiOutlineDelete />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      Buyurtma berish uchun kerakli gul tanlang
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {cartItems.length > 0 ? (
            <div className="cart-totals">
              <h2 className="text-[18px] text-[#3D3D3D] font-[700] border-b-[0.3px] pb-[11px] border-[#46A35880]">
                Cart Totals
              </h2>
              <h2 className="mt-[11px] mb-[8px] text-[#3D3D3D] text-[14px] font-[400]">
                Coupon Apply
              </h2>
              <div className="text-[#3D3D3D] coupon-apply border border-[#46A358] rounded-[3px] justify-between pl-[9px] w-[332px] flex h-[40px]">
                <input
                  type="text"
                  className="outline-none w-full"
                  value={coupon}
                  onChange={handleCouponChange}
                  placeholder="Type 'Javohir'"
                />
                <button
                  className="w-[102px] text-white text-[15px] font-[700] h-[40px] bg-[#46A358]"
                  onClick={applyCoupon}
                >
                  Apply
                </button>
              </div>
              <div className="subtotal w-full flex justify-between mt-[30px]">
                <span className="text-[15px] text-[#3D3D3D]">Subtotal:</span>
                <span className="text-[18px] text-[#3D3D3D] text-right font-[700]">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="coupon-discount mt-[10px] flex w-full justify-between">
                <span className="text-[15px] font-[400] text-[#3D3D3D]">
                  Coupon Discount:
                </span>
                <span className="text-[15px] font-[400] text-[#3D3D3D]">
                  (-) {discount.toFixed(2)}
                </span>
              </div>
              <div className="shipping mt-[10px] flex w-full justify-between">
                <span className="text-[15px] font-[400] text-[#3D3D3D]">
                  Shipping:
                </span>
                <div className="flex flex-col">
                  <span className="text-[18px] font-[700] text-[#3D3D3D] text-right">
                    ${shippingCost.toFixed(2)}
                  </span>
                  <span className="text-[#46A358] text-[12px]">
                    View shipping charge
                  </span>
                </div>
              </div>
              <div className="total flex justify-between w-full mt-[20px]">
                <span className="text-[18px] text-[#3D3D3D] font-[700] text-right">
                  Total:
                </span>
                <span className="text-[#46A358] text-[18px] font-[700]">
                  ${total.toFixed(2)}
                </span>
              </div>
              <div className="mt-[29px]">
                <NavLink
                  to="/checkout"
                  className={`w-full h-[40px] rounded-[3px] text-[15px] text-white duration-200 font-[700] bg-[#46A358] flex justify-center items-center hover:bg-[#2d6738] `}
                >
                  Proceed To Checkout
                </NavLink>
                <NavLink
                  to="/"
                  className="text-[#46A358] text-center w-full flex justify-center mt-[14px]"
                >
                  Continue Shopping
                </NavLink>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="max-w-[1199px] w-full border-b-[1px] border-[#46A35880] pb-[12px]">
          <h2 className="mt-[127px] text-[17px] font-[700] text-[#46A358]">
            Releted Products
          </h2>
        </div>
        <div className="max-w-[1199px] h-[400px] mt-[44px] mb-[100px]">
          <Carousel products={relatedProducts} />
        </div>
      </div>
    </>
  );
};

export default ProductCart;
