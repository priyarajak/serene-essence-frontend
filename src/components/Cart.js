import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/actions';

const Cart = () => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const handleAdd = (product) => dispatch(addToCart(product));
  const handleRemove = (product) => dispatch(removeFromCart(product));

  const grandTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const [discountCode, setDiscountCode] = useState('');
const [discount, setDiscount] = useState(0);

const applyDiscount = () => {
  if (discountCode.toLowerCase() === 'serene10') {
    setDiscount(10);
    alert('✅ Discount applied!');
  } else {
    alert('Invalid code');
  }
};
const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);



  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px' }}>
      <h2 style={{ marginBottom: '24px' }}>🛒 Your Cart</h2>
    
      {cart.map(item => (
        <div
          key={item.id}
          style={{
            borderBottom: '1px solid #eee',
            padding: '16px 0',
            display: 'flex',
            gap: '16px',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <img
              src={item.image}
              alt={item.name}
              style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
            />
            <div>
              <h3 style={{ margin: 0 }}>{item.name}</h3>
              <p style={{ margin: '4px 0', color: '#666' }}>₹{item.price} each</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px' }}>
                <button onClick={() => handleRemove(item)} style={{ cursor: 'pointer', padding: '6px 12px', borderRadius: '6px', background: '#fde68a', border: 'none' }}>−</button>
                <span style={{ minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                <button onClick={() => handleAdd(item)} style={{ cursor: 'pointer', padding: '6px 12px', borderRadius: '6px', background: '#facc15', border: 'none' }}>+</button>
              </div>
            </div>
          </div>
          <p style={{ fontWeight: 'bold', color: '#c97e93', fontSize: '1.1rem' }}>₹{item.price * item.quantity}</p>
        </div>
      ))}
      <div style={{ marginTop: '20px', textAlign: 'right' }}>
  <input
    type="text"
    placeholder="Enter discount code"
    value={discountCode}
    onChange={(e) => setDiscountCode(e.target.value)}
    style={{
      padding: '8px',
      border: '1px solid #ccc',
      borderRadius: '6px',
      marginRight: '10px'
    }}
  />
  <button
    onClick={applyDiscount}
    style={{
      padding: '8px 16px',
      backgroundColor: '#c97e93',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer'
    }}
  >
    Apply
  </button>
</div>
<div style={{ textAlign: 'right', marginTop: '30px', fontSize: '1rem' }}>
  <p>Subtotal: ₹{subtotal}</p>
  <p>Discount: − ₹{Math.floor(subtotal * (discount / 100))}</p>
  <p>Shipping: ₹50</p>
  <hr />
  <p><strong>Total: ₹{subtotal - Math.floor(subtotal * (discount / 100)) + 50}</strong></p>
</div>

      <div style={{ textAlign: 'right', marginTop: '30px' }}>
        <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Grand Total: ₹{grandTotal}</p>
      </div>
    </div>
  );
};

export default Cart;
