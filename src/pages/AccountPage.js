import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AccountPage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (!saved) {
      alert('Please login first.');
      navigate('/login');
    } else {
      setUser(JSON.parse(saved));
    }
  }, [navigate]);

  if (!user) return <p style={{ textAlign: 'center' }}>Loading user info...</p>;

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <h2>Welcome, {user.name}!</h2>
      <p>Email: {user.email}</p>
      <hr style={{ margin: '30px 0' }} />
      <h3>Your Orders</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={{ background: '#fffaf7', padding: '12px', borderRadius: '10px', marginBottom: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          Order #001 - ₹599 - Status: Delivered
        </li>
        <li style={{ background: '#fffaf7', padding: '12px', borderRadius: '10px', marginBottom: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          Order #002 - ₹849 - Status: Processing
        </li>
      </ul>
    </div>
  );
};

export default AccountPage;
