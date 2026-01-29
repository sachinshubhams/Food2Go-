import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaStar, FaArrowLeft } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import restaurants from '../data/restaurants';

function RestaurantDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cartItems, addToCart } = useCart();
  const restaurant = restaurants.find(r => r.id === parseInt(id));

  if (!restaurant) return <div>Restaurant not found</div>;

  return (
    <div>
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo">🍔 Food2Go</Link>
          <Link to="/cart" className="cart-icon">
            <FaShoppingCart />
            {cartItems.length > 0 && <span className="cart-badge">{cartItems.length}</span>}
          </Link>
        </div>
      </header>
      <div className="container">
        <Link to="/" className="back-button"><FaArrowLeft /> Back</Link>
        <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', marginBottom: '2rem' }}>
          <img src={restaurant.image} alt={restaurant.name} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
          <div style={{ padding: '1.5rem' }}>
            <h1>{restaurant.name}</h1>
            <div style={{ display: 'flex', gap: '2rem', color: '#666', marginTop: '0.5rem' }}>
              <span><FaStar color="#FFB800" /> {restaurant.rating}</span>
              <span>{restaurant.cuisine}</span>
              <span>🕐 {restaurant.deliveryTime} min</span>
            </div>
          </div>
        </div>
        <h2>Menu</h2>
        <div className="menu-grid">
          {restaurant.menu.map(item => (
            <div key={item.id} className="menu-item">
              <img src={item.image} alt={item.name} className="menu-item-image" />
              <div className="menu-item-info">
                <h3 className="menu-item-name">{item.name}</h3>
                <p className="menu-item-description">{item.description}</p>
                <div className="menu-item-footer">
                  <span className="price">${item.price.toFixed(2)}</span>
                  <button className="btn btn-primary btn-small" onClick={() => addToCart(item, restaurant)}>Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cartItems.length > 0 && (
          <div style={{ position: 'fixed', bottom: '2rem', right: '2rem' }}>
            <button className="btn btn-primary" onClick={() => navigate('/cart')}>
              <FaShoppingCart /> Cart ({cartItems.length})
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default RestaurantDetail;
