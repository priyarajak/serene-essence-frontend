import React from 'react';

const Footer = () => (
  <footer style={{
    backgroundColor: 'rgb(241 229 223)',
    padding: '24px',
    textAlign: 'center',
    fontSize: '0.9rem',
    color: '#c97e93',
    borderTop: '1px solid #f5d1d1'
  }}>
    <p>Contact: hello@sereneessence.com | +91 99999 12345</p>
    <p>© {new Date().getFullYear()} Serene Essence. All rights reserved.</p>
  </footer>
);

export default Footer;
