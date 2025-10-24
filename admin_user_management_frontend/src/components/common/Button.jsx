import React from 'react';
import '../../App.css';

/**
 * PUBLIC_INTERFACE
 * Button
 * Accessible button with variants and sizes.
 */
export default function Button({ children, onClick, type = 'button', variant = 'primary', size = 'md', className = '', ...rest }) {
  const base =
    'op-btn inline-flex items-center justify-center rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-offset-2';
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
  };
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-600 focus:ring-primary',
    secondary: 'bg-secondary text-white hover:opacity-90 focus:ring-secondary',
    ghost: 'bg-transparent text-primary hover:bg-primary-50 focus:ring-primary',
    danger: 'bg-error text-white hover:opacity-90 focus:ring-error',
    neutral: 'bg-surface text-text border border-border hover:bg-gray-50 focus:ring-primary',
  };
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${sizes[size]} ${variants[variant] || variants.primary} shadow-sm ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
