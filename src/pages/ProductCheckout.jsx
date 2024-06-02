import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProductCheckout = () => {
  const cartItems = useSelector((state) => state.cartItems);
  const navigate = useNavigate();
  const [billingDetails, setBillingDetails] = useState({
    firstName: '',
    lastName: '',
    country: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    email: '',
    phone: '',
    orderNotes: ''
  });
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const shippingCost = 16.00;
  const subtotal = cartItems.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);
  const isCouponApplied = coupon === 'Javohir';
  const discountAmount = isCouponApplied ? subtotal * 0.05 : 0;
  const total = subtotal - discountAmount + shippingCost;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails({ ...billingDetails, [name]: value });
  };

  const handleCouponChange = (e) => {
    setCoupon(e.target.value);
  };

  const applyCoupon = () => {
    if (isCouponApplied) {
      setDiscount(discountAmount);
    } else {
      alert(`Noto'g'ri kupon kodi!`);
      setDiscount(0);
    }
  };
const calculateTotal = (price, quantity) => {
    return price * quantity;
  };
  const handlePlaceOrder = () => {
     if (paymentMethod) {
      setIsOrderPlaced(true);}
    setShowOrderDetails(true);
  };
  
useEffect(() => {
    if (showConfirmation) {
        setTimeout(() => {
            setShowConfirmation(false);
            navigate('/');
        }, 2000);
    } 
}, [showOrderDetails, navigate]);


  return (
    <div className="_container mx-auto mt-10">
      <div className="billing-address">
        <input type="text" name="firstName" value={billingDetails.firstName} onChange={handleInputChange} placeholder="First Name" />
      </div>
      <div className="your-order">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td>
                  <img src={item.image} alt={item.title} className="w-20 h-20" />
                  {item.title}
                </td>
                <td>{item.quantity}</td>
                <td>${calculateTotal(item.price, item.quantity)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="cart-totals">
        <div className="subtotal">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
       {discount > 0 && (
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
         <div className="payment-methods">
        {/* ... To'lov usullari */}
        <label>
          <input type="radio" name="paymentMethod" value="Paypal" onChange={(e) => setPaymentMethod(e.target.value)} />
          Paypal
        </label>
        <label>
          <input type="radio" name="paymentMethod" value="DirectBankTransfer" onChange={(e) => setPaymentMethod(e.target.value)} />
          Direct Bank Transfer
        </label>
        <label>
          <input type="radio" name="paymentMethod" value="CashOnDelivery" onChange={(e) => setPaymentMethod(e.target.value)} />
          Cash on Delivery
        </label>
      </div>
         <button 
        onClick={handlePlaceOrder} 
        disabled={!paymentMethod} 
        className={`place-order-button ${paymentMethod ? 'active' : 'inactive'}`}
      >        Place Order
        </button>
        {showOrderDetails && (
        <div className="order-details-modal">
          {/* Order Details Modal */}
          <h2>Order Details</h2>
          <table>
            {/* ... Buyurtma jadvali */}
          </table>
          <button onClick={() => {
            setShowOrderDetails(false)
            setShowConfirmation(true);
            setShowConfirmation(true)
          }}>Close</button>
        </div>
      )}

      {showConfirmation && (
        <div className="confirmation-toast">
          Congratulations, your order has been confirmed!
        </div>
      )}
      </div>
    </div>
  );
};

export default ProductCheckout;
