import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`http://serene-essence-backend.onrender.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.error("Failed to load product:", err));
  }, [id]);

  if (!product) return <div style={{ textAlign: 'center', padding: '100px' }}>Loading...</div>;

  return (
    <div style={{
      padding: '40px 16px',
      maxWidth: '1000px',
      margin: '0 auto',
      fontFamily: "'Playfair Display', serif",
      backgroundColor: '#fffaf8',
      color: '#3e2c29',
      borderRadius: '20px',
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.05)'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: '100%',
            maxWidth: '400px',
            borderRadius: '16px',
            objectFit: 'cover',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
          }}
        />
        <div style={{ width: '100%', maxWidth: '500px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '12px', color: '#7d4f40'}}>{product.name}</h2>
          <p style={{ fontSize: '1.2rem', fontWeight: '500', marginBottom: '8px' }}>₹{product.price}</p>
          <p style={{ fontSize: '1rem', color: '#7e6a58', marginBottom: '20px' }}>{product.description}</p>
          <p style={{ fontSize: '0.95rem', color: '#8b6f5a', marginBottom: '20px' }}>
            Estimated delivery: <strong>2–4 business days</strong>
          </p>
          <button
            onClick={() => dispatch(addToCart(product))}
            style={{
              padding: '10px 24px',
              backgroundColor: '#b08968',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
