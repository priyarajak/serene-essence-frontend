import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate} from 'react-router-dom';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import ProductDetail from './pages/ProductDetail';
import LoginPage from './pages/LoginPage';
import CheckoutPage from './pages/CheckoutPage';
import RequireAuth from './components/RequireAuth';
import RegisterPage from './pages/RegisterPage';
import AccountPage from './pages/AccountPage';
import Navbar from './components/Navbar';

const AppContent = () => {
  const cart = useSelector(state => state.cart);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const navLink = {
    textDecoration: 'none',
    color: '#c97e93',
    fontWeight: '500',
    padding: '8px 16px',
    borderRadius: '6px',
    border: '1px solid #f5d1d1',
    backgroundColor: '#fff',
    transition: '0.3s'
  };

  const RequireAuth = ({ children }) => {
    const user = useSelector((state) => state.user);
    const location = useLocation();
    
    if (!user || !user.isLoggedIn) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  
    return children;
  };

  return (
    <Router>
      <Navbar/>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/checkout" element={<RequireAuth><CheckoutPage /></RequireAuth>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="*" element={
            <div style={{ padding: '80px', textAlign: 'center' }}>
                <h2>404 - Page Not Found</h2>
                <p>Oops! That page doesn’t exist.</p>
                <Link to="/" style={{ marginTop: '20px', display: 'inline-block', color: '#c97e93' }}>← Back to Home</Link>
            </div>} />
      </Routes>
    </Router>
  );
};

const linkStyle = {
  textDecoration: 'none',
  color: '#c97e93',
  fontWeight: '500',
  padding: '8px 16px',
  borderRadius: '6px',
  border: '1px solid #f5d1d1',
  backgroundColor: '#fff',
  transition: '0.3s'
};

const badgeStyle = {
  marginLeft: '8px',
  background: '#c97e93',
  color: '#fff',
  padding: '2px 8px',
  borderRadius: '12px',
  fontSize: '0.8rem'
};

export default AppContent;
