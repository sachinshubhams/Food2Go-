import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

function Review() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => navigate('/'), 2000);
  };

  if (submitted) {
    return (
      <div className="container">
        <div className="rating-container" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '4rem' }}>🎉</div>
          <h2>Thank you!</h2>
          <p style={{ color: '#666' }}>Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo">🍔 Food2Go</Link>
        </div>
      </header>
      <div className="container">
        <div className="rating-container">
          <h1 style={{ textAlign: 'center' }}>How was your order?</h1>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '2rem' }}>Order #{orderId}</p>
          <form onSubmit={handleSubmit}>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map(star => (
                <FaStar
                  key={star}
                  className={`star ${star <= (hoverRating || rating) ? 'filled' : ''}`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                />
              ))}
            </div>
            <p style={{ textAlign: 'center', color: '#666', marginBottom: '2rem' }}>
              {rating === 0 ? 'Select rating' : rating === 5 ? 'Excellent!' : 'Thanks!'}
            </p>
            <div className="form-group">
              <label>Comments (Optional)</label>
              <textarea
                placeholder="Tell us more..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows="4"
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={rating === 0}>
              Submit Review
            </button>
            <Link to="/" className="btn btn-secondary" style={{ width: '100%', marginTop: '1rem', display: 'block', textAlign: 'center', textDecoration: 'none' }}>
              Skip
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Review;
