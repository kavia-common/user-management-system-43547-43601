import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Badge
 * Small pill to present statuses or roles.
 */
export default function Badge({ children, color = 'primary', className = '' }) {
  const variants = {
    primary: 'bg-primary-50 text-primary border border-primary-100',
    secondary: 'bg-secondary-50 text-secondary border border-secondary-100',
    success: 'bg-green-50 text-green-700 border border-green-100',
    error: 'bg-error-50 text-error border border-error-100',
    gray: 'bg-gray-100 text-gray-800 border border-gray-200',
  };
  return <span className={`op-badge ${variants[color] || variants.gray} ${className}`}>{children}</span>;
}
