import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/actions';
import CustomToast from '../components/CustomToast';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [toast, setToast] = useState(null);
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    setToast({ message: `${product.name} added to cart!`, type: 'success' });
  };

  const getQuantity = (productId) =>
    cart.find(item => item.id === productId)?.quantity || 0;

  useEffect(() => {
    fetch("http://localhost:5050/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("FETCH ERROR:", err));
  }, []);

  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '36px',
          padding: '60px 24px',
          backgroundColor: '#e9cfc3',
          maxWidth: '1440px',
          margin: '0 auto',
          fontFamily: "'Playfair Display', serif"
        }}
      >
        {products.map(product => (
          <div
            key={product.id}
            style={{
              backgroundColor: 'rgb(241 229 223)',
              border: '1px solid #e9d6cb',
              borderRadius: '20px',
              padding: '24px',
              textAlign: 'center',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.05)',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }}
          >
            <Link
              to={`/product/${product.id}`}
              style={{ textDecoration: 'none', color: '#3e2c29' }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '240px',
                  objectFit: 'cover',
                  borderRadius: '14px',
                  marginBottom: '16px'
                }}
              />
              <h3 style={{ fontSize: '1.1rem', marginBottom: '4px', color: '#7d4f40' }}>
                {product.name}
              </h3>
              <p style={{ fontSize: '0.95rem', color: '#a58a79', marginBottom: '12px' }}>
                ₹{product.price}
              </p>
            </Link>

            {getQuantity(product.id) === 0 ? (
              <button
                onClick={() => handleAddToCart(product)}
                style={{
                  padding: '8px 20px',
                  background: '#b08968',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '0.95rem',
                  cursor: 'pointer'
                }}
              >
                Add to Cart
              </button>
            ) : (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '12px',
                  marginTop: '8px'
                }}
              >
                <button
                  onClick={() => dispatch(removeFromCart(product))}
                  style={{
                    padding: '6px 10px',
                    borderRadius: '6px',
                    background: '#f0e1d3',
                    border: 'none'
                  }}
                >
                  −
                </button>
                <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                  {getQuantity(product.id)}
                </span>
                <button
                  onClick={() => dispatch(addToCart(product))}
                  style={{
                    padding: '6px 10px',
                    borderRadius: '6px',
                    background: '#e6c8ba',
                    border: 'none'
                  }}
                >
                  +
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {toast && (
        <CustomToast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
};

export default ProductList;
