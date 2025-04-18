import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useSelector } from 'react-redux';


const Navbar = () => {
    const user = useSelector((state) => state.user);

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        {user?.isLoggedIn ? (
        <Link to="/account">
            👤 My Account
        </Link>
        ) : (
        <Link to="/login">
            🔐 Login
        </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
