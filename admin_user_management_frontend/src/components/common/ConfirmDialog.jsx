import React, { useEffect, useRef } from 'react';
import Button from './Button';

/**
 * PUBLIC_INTERFACE
 * ConfirmDialog
 * Accessible modal confirmation dialog.
 */
export default function ConfirmDialog({ open, title = 'Confirm', message, confirmText = 'Confirm', cancelText = 'Cancel', onConfirm, onCancel }) {
  const dialogRef = useRef(null);
  const confirmBtnRef = useRef(null);

  useEffect(() => {
    if (open && confirmBtnRef.current) {
      confirmBtnRef.current.focus();
    }
  }, [open]);

  if (!open) return null;

  const onBackdrop = (e) => {
    if (e.target === e.currentTarget) onCancel?.();
  };

  return (
    <div className="op-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="confirm-title" onMouseDown={onBackdrop}>
      <div className="op-modal" ref={dialogRef}>
        <h3 id="confirm-title" className="op-modal-title">{title}</h3>
        <p className="op-modal-message">{message}</p>
        <div className="op-modal-actions">
          <Button variant="neutral" onClick={onCancel}>{cancelText}</Button>
          <Button variant="danger" onClick={onConfirm} ref={confirmBtnRef}>{confirmText}</Button>
        </div>
      </div>
    </div>
  );
}
