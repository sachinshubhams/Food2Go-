import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaStar, FaSearch } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import restaurants from '../data/restaurants';

function Home() {
  const { cartItems } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');

  const cuisines = ['All', 'American', 'Italian', 'Japanese'];
  const filteredRestaurants = restaurants.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCuisine = selectedCuisine === 'All' || r.cuisine === selectedCuisine;
    return matchesSearch && matchesCuisine;
  });

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
        <h1 style={{ marginBottom: '1.5rem' }}>Discover Restaurants</h1>
        <div className="search-bar">
          <div style={{ position: 'relative' }}>
            <FaSearch style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
            <input type="text" placeholder="Search restaurants..." className="search-input" style={{ paddingLeft: '2.5rem' }} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
        </div>
        <div className="filter-chips">
          {cuisines.map(cuisine => (
            <button key={cuisine} className={`chip ${selectedCuisine === cuisine ? 'active' : ''}`} onClick={() => setSelectedCuisine(cuisine)}>{cuisine}</button>
          ))}
        </div>
        <div className="restaurant-grid">
          {filteredRestaurants.map(restaurant => (
            <Link key={restaurant.id} to={`/restaurant/${restaurant.id}`} className="restaurant-card">
              <img src={restaurant.image} alt={restaurant.name} className="restaurant-image" />
              <div className="restaurant-info">
                <h2 className="restaurant-name">{restaurant.name}</h2>
                <div className="restaurant-details">
                  <span className="rating"><FaStar color="#FFB800" /> {restaurant.rating} ({restaurant.reviewCount})</span>
                  <span>{restaurant.cuisine}</span>
                </div>
                <div className="restaurant-details">
                  <span>🕐 {restaurant.deliveryTime} min</span>
                  <span>🚚 ${restaurant.deliveryFee.toFixed(2)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
