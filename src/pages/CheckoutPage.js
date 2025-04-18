import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/actions';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    full_name: '', address_line: '', city: '', state: '', zip_code: '', phone_number: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('card');

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed.user);
      fetch(`http://localhost:5050/get-addresses/${parsed.user.id}`)
        .then(res => res.json())
        .then(data => {
          setAddresses(data);
          if (data.length > 0) setSelectedAddress(data[0].id);
        });
    } else {
      navigate('/login', { state: { from: '/checkout' } });
    }
  }, [navigate]);

  const handlePlaceOrder = () => {
    if (!selectedAddress) return alert('Please select an address.');
    if (!paymentMethod) return alert('Please select a payment method.');

    fetch('http://localhost:5050/place-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: user.id,
        address_id: selectedAddress,
        items: cart,
        total
      })
    }).then(() => {
      alert('✅ Order placed successfully!');
      cart.forEach(item => dispatch(removeFromCart(item)));
      navigate('/');
    });
  };

  const handleAddAddress = async () => {
    const response = await fetch('http://localhost:5050/save-address', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newAddress, user_id: user.id })
    });
    if (response.ok) {
      const res = await fetch(`http://localhost:5050/get-addresses/${user.id}`);
      const updated = await res.json();
      setAddresses(updated);
      setSelectedAddress(updated[updated.length - 1].id);
      setShowAddressForm(false);
      alert('✅ Address added!');
    } else {
      alert('❌ Failed to save address');
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Checkout</h2>

      {/* Address Section */}
      <div style={{ marginBottom: '30px' }}>
        <h4 style={subtitleStyle}>Shipping Address</h4>
        {addresses.map(addr => (
          <label key={addr.id} style={{ display: 'block', marginBottom: '10px' }}>
            <input
              type="radio"
              name="selectedAddress"
              value={addr.id}
              checked={selectedAddress === addr.id}
              onChange={() => setSelectedAddress(addr.id)}
              style={{ marginRight: '8px' }}
            />
            {addr.full_name}, {addr.address_line}, {addr.city}, {addr.state} - {addr.zip_code}
          </label>
        ))}
        <button onClick={() => setShowAddressForm(!showAddressForm)} style={linkButton}>
          {showAddressForm ? '✖ Cancel' : '➕ Add New Address'}
        </button>

        {showAddressForm && (
          <div style={{ marginTop: '20px' }}>
            {['full_name', 'address_line', 'city', 'state', 'zip_code', 'phone_number'].map(field => (
              <input
                key={field}
                name={field}
                placeholder={field.replace('_', ' ').toUpperCase()}
                value={newAddress[field]}
                onChange={(e) => setNewAddress({ ...newAddress, [field]: e.target.value })}
                style={{ ...inputStyle, marginBottom: '10px' }}
                required
              />
            ))}
            <button onClick={handleAddAddress} style={buttonStyle}>Save Address</button>
          </div>
        )}
      </div>

      {/* Payment */}
      <div style={{ marginBottom: '30px' }}>
        <h4 style={subtitleStyle}>Payment Method</h4>
        <label><input type="radio" name="payment" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} /> Credit/Debit Card</label><br />
        <label><input type="radio" name="payment" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} /> Cash on Delivery</label>
      </div>

      {/* Cart Items */}
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div style={{ marginBottom: '20px' }}>
            {cart.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span>{item.name} x {item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <hr />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', margin: '20px 0' }}>
            <span>Total:</span>
            <span>₹{total}</span>
          </div>
          <button onClick={handlePlaceOrder} style={buttonStyle}>Place Order</button>
        </>
      )}
    </div>
  );
};

const containerStyle = {
  maxWidth: '800px',
  margin: '40px auto',
  padding: '20px',
  backgroundColor: '#fffaf8',
  border: '2px solid #f3d8d8',
  borderRadius: '12px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
};

const titleStyle = { color: '#c97e93', marginBottom: '20px' };
const subtitleStyle = { color: '#c97e93' };
const inputStyle = {
  width: '100%',
  padding: '10px',
  margin: '8px 0',
  borderRadius: '6px',
  border: '1px solid #f3d8d8',
  backgroundColor: '#fff',
  boxSizing: 'border-box'
};
const buttonStyle = {
  padding: '12px 24px',
  backgroundColor: '#c97e93',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer'
};
const linkButton = {
  background: 'none',
  border: 'none',
  color: '#c97e93',
  cursor: 'pointer',
  marginTop: '10px'
};

export default CheckoutPage;
