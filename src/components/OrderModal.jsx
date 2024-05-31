import React from 'react';
import { FaTimes } from 'react-icons/fa';

const OrderModal = ({ cartItems, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>
          <FaTimes />
        </button>
        <h2>Your Orders</h2>
        <ul className="order-list">
          {cartItems.map((item, index) => (
            <li key={index} className="order-item">
              <img src={item.image} alt={item.title} className="order-item-image" />
              <div className="order-item-info">
                <h3>{item.title}</h3>
                <p>${item.price}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderModal;
