import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/actions';
import { useNavigate, useLocation, Link } from 'react-router-dom';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5050/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      dispatch(setUser({ name: data.name, email: data.email, isLoggedIn: true }));
      localStorage.setItem('user', JSON.stringify(data));
      navigate('/login', { state: { from: location.pathname } });
    } else {
      alert(data.error || 'Registration failed');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#fffaf7',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <form onSubmit={handleRegister}
        style={{
          backgroundColor: '#fff',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 6px 24px rgba(0, 0, 0, 0.05)',
          width: '100%',
          maxWidth: '400px'
        }}
      >
        <h2 style={{ textAlign: 'center', color: '#c97e93', marginBottom: '24px' }}>
          Create Your Account
        </h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
          style={{ width: '100%', padding: '12px', marginBottom: '16px', borderRadius: '6px', border: '1px solid #ddd' }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: '12px', marginBottom: '16px', borderRadius: '6px', border: '1px solid #ddd' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: '12px', marginBottom: '24px', borderRadius: '6px', border: '1px solid #ddd' }}
        />
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#c97e93',
            color: '#fff',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Register
        </button>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link to="/login" style={{
            textDecoration: 'none',
            color: '#c97e93',
            fontWeight: '500',
            padding: '8px 16px',
            borderRadius: '6px',
            border: '1px solid #f5d1d1',
            backgroundColor: '#fff',
            transition: '0.3s'
          }}>
            🔐 Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
}
