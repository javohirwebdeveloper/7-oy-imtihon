import React, { useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, adjustQuantity, applyDiscount} from '../actions/cartActions';
import { NavLink } from 'react-router-dom';

const ProductCart = () => {
    const cartItems = useSelector((state) => state.cartItems);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);

  const shippingCost = 16.00;
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const isCouponApplied = coupon === 'Javohir';
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
     dispatch(applyDiscount(setDiscount(discountAmount))) 
    } else {
      alert(`Noto'g'ri kupon kodi!`);
      dispatch(applyDiscount(0));
    }
  };

  return (
    <div className="_container mx-auto mt-10">
      <table className="w-[782px] table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Products</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Total</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <tr key={item.id}>
                <td className="border px-4 py-2 flex items-center">
                  <img src={item.image} alt={item.title} className="w-20 h-20 mr-4" />
                  {item.title}
                </td>
                <td className="border px-4 py-2">${item.price}</td>
                <td className="border px-4 py-2">
                  <button onClick={() => handleAdjustQuantity(item.id, -1)}>-</button>
                  {item.quantity}
                  <button onClick={() => handleAdjustQuantity(item.id, 1)}>+</button>
                </td>
                <td className="border px-4 py-2">${calculateTotal(item.price, item.quantity)}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
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
      <div className="cart-totals">
      <div className="coupon-apply">
        <input type="text" value={coupon} onChange={handleCouponChange} placeholder="Kupon kodini kiriting" />
        <button onClick={applyCoupon}>Qo'llash</button>
      </div>
      <div className="subtotal">
        <span>Subtotal:</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      {isCouponApplied && (
        <div className="coupon-discount">
          <span>Coupon Discount:</span>
          <span>-${discount.toFixed(2)}</span>
        </div>
      )}
      <div className="shipping">
        <span>Shipping:</span>
        <span>${shippingCost.toFixed(2)}</span>
      </div>
      <div className="total">
        <span>Total:</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <NavLink to="/checkout">
        Proceed To Checkout
      </NavLink>
    </div>
    </div>
  );
};

export default ProductCart;
