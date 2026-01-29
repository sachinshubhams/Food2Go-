import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

function OrderTracking() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { orderHistory } = useCart();
  const [currentStatus, setCurrentStatus] = useState(0);

  const statuses = [
    { label: 'Order Placed', time: '2:30 PM', icon: '📝' },
    { label: 'Restaurant Confirmed', time: '2:32 PM', icon: '✅' },
    { label: 'Preparing Food', time: '2:35 PM', icon: '👨‍🍳' },
    { label: 'Out for Delivery', time: '2:55 PM', icon: '🚗' },
    { label: 'Delivered', time: '3:15 PM', icon: '🎉' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStatus(prev => prev < 4 ? prev + 1 : prev);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const order = orderHistory.find(o => o.id === parseInt(orderId));

  return (
    <div>
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo">🍔 Food2Go</Link>
          <div className="cart-icon"><FaShoppingCart /></div>
        </div>
      </header>
      <div className="container">
        <div className="tracking-container">
          <Link to="/" className="back-button">← Back</Link>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1>Track Your Order</h1>
            <p style={{ color: '#666' }}>Order #{orderId}</p>
          </div>
          {currentStatus < 4 && (
            <div style={{ background: '#E3F2FD', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', textAlign: 'center' }}>
              <h3 style={{ color: '#2196F3' }}>Arriving in {20 - (currentStatus * 5)} min</h3>
            </div>
          )}
          <div className="map-placeholder">🗺️ Live Driver Location</div>
          <div className="order-status">
            <h2>Order Status</h2>
            <div className="status-timeline">
              {statuses.map((status, idx) => (
                <div key={idx} className={`status-item ${idx < currentStatus ? 'completed' : idx === currentStatus ? 'current' : ''}`}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>{status.icon}</span>
                    <div>
                      <h3>{status.label}</h3>
                      <p style={{ color: '#666', fontSize: '0.9rem' }}>{idx <= currentStatus ? status.time : 'Pending'}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {currentStatus === 4 && (
            <button className="btn btn-primary" style={{ width: '100%', marginTop: '1.5rem' }} onClick={() => navigate(`/review/${orderId}`)}>
              Rate Your Experience
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderTracking;
