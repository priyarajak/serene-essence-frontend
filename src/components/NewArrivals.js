import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function NewArrivals() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://serene-essence-backend.onrender.com/products")
      .then(res => res.json())
      .then(data => {
        const sorted = [...data].sort((a, b) => b.id - a.id);
        setProducts(sorted.slice(0, 5));
      })
      .catch(err => console.error("Failed to load new arrivals:", err));
  }, []);

  return (
    <div style={{ padding: '60px 24px', backgroundColor: '#e9cfc3' }}>
      <h2 style={{
        textAlign: 'center',
        fontSize: '1.8rem',
        fontWeight: '600',
        marginBottom: '40px',
        fontFamily: "'Playfair Display', serif",
        color: '#5e473a'
      }}>
        New Arrivals: Crafted for Quiet Luxury
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '30px',
        maxWidth: '1400px',
        margin: '0 auto',
        fontFamily: "'Playfair Display', serif"
      }}>
        {products.map(product => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            style={{
              textDecoration: 'none',
              color: '#3e2c29',
              border: '1px solid #e9d6cb',
              borderRadius: '18px',
              backgroundColor: 'rgb(241 229 223)',
              padding: '20px',
              boxShadow: '0 6px 16px rgba(0, 0, 0, 0.05)',
              textAlign: 'center'
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: '100%',
                height: '220px',
                objectFit: 'cover',
                borderRadius: '14px',
                marginBottom: '12px'
              }}
            />
            <h4 style={{ margin: '10px 0 6px', fontSize: '1.1rem', color: '#7d4f40' }}>
              {product.name}
            </h4>
            <p style={{ fontSize: '0.95rem', color: '#a58a79' }}>
              ₹{product.price}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
