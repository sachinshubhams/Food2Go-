import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaArrowLeft, FaTrash } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

function Cart() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, getDeliveryFee, getTax, getGrandTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div>
        <header className="header">
          <div className="header-content">
            <Link to="/" className="logo">🍔 Food2Go</Link>
            <div className="cart-icon"><FaShoppingCart /></div>
          </div>
        </header>
        <div className="container">
          <div className="empty-state">
            <h2>Your cart is empty</h2>
            <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>Browse Restaurants</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo">🍔 Food2Go</Link>
          <Link to="/cart" className="cart-icon">
            <FaShoppingCart />
            <span className="cart-badge">{cartItems.length}</span>
          </Link>
        </div>
      </header>
      <div className="container">
        <Link to="/" className="back-button"><FaArrowLeft /> Back</Link>
        <h1>Shopping Cart</h1>
        <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: '1fr 400px', marginTop: '1.5rem' }}>
          <div>
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p>{item.restaurant?.name}</p>
                  <p className="price">${item.price.toFixed(2)}</p>
                </div>
                <div className="quantity-controls">
                  <button className="quantity-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span style={{ fontWeight: 'bold', minWidth: '30px', textAlign: 'center' }}>{item.quantity}</span>
                  <button className="quantity-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  <button onClick={() => removeFromCart(item.id)} style={{ marginLeft: '1rem', background: 'none', border: 'none', color: '#999', cursor: 'pointer', fontSize: '1.2rem' }}><FaTrash /></button>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div className="order-summary">
              <h2>Order Summary</h2>
              <div className="summary-row"><span>Subtotal</span><span>${getCartTotal().toFixed(2)}</span></div>
              <div className="summary-row"><span>Delivery Fee</span><span>${getDeliveryFee().toFixed(2)}</span></div>
              <div className="summary-row"><span>Tax</span><span>${getTax().toFixed(2)}</span></div>
              <div className="summary-row total"><span>Total</span><span>${getGrandTotal().toFixed(2)}</span></div>
              <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} onClick={() => navigate('/checkout')}>Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
