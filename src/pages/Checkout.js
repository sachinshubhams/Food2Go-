import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaArrowLeft } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

function Checkout() {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, getDeliveryFee, getTax, getGrandTotal, placeOrder } = useCart();
  const [address, setAddress] = useState('');
  const [instructions, setInstructions] = useState('');

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const order = placeOrder({ address, instructions });
    navigate(`/tracking/${order.id}`);
  };

  if (cartItems.length === 0) {
    navigate('/');
    return null;
  }

  return (
    <div>
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo">🍔 Food2Go</Link>
          <Link to="/cart" className="cart-icon"><FaShoppingCart /><span className="cart-badge">{cartItems.length}</span></Link>
        </div>
      </header>
      <div className="container">
        <Link to="/cart" className="back-button"><FaArrowLeft /> Back</Link>
        <h1>Checkout</h1>
        <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: '1fr 400px', marginTop: '1.5rem' }}>
          <form onSubmit={handlePlaceOrder}>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '12px' }}>
              <h2>Delivery Details</h2>
              <div className="form-group">
                <label>Delivery Address *</label>
                <input type="text" placeholder="123 Main St, City, ZIP" value={address} onChange={(e) => setAddress(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Special Instructions</label>
                <textarea placeholder="Ring doorbell, etc." value={instructions} onChange={(e) => setInstructions(e.target.value)} rows="3" />
              </div>
              <h2 style={{ marginTop: '2rem' }}>Payment</h2>
              <div className="form-group">
                <select><option>Visa ending in 1234</option><option>PayPal</option><option>Cash on Delivery</option></select>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '2rem' }}>Place Order ${getGrandTotal().toFixed(2)}</button>
            </div>
          </form>
          <div>
            <div className="order-summary">
              <h2>Order Summary</h2>
              {cartItems.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                  <span>{item.quantity}x {item.name}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="summary-row"><span>Subtotal</span><span>${getCartTotal().toFixed(2)}</span></div>
              <div className="summary-row"><span>Delivery</span><span>${getDeliveryFee().toFixed(2)}</span></div>
              <div className="summary-row"><span>Tax</span><span>${getTax().toFixed(2)}</span></div>
              <div className="summary-row total"><span>Total</span><span>${getGrandTotal().toFixed(2)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
