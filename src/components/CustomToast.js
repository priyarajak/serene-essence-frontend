// components/CustomToast.js
import React, { useEffect } from 'react';

const CustomToast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'error' ? '#fca5a5' : '#bbf7d0';
  const textColor = type === 'error' ? '#991b1b' : '#065f46';

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: bgColor,
        color: textColor,
        padding: '12px 20px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        zIndex: 9999,
        fontWeight: '500'
      }}
    >
      {message}
    </div>
  );
};

export default CustomToast;
