import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Cart from '../components/Cart';
import SuggestedItems from '../components/SuggestedItems';

const CartPage = () => {
  const cart = useSelector(state => state.cart);

  if (cart.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '100px 20px',
        color: '#999'
      }}>
        <h2>Your cart is feeling a little empty 😔</h2>
        <p style={{ marginTop: '20px' }}>Why not try one of our bestsellers?</p>
        <SuggestedItems />
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', animation: 'fadeIn 0.5s ease-in' }}>
      <Cart />
      
      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <Link
          to="/checkout"
          style={{
            cursor: 'pointer',
            textDecoration: 'none',
            backgroundColor: '#c97e93',
            color: '#fff',
            padding: '12px 24px',
            borderRadius: '8px',
            display: 'inline-block'
          }}
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default CartPage;
