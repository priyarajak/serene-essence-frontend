import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions';
import CustomToast from '../components/CustomToast';

const SuggestedItems = () => {
  const [products, setProducts] = useState([]);
  const [toast, setToast] = useState(null);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    setToast({ message: `${product.name} added to cart!`, type: 'success' });
  };
  
  useEffect(() => {
    fetch("https://serene-essence-backend.onrender.com/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Failed to fetch products", err));
  }, []);

  if (!Array.isArray(products) || products.length === 0) {
    return <p style={{ marginTop: '20px' }}>No suggestions available.</p>;
  }

  const randomSuggestions = [...products]
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.max(1, Math.floor(products.length * 0.25)));

  return (
      <>
    <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '40px', flexWrap: 'wrap' }}>
      {randomSuggestions.map(product => (
        <div key={product.id} style={{ width: '180px', textAlign: 'center', backgroundColor: '#fffaf8', border: '1px solid #f3d8d8', borderRadius: '10px', padding: '12px' }}>
          <img src={product.image} alt={product.name} style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '8px' }} />
          <h4 style={{ marginTop: '10px', color: '#c97e93' }}>{product.name}</h4>
          <p style={{ fontWeight: 'bold' }}>₹{product.price}</p>
          <button
            onClick={() => handleAddToCart(product)}
            style={{ marginTop: '10px', padding: '8px 12px', backgroundColor: '#c97e93', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
          >
            Add to Cart
          </button>
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

export default SuggestedItems;
