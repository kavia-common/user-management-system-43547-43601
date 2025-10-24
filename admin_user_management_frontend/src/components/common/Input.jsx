import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Input
 * Text input with label, helper text, and error state.
 */
export default function Input({ label, id, error, helper, className = '', ...rest }) {
  const inputId = id || `input-${Math.random().toString(36).slice(2)}`;
  const describedBy = helper ? `${inputId}-helper` : undefined;
  return (
    <div className={`op-field ${className}`}>
      {label && (
        <label htmlFor={inputId} className="op-label">
          {label}
        </label>
      )}
      <input
        id={inputId}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        className={`op-input ${error ? 'op-input-error' : ''}`}
        {...rest}
      />
      {helper && (
        <div id={describedBy} className="op-helper">
          {helper}
        </div>
      )}
      {error && <div className="op-error">{error}</div>}
    </div>
  );
}
