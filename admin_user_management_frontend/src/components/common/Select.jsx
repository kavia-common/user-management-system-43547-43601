import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Select
 * Dropdown select with label and error state.
 */
export default function Select({ label, id, error, helper, children, className = '', ...rest }) {
  const selectId = id || `select-${Math.random().toString(36).slice(2)}`;
  const describedBy = helper ? `${selectId}-helper` : undefined;
  return (
    <div className={`op-field ${className}`}>
      {label && (
        <label htmlFor={selectId} className="op-label">
          {label}
        </label>
      )}
      <select
        id={selectId}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        className={`op-input ${error ? 'op-input-error' : ''}`}
        {...rest}
      >
        {children}
      </select>
      {helper && (
        <div id={describedBy} className="op-helper">
          {helper}
        </div>
      )}
      {error && <div className="op-error">{error}</div>}
    </div>
  );
}
